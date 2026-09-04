'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  MessageCircle, 
  BadgeCheck, 
  Tag, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  MapPin,
  Home as HomeIcon,
  Briefcase,
  Check,
  Percent,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PRODUCT_IMAGES: Record<string, string> = {
  moringa: '/hero_moringa.png',
  abc: '/hero_abc.png',
  choco: '/hero_choco.png',
  mushroom: '/Mushroom3.jpeg'
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Form State
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [addressType, setAddressType] = useState<'home' | 'work'>('home');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment Selection State: 'razorpay' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'whatsapp'>('razorpay');

  // Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Status & Success State
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccessDetails, setOrderSuccessDetails] = useState<{
    orderNumber: string;
    trackingNumber: string;
    courierPartner: string;
    amount: number;
    paymentMethod: string;
  } | null>(null);

  // Calculate totals (MRP vs Selling Price)
  const itemsCount = cart.reduce((t, i) => t + i.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);
  const totalMrp = Math.round(subtotal * 1.25); // Estimated MRP for discount visualization
  const mrpDiscount = totalMrp - subtotal;
  
  const couponDiscountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const totalSavings = mrpDiscount + couponDiscountAmount;
  const finalAmount = Math.max(0, subtotal - couponDiscountAmount);

  // Auto pincode helper
  useEffect(() => {
    if (shippingPincode.trim().length === 6) {
      // Mock pincode lookup
      const code = shippingPincode.trim();
      if (code.startsWith('56') || code.startsWith('57')) {
        setShippingCity('Bengaluru');
        setShippingState('Karnataka');
      } else if (code.startsWith('11')) {
        setShippingCity('New Delhi');
        setShippingState('Delhi');
      } else if (code.startsWith('40')) {
        setShippingCity('Mumbai');
        setShippingState('Maharashtra');
      } else if (code.startsWith('60')) {
        setShippingCity('Chennai');
        setShippingState('Tamil Nadu');
      } else if (code.startsWith('70')) {
        setShippingCity('Kolkata');
        setShippingState('West Bengal');
      } else if (code.startsWith('50')) {
        setShippingCity('Hyderabad');
        setShippingState('Telangana');
      }
    }
  }, [shippingPincode]);

  // Apply Coupon Handler
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (code === 'AYUR15' || code === 'FLIP15') {
      setAppliedCoupon({ code: 'AYUR15', discountPercent: 15 });
      setCouponSuccess('🎉 15% discount applied successfully!');
    } else if (code === 'AMAZON10' || code === 'WELCOME10' || code === 'FIRST10') {
      setAppliedCoupon({ code: 'WELCOME10', discountPercent: 10 });
      setCouponSuccess('🎉 10% welcome discount applied!');
    } else {
      setCouponError('Invalid coupon. Try AYUR15 for 15% off!');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponSuccess('');
    setCouponError('');
  };

  // Razorpay Loader
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Main Submit Handler
  const handleCompleteOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (!shippingName.trim() || !shippingPhone.trim() || !shippingEmail.trim() || !shippingAddress.trim() || !shippingPincode.trim()) {
      alert('Please fill in all required delivery fields (*).');
      return;
    }

    if (shippingPhone.trim().length < 10) {
      alert('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    if (shippingPincode.trim().length < 6) {
      alert('Please enter a valid 6-digit postal pincode.');
      return;
    }

    setCheckoutLoading(true);

    const fullFormattedAddress = `${shippingAddress}${shippingCity ? `, ${shippingCity}` : ''}${shippingState ? `, ${shippingState}` : ''}, PIN: ${shippingPincode} (${addressType.toUpperCase()})`;

    if (paymentMethod === 'razorpay') {
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert('Razorpay payment gateway failed to load. Please check your internet connection.');
        setCheckoutLoading(false);
        return;
      }

      try {
        const resOrder = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: finalAmount }),
        });

        const orderData = await resOrder.json();

        if (!orderData.success) {
          alert(orderData.error || 'Failed to initiate transaction.');
          setCheckoutLoading(false);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TEXyUnrLApsxiE',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Ayurmor Wellness (Saish Technofarms)',
          description: 'Premium Botanical Wellness Purchase',
          image: '/product3.png',
          order_id: orderData.orderId,
          handler: async function (response: any) {
            try {
              const resVerify = await fetch('/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  customer_name: shippingName,
                  customer_email: shippingEmail,
                  customer_phone: shippingPhone,
                  shipping_address: fullFormattedAddress,
                  items: cart.map(item => ({
                    id: item.product.id,
                    product_name: item.product.title,
                    product_price: item.product.price,
                    quantity: item.quantity
                  })),
                  amount: finalAmount
                }),
              });

              const verifyData = await resVerify.json();

              if (verifyData.success) {
                setOrderSuccessDetails({
                  orderNumber: verifyData.orderNumber,
                  trackingNumber: verifyData.trackingNumber,
                  courierPartner: verifyData.courierPartner,
                  amount: finalAmount,
                  paymentMethod: 'Prepaid via Razorpay (UPI/Card)'
                });
                clearCart();
              } else {
                alert(verifyData.error || 'Payment verification failed.');
              }
            } catch (err) {
              console.error(err);
              alert('Failed to verify payment signature.');
            } finally {
              setCheckoutLoading(false);
            }
          },
          prefill: {
            name: shippingName,
            email: shippingEmail,
            contact: shippingPhone,
          },
          theme: {
            color: '#2874F0', // Flipkart & Amazon style active blue
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error('Checkout initialization error:', error);
        alert('An error occurred during checkout.');
        setCheckoutLoading(false);
      }
    }
  };

  // WhatsApp Direct Order URL
  const whatsappOrderUrl = `https://wa.me/917483849998?text=${encodeURIComponent(
    `Hi Ayurmor! I would like to place an order:\n\n*Order Summary:*\n${cart.map(i => `- ${i.product.title} (Qty: ${i.quantity})`).join('\n')}\n\n*Total Payable:* ₹${finalAmount}\n\n*Delivery Address:*\nName: ${shippingName || 'N/A'}\nPhone: ${shippingPhone || 'N/A'}\nAddress: ${shippingAddress}, ${shippingCity} ${shippingState} - ${shippingPincode}`
  )}`;

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex flex-col font-sans text-slate-800 selection:bg-[#2874F0]/20">
      
      {/* Amazon / Flipkart Style Checkout Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-xs font-bold text-[#0F3D2E] hover:text-[#2874F0] bg-slate-100 hover:bg-blue-50 py-1.5 px-3 rounded-xl border border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Store</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/Ayurmor.png" 
                alt="Ayurmor Botanical" 
                className="h-8 md:h-10 w-auto object-contain mix-blend-multiply"
              />
            </Link>
          </div>

          {/* Checkout Steps Progress Bar (Amazon/Flipkart Header) */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-2 text-emerald-700">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px]">✓</span>
              <span>Cart</span>
            </div>
            <div className="w-8 h-[2px] bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2 text-[#2874F0]">
              <span className="w-5 h-5 rounded-full bg-[#2874F0] text-white flex items-center justify-center text-[11px]">2</span>
              <span>Address & Payment</span>
            </div>
            <div className="w-8 h-[2px] bg-slate-200 rounded-full" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[11px]">3</span>
              <span>Order Placed</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>100% Safe Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* ORDER SUCCESS SCREEN (Amazon/Flipkart Tax Invoice Style) */}
        {orderSuccessDetails ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-6"
          >
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2874F0] bg-[#2874F0]/10 px-3 py-1 rounded-full inline-block">
                Order Placed Successfully
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3D2E]">
                Thank You for Shopping on Ayurmor!
              </h1>
              <p className="text-slate-600 text-sm font-light">
                An order confirmation SMS & invoice will be sent to <strong className="text-slate-800 font-semibold">{shippingPhone || shippingEmail}</strong>.
              </p>
            </div>

            {/* Amazon / Flipkart Tax Invoice Summary Card */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Order Reference ID</span>
                <span className="font-mono font-bold text-slate-900">#{orderSuccessDetails.orderNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Shipment Courier Partner</span>
                <span className="font-bold text-[#2874F0] flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  {orderSuccessDetails.courierPartner}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Airway Bill (AWB) Tracking ID</span>
                <span className="font-mono font-bold text-emerald-700">{orderSuccessDetails.trackingNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Payment Method</span>
                <span className="font-bold text-slate-800">{orderSuccessDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-base text-[#0F3D2E]">
                <span>Total Amount Paid</span>
                <span className="text-lg text-[#0F3D2E]">₹{orderSuccessDetails.amount}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2874F0] hover:bg-[#1259c7] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md text-center active:scale-95"
              >
                Back to Shopping
              </Link>
              <a 
                href={`https://wa.me/917483849998?text=Hi%20Ayurmor!%20I%20placed%20Order%20%23${orderSuccessDetails.orderNumber}.%20Can%20you%20help%20me%20track%20my%20shipment%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#1eb956] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Track Package on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        ) : cart.length === 0 ? (
          /* EMPTY CART ILLUSTRATION (Amazon / Flipkart Style) */
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-md text-center space-y-5">
            <div className="w-24 h-24 bg-blue-50 text-[#2874F0] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-800">Your Cart is Currently Empty</h2>
            <p className="text-slate-500 text-sm font-light">
              Explore our range of 100% natural, FSSAI certified botanical health mixes and add them to cart.
            </p>
            <Link 
              href="/#products"
              className="inline-block px-8 py-3.5 bg-[#2874F0] hover:bg-[#1259c7] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* FLIPKART / AMAZON 2-COLUMN CHECKOUT GRID */
          <div className="space-y-4">
            {/* Top Back Navigation Button */}
            <div>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#2874F0] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs hover:border-[#2874F0]/30 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-1 group-hover:text-[#2874F0] transition-transform" />
                <span>← Back to Store / Continue Shopping</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: ACCORDION SECTIONS (7.5 COLS) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* SECTION 1: LOGIN / CUSTOMER HEADER */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-300">
                    1
                  </span>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer</h3>
                    <p className="text-sm font-bold text-slate-800">
                      {shippingName ? `${shippingName} (${shippingPhone || 'Guest Checkout'})` : 'Checkout as Guest'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#2874F0] bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                  Instant Checkout
                </span>
              </div>

              {/* SECTION 2: DELIVERY ADDRESS FORM (Flipkart Style Form) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="bg-[#2874F0] text-white px-5 py-3.5 flex items-center justify-between">
                  <h2 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white text-[#2874F0] font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>Delivery Address</span>
                  </h2>
                  <span className="text-xs font-medium text-blue-100 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Express Shipping
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="Name (e.g. Rahul Sharma)"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2874F0]/10 text-slate-900 font-medium transition-all"
                      />
                    </div>

                    {/* Mobile Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit phone number"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2874F0]/10 text-slate-900 font-medium transition-all"
                      />
                    </div>

                    {/* Postal Pincode */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={shippingPincode}
                        onChange={(e) => setShippingPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="6-digit PIN code"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2874F0]/10 text-slate-900 font-medium transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2874F0]/10 text-slate-900 font-medium transition-all"
                      />
                    </div>

                    {/* Address Line */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Address (House No, Building, Street, Area) *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Flat/House No., Building Name, Street Name, Area / Colony"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2874F0]/10 text-slate-900 font-medium transition-all resize-none"
                      />
                    </div>

                    {/* City & State (Auto-filled or manual) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        City / District
                      </label>
                      <input
                        type="text"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        placeholder="e.g. Bengaluru"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] rounded-xl px-3.5 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={shippingState}
                        onChange={(e) => setShippingState(e.target.value)}
                        placeholder="e.g. Karnataka"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#2874F0] rounded-xl px-3.5 py-2 text-xs text-slate-800"
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* SECTION 3: ORDER ITEMS & DELIVERY PROMISE (Amazon Style) */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2874F0]" />
                    <span>Order Items & Delivery</span>
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1 border border-emerald-100">
                    <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    FREE Express Delivery
                  </span>
                </div>

                {/* Items preview list */}
                <div className="space-y-3">
                  {cart.map((item) => {
                    const imageSrc = item.product.image || 
                      (item.product.svg_type ? PRODUCT_IMAGES[item.product.svg_type] : null) || 
                      '/hero_moringa.png';

                    return (
                      <div key={String(item.product.id)} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-14 h-14 bg-white rounded-lg p-1 border border-slate-200 shrink-0 overflow-hidden">
                          <img 
                            src={imageSrc} 
                            alt={item.product.title} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{item.product.title}</h4>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            {/* Quantity Selector Modifier */}
                            <div className="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs overflow-hidden">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs font-bold active:bg-slate-200"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-extrabold text-[#0F3D2E]">
                                {item.quantity}
                              </span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs font-bold active:bg-slate-200"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-xs text-slate-300">•</span>
                            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                              ₹{Number(item.product.price) * item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors ml-auto flex items-center gap-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                        <div className="text-right shrink-0 hidden md:block">
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            Delivered in 2-4 Days
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: PAYMENT OPTIONS (Amazon Pay / Flipkart Style Tabs) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="bg-[#0F3D2E] text-white px-5 py-3.5 flex items-center justify-between">
                  <h2 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white text-[#0F3D2E] font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <span>Payment Options</span>
                  </h2>
                  <span className="text-xs font-medium text-emerald-200 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    256-Bit SSL Encrypted
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Payment Card 1: Razorpay Online Payment */}
                  <div 
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      paymentMethod === 'razorpay' 
                        ? 'border-[#2874F0] bg-blue-50/50 shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentOption" 
                      checked={paymentMethod === 'razorpay'} 
                      onChange={() => setPaymentMethod('razorpay')} 
                      className="w-5 h-5 text-[#2874F0] accent-[#2874F0] mt-0.5"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                          <span>UPI / Google Pay / PhonePe / Paytm / Cards</span>
                          <span className="text-[10px] font-bold text-white bg-[#2874F0] px-2 py-0.5 rounded uppercase">
                            RECOMMENDED
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-light">
                        Instant payment via UPI Apps, Credit/Debit Cards, NetBanking. Fast priority dispatch.
                      </p>
                    </div>
                  </div>

                  {/* Payment Card 2: Direct WhatsApp Order */}
                  <div 
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      paymentMethod === 'whatsapp' 
                        ? 'border-[#25D366] bg-emerald-50/50 shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentOption" 
                      checked={paymentMethod === 'whatsapp'} 
                      onChange={() => setPaymentMethod('whatsapp')} 
                      className="w-5 h-5 text-[#25D366] accent-[#25D366] mt-0.5"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-[#25D366]" />
                          <span>Direct Order via WhatsApp</span>
                          <span className="text-[10px] font-bold text-white bg-[#25D366] px-2 py-0.5 rounded uppercase">
                            1-CLICK EXPRESS
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-light">
                        Send order & address details straight to Ayurmor WhatsApp support for quick confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* MAIN ACTION BUTTON (Flipkart / Amazon Style Large Action Button) */}
                <div className="p-5 bg-slate-50 border-t border-slate-200">
                  {paymentMethod === 'razorpay' && (
                    <button
                      type="button"
                      onClick={handleCompleteOrder}
                      disabled={checkoutLoading}
                      className="w-full py-4 bg-[#FB641B] hover:bg-[#e05510] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {checkoutLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Initiating Razorpay...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          <span>CONTINUE & PAY ₹{finalAmount}</span>
                        </>
                      )}
                    </button>
                  )}

                  {paymentMethod === 'whatsapp' && (
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] hover:bg-[#1eb956] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] text-center"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>ORDER VIA WHATSAPP (₹{finalAmount})</span>
                    </a>
                  )}
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: FLIPKART / AMAZON STYLE PRICE DETAILS CARD (4.5 COLS) */}
            <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
              
              {/* PRICE DETAILS CARD */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50">
                  <h3 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">
                    PRICE DETAILS ({itemsCount} {itemsCount === 1 ? 'Item' : 'Items'})
                  </h3>
                </div>

                <div className="p-5 space-y-3.5 text-sm">
                  <div className="flex justify-between text-slate-700">
                    <span>Price ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-slate-700">
                    <span>Delivery Charges</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-3 flex justify-between items-center text-base font-extrabold text-slate-900">
                    <span>Total Amount Payable</span>
                    <span className="text-lg text-[#0F3D2E]">₹{finalAmount}</span>
                  </div>
                </div>
              </div>

              {/* SECURITY & GUARANTEE ASSURANCE */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safe and Secure Payments</span>
                </div>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                  100% Authentic Botanical Ingredients. Certified FSSAI quality food products with free express shipping across India.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
      </main>

      <Footer />
    </div>
  );
}
