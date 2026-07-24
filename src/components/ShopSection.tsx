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
  ShoppingBag
} from 'lucide-react';

export interface Product {
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
  moringa: '/hero_moringa.png',
  abc: '/hero_abc.png',
  choco: '/hero_choco.png',
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'ing' | 'use' | 'nut'>('desc');

  // Derived display fields with safe fallbacks
  const pDesc = selectedProduct?.description ?? '';
  const pBenefits = selectedProduct?.benefits ? selectedProduct.benefits.split(',').map(b => b.trim()) : [];
  const pIngredients = selectedProduct?.ingredients ?? '';
  const pUsage = selectedProduct?.usage_instructions ?? '';
  const pNutrition = selectedProduct?.nutrition ? selectedProduct.nutrition.split(',').map(n => n.trim()) : [];


  const categories = ['All', 'Instant Malt Drinks', 'Premix Soups', 'Combo Packs'];

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
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 flex-shrink-0 ${
                  activeCategory === cat
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
                className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${
                  wishlist.includes(product.id) ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
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
                href={`/product/${product.id}`}
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
                <span className="text-[#76BC21] text-xs font-bold uppercase tracking-wider mb-1">{product.category}</span>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-2 cursor-pointer hover:text-[#0080FF] transition-colors leading-snug">
                    {product.title}
                  </h3>
                </Link>
                
                {/* Review Stars */}
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                  {"★★★★★".split("").map((star, idx) => (
                    <span key={idx}>{star}</span>
                  ))}
                  <span className="text-slate-500 text-xs ml-2 font-medium">({product.rating_count} reviews)</span>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="flex flex-col gap-3.5 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-[#0A192F]">Rs. {Number(product.price).toFixed(0)}</span>
                      <span className="text-[10px] text-[#0080FF] bg-[#0080FF]/10 px-2.5 py-0.5 rounded-full font-bold border border-[#0080FF]/20">
                        FREE Shipping on Prepaid Orders
                      </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                        addedItems.includes(product.id) 
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

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-forest/10 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-cream/80 hover:bg-cream text-forest flex items-center justify-center transition-colors shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Image Stage - Large & Prominent */}
                  <div className="bg-[#F4F8FC] rounded-3xl p-6 flex items-center justify-center border border-slate-100 h-96 relative overflow-hidden">
                    <img 
                      src={selectedProduct.image || PRODUCT_IMAGES[selectedProduct.svg_type] || '/hero_moringa.png'} 
                      alt={selectedProduct.title} 
                      className="w-full h-full object-contain filter drop-shadow-xl mix-blend-multiply p-2"
                    />
                  </div>

                  {/* Top Details */}
                  <div className="space-y-4">
                    <span className="text-xs text-sage font-bold uppercase tracking-widest bg-sage/10 px-3 py-1 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-tight">
                      {selectedProduct.title}
                    </h2>

                    <div className="flex items-center gap-2 text-amber-500 text-sm">
                      {"★★★★★".split("").map((star, idx) => (
                        <span key={idx}>{star}</span>
                      ))}
                      <span className="text-sage-grey text-xs font-semibold ml-2">({selectedProduct.rating_count} Verified Buyer Reviews)</span>
                    </div>

                    <div className="flex items-baseline gap-3 pt-2">
                      <span className="font-serif text-3xl font-bold text-forest">Rs. {Number(selectedProduct.price).toFixed(0)}</span>
                      <span className="text-xs text-[#0080FF] bg-[#0080FF]/10 px-2.5 py-1 rounded-full font-bold border border-[#0080FF]/20">
                        FREE Shipping on Prepaid Orders
                      </span>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex items-center gap-3 pt-4 border-t border-forest/10">
                      <button 
                        onClick={() => {
                          onAddToCart(selectedProduct);
                          alert(`${selectedProduct.title} added to cart!`);
                        }}
                        className="flex-1 py-3.5 border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => {
                          onBuyNow(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 py-3.5 bg-[#0F3D2E] text-white hover:bg-terracotta hover:text-[#0F3D2E] font-bold text-xs tracking-wider uppercase rounded-full shadow-lg transition-all"
                      >
                        Buy Now
                      </button>
                      <a 
                        href={`https://wa.me/917483849998?text=${encodeURIComponent(`Hi Ayurmor! I would like to order: ${selectedProduct.title} (Rs. ${selectedProduct.price})`)}`}
                        target="_blank"
                        rel="noopener"
                        className="px-4 py-3.5 bg-[#25D366] text-white text-xs font-bold rounded-full hover:bg-[#1eb956] shadow-md transition-all flex items-center gap-1.5"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Specification Tabs */}
                <div className="border-t border-forest/10 pt-6">
                  <div className="flex gap-6 border-b border-forest/10 font-serif text-base font-bold mb-6">
                    <button 
                      onClick={() => setActiveTab('desc')}
                      className={`pb-2 transition-all relative ${
                        activeTab === 'desc' ? 'text-forest after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-forest' : 'text-sage-grey hover:text-forest'
                      }`}
                    >
                      Description & Benefits
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
                      Nutrition Facts
                    </button>
                  </div>

                  <div className="text-sm leading-relaxed text-charcoal font-light min-h-[140px]">
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
                      <p className="italic bg-cream/40 p-4 rounded-2xl border border-forest/5">{pIngredients}</p>
                    )}
                    {activeTab === 'use' && (
                      <p className="bg-cream/40 p-4 rounded-2xl border border-forest/5">{pUsage}</p>
                    )}
                    {activeTab === 'nut' && (
                      <div className="bg-cream/40 p-5 rounded-2xl border border-forest/5">
                        <h4 className="font-serif text-sm font-bold text-forest mb-3">Nutritional Facts (Approx. values per 100g)</h4>
                        {pNutrition.length > 0 ? (
                          <ul className="space-y-2 list-disc pl-4 text-xs font-medium text-forest">
                            {pNutrition.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-sage-grey italic">No nutritional values listed.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
