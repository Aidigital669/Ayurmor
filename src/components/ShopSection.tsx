'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Plus,
  Check,
  MessageCircle,
  X,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: string | number;
  mrp?: string | number;
  rating_count: number;
  tag: string | null;
  svg_type: string;
  image?: string;
  net_weight?: string;
  servings?: string;
  one_liner?: string;
  description?: string;
  ingredients?: string;
  usage_instructions?: string;
  nutrition?: string;
  benefits?: string;
  taste_profile?: string;
  perfect_for?: string;
}

const PRODUCT_IMAGES: Record<string, string> = {
  moringa: '/Moringo1.jpeg',
  abc: '/hero_abc.png',
  choco: '/hero_choco.png',
};

const PRODUCT_SEQUENCE_IMAGES: Record<string, string[]> = {
  abc: ['/hero_abc.png', '/ABC1.jpeg', '/ABC2.jpeg', '/ABC3.jpeg', '/ABC4.jpeg'],
  moringa: ['/Moringo1.jpeg', '/Moringo2.jpeg', '/Moringo3.jpeg', '/Moringo4.jpeg', '/hero_moringa.png'],
  choco: ['/hero_choco.png', '/Choco1.jpeg', '/Choco2.jpeg']
};

const CARD_ONE_LINERS: Record<string, string> = {
  abc: "Apple, Beetroot & Carrot instant malt drink with almond and cashew. Ready with hot milk or water.",
  moringa: "Warm, savoury moringa soup ready in 60 seconds. Ideal for office breaks and evening snacks.",
  choco: "Chocolate-flavoured millet malt drink for the whole family. No boiling required.",
};

const DEFAULT_DETAILS: Record<string, {
  description: string;
  ingredients: string;
  usage: string;
  nutrition: string[];
  benefits: string[];
}> = {
  moringa: {
    description: "Enjoy the comforting taste of moringa in a warm, savoury soup that is ready in just one minute. Ayurmor Moringa Premix Soup is crafted for busy lifestyles - simply add hot water, stir well and enjoy a light, satisfying soup at home, work or while travelling.",
    ingredients: "Pure Moringa Oleifera leaf powder, Roasted cumin powder, Black salt, Lemon peel powder, Ginger powder, Black pepper, Rock salt, Spices & Herbs. Allergen advice: Processed in a facility handling milk solids, gluten & nuts.",
    usage: "Empty one serving into a cup or bowl. Add 180-200 ml hot water. Stir well until completely dissolved. Let stand for 1 minute if needed. Serve hot.",
    nutrition: ["Energy: 320 kcal (per 100g)", "Protein: 22g", "Carbohydrates: 48g", "Dietary Fiber: 12g", "Sodium: 850mg", "Iron: 25mg"],
    benefits: ["Ready in 60 seconds (no cooking required)", "Warm, savoury and comforting herbal flavour", "Convenient light snack for home, office & travel", "Easy way to enjoy moringa in daily food routines"]
  },
  abc: {
    description: "Ayurmor ABC Latte Mix is a delicious instant wellness beverage made with apple, beetroot, carrot, almonds and cashews. Designed for busy lifestyles, it mixes easily with hot milk or water to create a smooth, satisfying drink in less than a minute - no boiling required.",
    ingredients: "Dehydrated apple powder, Beetroot powder, Carrot powder, Almond powder, Cashew powder, Sprouted Ragi malt base, Cardamom powder, Raw palm sugar. Allergen advice: Contains nuts (Almonds & Cashews).",
    usage: "Add 2-3 teaspoons to 150-200 ml hot milk or warm water. Stir well until smooth. Add sweetener only if desired. Serve warm or chilled.",
    nutrition: ["Energy: 385 kcal (per 100g)", "Protein: 12g", "Carbohydrates: 68g", "Dietary Fiber: 8g", "Calcium: 180mg", "Iron: 18mg"],
    benefits: ["Instant drink ready in less than a minute", "Made with real apple, beetroot, carrot, almond and cashew", "Smooth, creamy & satisfying taste", "Ideal for breakfast, office breaks & evening refreshment"]
  },
  choco: {
    description: "Ayurmor Choco Multigrain Millet Malt Mix brings together carefully selected millets with rich chocolate flavour. Ready in less than a minute, it mixes easily with hot milk or water and makes a creamy, satisfying drink for breakfast, evening refreshment or daily family routines.",
    ingredients: "Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Cocoa powder, Almond powder, Milk solids, Natural sugar, Cardamom. Allergen advice: Contains milk solids and nuts.",
    usage: "Add 2-3 teaspoons to 150-200 ml hot milk. Stir until smooth. For a lighter drink, use hot water. Add sweetener only if desired.",
    nutrition: ["Energy: 360 kcal (per 100g)", "Protein: 14g", "Carbohydrates: 65g", "Dietary Fiber: 9g", "Calcium: 410mg"],
    benefits: ["Delicious rich chocolate flavour", "Made with sprouted multigrain millets", "Instant preparation - no boiling required", "Suitable for older children, students & adults"]
  }
};

interface ShopSectionProps {
  products: Product[];
  filteredProducts: Product[];
  wishlist: number[];
  addedItems: number[];
  dbSource: string;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
}

export default function ShopSection({
  products,
  filteredProducts,
  wishlist,
  addedItems,
  dbSource,
  onAddToCart,
  onBuyNow,
  onToggleWishlist
}: ShopSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');


  const categories = ['All', 'Instant Malt Drinks', 'Premix Soups'];

  const displayedProducts = filteredProducts.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === 'Instant Malt Drinks' && (p.category.toLowerCase().includes('malt') || p.category.toLowerCase().includes('superfood')));
  });

  return (
    <section className="py-24 px-6 bg-white" id="products">
      <div className="max-width-1200 mx-auto">

        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#76BC21] bg-[#76BC21]/10 px-3.5 py-1 rounded-full border border-[#76BC21]/20 inline-flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Instant & Convenience Food
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
              Shop Ayurmor Wellness Mixes
            </h2>
            <p className="text-slate-600 text-sm font-light mt-1">
              Choose from instant malt drinks and premix soups made for home, office, travel and everyday routines.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 flex-shrink-0 ${activeCategory === cat
                    ? 'bg-[#0080FF] text-white shadow-md'
                    : 'bg-white text-[#0A192F] hover:bg-[#E2EAF4] border border-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 overflow-hidden flex flex-col relative group"
            >
              {/* Subtle top gradient shadow for button contrast */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none z-10" />

              {/* Wishlist Toggle Button */}
              <button
                className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${wishlist.includes(product.id) ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                  }`}
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Add to Wishlist"
              >
                <Heart className="w-5 h-5" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
              </button>

              {/* Tag Badge */}
              {product.tag && (
                <span className="absolute top-4 left-4 z-20 bg-[#0A192F]/90 backdrop-blur-md text-sky-300 text-[10px] uppercase font-extrabold px-3 py-1 rounded-full tracking-wider shadow-lg border border-[#0080FF]/40">
                  {product.tag}
                </span>
              )}

              {/* Product Packaging Container - 100% Full-Width Image Stage */}
              <Link 
                href={`/product/${product.svg_type === 'abc' ? 'abc-latte-mix' : product.svg_type === 'choco' ? 'choco-multigrain-millet-malt' : 'moringa-soup-premix'}`}
                className="bg-[#F4F8FC] border-b border-slate-100 relative overflow-hidden h-72 sm:h-80 cursor-pointer block"
              >
                <img
                  src={product.image || PRODUCT_IMAGES[product.svg_type] || '/hero_moringa.png'}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[#76BC21] text-xs font-bold uppercase tracking-wider">{product.category}</span>
                  <span className="text-[10px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {product.net_weight || '100g • Up to 20 Servings*'}
                  </span>
                </div>

                <Link href={`/product/${product.svg_type === 'abc' ? 'abc-latte-mix' : product.svg_type === 'choco' ? 'choco-multigrain-millet-malt' : 'moringa-soup-premix'}`}>
                  <h3 className="font-serif text-lg font-bold text-[#0A192F] mb-2 cursor-pointer hover:text-[#0080FF] transition-colors leading-snug">
                    {product.title}
                  </h3>
                </Link>

                {/* One-Line Card Copy (SEO Report Page 8 Recommendation) */}
                <p className="text-slate-600 text-xs leading-relaxed font-light mb-3 min-h-[36px]">
                  {CARD_ONE_LINERS[product.svg_type] || product.one_liner || "Instant wellness mix crafted for busy daily routines. Ready in less than a minute - no boiling required."}
                </p>

                {/* Short Badges: Instant, No Boiling, Vegetarian, FSSAI */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] bg-[#0080FF]/10 text-[#0080FF] font-bold px-2 py-0.5 rounded-full border border-[#0080FF]/20">
                    ⚡ Instant
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                    🔥 No Boiling
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" /> Vegetarian
                  </span>
                  <span className="text-[10px] bg-slate-50 text-slate-600 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                    FSSAI Registered
                  </span>
                </div>

                {/* Review Stars */}
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                  {"★★★★★".split("").map((star, idx) => (
                    <span key={idx}>{star}</span>
                  ))}
                  <span className="text-slate-500 text-xs ml-2 font-medium">({product.rating_count} verified reviews)</span>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="flex flex-col gap-3.5 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#0A192F]">Rs. {Number(product.price).toFixed(0)}</span>
                      <span className="text-xs text-slate-400 line-through">Rs. {Number(product.mrp || 349).toFixed(0)}</span>
                    </div>
                    <span className="text-[10px] text-[#0080FF] bg-[#0080FF]/10 px-2.5 py-0.5 rounded-full font-bold border border-[#0080FF]/20">
                      FREE Shipping
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${addedItems.includes(product.id)
                          ? 'bg-[#76BC21] text-white scale-95'
                          : 'bg-[#F4F8FC] text-[#0A192F] hover:bg-[#0080FF] hover:text-white border border-slate-200'
                        }`}
                      aria-label={`Add ${product.title} to Cart`}
                      title="Add to Cart"
                    >
                      {addedItems.includes(product.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={() => onBuyNow(product)}
                      className="flex-1 py-3 bg-[#0080FF] text-white font-bold text-xs tracking-wider uppercase rounded-full hover:bg-[#0066CC] transition-all shadow-md active:scale-95 text-center"
                    >
                      Buy Now
                    </button>

                    <a
                      href={`https://wa.me/917483849998?text=${encodeURIComponent(`Hi Ayurmor! I would like to order: ${product.title} (Rs. ${product.price})`)}`}
                      target="_blank"
                      rel="noopener"
                      className="w-11 h-11 bg-[#25D366] text-white rounded-full hover:bg-[#1eb956] shadow-md transition-all flex items-center justify-center flex-shrink-0"
                      title="Order via WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <p className="text-center text-sage-grey py-16">No products matched your criteria. Try selecting another category.</p>
        )}
      </div>

    </section>
  );
}
