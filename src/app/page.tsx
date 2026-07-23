'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import Certifications from '@/components/Certifications';
import WhyAyurmor from '@/components/WhyAyurmor';
import ShopSection, { Product } from '@/components/ShopSection';
import FounderStory from '@/components/FounderStory';
import Testimonials from '@/components/Testimonials';
import BlogsSection from '@/components/BlogsSection';
import FAQSection from '@/components/FAQSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import { 
  ShoppingBag, 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

const PRODUCT_IMAGES: Record<string, string> = {
  moringa: '/hero_moringa.png',
  abc: '/hero_abc.png',
  choco: '/hero_choco.png',
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Shipping Form details
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [dbSource, setDbSource] = useState('loading');

  // Load products from API route
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
          setDbSource(data.source);
        }
      } catch (err) {
        console.error('Failed to load products', err);
      }
    }
    loadData();
  }, []);

  // Handle product search filter
  useEffect(() => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Load Razorpay Script dynamically
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

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });

    if (!addedItems.includes(product.id)) {
      setAddedItems(prev => [...prev, product.id]);
      setTimeout(() => {
        setAddedItems(prev => prev.filter(id => id !== product.id));
      }, 2000);
    }
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setShowShippingForm(true);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(itemId => itemId !== id));
    } else {
      setWishlist(prev => [...prev, id]);
    }
  };

  // Checkout whole cart with Razorpay
  const handleCartCheckout = async () => {
    if (cart.length === 0) return;

    setCheckoutLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert('Razorpay payment gateway failed to load. Please check your internet connection.');
      setCheckoutLoading(false);
      return;
    }

    const totalAmount = cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0);

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
              setCart([]);
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
    <div className="bg-[#FBF9F5] text-charcoal font-sans min-h-screen relative selection:bg-sage selection:text-white">
      
      {/* 1. Navbar Navigation */}
      <Navbar 
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 2. Hero Animated Carousel */}
      <HeroCarousel />

      {/* 3. Certifications & Trust Badges Strip */}
      <Certifications />

      {/* 4. Social Proof Impact Counter */}
      <div className="bg-white py-10 px-6 border-b border-[#0F3D2E]/10 shadow-sm">
        <div className="max-width-1200 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest">10,000+</h3>
            <p className="text-xs text-sage-grey font-medium mt-1">Happy Customers Nationwide</p>
          </div>
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest">4.9 ★</h3>
            <p className="text-xs text-sage-grey font-medium mt-1">Average Verified Rating</p>
          </div>
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest">100%</h3>
            <p className="text-xs text-sage-grey font-medium mt-1">Pure & Chemical-Free</p>
          </div>
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest">98%</h3>
            <p className="text-xs text-sage-grey font-medium mt-1">Repeat Orders Rate</p>
          </div>
        </div>
      </div>

      {/* 5. Why Ayurmor Comparison Section */}
      <WhyAyurmor />

      {/* 6. Shop Products Section */}
      <ShopSection 
        products={products}
        filteredProducts={filteredProducts}
        wishlist={wishlist}
        addedItems={addedItems}
        dbSource={dbSource}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={toggleWishlist}
      />

      {/* 7. Founder's Story Section */}
      <FounderStory />

      {/* 8. Customer Reviews & Testimonials */}
      <Testimonials />

      {/* 9. Health Guides & Blogs */}
      <BlogsSection />

      {/* 10. FAQ Accordion Section */}
      <FAQSection />

      {/* 11. Newsletter & Coupon Banner */}
      <NewsletterSection />

      {/* 12. Corporate Certified Footer */}
      <Footer />

      {/* 13. Gemini AI Assistant Chatbot */}
      <AIChatbot />
      
      {/* 14. Floating WhatsApp Quick Contact Button */}
      <WhatsAppButton />

      {/* Cart Drawer Component */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex sm:pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full sm:max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col h-full border-l border-[#0F3D2E]/10"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#0F3D2E]/10 flex items-center justify-between bg-white">
                  <h2 className="font-serif text-2xl font-bold text-[#0F3D2E] flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-sage" />
                    <span>Your Cart</span>
                  </h2>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="p-1.5 rounded-full hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart list / Shipping Form */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 bg-forest/5 text-sage rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-forest">Your Cart is Empty</h3>
                      <p className="text-sage-grey text-sm max-w-xs font-light">
                        Add some of our premium pure botanical health blends to begin your wellness journey.
                      </p>
                      <button 
                        onClick={() => setCartOpen(false)}
                        className="px-6 py-2.5 bg-[#0F3D2E] text-white text-xs font-bold uppercase rounded-full tracking-wider hover:bg-terracotta hover:text-[#0F3D2E] transition-all shadow"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : showShippingForm ? (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-bold text-[#0F3D2E] border-b border-[#0F3D2E]/10 pb-2">Shipping Information</h3>
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-sage-grey mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={shippingName}
                            onChange={(e) => setShippingName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white border border-[#0F3D2E]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0F3D2E] text-charcoal"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-sage-grey mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            value={shippingEmail}
                            onChange={(e) => setShippingEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full bg-white border border-[#0F3D2E]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0F3D2E] text-charcoal"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-sage-grey mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={shippingPhone}
                            onChange={(e) => setShippingPhone(e.target.value)}
                            placeholder="9876543210"
                            className="w-full bg-white border border-[#0F3D2E]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0F3D2E] text-charcoal"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-sage-grey mb-1">Delivery Address</label>
                          <textarea
                            required
                            rows={3}
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Street address, apartment, suite, etc."
                            className="w-full bg-white border border-[#0F3D2E]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0F3D2E] text-charcoal resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-sage-grey mb-1">Pincode</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={shippingPincode}
                            onChange={(e) => setShippingPincode(e.target.value)}
                            placeholder="400001"
                            className="w-full bg-white border border-[#0F3D2E]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0F3D2E] text-charcoal"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-[#0F3D2E]/10 shadow-sm relative">
                        <div className="w-20 h-24 bg-cream/40 rounded-xl flex items-center justify-center p-2 border border-forest/5 relative overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image || PRODUCT_IMAGES[item.product.svg_type] || '/hero_moringa.png'} 
                            alt={item.product.title} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="pr-6">
                            <span className="text-[10px] text-sage font-bold uppercase tracking-wider">{item.product.category}</span>
                            <h4 className="font-serif text-sm font-bold text-forest leading-tight mt-0.5">{item.product.title}</h4>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-forest/10 rounded-full bg-cream/60 overflow-hidden">
                              <button 
                                onClick={() => handleUpdateQuantity(item.product.id, -1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors text-xs font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-forest">{item.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.product.id, 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors text-xs font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-serif font-bold text-forest text-sm">Rs. {Number(item.product.price) * item.quantity}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="absolute top-3 right-3 p-1.5 text-sage-grey hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Checkout Summary */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-[#0F3D2E]/10 bg-white space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-sage-grey">
                        <span>Subtotal</span>
                        <span>Rs. {cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-sage-grey">
                        <span>Shipping & Handling</span>
                        <span className="text-emerald-600 font-bold uppercase">FREE</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-forest pt-2 border-t border-forest/5">
                        <span>Total Amount</span>
                        <span className="font-serif text-base text-[#0F3D2E]">
                          Rs. {cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0)}
                        </span>
                      </div>
                    </div>

                    {showShippingForm ? (
                      <div className="space-y-2">
                        <button 
                          onClick={handleCartCheckout}
                          disabled={checkoutLoading || !shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingPincode}
                          className="w-full py-3.5 bg-[#0F3D2E] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-lg hover:bg-terracotta hover:text-[#0F3D2E] disabled:bg-sage disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {checkoutLoading ? 'Processing Payment...' : 'Pay via Razorpay'}
                        </button>

                        <a
                          href={`https://wa.me/917483849998?text=${encodeURIComponent(
                            `Hi Ayurmor! I would like to order:\n${cart.map(i => `- ${i.product.title} (x${i.quantity})`).join('\n')}\nTotal: Rs. ${cart.reduce((t, i) => t + (Number(i.product.price) * i.quantity), 0)}\n\nDelivery Details:\nName: ${shippingName}\nPhone: ${shippingPhone}\nAddress: ${shippingAddress}, ${shippingPincode}`
                          )}`}
                          target="_blank"
                          rel="noopener"
                          className="w-full py-3 bg-[#25D366] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow hover:bg-[#1eb956] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Order Direct via WhatsApp</span>
                        </a>

                        <button 
                          onClick={() => setShowShippingForm(false)}
                          className="w-full text-center text-xs font-bold uppercase tracking-wider text-forest/70 hover:text-forest transition-colors mt-1"
                        >
                          Back to Cart
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowShippingForm(true)}
                        className="w-full py-3.5 bg-[#0F3D2E] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-lg hover:bg-terracotta hover:text-[#0F3D2E] transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
