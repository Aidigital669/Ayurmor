import pool from './db';

const BASE_URL = 'https://api.bigship.direct';

let cachedToken: string | null = null;
let cachedTokenExpiry: number | null = null;

// Clean and format date to UTC (Y-m-d H:i:s)
function getFormattedDate(): string {
  const date = new Date();
  const pad = (num: number) => String(num).padStart(2, '0');
  
  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());
  
  const hh = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

// Extract pin code from shipping address string
export function extractPincode(address: string): string {
  const match = address.match(/\b\d{6}\b/);
  return match ? match[0] : '110001'; // Fallback to a default Delhi pincode if not found
}

// Fetch City and State from postalpincode API
export async function getCityStateFromPincode(pincode: string): Promise<{ city: string; state: string }> {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice[0]) {
      const office = data[0].PostOffice[0];
      return {
        city: office.District || office.Block || 'DELHI',
        state: office.State || 'DELHI'
      };
    }
  } catch (err) {
    console.error('Failed to resolve pincode details:', err);
  }
  return { city: 'DELHI', state: 'DELHI' };
}

// Secure Token Generator
export async function getBigshipToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedTokenExpiry && now < cachedTokenExpiry) {
    return cachedToken;
  }

  const accessKey = process.env.BIGSHIP_ACCESS_KEY;
  const username = process.env.BIGSHIP_USERNAME;
  const password = process.env.BIGSHIP_PASSWORD;

  if (!accessKey || !username || !password) {
    throw new Error('Bigship credentials are not configured in environment variables.');
  }

  console.log('Logging in to Bigship Direct API...');
  const res = await fetch(`${BASE_URL}/api/outbound/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.trim(),
      password: password.trim(),
      access_key: accessKey.trim()
    }),
  });

  const data = await res.json();
  if (!data.status) {
    throw new Error(`Bigship Login Failed: ${data.message || 'Unknown error code'}`);
  }

  cachedToken = data.data.token;
  if (data.data.tokenExpiringAt) {
    cachedTokenExpiry = new Date(data.data.tokenExpiringAt).getTime() - 60000; // 1-minute buffer
  } else {
    cachedTokenExpiry = now + 12 * 60 * 60 * 1000; // Fallback 12 hours
  }

  return cachedToken!;
}

// Get Warehouse Pickup locations list
export async function getBigshipWarehouses(segmentType = 'local') {
  const token = await getBigshipToken();
  // Using POST since the body containing segment_type is required
  const res = await fetch(`${BASE_URL}/api/outbound/get-warehouse-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      perPage: '25',
      page: '1',
      segment_type: segmentType
    })
  });

  return await res.json();
}

// Create a Draft Order (Domestic B2C)
export async function createBigshipDraft(orderId: number, warehouseId: number) {
  const [rows]: any = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
  if (!rows || rows.length === 0) {
    throw new Error('Order not found in database.');
  }
  const order = rows[0];

  const pincode = extractPincode(order.shipping_address);
  const { city, state } = await getCityStateFromPincode(pincode);

  let items = [];
  try {
    items = JSON.parse(order.items_json || '[]');
  } catch (err) {
    items = [];
  }

  const token = await getBigshipToken();
  const invoiceAmount = Math.round(Number(order.total_amount));

  // Map products array
  const products = items.map((it: any) => ({
    productName: it.title || 'Ayurveda Product',
    hsn: '30049011', // Ayurvedic HSN Code
    qty: it.quantity || 1,
    amount: Math.round(Number(it.price || invoiceAmount)),
    totalAmount: Math.round(Number(it.price || invoiceAmount) * (it.quantity || 1)),
    collectableAmount: 0, // Prepaid order
    categoryId: '1'
  }));

  // Payload structure for domestic_b2c
  const payload = {
    segment_type: 'domestic_b2c',
    MasterOrderPickUpLocation: warehouseId,
    MasterOrderReturnLocation: warehouseId,
    MasterOrderDate: getFormattedDate(),
    MasterOrderPaymentMode: 1, // Prepaid
    OrderInvoiceNo: order.order_number,
    MasterOrderInvoiceAmount: invoiceAmount,
    // Receiver Info
    MasterOrderShippingName: order.customer_name || 'Customer',
    MasterOrderShippingMobileNo: order.customer_phone || '9999999999',
    MasterOrderShippingZipCode: pincode,
    MasterOrderShippingCity: city,
    MasterOrderShippingState: state,
    MasterOrderShippingCountry: 'India',
    MasterOrderShippingAddress: order.shipping_address.substring(0, 100),
    MasterOrderShippingAddress2: '',
    MasterOrderShippingLandmark: 'N/A',
    MasterOrderShippingEmail: order.customer_email || 'guest@ayurmor.in',
    totalNumOfBoxes: 1,
    boxes: [
      {
        weight_unit: 'kg',
        dimension_unit: 'cm',
        noOfBoxes: 1,
        dimensions: [
          {
            length: 10,
            breadth: 10,
            height: 10,
            weight: 1 // Default 1kg
          }
        ],
        products: products
      }
    ]
  };

  console.log('Sending payload to Bigship Outbound Order Draft API:', JSON.stringify(payload, null, 2));

  const res = await fetch(`${BASE_URL}/api/outbound/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const responseData = await res.json();
  if (responseData.status) {
    const bigshipOrderId = responseData.data.CustomGlobalOrderId;
    // Save draft order ID in our database
    await pool.query(
      'UPDATE orders SET bigship_order_id = ?, bigship_status = ? WHERE id = ?',
      [bigshipOrderId, 'draft', orderId]
    );
  }

  return responseData;
}

// Fetch Courier Rates
export async function getBigshipRates(bigshipOrderId: string) {
  const token = await getBigshipToken();
  const res = await fetch(`${BASE_URL}/api/outbound/courier-wise-shipment-cost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      MasterCustomOrderId: bigshipOrderId
    })
  });

  return await res.json();
}

// Place/Manifest Order
export async function manifestBigshipOrder(orderId: number, bigshipOrderId: string, courierId: number) {
  const token = await getBigshipToken();

  // Create multipart form data payload
  const formData = new FormData();
  formData.append('MasterCustomOrderId', bigshipOrderId);
  formData.append('courierId', String(courierId));
  formData.append('invoiceType', 'uploaded');
  formData.append('riskTypeId', '2'); // Default Owner Risk

  const res = await fetch(`${BASE_URL}/api/outbound/place-order`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // Note: Node 18 fetch FormData will set appropriate multipart boundary automatically
    },
    body: formData
  });

  const data = await res.json();
  if (data.status) {
    const awb = data.data.awb_assigned;
    // Update local database order to shipped
    await pool.query(
      'UPDATE orders SET tracking_number = ?, shipping_status = ?, bigship_status = ? WHERE id = ?',
      [awb, 'shipped', 'manifested', orderId]
    );
  }

  return data;
}

// Track Order Details
export async function trackBigshipOrder(bigshipOrderId: string) {
  const token = await getBigshipToken();
  // PDF shows track order request takes CustomGlobalOrderId
  // Method: GET or POST depending on endpoints, let's construct GET with URL query
  const res = await fetch(`${BASE_URL}/api/outbound/track-order?CustomGlobalOrderId=${bigshipOrderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return await res.json();
}

// Download documents (label, invoice, manifest)
export async function getBigshipDocument(bigshipOrderId: string, docType: string) {
  const token = await getBigshipToken();
  const res = await fetch(`${BASE_URL}/api/outbound/download-shipment-documents?CustomGlobalOrderId=${bigshipOrderId}&document_type=${docType}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return await res.json();
}
