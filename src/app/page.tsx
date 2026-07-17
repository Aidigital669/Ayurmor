'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Plus, 
  Check, 
  ArrowRight, 
  Smile, 
  Leaf, 
  Activity,
  Flame,
  ArrowUpRight,
  MessageCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string | number;
  rating_count: number;
  tag: string | null;
  svg_type: string;
  image?: string;
}

const PRODUCT_IMAGES: Record<string, string> = {
  moringa: '/product1.png',
  abc: '/product3.png',
  choco: '/product2.png',
};

const heroSlides = [
  {
    id: 1,
    category: "Daily Cellular Energy",
    title: "Nourish from Within",
    subtitle: "ABC Malt Powder",
    tagline: "Our signature ABC Malt Powder merges the biological goodness of fresh apples, organic beetroots, and crisp carrots. Fortified with premium almonds and raw cashews for sustained vigor.",
    badge: "Rich in Iron",
    bgColor: "from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]",
    image: "/product3.png",
    imageScale: "scale-100",
    elements: ["strawberry", "ice1", "ice2"]
  },
  {
    id: 2,
    category: "Detoxification & Immunity",
    title: "Pure Green Vitality",
    subtitle: "Moringa Premix Soup",
    tagline: "Cold-process milled moringa leaves blended into an instant herbal soup. Restore metabolic equilibrium, flush out toxins, and activate clean cellular energy in 10 seconds.",
    badge: "100% Wild-Crafted",
    bgColor: "from-[#EEF5F1] via-[#D0E2D7] to-[#88B29C]",
    image: "/product1.png",
    imageScale: "scale-100",
    elements: ["leaf1", "leaf2", "ice1"]
  },
  {
    id: 3,
    category: "Family Active Nutrition",
    title: "Rich Cocoa Strength",
    subtitle: "Choco Multigrain Millet Malt",
    tagline: "A luxurious blend of premium dark cocoa and sprouted ancient millets. Sweetened naturally, packed with essential minerals, and designed for active minds of all ages.",
    badge: "Zero Refined Sugar",
    bgColor: "from-[#FDFBF7] via-[#EADBCE] to-[#AC8C7D]",
    image: "/product2.png",
    imageScale: "scale-100",
    elements: ["almond", "cocoa", "ice2"]
  }
];

const renderFloatingElement = (type: string, key: string | number) => {
  switch (type) {
    case "strawberry":
      return (
        <div key={key} className="absolute top-[15%] right-[10%] w-24 h-24 z-10 animate-float-slow select-none pointer-events-none md:w-32 md:h-32">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
            <path d="M50 15 C65 15, 85 25, 82 50 C80 72, 65 92, 50 97 C35 92, 20 72, 18 50 C15 25, 35 15, 50 15 Z" fill="url(#strawGrad)"/>
            <path d="M50 17 C48 8, 35 12, 30 15 C38 20, 45 20, 50 17 Z" fill="#4CAF50"/>
            <path d="M50 17 C52 8, 65 12, 70 15 C62 20, 55 20, 50 17 Z" fill="#4CAF50"/>
            <path d="M50 17 C50 7, 56 5, 61 5 C57 13, 53 16, 50 17 Z" fill="#388E3C"/>
            <path d="M50 17 C50 7, 44 5, 39 5 C43 13, 47 16, 50 17 Z" fill="#388E3C"/>
            <circle cx="35" cy="40" r="1.5" fill="#FFE57F"/>
            <circle cx="45" cy="35" r="1.5" fill="#FFE57F"/>
            <circle cx="55" cy="35" r="1.5" fill="#FFE57F"/>
            <circle cx="65" cy="40" r="1.5" fill="#FFE57F"/>
            <circle cx="30" cy="55" r="1.5" fill="#FFE57F"/>
            <circle cx="40" cy="50" r="1.5" fill="#FFE57F"/>
            <circle cx="50" cy="48" r="1.5" fill="#FFE57F"/>
            <circle cx="60" cy="50" r="1.5" fill="#FFE57F"/>
            <circle cx="70" cy="55" r="1.5" fill="#FFE57F"/>
            <circle cx="35" cy="70" r="1.5" fill="#FFE57F"/>
            <circle cx="45" cy="65" r="1.5" fill="#FFE57F"/>
            <circle cx="55" cy="65" r="1.5" fill="#FFE57F"/>
            <circle cx="65" cy="70" r="1.5" fill="#FFE57F"/>
            <circle cx="42" cy="80" r="1.5" fill="#FFE57F"/>
            <circle cx="50" cy="78" r="1.5" fill="#FFE57F"/>
            <circle cx="58" cy="80" r="1.5" fill="#FFE57F"/>
            <defs>
              <radialGradient id="strawGrad" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FF5252"/>
                <stop offset="70%" stopColor="#E53935"/>
                <stop offset="100%" stopColor="#B71C1C"/>
              </radialGradient>
            </defs>
          </svg>
        </div>
      );
    case "ice1":
      return (
        <div key={key} className="absolute top-[28%] right-[32%] w-16 h-16 z-10 animate-float-medium select-none pointer-events-none md:w-20 md:h-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-md">
            <path d="M50 15 L80 30 L80 65 L50 80 L20 65 L20 30 Z" fill="url(#iceGrad1)" opacity="0.85"/>
            <path d="M50 15 L80 30 L50 45 L20 30 Z" fill="#FFFFFF" opacity="0.4"/>
            <path d="M20 30 L50 45 L50 80 L20 65 Z" fill="#EBF3F9" opacity="0.5"/>
            <path d="M50 45 L80 30 L80 65 L50 80 Z" fill="#D3E5F3" opacity="0.6"/>
            <path d="M50 15 L80 30 L80 65 L50 80 L20 65 L20 30 Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
            <path d="M50 45 L80 30 M50 45 L50 80 M50 45 L20 30" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" opacity="0.6"/>
            <defs>
              <linearGradient id="iceGrad1" x1="50" y1="15" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF"/>
                <stop offset="100%" stopColor="#B3E5FC"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "ice2":
      return (
        <div key={key} className="absolute bottom-[20%] right-[3%] w-20 h-20 z-10 animate-float-fast select-none pointer-events-none md:w-24 md:h-24">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
            <path d="M50 15 L80 30 L80 65 L50 80 L20 65 L20 30 Z" fill="url(#iceGrad2)" opacity="0.8"/>
            <path d="M50 15 L80 30 L50 45 L20 30 Z" fill="#FFFFFF" opacity="0.4"/>
            <path d="M20 30 L50 45 L50 80 L20 65 Z" fill="#EBF3F9" opacity="0.5"/>
            <path d="M50 45 L80 30 L80 65 L50 80 Z" fill="#D3E5F3" opacity="0.6"/>
            <path d="M50 15 L80 30 L80 65 L50 80 L20 65 L20 30 Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
            <defs>
              <linearGradient id="iceGrad2" x1="50" y1="15" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF"/>
                <stop offset="100%" stopColor="#81D4FA"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "leaf1":
      return (
        <div key={key} className="absolute top-[15%] right-[8%] w-16 h-16 z-10 animate-float-slow select-none pointer-events-none md:w-20 md:h-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-md">
            <path d="M50 90 C30 70 20 50 30 30 C40 10 50 10 50 10 C50 10 60 10 70 30 C80 50 70 70 50 90 Z" fill="url(#leafGrad1)"/>
            <path d="M50 90 V10" stroke="#81C784" strokeWidth="1.5" opacity="0.7"/>
            <defs>
              <linearGradient id="leafGrad1" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2E7D32"/>
                <stop offset="100%" stopColor="#81C784"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "leaf2":
      return (
        <div key={key} className="absolute bottom-[25%] right-[28%] w-12 h-12 z-10 animate-float-medium select-none pointer-events-none md:w-16 md:h-16">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-sm">
            <path d="M50 90 C35 75 28 55 35 38 C42 20 50 15 50 15 C50 15 58 20 65 38 C72 55 65 75 50 90 Z" fill="url(#leafGrad2)"/>
            <defs>
              <linearGradient id="leafGrad2" x1="50" y1="90" x2="50" y2="15" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1B5E20"/>
                <stop offset="100%" stopColor="#4CAF50"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "almond":
      return (
        <div key={key} className="absolute bottom-[22%] right-[26%] w-12 h-12 z-10 animate-float-fast select-none pointer-events-none md:w-16 md:h-16">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-md">
            <path d="M50 15 C65 30 75 50 70 70 C65 85 50 88 50 88 C50 88 35 85 30 70 C25 50 35 30 50 15 Z" fill="url(#almondGrad)"/>
            <defs>
              <linearGradient id="almondGrad" x1="50" y1="15" x2="50" y2="88" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D7CCC8"/>
                <stop offset="50%" stopColor="#8D6E63"/>
                <stop offset="100%" stopColor="#4E342E"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "cocoa":
      return (
        <div key={key} className="absolute top-[16%] right-[8%] w-14 h-14 z-10 animate-float-slow select-none pointer-events-none md:w-18 md:h-18">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
            <path d="M30 40 C30 25, 45 15, 60 20 C75 25, 80 40, 75 55 C70 70, 50 85, 40 85 C30 85, 30 55, 30 40 Z" fill="url(#cocoaGrad)"/>
            <path d="M30 40 Q45 42 60 30" stroke="#3E2723" strokeWidth="1.5" opacity="0.4"/>
            <defs>
              <linearGradient id="cocoaGrad" x1="30" y1="40" x2="75" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8D6E63"/>
                <stop offset="100%" stopColor="#3E2723"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dbSource, setDbSource] = useState('loading');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Fetch products from database API route
  useEffect(() => {
    async function loadProducts() {
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
    loadProducts();
  }, []);

  // Monitor scroll for sticky header animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle product search filter
  useEffect(() => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Autoplay testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (id: number) => {
    setCartCount(prev => prev + 1);
    setAddedItems(prev => [...prev, id]);
    
    // Reset added checkmark feedback after 1.5s
    setTimeout(() => {
      setAddedItems(prev => prev.filter(itemId => itemId !== id));
    }, 1500);
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(itemId => itemId !== id));
    } else {
      setWishlist(prev => [...prev, id]);
    }
  };


  const testimonials = [
    {
      quote: "I absolutely love the Moringa Soup! It is so refreshing, warming, and healthy. It takes only a minute to prepare and keeps me energized throughout the day. Perfect for my evening snack routine!",
      name: "Priya S.",
      title: "Verified Buyer"
    },
    {
      quote: "I've been drinking the Multigrain Choco Malt daily, and it's delicious! The rich chocolate flavor makes it tasty while the millets keep it highly nutritious. Even my kids love it!",
      name: "Rahul K.",
      title: "Fitness Enthusiast"
    },
    {
      quote: "The ABC Malt Powder is my favorite. The mix of apple, beetroot, carrot with raw almonds and cashews tastes amazing. Plus, no need to boil — it's super convenient for my busy mornings!",
      name: "Aisha M.",
      title: "Working Professional"
    }
  ];

  return (
    <div className="bg-[#FBF9F5] text-charcoal font-sans min-h-screen relative selection:bg-sage selection:text-white">
      
      {/* ==========================================
           Frosted Glass Navigation Header
           ========================================== */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-cream/80 backdrop-blur-md py-3 shadow-premium-sm border-b border-forest/5' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-width-1200 mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-serif text-2xl font-bold text-forest">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#F3EFE9" stroke="#0F3D2E" strokeWidth="2"/>
              <path d="M50 20C50 20 65 35 65 55C65 75 50 80 50 80C50 80 35 75 35 55C35 35 50 20 50 20Z" fill="#5A8B73" opacity="0.8"/>
              <path d="M50 25C50 25 60 38 60 52C60 66 50 72 50 72C50 72 40 66 40 52C40 38 50 25 50 25Z" fill="#0F3D2E"/>
            </svg>
            <span className="tracking-wide">Ayurmor</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li><a href="#home" className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Home</a></li>
              <li><a href="#values" className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Our Science</a></li>
              <li><a href="#products" className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Shop</a></li>
              <li><a href="#testimonials" className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Reviews</a></li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative items-center hidden sm:flex">
              <Search className="absolute left-3 w-4 h-4 text-sage-grey pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search wellness mixes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-forest/10 rounded-full bg-forest/5 text-sm focus:outline-none focus:border-sage focus:bg-white w-44 focus:w-60 transition-all duration-500"
              />
            </div>

            <button className="relative p-2 text-forest hover:scale-105 transition-transform" aria-label="View Cart">
              <ShoppingBag className="w-6 h-6" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-terracotta text-white font-bold text-[10px] w-[18px] id-cart-badge h-[18px] rounded-full flex items-center justify-center shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button className="hidden md:block px-5 py-2 text-sm font-semibold border border-forest rounded-full hover:bg-forest/5 transition-all text-forest">Login</button>
            <button className="hidden md:block px-5 py-2 text-sm font-semibold bg-forest text-white rounded-full hover:bg-sage hover:scale-[1.02] shadow-premium-sm transition-all">Sign Up</button>
            
            {/* Mobile Hamburger toggle */}
            <button 
              className="p-2 text-forest md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-0 w-full bg-cream shadow-premium-lg border-b border-forest/10 p-6 z-40 md:hidden flex flex-col gap-4"
          >
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 w-4 h-4 text-sage-grey" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-forest/10 rounded-full bg-forest/5 text-sm"
              />
            </div>
            <ul className="flex flex-col gap-3 font-semibold text-lg">
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#values" onClick={() => setMobileMenuOpen(false)}>Our Science</a></li>
              <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>Shop</a></li>
              <li><a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a></li>
            </ul>
            <div className="flex gap-2 pt-2 border-t border-forest/5">
              <button className="flex-1 py-2 text-center border border-forest rounded-full">Login</button>
              <button className="flex-1 py-2 text-center bg-forest text-white rounded-full">Sign Up</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
           Hero Carousel Section (Framer Motion)
           ========================================== */}
      <section className="relative min-h-screen w-full overflow-hidden" id="home">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, idx) => (
            idx === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center pt-28 pb-16 px-6 overflow-hidden`}
              >
                {/* Background water splash animation */}
                <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-0 w-[55%] h-full pointer-events-none select-none opacity-45 mix-blend-overlay">
                  <path d="M0 600 C150 550, 300 580, 450 500 C600 420, 650 300, 800 350 L800 600 L0 600 Z" fill="#FFFFFF"/>
                  <circle cx="350" cy="480" r="8" fill="#FFFFFF"/>
                  <circle cx="580" cy="380" r="5" fill="#FFFFFF"/>
                  <circle cx="620" cy="410" r="10" fill="#FFFFFF"/>
                  <circle cx="720" cy="280" r="6" fill="#FFFFFF"/>
                  <path d="M400 550 Q450 530 480 500" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M600 440 Q630 400 660 410" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>

                {/* Floating assets for this slide */}
                {slide.elements.map((el, i) => renderFloatingElement(el, i))}

                <div className="max-width-1200 mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                  {/* Left Side: Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col text-left justify-center"
                  >
                    <span className="font-['Pacifico'] text-2xl text-[#0F3D2E]/60 mb-1 block tracking-wide">
                      Ayurmor Wellness
                    </span>
                    <span className="text-[#0F3D2E]/75 font-semibold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4">
                      {slide.category}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F3D2E] mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-[#0F3D2E]/80 text-sm md:text-base mb-8 max-w-lg leading-relaxed font-normal font-sans">
                      {slide.tagline}
                    </p>
                    <div>
                      <a
                        href="#products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F3D2E] text-white rounded-full font-bold text-sm tracking-wider uppercase hover:bg-[#5A8B73] hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-[#0F3D2E]/10 group"
                      >
                        <span>Shop This Blend</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Right Side: Product Image Package with Goggles/Highlights */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                    className="flex justify-center items-center relative"
                  >
                    <div className="relative w-80 h-96 md:w-96 md:h-[480px] flex items-center justify-center">
                      {/* Ambient blur glow behind packet */}
                      <div className="absolute inset-0 bg-[#0F3D2E]/5 rounded-full filter blur-3xl scale-75 animate-pulse" />
                      
                      {/* Floating Organic Quality Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md border border-[#0F3D2E]/10 rounded-full px-4 py-2 flex items-center gap-1.5 shadow-premium-sm rotate-[-6deg] animate-float-medium">
                        <Leaf className="w-3.5 h-3.5 text-[#5A8B73]" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#0F3D2E]">{slide.badge}</span>
                      </div>

                      <img
                        src={slide.image}
                        alt={slide.subtitle}
                        className={`max-w-full max-h-full object-contain filter drop-shadow-[0_25px_50px_rgba(15,61,46,0.22)] select-none z-10 hover:scale-[1.02] transition-transform duration-500 rounded-2xl ${slide.imageScale}`}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#0F3D2E] shadow-premium-sm transition-all duration-300 hover:scale-110 z-30 hidden md:flex"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#0F3D2E] shadow-premium-sm transition-all duration-300 hover:scale-110 z-30 hidden md:flex"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel indicators (bottom navigation dots) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#0F3D2E] scale-125 shadow-md' 
                  : 'bg-[#0F3D2E]/30 hover:bg-[#0F3D2E]/55'
              }`}
              aria-label={`Go to Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==========================================
           Core Brand Values (Staggered Load)
           ========================================== */}
      <section className="py-24 px-6 bg-white" id="values">
        <div className="max-width-1200 mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center text-forest mb-2">
            Natural Goodness, Instant Wellness
          </h2>
          <p className="text-sage-grey text-center max-w-lg mx-auto mb-16 text-sm font-light">
            Modern lives deserve traditional formulations that require absolutely zero compromises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(15, 61, 46, 0.08)" }}
              className="bg-cream p-8 rounded-premium-md text-center border border-forest/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">100% Natural Ingredients</h3>
              <p className="text-sage-grey text-sm leading-relaxed font-light">
                Directly and transparently sourced from pesticide-free organic farms. Free of microcrystalline fillers and artificial preservatives.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(15, 61, 46, 0.08)" }}
              className="bg-cream p-8 rounded-premium-md text-center border border-forest/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">Instant Mix – No Boiling</h3>
              <p className="text-sage-grey text-sm leading-relaxed font-light">
                Milled into fine water-soluble granules. Add warm mineral water or plant milk, stir for 10 seconds, and your premium health brew is ready.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(15, 61, 46, 0.08)" }}
              className="bg-cream p-8 rounded-premium-md text-center border border-forest/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">Cellular Bio-Nutrition</h3>
              <p className="text-sage-grey text-sm leading-relaxed font-light">
                Carefully preserved antioxidant, vitamin, and mineral profiles that absorb rapidly at the cellular level for immediate energy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ==========================================
           Best Sellers Section (MySQL Database Loaded)
           ========================================== */}
      <section className="py-24 px-6 bg-white" id="products">
        <div className="max-width-1200 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-forest mb-2 text-left after:mx-0">Our Best Sellers</h2>
              <p className="text-sage-grey text-sm font-light">
                Shop our highest-rated wellness selections milled fresh weekly.
              </p>
            </div>
            
            <span className="text-xs bg-forest/5 border border-forest/10 px-3 py-1.5 rounded-full text-sage-grey mt-4 md:mt-0 font-medium">
              Data Connection Status: <strong className="text-forest uppercase font-bold">{dbSource}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white border border-forest/5 rounded-premium-md shadow-premium-sm overflow-hidden flex flex-col relative group"
              >
                {/* Wishlist Button */}
                <button 
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white transition-all ${
                    wishlist.includes(product.id) ? 'text-red-500 scale-105' : 'text-sage-grey hover:text-red-500'
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to Wishlist"
                >
                  <Heart className="w-5 h-5" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>

                {/* Optional Badge */}
                {product.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-forest text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-wider">
                    {product.tag}
                  </span>
                )}

                {/* Product Packaging Container */}
                <div className="bg-cream/40 py-8 flex items-center justify-center border-b border-forest/5 relative overflow-hidden h-72">
                  <div className="group-hover:scale-105 transition-transform duration-500 w-44 h-56 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-forest/5 rounded-full filter blur-xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={product.image || PRODUCT_IMAGES[product.svg_type] || '/product1.png'}
                      alt={product.title}
                      className="max-w-full max-h-full object-contain filter drop-shadow-md select-none rounded-lg"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sage text-xs font-bold uppercase tracking-wider mb-2">{product.category}</span>
                  <h3 className="font-serif text-xl font-bold text-forest mb-2">{product.title}</h3>
                  
                  {/* Reviews Mockup */}
                  <div className="flex items-center gap-1 text-amber-500 text-sm mb-6">
                    {"★★★★★".split("").map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                    <span className="text-sage-grey text-xs ml-2">({product.rating_count} reviews)</span>
                  </div>

                  {/* Pricing / Cart footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-forest/5">
                    <span className="font-serif text-2xl font-bold text-forest">Rs. {Number(product.price).toFixed(0)}</span>
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                        addedItems.includes(product.id) 
                          ? 'bg-terracotta text-forest scale-95' 
                          : 'bg-forest text-white hover:bg-terracotta hover:text-forest hover:rotate-90'
                      }`}
                      aria-label={`Add ${product.title} to Cart`}
                    >
                      {addedItems.includes(product.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-sage-grey py-12">No products matched your search. Try another word.</p>
          )}
        </div>
      </section>

      {/* ==========================================
           Testimonials Carousel
           ========================================== */}
      <section className="py-24 px-6 bg-cream-dark" id="testimonials">
        <div className="max-width-1000 mx-auto text-center relative overflow-hidden">
          <h2 className="font-serif text-4xl font-bold text-forest mb-12">What Our Customers Say</h2>
          
          <div className="relative h-[300px] md:h-[220px]">
            <AnimatePresence mode="wait">
              {testimonials.map((test, index) => (
                index === currentTestimonial && (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4"
                  >
                    <p className="font-serif italic text-lg md:text-xl text-charcoal leading-relaxed max-w-3xl mb-8 relative z-10 before:content-['“'] before:absolute before:-top-10 before:left-0 before:text-8xl before:text-sage/15 before:font-serif">
                      "{test.quote}"
                    </p>
                    <div className="flex flex-col">
                      <span className="font-bold text-forest">{test.name}</span>
                      <span className="text-sage-grey text-xs font-semibold">{test.title}</span>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-forest scale-125' : 'bg-forest/15'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
           Newsletter Banner & Form
           ========================================== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-width-1200 mx-auto bg-gradient-to-br from-forest to-forest-dark p-8 md:p-16 rounded-premium-lg text-white shadow-premium-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,#5A8B73_0%,transparent_50%)] opacity-20 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white text-left after:hidden">
                Ready to Boost Your Health?
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                Sign up for weekly Ayurvedic recipes, natural lifestyle recommendations, and 15% off your very first premium order.
              </p>
            </div>

            <div>
              <form 
                onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}
                className="flex flex-col gap-3"
              >
                <div className="flex bg-white/10 border border-white/20 p-1.5 rounded-full backdrop-blur-sm">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    required
                    className="flex-grow bg-transparent px-4 py-2 text-white placeholder-white/50 text-sm focus:outline-none"
                  />
                  <button type="submit" className="bg-terracotta text-forest font-bold text-sm px-6 py-2 rounded-full hover:bg-white transition-all">
                    Subscribe
                  </button>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/60">
                  <input type="checkbox" id="consentBox" defaultChecked required className="mt-0.5" />
                  <label htmlFor="consentBox">I accept the privacy guidelines and consent to news letters.</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           Footer
           ========================================== */}
      <footer className="bg-[#0b1a15] text-white/70 py-16 px-6 border-t border-white/5">
        <div className="max-width-1200 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2 font-serif text-xl font-bold text-white mb-6">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#F3EFE9" stroke="#5A8B73" strokeWidth="2"/>
                <path d="M50 20C50 20 65 35 65 55C65 75 50 80 50 80C50 80 35 75 35 55C35 35 50 20 50 20Z" fill="#5A8B73" opacity="0.8"/>
                <path d="M50 25C50 25 60 38 60 52C60 66 50 72 50 72C50 72 40 66 40 52C40 38 50 25 50 25Z" fill="#0F3D2E"/>
              </svg>
              <span>Ayurmor</span>
            </a>
            <p className="text-sm leading-relaxed mb-6 font-light">
              Crafting premium high-performance botanical health blends and daily nutrition boosters under stringent quality inspections.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-white/5 hover:bg-terracotta hover:text-forest rounded-full flex items-center justify-center transition-all">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-white/5 hover:bg-terracotta hover:text-forest rounded-full flex items-center justify-center transition-all">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Company</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#home" className="hover:text-terracotta transition-colors">About Us</a></li>
              <li><a href="#values" className="hover:text-terracotta transition-colors">Our Science</a></li>
              <li><a href="#products" className="hover:text-terracotta transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Policies</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-terracotta transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Support Help</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-terracotta transition-colors">FAQs & Guides</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Track Shipment</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Direct Desk Support</a></li>
            </ul>
          </div>
        </div>

        <div className="max-width-1200 mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <p>&copy; 2026 Ayurmor. All Rights Reserved.</p>
          <p>
            Developed by <a href="https://sitebride.in" target="_blank" rel="noopener" className="text-terracotta hover:underline">sitebride.in</a>
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener" 
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:translate-y-[-4px] hover:scale-105 hover:shadow-xl transition-all duration-300 z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      {/* CSS helper constraints styles inline to support maximum layout precision */}
      <style jsx global>{`
        .max-width-1200 {
          max-width: 1200px;
        }
        .max-width-1000 {
          max-width: 1000px;
        }
        .max-width-800 {
          max-width: 800px;
        }
      `}</style>

    </div>
  );
}
