'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  MessageCircle,
  Leaf
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCart: () => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  onOpenCart
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-premium-sm border-b border-[#0F3D2E]/10' 
          : 'bg-[#FBF9F5] border-b border-[#0F3D2E]/10'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#0F3D2E] text-amber-300 text-[11px] font-bold py-2 px-4 text-center border-b border-amber-400/20 flex items-center justify-center gap-2 flex-wrap">
        <span>🔥 Launch Offer: FREE Express Shipping & Cash on Delivery Across India!</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">FSSAI Reg: 21224169000054</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-emerald-200">ISO 9001:2015 Certified</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3.5">
        <div className="max-width-1200 mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 font-serif text-2xl font-bold text-[#0F3D2E] group">
            <div className="w-9 h-9 rounded-xl bg-[#0F3D2E] text-amber-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="tracking-wide">Ayurmor</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-medium text-charcoal">
              <li>
                <a href="#home" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  Home
                </a>
              </li>
              <li>
                <a href="#values" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  Our Science
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  Health Guides
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sage transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">
                  FAQs
                </a>
              </li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Search Input */}
            <div className="relative items-center hidden sm:flex">
              <Search className="absolute left-3 w-4 h-4 text-sage-grey pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-[#0F3D2E]/15 rounded-full bg-[#0F3D2E]/5 text-xs focus:outline-none focus:border-[#0F3D2E] focus:bg-white w-36 sm:w-48 transition-all duration-300"
              />
            </div>

            {/* Wishlist Icon */}
            <a 
              href="#products" 
              className="relative p-2 text-[#0F3D2E] hover:scale-105 transition-transform" 
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <button 
              className="relative p-2 text-[#0F3D2E] hover:scale-105 transition-transform" 
              aria-label="View Cart"
              onClick={onOpenCart}
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#E7977D] text-[#0F3D2E] font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>


            {/* Mobile Hamburger Toggle */}
            <button 
              className="p-2 text-[#0F3D2E] lg:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[75px] left-0 w-full bg-[#FBF9F5] shadow-premium-lg border-b border-[#0F3D2E]/10 p-6 z-30 lg:hidden flex flex-col gap-4"
          >
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 w-4 h-4 text-sage-grey" />
              <input 
                type="text" 
                placeholder="Search mixes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#0F3D2E]/15 rounded-full bg-[#0F3D2E]/5 text-sm"
              />
            </div>
            <ul className="flex flex-col gap-3 font-semibold text-base text-[#0F3D2E]">
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#values" onClick={() => setMobileMenuOpen(false)}>Our Science</a></li>
              <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>Shop All Products</a></li>
              <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About & Founder Story</a></li>
              <li><a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Customer Reviews</a></li>
              <li><a href="#blogs" onClick={() => setMobileMenuOpen(false)}>Health Guides</a></li>
              <li><a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQs</a></li>
            </ul>

            <div className="pt-2 border-t border-[#0F3D2E]/10">
              <a 
                href="https://wa.me/917483849998" 
                target="_blank" 
                rel="noopener"
                className="w-full py-2.5 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow"
              >
                <svg
                  className="w-4 h-4 fill-current flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Order via WhatsApp (+91 7483 849 998)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
