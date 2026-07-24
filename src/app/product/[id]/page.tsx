'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  MessageCircle, 
  Plus, 
  Minus,
  CheckCircle2,
  ChevronRight,
  Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  category: string;
  title: string;
  price: number;
  image?: string;
  svg_type: string;
  rating_count: number;
  tag?: string;
  description?: string;
  benefits?: string[];
  ingredients?: string;
  usage_instructions?: string;
  nutritional_facts?: string[];
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'moringa-soup-premix',
    category: 'Premix Soups',
    title: 'Ayurmor Moringa Premix Soup - Instant Moringa Soup Powder',
    price: 299,
    image: '/hero_moringa.png',
    svg_type: 'moringa',
    rating_count: 124,
    tag: 'Ready in 60s',
    description: 'Enjoy the comforting taste of moringa in a warm, savoury soup that is ready in just one minute. Ayurmor Moringa Premix Soup is crafted for busy lifestyles - simply add hot water, stir well and enjoy a light, satisfying soup at home, work or while travelling.',
    benefits: [
      'Ready in 60 seconds (no cooking required)',
      'Warm, savoury and comforting herbal flavour',
      'Convenient light snack for home, office & travel',
      'Easy way to enjoy moringa in daily food routines'
    ],
    ingredients: 'Pure Moringa Oleifera leaf powder, Roasted cumin powder, Black salt, Lemon peel powder, Ginger powder, Black pepper, Rock salt, Spices & Herbs. Allergen advice: Processed in a facility handling milk solids, gluten & nuts.',
    usage_instructions: 'Empty one serving into a cup or bowl. Add 180-200 ml hot water. Stir well until completely dissolved. Let stand for 1 minute if needed. Serve hot.',
    nutritional_facts: [
      'Energy: 320 kcal (per 100g)',
      'Protein: 22g',
      'Carbohydrates: 48g',
      'Dietary Fiber: 12g',
      'Sodium: 850mg',
      'Iron: 25mg'
    ]
  },
  {
    id: 'abc-latte-mix',
    category: 'Instant Malt Drinks',
    title: 'Ayurmor ABC Latte Mix - Apple, Beetroot & Carrot Malt Drink',
    price: 299,
    image: '/hero_abc.png',
    svg_type: 'abc',
    rating_count: 98,
    tag: 'Bestseller',
    description: 'Ayurmor ABC Latte Mix is a delicious instant wellness beverage made with apple, beetroot, carrot, almonds and cashews. Designed for busy lifestyles, it mixes easily with hot milk or water to create a smooth, satisfying drink in less than a minute - no boiling required.',
    benefits: [
      'Instant drink ready in less than a minute',
      'Made with real apple, beetroot, carrot, almond and cashew',
      'Smooth, creamy & satisfying taste',
      'Ideal for breakfast, office breaks & evening refreshment'
    ],
    ingredients: 'Dehydrated apple powder, Beetroot powder, Carrot powder, Almond powder, Cashew powder, Sprouted Ragi malt base, Cardamom powder, Raw palm sugar. Allergen advice: Contains nuts (Almonds & Cashews).',
    usage_instructions: 'Add 2-3 teaspoons to 150-200 ml hot milk or warm water. Stir well until smooth. Add sweetener only if desired. Serve warm or chilled.',
    nutritional_facts: [
      'Energy: 385 kcal (per 100g)',
      'Protein: 12g',
      'Carbohydrates: 68g',
      'Dietary Fiber: 8g',
      'Calcium: 180mg',
      'Iron: 18mg'
    ]
  },
  {
    id: 'choco-multigrain-millet-malt',
    category: 'Instant Malt Drinks',
    title: 'Ayurmor Choco Multigrain Millet Malt Mix - Instant Chocolate Millet Drink',
    price: 299,
    image: '/hero_choco.png',
    svg_type: 'choco',
    rating_count: 182,
    tag: 'Family Favorite',
    description: 'Ayurmor Choco Multigrain Millet Malt Mix brings together carefully selected millets with rich chocolate flavour. Ready in less than a minute, it mixes easily with hot milk or water and makes a creamy, satisfying drink for breakfast, evening refreshment or daily family routines.',
    benefits: [
      'Delicious rich chocolate flavour',
      'Made with sprouted multigrain millets',
      'Instant preparation - no boiling required',
      'Suitable for older children, students & adults'
    ],
    ingredients: 'Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Cocoa powder, Almond powder, Milk solids, Natural sugar, Cardamom. Allergen advice: Contains milk solids and nuts.',
    usage_instructions: 'Add 2-3 teaspoons to 150-200 ml hot milk. Stir until smooth. For a lighter drink, use hot water. Add sweetener only if desired.',
    nutritional_facts: [
      'Energy: 360 kcal (per 100g)',
      'Protein: 14g',
      'Carbohydrates: 65g',
      'Dietary Fiber: 9g',
      'Calcium: 410mg'
    ]
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ing' | 'use' | 'nut'>('desc');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const pidStr = String(productId).toLowerCase();

    // 1. Check exact or loose match in DEFAULT_PRODUCTS
    let found = DEFAULT_PRODUCTS.find(p => 
      String(p.id).toLowerCase() === pidStr || 
      p.svg_type.toLowerCase() === pidStr
    );

    // 2. Keyword fallback matching
    if (!found) {
      if (pidStr === '1' || pidStr.includes('moringa')) {
        found = DEFAULT_PRODUCTS.find(p => p.svg_type === 'moringa');
      } else if (pidStr === '2' || pidStr.includes('abc') || pidStr.includes('latte')) {
        found = DEFAULT_PRODUCTS.find(p => p.svg_type === 'abc');
      } else if (pidStr === '3' || pidStr.includes('choco') || pidStr.includes('millet')) {
        found = DEFAULT_PRODUCTS.find(p => p.svg_type === 'choco');
      } else if (pidStr === '4' || pidStr.includes('mushroom')) {
        found = DEFAULT_PRODUCTS.find(p => p.svg_type === 'mushroom');
      }
    }

    if (found) {
      setProduct(found);
    } else {
      // 3. API fetch fallback
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
          if (data && (data.id || data.title)) {
            setProduct({
              id: String(data.id || productId),
              category: data.category || 'Instant Food Mixes',
              title: data.title || 'Ayurmor Wellness Mix',
              price: Number(data.price || 299),
              image: data.image || (data.svg_type === 'abc' ? '/hero_abc.png' : data.svg_type === 'choco' ? '/hero_choco.png' : '/hero_moringa.png'),
              svg_type: data.svg_type || 'moringa',
              rating_count: data.rating_count || 100,
              tag: data.tag || 'FSSAI Registered',
              description: data.description,
              benefits: typeof data.benefits === 'string' ? data.benefits.split('\n') : (data.benefits || []),
              ingredients: data.ingredients,
              usage_instructions: data.usage_instructions,
              nutritional_facts: typeof data.nutrition === 'string' ? data.nutrition.split('\n') : (data.nutritional_facts || [])
            });
          } else {
            setProduct(DEFAULT_PRODUCTS[0]);
          }
        })
        .catch(() => setProduct(DEFAULT_PRODUCTS[0]));
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F4F8FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0080FF]" />
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    // Redirect to checkout or open cart
    alert(`Proceeding to checkout for ${quantity}x ${product.title}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-900 font-sans">
      {/* Header Announcement & Navbar */}
      <Navbar 
        onOpenCart={() => {}} 
        cartCount={addedToCart ? 1 : 0} 
        wishlistCount={isWishlisted ? 1 : 0} 
      />

      {/* Main Breadcrumbs & Back Navigation */}
      <main className="max-width-1200 mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0080FF] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/#products" className="hover:text-[#0080FF] transition-colors">Shop</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0A192F] font-bold">{product.title}</span>
          </nav>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-bold text-[#0A192F] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:border-[#0080FF] transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-premium-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-12 mb-16">
          
          {/* Left: Product Image Display Stage */}
          <div className="lg:col-span-6 bg-[#F4F8FC] rounded-3xl overflow-hidden border border-slate-200 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center group shadow-inner">
            {/* Subtle top gradient overlay for maximum button visibility */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none z-10" />

            {/* Top-Left Tag Badge */}
            {product.tag && (
              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 bg-[#0A192F]/90 backdrop-blur-md text-sky-300 text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg border border-[#0080FF]/40 tracking-wider">
                {product.tag}
              </span>
            )}
            
            {/* Top-Right Wishlist Button */}
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-white/95 backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${
                isWishlisted ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>

            {/* Product Image - 100% Full Cover Stage */}
            <img
              src={product.image || '/hero_moringa.png'}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            />
          </div>

          {/* Right: Product Purchase Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[#76BC21] text-xs font-extrabold uppercase tracking-widest bg-[#76BC21]/10 px-3.5 py-1 rounded-full border border-[#76BC21]/20 inline-block mb-3">
                {product.category}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F] leading-tight mb-3">
                {product.title}
              </h1>

              {/* Review Stars & Assurance */}
              <div className="flex items-center gap-3 text-amber-500 text-sm mb-4">
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
                <span className="text-slate-500 text-xs font-semibold">
                  ({product.rating_count} Verified Customer Reviews)
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-4 py-3 border-y border-slate-100 mb-6">
                <span className="font-serif text-4xl font-bold text-[#0A192F]">
                  Rs. {product.price}
                </span>
                <span className="text-xs text-[#0080FF] bg-[#0080FF]/10 px-3 py-1 rounded-full font-bold border border-[#0080FF]/20">
                  FREE Shipping on Prepaid Orders
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Key Benefits List */}
              {product.benefits && (
                <div className="space-y-2.5 mb-8">
                  <h4 className="font-serif font-bold text-sm text-[#0A192F]">Key Health Benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-800 bg-[#F4F8FC] p-2.5 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#76BC21] flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Buy Action Row */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#0A192F]">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-full bg-white px-3 py-1 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-slate-500 hover:text-[#0080FF] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#0A192F]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-slate-500 hover:text-[#0080FF] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 border-2 border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{addedToCart ? 'Added to Cart! ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 bg-[#0080FF] text-white font-bold text-xs tracking-wider uppercase rounded-full hover:bg-[#0066CC] transition-all shadow-lg active:scale-95 text-center"
                >
                  Buy Now — Rs. {product.price * quantity}
                </button>

                <a
                  href={`https://wa.me/917483849998?text=${encodeURIComponent(`Hi Ayurmor! I would like to order: ${product.title} (Qty: ${quantity}, Rs. ${product.price * quantity})`)}`}
                  target="_blank"
                  rel="noopener"
                  className="py-4 px-6 bg-[#25D366] text-white font-bold text-xs rounded-full hover:bg-[#1eb956] shadow-md transition-all flex items-center justify-center gap-2"
                  title="Order via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Ingredients, Directions, Nutrition */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-premium-lg p-6 sm:p-10 mb-16">
          <div className="flex gap-8 border-b border-slate-200 font-serif text-lg font-bold mb-8 overflow-x-auto pb-2">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`pb-3 transition-all relative whitespace-nowrap ${
                activeTab === 'desc' ? 'text-[#0080FF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0080FF]' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
            >
              Description & Benefits
            </button>
            <button 
              onClick={() => setActiveTab('ing')}
              className={`pb-3 transition-all relative whitespace-nowrap ${
                activeTab === 'ing' ? 'text-[#0080FF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0080FF]' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
            >
              Ingredients
            </button>
            <button 
              onClick={() => setActiveTab('use')}
              className={`pb-3 transition-all relative whitespace-nowrap ${
                activeTab === 'use' ? 'text-[#0080FF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0080FF]' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
            >
              Preparation Directions
            </button>
            <button 
              onClick={() => setActiveTab('nut')}
              className={`pb-3 transition-all relative whitespace-nowrap ${
                activeTab === 'nut' ? 'text-[#0080FF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0080FF]' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
            >
              Nutritional Facts
            </button>
          </div>

          <div className="text-sm leading-relaxed text-slate-800 font-light min-h-[160px]">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p className="text-base">{product.description}</p>
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-xs text-[#0080FF] uppercase tracking-wider mb-2">Manufacturing & Marketing Assurance</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Manufactured by:</strong> <strong className="text-[#0A192F] font-extrabold">Saish Technofarms</strong> (FSSAI Reg. No. 21224169000054 & ISO 9001:2015 Certified).<br />
                    <strong>Marketed by:</strong> <strong className="text-[#0080FF] font-extrabold">Zeyora Global Trading Co.</strong>, Kombai Nagar, Tiruchengode – 637211 (FSSAI No. 124250140000673, GSTIN: 33AEQPT6920G1Z6).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ing' && (
              <div className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-serif font-bold text-base text-[#0A192F]">Complete Ingredients List:</h4>
                <p className="text-sm italic text-slate-700">{product.ingredients}</p>
              </div>
            )}

            {activeTab === 'use' && (
              <div className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-serif font-bold text-base text-[#0A192F]">Instant 10-Second Preparation:</h4>
                <p className="text-sm text-slate-700">{product.usage_instructions}</p>
              </div>
            )}

            {activeTab === 'nut' && (
              <div className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200">
                <h4 className="font-serif font-bold text-base text-[#0A192F] mb-4">Nutritional Values (Approx. per 100g):</h4>
                {product.nutritional_facts ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.nutritional_facts.map((n, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-[#76BC21]" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">Nutritional facts available on pouch label.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DEFAULT_PRODUCTS.filter(p => p.id !== product.id).map(rel => (
              <Link 
                key={rel.id} 
                href={`/product/${rel.id}`}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-premium-lg transition-all group flex flex-col justify-between"
              >
                <div className="h-48 bg-[#F4F8FC] rounded-2xl p-4 flex items-center justify-center mb-4">
                  <img src={rel.image} alt={rel.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <span className="text-[#76BC21] text-[10px] font-extrabold uppercase tracking-widest">{rel.category}</span>
                  <h3 className="font-serif font-bold text-base text-[#0A192F] group-hover:text-[#0080FF] transition-colors">{rel.title}</h3>
                  <p className="font-serif font-bold text-lg text-[#0A192F] mt-2">Rs. {rel.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
