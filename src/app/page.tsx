'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import DeliverySupportStrip from '@/components/DeliverySupportStrip';
import Certifications from '@/components/Certifications';
import HowItWorks from '@/components/HowItWorks';
import WhyAyurmor from '@/components/WhyAyurmor';
import ShopSection, { Product } from '@/components/ShopSection';
import IngredientTransparency from '@/components/IngredientTransparency';
import ShopByNeed from '@/components/ShopByNeed';
import FounderStory from '@/components/FounderStory';
import Testimonials from '@/components/Testimonials';
import B2BEnquirySection from '@/components/B2BEnquirySection';
import BlogsSection from '@/components/BlogsSection';
import FAQSection from '@/components/FAQSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cart, cartCount, addToCart, buyNow, openCart, addedItems } = useCart();

  const [wishlist, setWishlist] = useState<number[]>([]);
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

  // Add item to cart using global CartContext
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Instant Buy Now using global CartContext
  const handleBuyNow = (product: Product) => {
    buyNow(product);
  };

  // Toggle wishlist state
  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-[#0F3D2E] selection:bg-terracotta selection:text-white">
      
      {/* 1. Header & Navigation Bar */}
      <Navbar 
        cartCount={cartCount} 
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={openCart}
      />

      {/* 2. Hero Section - Dynamic Banner Carousel */}
      <HeroCarousel />

      {/* 3. Delivery & Support Trust Strip */}
      <DeliverySupportStrip />

      {/* 4. FSSAI & Quality Certification Trust Badges */}
      <Certifications />

      {/* 5. Ayurmor Value Pillars */}
      <div className="bg-white/80 border-y border-forest/5 py-8 my-4">
        <div className="max-width-1200 mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">Quality Checked</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Transparent Product Labels</p>
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">Community</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Wellness-Focused Customers</p>
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">FSSAI Reg.</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Reg. No. 21224169000054</p>
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">Everyday</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Built for Repeat Everyday Use</p>
          </div>
        </div>
      </div>

      {/* 6. How It Works (60-Second Preparation Guide) */}
      <HowItWorks />

      {/* 7. Why Ayurmor Comparison Section */}
      <WhyAyurmor />

      {/* 8. Shop Products Section */}
      <ShopSection 
        products={products}
        filteredProducts={filteredProducts}
        wishlist={wishlist}
        addedItems={addedItems as any}
        dbSource={dbSource}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={toggleWishlist}
      />

      {/* 9. 100% Ingredient Transparency Showcase */}
      <IngredientTransparency />

      {/* 10. Shop by Need & Routine Packs Section */}
      <ShopByNeed />

      {/* 12. Founder's Story Section */}
      <FounderStory />

      {/* 13. Customer Reviews & Testimonials */}
      <Testimonials />

      {/* 14. Health Guides & Blogs */}
      <BlogsSection />

      {/* 15. B2B / Retailer & Corporate Wellness Enquiry */}
      <B2BEnquirySection />

      {/* 16. FAQ Accordion Section */}
      <FAQSection />

      {/* 17. Newsletter & Coupon Banner */}
      <NewsletterSection />

      {/* 18. Corporate Certified Footer */}
      <Footer />

      {/* 19. Gemini AI Assistant Chatbot */}
      <AIChatbot />
      
      {/* 20. Floating WhatsApp Quick Contact Button */}
      <WhatsAppButton />
    </div>
  );
}
