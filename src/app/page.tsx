'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
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
  ChevronRight,
  Minus,
  Trash2,
  ShoppingBag
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
  description?: string;
  ingredients?: string;
  usage_instructions?: string;
  nutrition?: string;
  benefits?: string;
}

const PRODUCT_IMAGES: Record<string, string> = {
  moringa: '/product1.png',
  abc: '/product3.png',
  choco: '/product2.png',
};

const PRODUCT_DETAILS: Record<string, {
  description: string;
  ingredients: string;
  usage: string;
  nutrition: string[];
  benefits: string[];
}> = {
  moringa: {
    description: "Moringa Premix Soup is a nutrient-dense, warm, comforting herbal soup mix crafted from 100% wild-crafted Moringa leaves. Milled fresh to preserve raw enzymes, it delivers a clean, green energy boost while aiding digestion and natural metabolic detox.",
    ingredients: "Organic Moringa Oleifera leaves, Roasted cumin, Black salt, Lemon peel powder, Ginger, Black pepper, Rock salt.",
    usage: "Add 1 tablespoon (10g) of premix to a cup. Pour 150ml of boiling water. Stir well and let it sit for 10 seconds. Enjoy warm!",
    nutrition: [
      "Energy: 320 kcal (per 100g)",
      "Protein: 22g",
      "Carbohydrates: 48g",
      "Dietary Fiber: 12g",
      "Iron: 25mg"
    ],
    benefits: [
      "Rich in Antioxidants",
      "Enhances Immune Function",
      "Supports Natural Detoxification",
      "Improves Energy Levels"
    ]
  },
  abc: {
    description: "Our signature ABC Latte Mix fuses raw apples, sweet red beetroots, and clean carrots into a powerhouse malt. Fortified with roasted almonds and cashews, it offers sustained daily vigor, natural skin glow, and supports blood purification.",
    ingredients: "Dehydrated apple powder, Beetroot extract, Carrot crystals, Sprouted Ragi malt, Roasted almonds, Cashew kernels, Cardamom, Raw palm sugar.",
    usage: "Add 2 spoonfuls (20g) to 200ml of hot milk or warm water. Stir briskly until smooth. Drink every morning for best results.",
    nutrition: [
      "Energy: 385 kcal (per 100g)",
      "Protein: 12g",
      "Iron: 32mg",
      "Vitamin A: 1200 mcg",
      "Calcium: 180mg"
    ],
    benefits: [
      "Enriched with Iron",
      "Boosts Hemoglobin levels",
      "Natural Skin Radiance",
      "Sustained Energy"
    ]
  },
  choco: {
    description: "A luxurious, rich dark cocoa blend paired with sprouted ancient grains (Finger Millet, Pearl Millet, Foxtail Millet). Sweetened naturally without refined sugars, it is the ultimate health malt for growing children and active adults.",
    ingredients: "Premium Dark Cocoa powder, Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Almond flour, Coconut sugar, Cardamom, Pinch of sea salt.",
    usage: "Add 2 tablespoons (25g) to a glass of hot milk (or vegan milk). Stir well. No boiling needed!",
    nutrition: [
      "Energy: 360 kcal (per 100g)",
      "Protein: 14g",
      "Calcium: 410mg",
      "Dietary Fiber: 9g",
      "Zinc: 4.5mg"
    ],
    benefits: [
      "Rich in Calcium",
      "Zero Refined Sugar",
      "High Dietary Fiber",
      "Great for Bone Health"
    ]
  }
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
    elements: ["apple", "beetroot", "carrot"]
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
    elements: ["leaf1", "leaf2", "steam"]
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
    elements: ["almond", "cocoa", "millet"]
  }
];

const renderFloatingElement = (type: string, key: string | number) => {
  switch (type) {
    case "apple":
      return (
        <div key={key} className="hidden md:block absolute top-[18%] right-[8%] w-24 h-24 z-10 animate-float-slow select-none pointer-events-none lg:w-32 lg:h-32">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
            <path d="M50 25 C45 20, 30 20, 25 35 C20 50, 30 80, 50 85 C70 80, 80 50, 75 35 C70 20, 55 20, 50 25 Z" fill="url(#appleGrad)" />
            <path d="M50 25 C52 20, 58 12, 65 10 C65 10, 60 20, 50 25 Z" fill="#4CAF50" />
            <path d="M48 22 C46 15, 45 10, 48 5" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="appleGrad" x1="25" y1="20" x2="75" y2="85">
                <stop offset="0%" stopColor="#FF5252" />
                <stop offset="100%" stopColor="#D50000" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "beetroot":
      return (
        <div key={key} className="hidden md:block absolute top-[28%] right-[32%] w-16 h-16 z-10 animate-float-medium select-none pointer-events-none lg:w-22 lg:h-22">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-md">
            <path d="M50 15 C55 35, 75 45, 75 60 C75 75, 60 85, 50 95 C40 85, 25 75, 25 60 C25 45, 45 35, 50 15 Z" fill="url(#beetGrad)" />
            <path d="M50 15 C45 5, 42 2, 45 2 Z" fill="#81C784" />
            <defs>
              <linearGradient id="beetGrad" x1="25" y1="15" x2="75" y2="95">
                <stop offset="0%" stopColor="#880E4F" />
                <stop offset="100%" stopColor="#4A148C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "carrot":
      return (
        <div key={key} className="hidden md:block absolute bottom-[20%] right-[3%] w-20 h-20 z-10 animate-float-fast select-none pointer-events-none lg:w-26 lg:h-26">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
            <path d="M40 10 L60 10 C58 40, 52 75, 50 95 C48 75, 42 40, 40 10 Z" fill="url(#carrotGrad)" />
            <path d="M45 10 C42 4, 38 2, 40 0" stroke="#4CAF50" strokeWidth="2" />
            <path d="M55 10 C58 4, 62 2, 60 0" stroke="#4CAF50" strokeWidth="2" />
            <defs>
              <linearGradient id="carrotGrad" x1="40" y1="10" x2="60" y2="95">
                <stop offset="0%" stopColor="#FF9800" />
                <stop offset="100%" stopColor="#F57C00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "steam":
      return (
        <div key={key} className="hidden md:block absolute top-[28%] right-[32%] w-16 h-16 z-10 animate-float-medium select-none pointer-events-none lg:w-20 lg:h-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-md" opacity="0.6">
            <path d="M30 80 Q20 50 35 40 T30 10" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M50 90 Q40 60 55 50 T50 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M70 80 Q60 50 75 40 T70 10" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );
    case "millet":
      return (
        <div key={key} className="hidden md:block absolute bottom-[20%] right-[3%] w-20 h-20 z-10 animate-float-fast select-none pointer-events-none lg:w-24 lg:h-24">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
            <path d="M50 95 V20" stroke="#AC8C7D" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="45" cy="30" r="4.5" fill="#FFE082" />
            <circle cx="55" cy="35" r="4.5" fill="#FFD54F" />
            <circle cx="43" cy="45" r="4.5" fill="#FFE082" />
            <circle cx="57" cy="50" r="4.5" fill="#FFD54F" />
            <circle cx="45" cy="60" r="4.5" fill="#FFE082" />
            <circle cx="55" cy="65" r="4.5" fill="#FFD54F" />
            <circle cx="47" cy="75" r="4.5" fill="#FFE082" />
            <circle cx="53" cy="80" r="4.5" fill="#FFD54F" />
          </svg>
        </div>
      );
    case "strawberry":
      return (
        <div key={key} className="hidden md:block absolute top-[15%] right-[10%] w-24 h-24 z-10 animate-float-slow select-none pointer-events-none lg:w-32 lg:h-32">
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
        <div key={key} className="hidden md:block absolute top-[28%] right-[32%] w-16 h-16 z-10 animate-float-medium select-none pointer-events-none lg:w-20 lg:h-20">
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
        <div key={key} className="hidden md:block absolute bottom-[20%] right-[3%] w-20 h-20 z-10 animate-float-fast select-none pointer-events-none lg:w-24 lg:h-24">
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
        <div key={key} className="hidden md:block absolute top-[15%] right-[8%] w-16 h-16 z-10 animate-float-slow select-none pointer-events-none lg:w-20 lg:h-20">
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
        <div key={key} className="hidden md:block absolute bottom-[25%] right-[28%] w-12 h-12 z-10 animate-float-medium select-none pointer-events-none lg:w-16 lg:h-16">
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
        <div key={key} className="hidden md:block absolute bottom-[22%] right-[26%] w-12 h-12 z-10 animate-float-fast select-none pointer-events-none lg:w-16 lg:h-16">
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
        <div key={key} className="hidden md:block absolute top-[16%] right-[8%] w-14 h-14 z-10 animate-float-slow select-none pointer-events-none lg:w-18 lg:h-18">
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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'ing' | 'use' | 'nut'>('desc');

  // Dynamically extract specifications for selected product
  const pDesc = selectedProduct ? (selectedProduct.description || PRODUCT_DETAILS[selectedProduct.svg_type]?.description || "No description provided.") : "";
  const pIngredients = selectedProduct ? (selectedProduct.ingredients || PRODUCT_DETAILS[selectedProduct.svg_type]?.ingredients || "No ingredients listed.") : "";
  const pUsage = selectedProduct ? (selectedProduct.usage_instructions || PRODUCT_DETAILS[selectedProduct.svg_type]?.usage || "No usage instructions provided.") : "";
  
  const pNutrition = selectedProduct ? (
    selectedProduct.nutrition 
      ? selectedProduct.nutrition.split('\n').map((n: string) => n.trim()).filter(Boolean) 
      : (PRODUCT_DETAILS[selectedProduct.svg_type]?.nutrition || [])
  ) : [];

  const pBenefits = selectedProduct ? (
    selectedProduct.benefits 
      ? selectedProduct.benefits.split('\n').map((b: string) => b.trim()).filter(Boolean) 
      : (PRODUCT_DETAILS[selectedProduct.svg_type]?.benefits || [])
  ) : [];

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dbSource, setDbSource] = useState('loading');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>(heroSlides);

  // Auto-play hero carousel
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Fetch products and slides from database API route
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

      try {
        const res = await fetch('/api/slides');
        const data = await res.json();
        if (data.success && data.slides && data.slides.length > 0) {
          const parsed = data.slides.map((s: any) => {
            let elemList = [];
            try {
              elemList = typeof s.elements === 'string' ? JSON.parse(s.elements) : s.elements;
            } catch (e) {
              elemList = [];
            }
            return {
              ...s,
              elements: elemList
            };
          });
          setSlides(parsed);
        }
      } catch (err) {
        console.error('Failed to load hero slides', err);
      }
    }
    loadData();
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

  // Buy Now (Single Product Direct Razorpay Checkout)
  const handleBuyNow = (product: Product) => {
    // Add to cart if not already present
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart and go straight to shipping details
    setShowShippingForm(true);
    setCartOpen(true);
  };

  // Cart Operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(itemId => itemId !== product.id));
    }, 1500);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await resOrder.json();

      if (!orderData.success) {
        alert(orderData.error || 'Failed to initiate transaction. Please check server configuration.');
        setCheckoutLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_SXiE7TgmHMi6sw',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Ayurmor Wellness',
        description: 'Premium Botanical Wellness Purchase',
        image: '/product3.png',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const resVerify = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
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
          <a href="#" onClick={() => setSelectedProduct(null)} className="flex items-center gap-2 font-serif text-2xl font-bold text-forest">
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
              <li><a href="#home" onClick={() => setSelectedProduct(null)} className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Home</a></li>
              <li><a href="#values" onClick={() => setSelectedProduct(null)} className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Our Science</a></li>
              <li><a href="#products" onClick={() => setSelectedProduct(null)} className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Shop</a></li>
              <li><a href="#testimonials" onClick={() => setSelectedProduct(null)} className="hover:text-sage transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sage hover:after:w-full after:transition-all">Reviews</a></li>
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

            <button 
              className="relative p-2 text-forest hover:scale-105 transition-transform" 
              aria-label="View Cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
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
              <li><a href="#home" onClick={() => { setMobileMenuOpen(false); setSelectedProduct(null); }}>Home</a></li>
              <li><a href="#values" onClick={() => { setMobileMenuOpen(false); setSelectedProduct(null); }}>Our Science</a></li>
              <li><a href="#products" onClick={() => { setMobileMenuOpen(false); setSelectedProduct(null); }}>Shop</a></li>
              <li><a href="#testimonials" onClick={() => { setMobileMenuOpen(false); setSelectedProduct(null); }}>Reviews</a></li>
            </ul>
            <div className="flex gap-2 pt-2 border-t border-forest/5">

              <button className="flex-1 py-2 text-center bg-forest text-white rounded-full">Sign Up</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedProduct ? (
        <>
          {/* ==========================================
               Hero Carousel Section (Framer Motion)
               ========================================== */}
          <section className="relative min-h-[650px] sm:min-h-screen w-full overflow-hidden group" id="home">
            <AnimatePresence mode="wait">
              {slides.map((slide, idx) => (
                idx === currentSlide && (
                  <motion.div
                    key={slide.id || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slide.bg_color || slide.bgColor || 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]'} flex items-start md:items-center pt-28 sm:pt-36 pb-20 px-4 sm:px-6 overflow-y-auto md:overflow-hidden`}
                  >
                    {/* Background water splash animation */}
                    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-0 w-[55%] h-full pointer-events-none select-none opacity-45 mix-blend-overlay hidden md:block">
                      <path d="M0 600 C150 550, 300 580, 450 500 C600 420, 650 300, 800 350 L800 600 L0 600 Z" fill="#FFFFFF"/>
                      <circle cx="350" cy="480" r="8" fill="#FFFFFF"/>
                      <circle cx="580" cy="380" r="5" fill="#FFFFFF"/>
                      <circle cx="620" cy="410" r="10" fill="#FFFFFF"/>
                      <circle cx="720" cy="280" r="6" fill="#FFFFFF"/>
                      <path d="M400 550 Q450 530 480 500" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M600 440 Q630 400 660 410" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
 
                    {/* Floating assets for this slide */}
                    {slide.elements && slide.elements.map((el: string, i: number) => renderFloatingElement(el, i))}

                    <div className="max-width-1200 mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
                      {/* Left Side: Content */}
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col text-left justify-center pt-2 sm:pt-0"
                      >
                        <span className="font-['Pacifico'] text-xl sm:text-2xl text-[#0F3D2E]/60 mb-1 block tracking-wide">
                          Ayurmor Wellness
                        </span>
                        <span className="text-[#0F3D2E]/75 font-semibold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 sm:mb-4">
                          {slide.category}
                        </span>
                        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F3D2E] mb-3 sm:mb-4 leading-tight">
                          {slide.title}
                        </h2>
                        <p className="text-[#0F3D2E]/80 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 max-w-lg leading-relaxed font-normal font-sans">
                          {slide.tagline}
                        </p>
                        <div>
                          <a
                            href="#products"
                            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#0F3D2E] text-white rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#5A8B73] hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-[#0F3D2E]/10 group"
                          >
                            <span>Shop This Blend</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </motion.div>

                      {/* Right Side: Product Image Package */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                        className="flex justify-center items-center relative mt-4 md:mt-0"
                      >
                        <div className="relative w-[240px] h-[260px] sm:w-[360px] sm:h-[420px] md:w-[420px] md:h-[460px] lg:w-[460px] lg:h-[500px] flex items-center justify-center">
                          {/* Ambient blur glow behind packet */}
                          <div className="absolute inset-0 bg-[#0F3D2E]/10 rounded-full filter blur-3xl scale-90 animate-pulse" />
                          
                          {/* Floating Organic Quality Badge */}
                          <div className="absolute top-0 left-0 sm:top-4 sm:left-4 z-20 bg-white/90 backdrop-blur-md border border-[#0F3D2E]/10 rounded-full px-3 py-1 sm:px-4 sm:py-2 flex items-center gap-1.5 shadow-premium-md rotate-[-4deg]">
                            <Leaf className="w-3.5 h-3.5 text-[#5A8B73]" />
                            <span className="text-[9px] sm:text-xs uppercase font-bold tracking-wider text-[#0F3D2E]">{slide.badge}</span>
                          </div>

                          <img
                            src={slide.image}
                            alt={slide.subtitle}
                            className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_40px_rgba(15,61,46,0.2)] select-none z-10 hover:scale-105 transition-transform duration-500 rounded-2xl"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Slide Navigation Left/Right Arrows (Desktop only) */}
            <button 
              onClick={prevSlide}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white text-forest border border-forest/10 items-center justify-center backdrop-blur-sm z-30 shadow-md active:scale-95 transition-all duration-300"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white text-forest border border-forest/10 items-center justify-center backdrop-blur-sm z-30 shadow-md active:scale-95 transition-all duration-300"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {slides.map((_, index) => (
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
               Premium Quality Values Section
               ========================================== */}
          <section className="py-24 px-6 bg-cream" id="values">
            <div className="max-width-1200 mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-forest mb-4">Milled with Intention, Crafted for Vigor</h2>
              <p className="text-sage-grey max-width-800 mx-auto text-base mb-16 font-light leading-relaxed">
                We synthesize high-potency Ayurvedic elements into clean daily nutrition boosters. No artificial fillers, zero dynamic chemical preservatives—just raw organic intelligence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(15, 61, 46, 0.08)" }}
                  className="bg-cream p-8 rounded-premium-md text-center border border-forest/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-3">100% Raw Ingredients</h3>
                  <p className="text-sage-grey text-sm leading-relaxed font-light">
                    Sourced from organic, wild-crafted micro-farms across India, processed below 40°C to secure raw vital compounds.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(15, 61, 46, 0.08)" }}
                  className="bg-cream p-8 rounded-premium-md text-center border border-forest/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                    <Flame className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-3">High Vitality Blends</h3>
                  <p className="text-sage-grey text-sm leading-relaxed font-light">
                    Fortified with essential millet grains and clean nuts for progressive energy delivery without insulin spikes.
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
                    <div 
                      className="bg-cream/40 py-6 flex items-center justify-center border-b border-forest/5 relative overflow-hidden h-72 sm:h-80 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="w-60 h-64 flex items-center justify-center relative p-2">
                        <div className="absolute inset-0 bg-forest/5 rounded-full filter blur-xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                          src={product.image || PRODUCT_IMAGES[product.svg_type] || '/product1.png'}
                          alt={product.title}
                          className="max-w-full max-h-full object-contain filter drop-shadow-md select-none rounded-lg group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-sage text-xs font-bold uppercase tracking-wider mb-2">{product.category}</span>
                      <h3 
                        className="font-serif text-xl font-bold text-forest mb-2 cursor-pointer hover:text-sage hover:underline transition-colors"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.title}
                      </h3>
                      
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
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                              addedItems.includes(product.id) 
                                ? 'bg-terracotta text-forest scale-95' 
                                : 'bg-cream text-forest hover:bg-forest hover:text-white border border-forest/10'
                            }`}
                            aria-label={`Add ${product.title} to Cart`}
                          >
                            {addedItems.includes(product.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => handleBuyNow(product)}
                            className="px-4 py-2 bg-forest text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-terracotta hover:text-forest transition-all shadow-md active:scale-95"
                          >
                            Buy Now
                          </button>
                        </div>
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
        </>
      ) : (
        <div className="pt-28 pb-16 px-6 max-width-1200 mx-auto">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center justify-between mb-8 border-b border-forest/10 pb-4">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-sage transition-colors"
            >
              <span>&larr;</span> Back to All Products
            </button>
            <div className="text-xs text-sage-grey font-medium hidden sm:block">
              Home / Shop / {selectedProduct.category} / <span className="text-forest font-semibold">{selectedProduct.title}</span>
            </div>
          </div>

          {/* Main PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Image Container */}
            <div className="lg:col-span-5 bg-white p-8 rounded-premium-lg border border-forest/5 shadow-premium-sm flex items-center justify-center relative overflow-hidden min-h-[350px] sm:min-h-[450px]">
              <div className="absolute inset-0 bg-forest/5 rounded-full filter blur-3xl scale-75 animate-pulse" />
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
                <span className="absolute top-0 right-0 z-20 bg-forest text-white text-[10px] uppercase font-bold px-3.5 py-1.5 rounded-full tracking-wider shadow-premium-sm rotate-[12deg]">
                  Organic Fresh Milled
                </span>
                <img 
                  src={selectedProduct.image || PRODUCT_IMAGES[selectedProduct.svg_type] || '/product1.png'} 
                  alt={selectedProduct.title}
                  className="max-w-full max-h-full object-contain filter drop-shadow-[0_25px_50px_rgba(15,61,46,0.18)] select-none scale-125"
                />
              </div>
            </div>

            {/* Right Column: Title, description, CTA actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-sm text-sage font-bold uppercase tracking-wider">{selectedProduct.category}</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest leading-tight mt-1">{selectedProduct.title}</h1>
              </div>

              {/* Review & Ratings */}
              <div className="flex items-center gap-2 text-amber-500 text-sm">
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
                <span className="text-sage-grey text-xs font-semibold ml-2">({selectedProduct.rating_count} customer reviews)</span>
              </div>

              {/* Price box */}
              <div className="p-6 bg-cream border border-forest/5 rounded-premium-md flex items-center justify-between">
                <div>
                  <span className="text-xs text-sage-grey font-sans uppercase font-bold tracking-wider block">Special Price</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-forest">Rs. {Number(selectedProduct.price).toFixed(0)}</span>
                    <span className="text-xs text-sage-grey font-light">Incl. of all taxes</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider block">✓ In Stock</span>
                  <span className="text-xs text-sage-grey font-light block mt-1">Ships in 24 hours</span>
                </div>
              </div>

              {/* Tabbed Specs Panel */}
              <div className="space-y-4">
                <div className="flex border-b border-forest/10 gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap pb-1 scrollbar-none">
                  <button 
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'desc' ? 'text-forest after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-forest' : 'text-sage-grey hover:text-forest'
                    }`}
                  >
                    Description
                  </button>
                  <button 
                    onClick={() => setActiveTab('ing')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'ing' ? 'text-forest after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-forest' : 'text-sage-grey hover:text-forest'
                    }`}
                  >
                    Ingredients
                  </button>
                  <button 
                    onClick={() => setActiveTab('use')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'use' ? 'text-forest after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-forest' : 'text-sage-grey hover:text-forest'
                    }`}
                  >
                    Directions
                  </button>
                  <button 
                    onClick={() => setActiveTab('nut')}
                    className={`pb-2 transition-all relative ${
                      activeTab === 'nut' ? 'text-forest after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-forest' : 'text-sage-grey hover:text-forest'
                    }`}
                  >
                    Nutrition
                  </button>
                </div>

                {/* Tab content panel */}
                <div className="py-2 text-base leading-relaxed text-charcoal font-light min-h-[160px]">
                  {activeTab === 'desc' && (
                    <div className="space-y-4">
                      <p>{pDesc}</p>
                      {pBenefits.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {pBenefits.map((b, i) => (
                            <span key={i} className="text-xs bg-forest/5 text-forest border border-forest/10 px-3 py-1 rounded-full font-medium">
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'ing' && (
                    <p className="italic bg-white p-4 rounded-premium-sm border border-forest/5">{pIngredients}</p>
                  )}
                  {activeTab === 'use' && (
                    <p className="bg-white p-4 rounded-premium-sm border border-forest/5">{pUsage}</p>
                  )}
                  {activeTab === 'nut' && (
                    <div className="bg-white p-6 rounded-premium-sm border border-forest/5">
                      <h4 className="font-serif text-sm font-bold text-forest mb-3">Nutritional Facts (Approx. values)</h4>
                      {pNutrition.length > 0 ? (
                        <ul className="space-y-2 list-disc pl-4 text-sm font-medium text-forest">
                          {pNutrition.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-sage-grey italic">No nutritional values provided.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Checkout / CTA buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-forest/5">
                <button 
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    alert(`${selectedProduct.title} added to cart!`);
                  }}
                  className="flex-1 py-3.5 border border-forest text-forest hover:bg-forest hover:text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => handleBuyNow(selectedProduct)}
                  className="flex-1 py-3.5 bg-forest text-white hover:bg-terracotta hover:text-forest font-bold text-xs tracking-wider uppercase rounded-full shadow-premium-lg active:scale-95 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Related / Other Products Section */}
          <div className="mt-24 border-t border-forest/10 pt-16">
            <h3 className="font-serif text-3xl font-bold text-forest mb-8">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter(p => p.id !== selectedProduct.id).map(p => (
                <div 
                  key={p.id}
                  className="bg-white border border-forest/5 rounded-premium-md shadow-premium-sm overflow-hidden flex flex-col relative group cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="bg-cream/40 py-6 flex items-center justify-center border-b border-forest/5 relative overflow-hidden h-60">
                    <img 
                      src={p.image || PRODUCT_IMAGES[p.svg_type] || '/product1.png'} 
                      alt={p.title} 
                      className="w-40 h-48 object-contain filter drop-shadow-md select-none scale-110 group-hover:scale-115 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-sage font-bold uppercase tracking-wider">{p.category}</span>
                      <h4 className="font-serif text-lg font-bold text-forest leading-tight mt-1 hover:text-sage transition-colors">{p.title}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-forest/5">
                      <span className="font-serif font-bold text-forest text-lg">Rs. {Number(p.price).toFixed(0)}</span>
                      <span className="text-xs text-sage font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View details &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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

      {/* Sticky Mobile Floating Cart & Quick Checkout Bar */}
      <AnimatePresence>
        {cartCount > 0 && !cartOpen && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 sm:hidden z-40 bg-[#0F3D2E]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 pl-1 cursor-pointer" onClick={() => setCartOpen(true)}>
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-[#E7977D]" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#E7977D] text-[#0F3D2E] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-white/60 block font-medium uppercase tracking-wider">Cart Total</span>
                <span className="font-serif font-bold text-base text-white">
                  Rs. {cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0)}
                </span>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowShippingForm(true);
                setCartOpen(true);
              }}
              className="px-5 py-2.5 bg-[#E7977D] text-[#0b1a15] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#ffebe5] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Widget */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener" 
        className={`fixed ${cartCount > 0 && !cartOpen ? 'bottom-20' : 'bottom-6'} right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:translate-y-[-4px] hover:scale-105 hover:shadow-xl transition-all duration-300 z-40`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
      
      {/* Cart Drawer Component */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
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
                className="w-full sm:max-w-md bg-cream shadow-2xl flex flex-col h-full border-l border-forest/5"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-forest/5 flex items-center justify-between bg-white">
                  <h2 className="font-serif text-2xl font-bold text-forest flex items-center gap-2">
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
                        Add some of our premium organic botanical health blends to begin your wellness journey.
                      </p>
                      <button 
                        onClick={() => setCartOpen(false)}
                        className="px-6 py-2.5 bg-forest text-white text-xs font-bold uppercase rounded-full tracking-wider hover:bg-terracotta hover:text-forest transition-all"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : showShippingForm ? (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-bold text-forest border-b border-forest/10 pb-2">Shipping Information</h3>
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-sage-grey mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={shippingName}
                            onChange={(e) => setShippingName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white border border-forest/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest text-charcoal"
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
                            className="w-full bg-white border border-forest/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest text-charcoal"
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
                            className="w-full bg-white border border-forest/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest text-charcoal"
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
                            className="w-full bg-white border border-forest/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest text-charcoal resize-none"
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
                            className="w-full bg-white border border-forest/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest text-charcoal"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-premium-sm border border-forest/5 shadow-premium-sm relative">
                        <div className="w-20 h-24 bg-cream/40 rounded flex items-center justify-center p-2 border border-forest/5 relative overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image || PRODUCT_IMAGES[item.product.svg_type] || '/product1.png'} 
                            alt={item.product.title} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="pr-6">
                            <span className="text-[10px] text-sage font-bold uppercase tracking-wider">{item.product.category}</span>
                            <h4 className="font-serif text-base font-bold text-forest leading-tight mt-1">{item.product.title}</h4>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-forest/10 rounded-full bg-cream/60 overflow-hidden">
                              <button 
                                onClick={() => handleUpdateQuantity(item.product.id, -1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors text-xs font-bold"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-bold text-forest">{item.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.product.id, 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors text-xs font-bold"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="font-serif font-bold text-forest text-base">Rs. {Number(item.product.price) * item.quantity}</span>
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
                  <div className="p-6 border-t border-forest/5 bg-white space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-sage-grey">
                        <span>Subtotal</span>
                        <span>Rs. {cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-sage-grey">
                        <span>Shipping</span>
                        <span className="text-emerald-600 font-medium">FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-forest/5">
                        <span>Total Amount</span>
                        <span className="font-serif text-lg">Rs. {cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0)}</span>
                      </div>
                    </div>

                    {showShippingForm ? (
                      <div>
                        <button 
                          onClick={handleCartCheckout}
                          disabled={checkoutLoading || !shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingPincode}
                          className="w-full py-4 bg-forest text-white font-bold text-sm tracking-wider uppercase rounded-full shadow-premium-lg hover:bg-terracotta hover:text-forest disabled:bg-sage disabled:cursor-not-allowed hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {checkoutLoading ? 'Processing Payment...' : 'Pay with Razorpay'}
                        </button>
                        <button 
                          onClick={() => setShowShippingForm(false)}
                          className="w-full text-center text-xs font-bold uppercase tracking-wider text-forest/70 hover:text-forest transition-colors mt-2"
                        >
                          Back to Cart
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowShippingForm(true)}
                        className="w-full py-4 bg-forest text-white font-bold text-sm tracking-wider uppercase rounded-full shadow-premium-lg hover:bg-terracotta hover:text-forest hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>Proceed to Checkout</span>
                        <span>&rarr;</span>
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>



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
