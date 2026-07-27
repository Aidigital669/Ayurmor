import { NextResponse } from 'next/server';
import { 
  getBigshipWarehouses, 
  createBigshipDraft, 
  getBigshipRates, 
  manifestBigshipOrder, 
  trackBigshipOrder, 
  getBigshipDocument 
} from '@/lib/bigship';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    if (!action) {
      return NextResponse.json({ success: false, error: 'Action parameter is required.' }, { status: 400 });
    }

    if (action === 'warehouses') {
      const warehouses = await getBigshipWarehouses();
      return NextResponse.json({ success: true, ...warehouses });
    }

    if (action === 'rates') {
      const orderId = searchParams.get('orderId');
      if (!orderId) {
        return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
      }

      // Fetch bigship_order_id from DB
      const [rows]: any = await pool.query('SELECT bigship_order_id FROM orders WHERE id = ?', [orderId]);
      if (!rows || rows.length === 0 || !rows[0].bigship_order_id) {
        return NextResponse.json({ success: false, error: 'Bigship draft order not found.' }, { status: 404 });
      }

      const rates = await getBigshipRates(rows[0].bigship_order_id);
      return NextResponse.json({ success: true, ...rates });
    }

    if (action === 'track') {
      const orderId = searchParams.get('orderId');
      if (!orderId) {
        return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
      }

      const [rows]: any = await pool.query('SELECT bigship_order_id FROM orders WHERE id = ?', [orderId]);
      if (!rows || rows.length === 0 || !rows[0].bigship_order_id) {
        return NextResponse.json({ success: false, error: 'Bigship draft order not found.' }, { status: 404 });
      }

      const track = await trackBigshipOrder(rows[0].bigship_order_id);
      return NextResponse.json({ success: true, ...track });
    }

    if (action === 'documents') {
      const orderId = searchParams.get('orderId');
      const docType = searchParams.get('type') || 'label'; // label, invoice, manifest
      if (!orderId) {
        return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
      }

      const [rows]: any = await pool.query('SELECT bigship_order_id FROM orders WHERE id = ?', [orderId]);
      if (!rows || rows.length === 0 || !rows[0].bigship_order_id) {
        return NextResponse.json({ success: false, error: 'Bigship draft order not found.' }, { status: 404 });
      }

      const docs = await getBigshipDocument(rows[0].bigship_order_id, docType);
      return NextResponse.json({ success: true, ...docs });
    }

    return NextResponse.json({ success: false, error: `Invalid GET action: ${action}` }, { status: 400 });

  } catch (error: any) {
    console.error('Bigship Proxy GET Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    if (!action) {
      return NextResponse.json({ success: false, error: 'Action parameter is required.' }, { status: 400 });
    }

    const body = await req.json();

    if (action === 'draft') {
      const { orderId, warehouseId } = body;
      if (!orderId || !warehouseId) {
        return NextResponse.json({ success: false, error: 'orderId and warehouseId are required.' }, { status: 400 });
      }

      const draftResult = await createBigshipDraft(parseInt(orderId, 10), parseInt(warehouseId, 10));
      return NextResponse.json({ success: true, ...draftResult });
    }

    if (action === 'manifest') {
      const { orderId, courierId } = body;
      if (!orderId || !courierId) {
        return NextResponse.json({ success: false, error: 'orderId and courierId are required.' }, { status: 400 });
      }

      const [rows]: any = await pool.query('SELECT bigship_order_id FROM orders WHERE id = ?', [orderId]);
      if (!rows || rows.length === 0 || !rows[0].bigship_order_id) {
        return NextResponse.json({ success: false, error: 'Bigship draft order not found.' }, { status: 404 });
      }

      const manifestResult = await manifestBigshipOrder(parseInt(orderId, 10), rows[0].bigship_order_id, parseInt(courierId, 10));
      return NextResponse.json({ success: true, ...manifestResult });
    }

    return NextResponse.json({ success: false, error: `Invalid POST action: ${action}` }, { status: 400 });

  } catch (error: any) {
    console.error('Bigship Proxy POST Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
