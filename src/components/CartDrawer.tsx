'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  X, 
  ArrowLeft, 
  ArrowRight,
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const PRODUCT_IMAGES: Record<string, string> = {
  moringa: '/hero_moringa.png',
  abc: '/hero_abc.png',
  choco: '/hero_choco.png',
  mushroom: '/Mushroom3.jpeg'
};

export default function CartDrawer() {
  const router = useRouter();
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    showShippingForm, 
    setShowShippingForm, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  const handleGoToCheckout = () => {
    setCartOpen(false);
    setShowShippingForm(false);
    router.push('/checkout');
  };

  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const totalAmount = cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0);

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

  const handleCartCheckout = async () => {
    if (cart.length === 0) return;

    if (!shippingName || !shippingPhone || !shippingEmail || !shippingAddress || !shippingPincode) {
      alert('Please fill in all shipping details before proceeding.');
      return;
    }

    setCheckoutLoading(true);

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
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await resOrder.json();

      if (!orderData.success) {
        alert(orderData.error || 'Failed to initiate transaction. Please check server configuration.');
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
                shipping_address: `${shippingAddress}, Pincode: ${shippingPincode}`,
                items: cart.map(item => ({
                  id: item.product.id,
                  product_name: item.product.title,
                  product_price: item.product.price,
                  quantity: item.quantity
                })),
                amount: totalAmount
              }),
            });

            const verifyData = await resVerify.json();

            if (verifyData.success) {
              alert(`Payment successful! 🎉 Order #${verifyData.orderNumber} placed. Assigned Courier: ${verifyData.courierPartner}. Tracking ID: ${verifyData.trackingNumber}`);
              clearCart();
              setShowShippingForm(false);
              setCartOpen(false);
            } else {
              alert(verifyData.error || 'Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            alert('Failed to verify payment signature.');
          }
        },
        prefill: {
          name: shippingName,
          email: shippingEmail,
          contact: shippingPhone,
        },
        theme: {
          color: '#0F3D2E',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Checkout initialization error:', error);
      alert('An error occurred during checkout initialization.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-auto flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full sm:w-[440px] sm:max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col h-full border-l border-[#0F3D2E]/10"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#0F3D2E]/10 bg-white flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  {showShippingForm ? (
                    <button
                      onClick={() => setShowShippingForm(false)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0F3D2E] hover:text-[#0080FF] transition-colors py-1 px-2.5 rounded-lg bg-[#0F3D2E]/5 hover:bg-[#0080FF]/10"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Cart</span>
                    </button>
                  ) : (
                    <h2 className="font-serif text-xl font-bold text-[#0F3D2E] flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#0080FF]" />
                      <span>Your Cart</span>
                      {cart.length > 0 && (
                        <span className="text-xs font-semibold px-2 py-0.5 bg-[#0080FF]/10 text-[#0080FF] rounded-full">
                          {cart.reduce((t, i) => t + i.quantity, 0)} {cart.reduce((t, i) => t + i.quantity, 0) === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </h2>
                  )}

                  <button 
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors ml-auto"
                    aria-label="Close cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Step Progress Bar */}
                {cart.length > 0 && (
                  <div className="flex items-center justify-center gap-2 pt-1 border-t border-[#0F3D2E]/5">
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${!showShippingForm ? 'text-[#0F3D2E]' : 'text-slate-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${!showShippingForm ? 'bg-[#0F3D2E] text-white' : 'bg-[#0F3D2E]/10 text-[#0F3D2E]'}`}>1</span>
                      <span>Cart</span>
                    </div>
                    <div className="w-8 h-[2px] bg-[#0F3D2E]/15 rounded-full" />
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${showShippingForm ? 'text-[#0F3D2E]' : 'text-slate-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${showShippingForm ? 'bg-[#0F3D2E] text-white' : 'bg-[#0F3D2E]/10 text-[#0F3D2E]'}`}>2</span>
                      <span>Shipping</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart List or Shipping Form */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 px-4">
                    <div className="w-20 h-20 bg-[#0080FF]/10 text-[#0080FF] rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">Your Cart is Empty</h3>
                    <p className="text-slate-500 text-sm max-w-xs font-light">
                      Add some of our premium pure botanical health blends to begin your wellness journey.
                    </p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-3 bg-[#0F3D2E] text-white text-xs font-bold uppercase rounded-full tracking-wider hover:bg-[#0080FF] transition-all shadow-md active:scale-95"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : showShippingForm ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#0F3D2E]/10 pb-2">
                      <h3 className="font-serif text-base font-bold text-[#0F3D2E]">Shipping Information</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Secure
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#0F3D2E] mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingName}
                          onChange={(e) => setShippingName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-white border border-[#0F3D2E]/20 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 text-slate-900 shadow-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#0F3D2E] mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={shippingPhone}
                            onChange={(e) => setShippingPhone(e.target.value)}
                            placeholder="10-digit mobile"
                            className="w-full bg-white border border-[#0F3D2E]/20 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 text-slate-900 shadow-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#0F3D2E] mb-1">Pincode *</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={shippingPincode}
                            onChange={(e) => setShippingPincode(e.target.value)}
                            placeholder="6-digit pincode"
                            className="w-full bg-white border border-[#0F3D2E]/20 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 text-slate-900 shadow-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0F3D2E] mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={shippingEmail}
                          onChange={(e) => setShippingEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-white border border-[#0F3D2E]/20 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 text-slate-900 shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0F3D2E] mb-1">Delivery Address *</label>
                        <textarea
                          required
                          rows={3}
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Flat/House No., Building, Street, Area, City, State"
                          className="w-full bg-white border border-[#0F3D2E]/20 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 text-slate-900 resize-none shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => {
                    const imageSrc = item.product.image || 
                      (item.product.svg_type ? PRODUCT_IMAGES[item.product.svg_type] : null) || 
                      '/hero_moringa.png';

                    return (
                      <div key={String(item.product.id)} className="flex gap-3.5 p-3.5 bg-white rounded-2xl border border-[#0F3D2E]/10 shadow-xs relative">
                        <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-100 relative overflow-hidden flex-shrink-0">
                          <img 
                            src={imageSrc} 
                            alt={item.product.title} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="pr-6">
                            {item.product.category && (
                              <span className="text-[10px] text-[#0080FF] font-bold uppercase tracking-wider">{item.product.category}</span>
                            )}
                            <h4 className="font-serif text-sm font-bold text-[#0F3D2E] leading-tight mt-0.5 line-clamp-2">{item.product.title}</h4>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors active:bg-slate-300 text-xs font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-[#0F3D2E]">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors active:bg-slate-300 text-xs font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-serif font-bold text-[#0F3D2E] text-sm">Rs. {Number(item.product.price) * item.quantity}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="absolute top-2.5 right-2.5 p-1.5 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[#0F3D2E]/10 bg-white space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Subtotal</span>
                      <span>Rs. {totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Shipping & Handling</span>
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#0F3D2E] pt-1.5 border-t border-slate-100">
                      <span>Total Amount</span>
                      <span className="font-serif text-base text-[#0F3D2E]">Rs. {totalAmount}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoToCheckout}
                    className="w-full py-4 bg-[#2874F0] hover:bg-[#1259c7] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Secure Payment</span>
                    </span>
                    <span>•</span>
                    <span>Free Nationwide Delivery</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
