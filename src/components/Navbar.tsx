'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
          ? 'bg-[#F4F8FC]/95 backdrop-blur-md shadow-premium-sm border-b border-[#0080FF]/15' 
          : 'bg-[#F4F8FC] border-b border-[#0080FF]/10'
      }`}
    >
      {/* Top Announcement Bar - Logo Sky Blue & Navy */}
      <div className="bg-[#0A192F] text-sky-300 text-[11px] font-bold py-2 px-4 text-center border-b border-[#0080FF]/20 flex items-center justify-center gap-2 flex-wrap">
        <span>🔥 Launch Offer: FREE Express Shipping & Cash on Delivery Across India!</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded border border-sky-400/20">FSSAI Reg: 21224169000054</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-[#76BC21]">ISO 9001:2015 Certified</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3.5">
        <div className="max-width-1200 mx-auto px-6 flex items-center justify-between">
          
          {/* Real Ayurmor Logo */}
          <Link href="/" className="flex items-center gap-2 group py-0.5">
            <img 
              src="/Ayurmor.png" 
              alt="Ayurmor - Natural Goodness, Instant Wellness" 
              className="h-10 md:h-12 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-semibold text-[#0F172A]">
              <li>
                <Link href="/" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#values" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  Our Science
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#blogs" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  Health Guides
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#0080FF] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#0080FF] hover:after:w-full after:transition-all">
                  FAQs
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Search Input */}
            <div className="relative items-center hidden sm:flex">
              <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-[#0080FF]/20 rounded-full bg-white text-xs focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] w-36 sm:w-48 transition-all duration-300 shadow-sm text-slate-900"
              />
            </div>

            {/* Wishlist Icon */}
            <a 
              href="#products" 
              className="relative p-2 text-[#0A192F] hover:text-[#0080FF] hover:scale-105 transition-transform" 
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#76BC21] text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart Icon Drawer Trigger */}
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#0080FF] text-white rounded-full hover:bg-[#0066CC] transition-all duration-300 shadow-md group flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#76BC21] text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow border-2 border-white"
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
              <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link href="/#values" onClick={() => setMobileMenuOpen(false)}>Our Science</Link></li>
              <li><Link href="/#products" onClick={() => setMobileMenuOpen(false)}>Shop All Products</Link></li>
              <li><Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About & Founder Story</Link></li>
              <li><Link href="/#testimonials" onClick={() => setMobileMenuOpen(false)}>Customer Reviews</Link></li>
              <li><Link href="/#blogs" onClick={() => setMobileMenuOpen(false)}>Health Guides</Link></li>
              <li><Link href="/#faq" onClick={() => setMobileMenuOpen(false)}>FAQs</Link></li>
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
