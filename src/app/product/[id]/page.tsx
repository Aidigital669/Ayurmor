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
  ChevronLeft,
  Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  category: string;
  title: string;
  price: number;
  mrp?: number;
  image?: string;
  images?: string[];
  svg_type: string;
  rating_count: number;
  tag?: string;
  net_weight?: string;
  servings?: string;
  tagline?: string;
  description?: string;
  benefits?: string[];
  ingredients?: string;
  allergen?: string;
  usage_instructions?: string;
  taste_profile?: string;
  perfect_for?: string;
  storage?: string;
  nutritional_facts?: string[];
  faqs?: { q: string; a: string }[];
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'abc-latte-mix',
    category: 'Instant Malt Drinks',
    title: 'Ayurmor ABC Latte Mix - Apple, Beetroot & Carrot Malt Drink',
    price: 299,
    mrp: 349,
    image: '/hero_abc.png',
    images: ['/hero_abc.png', '/ABC1.jpeg', '/ABC2.jpeg', '/ABC3.jpeg', '/ABC4.jpeg'],
    svg_type: 'abc',
    rating_count: 98,
    tag: 'Bestseller',
    net_weight: '100g Pouch',
    servings: 'Up to 20 Servings*',
    tagline: 'Natural Goodness. Instant Convenience. Everyday Wellness.',
    description: 'Ayurmor ABC Latte Mix is a delicious instant wellness beverage made with apple, beetroot, carrot, almonds and cashews. Designed for busy lifestyles, it mixes easily with hot milk or water to create a smooth, satisfying drink in less than a minute - no boiling required.',
    benefits: [
      'Instant drink ready in less than a minute',
      'Made with real apple, beetroot, carrot, almond and cashew',
      'Smooth, creamy & satisfying taste',
      'Convenient for breakfast, office breaks and evening refreshment',
      'Complements a balanced daily diet'
    ],
    ingredients: 'Dehydrated apple powder, Beetroot powder, Carrot powder, Almond powder, Cashew powder, Sprouted Ragi malt base, Cardamom powder, Raw palm sugar. Allergen advice: Contains nuts (Almonds & Cashews).',
    allergen: 'Contains nuts (Almonds & Cashews). Processed in a hygiene-controlled facility.',
    usage_instructions: 'Add 2-3 teaspoons (10g) to 150-200 ml hot milk or warm water. Stir well until smooth. Add sweetener only if desired. Serve warm or chilled.',
    taste_profile: 'Smooth, creamy, mildly fruity, nutty and comforting.',
    perfect_for: 'Breakfast, office breaks, post-school drink, evening refreshment, travel and family routines.',
    storage: 'Store in a cool, dry place. Use a dry spoon. Reseal tightly after opening. Avoid direct sunlight and moisture.',
    nutritional_facts: [
      'Energy: 385 kcal (per 100g)',
      'Protein: 12g',
      'Carbohydrates: 68g',
      'Total Sugar: 24g',
      'Added Sugar: 12g (Raw Palm Sugar)',
      'Dietary Fibre: 8g',
      'Fat: 7.5g',
      'Saturated Fat: 1.2g',
      'Sodium: 45mg',
      'Calcium: 180mg',
      'Iron: 18mg'
    ],
    faqs: [
      { q: 'What is Ayurmor ABC Latte Mix?', a: 'It is an instant beverage mix made with apple, beetroot, carrot, almond and cashew ingredients, designed for quick preparation with hot milk or water.' },
      { q: 'Does it require boiling?', a: 'No. Add 2-3 teaspoons to hot milk or water, stir well and enjoy.' },
      { q: 'When can I drink it?', a: 'It can be enjoyed during breakfast, office breaks, evening refreshment or whenever you want a quick and satisfying drink.' },
      { q: 'Can children consume it?', a: 'Older children can enjoy it as part of a balanced diet. Parents should check the ingredient list for allergens.' },
      { q: 'Does it contain nuts?', a: 'Yes, almond and cashew are included. People with nut allergies should avoid it or consult a healthcare professional.' }
    ]
  },
  {
    id: 'moringa-soup-premix',
    category: 'Premix Soups',
    title: 'Ayurmor Moringa Premix Soup - Instant Moringa Soup Powder',
    price: 299,
    mrp: 349,
    image: '/Moringo1.jpeg',
    images: ['/Moringo1.jpeg', '/Moringo2.jpeg', '/Moringo3.jpeg', '/Moringo4.jpeg', '/hero_moringa.png'],
    svg_type: 'moringa',
    rating_count: 124,
    tag: 'Ready in 60s',
    net_weight: '100g Pouch',
    servings: 'Up to 20 Servings*',
    tagline: 'The Goodness of Moringa. Ready in Just One Minute.',
    description: 'Enjoy the comforting taste of moringa in a warm, savoury soup that is ready in just one minute. Ayurmor Moringa Premix Soup is crafted for busy lifestyles - simply add hot water, stir well and enjoy a light, satisfying soup at home, work or while travelling.',
    benefits: [
      'Ready in 60 seconds (no cooking required)',
      'Warm, savoury, herbal and comforting flavour',
      'Convenient light snack for home, office & travel',
      'Easy way to enjoy moringa as part of everyday food habits',
      'Suitable for office, travel and evening use'
    ],
    ingredients: 'Pure Moringa Oleifera leaf powder, Roasted cumin powder, Black salt, Lemon peel powder, Ginger powder, Black pepper, Rock salt, Spices & Herbs. Allergen advice: Processed in a facility handling milk solids, gluten, soy or nuts.',
    allergen: 'Processed in a facility handling milk solids, gluten, soy or nuts.',
    usage_instructions: 'Empty one serving into a cup. Add 180-200 ml hot water. Stir well until completely dissolved. Let stand for 1 minute if needed. Serve hot.',
    taste_profile: 'Warm, savoury, herbal, comforting and light.',
    perfect_for: 'Office desk breaks, light evening snacks, travel comfort, rainy day warmth.',
    storage: 'Store in a cool, dry place. Use a dry spoon. Reseal tightly after opening. Avoid moisture and direct sunlight.',
    nutritional_facts: [
      'Energy: 320 kcal (per 100g)',
      'Protein: 22g',
      'Carbohydrates: 48g',
      'Total Sugar: 2.5g',
      'Added Sugar: 0g (Zero Added Sugar)',
      'Fat: 4.8g',
      'Sodium: 850mg (Lab Verified)',
      'Dietary Fibre: 12g',
      'Iron: 25mg'
    ],
    faqs: [
      { q: 'Is this an instant soup?', a: 'Yes. Add hot water, stir well and enjoy.' },
      { q: 'Does it require cooking?', a: 'No. It is designed for quick preparation without cooking.' },
      { q: 'When can I consume it?', a: 'It can be enjoyed as a morning refreshment, evening snack, office break beverage or light soup between meals.' },
      { q: 'Is it travel-friendly?', a: 'Yes. The compact pack makes it convenient for travel and office use.' },
      { q: 'Is moringa good for daily food habits?', a: 'Moringa is widely appreciated as a nutrient-rich plant and can be enjoyed as part of a balanced diet.' }
    ]
  },
  {
    id: 'choco-multigrain-millet-malt',
    category: 'Instant Malt Drinks',
    title: 'Ayurmor Choco Multigrain Millet Malt Mix - Instant Chocolate Millet Drink',
    price: 299,
    mrp: 349,
    image: '/hero_choco.png',
    images: ['/hero_choco.png', '/Choco1.jpeg', '/Choco2.jpeg'],
    svg_type: 'choco',
    rating_count: 182,
    tag: 'Family Favorite',
    net_weight: '100g Pouch',
    servings: 'Up to 20 Servings*',
    tagline: 'Wholesome Millet Goodness with a Delicious Chocolate Twist.',
    description: 'Ayurmor Choco Multigrain Millet Malt Mix brings together carefully selected millets with rich chocolate flavour. Ready in less than a minute, it mixes easily with hot milk or water and makes a creamy, satisfying drink for breakfast, evening refreshment or daily family routines.',
    benefits: [
      'Delicious chocolate flavour with rich cocoa strength',
      'Made with sprouted multigrain millet ingredients',
      'Instant preparation — no boiling required',
      'Smooth and creamy taste with comforting millet body',
      'Suitable for older children, students, working professionals & families'
    ],
    ingredients: 'Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Cocoa powder, Almond powder, Milk solids, Natural sugar, Cardamom.',
    allergen: 'Contains milk solids and nuts (Almond powder). Processed in a facility handling milk, gluten, soy or nuts.',
    usage_instructions: 'Add 2-3 teaspoons (10g) to 150-200 ml hot milk. Stir until smooth. For a lighter drink, use warm water. Add sweetener only if desired.',
    taste_profile: 'Rich chocolate, creamy, smooth and comforting with millet-based body.',
    perfect_for: 'Kids post-school energy drink, active breakfast, office break, evening chocolate boost for adults.',
    storage: 'Store in a cool, dry place. Reseal tightly after opening. Avoid moisture.',
    nutritional_facts: [
      'Energy: 360 kcal (per 100g) | 36 kcal (per serving)',
      'Protein: 14g (per 100g) | 1.4g (per serving)',
      'Carbohydrates: 65g (per 100g) | 6.5g (per serving)',
      'Total Sugar: 20g (per 100g) | 2.0g (per serving)',
      'Added Sugar: 10g (per 100g) | 1.0g (per serving)',
      'Dietary Fibre: 9g (per 100g) | 0.9g (per serving)',
      'Total Fat: 5.5g (per 100g) | 0.55g (per serving)',
      'Sodium: 60mg (per 100g) | 6mg (per serving)',
      'Calcium: 410mg (per 100g) | 41mg (per serving)'
    ],
    faqs: [
      { q: 'Is it an instant drink?', a: 'Yes. Mix with hot milk or hot water and stir well.' },
      { q: 'Does it require boiling?', a: 'No. It is designed for instant preparation.' },
      { q: 'Can children consume it?', a: 'Older children can enjoy it as part of a balanced diet. Parents should check the ingredient list for allergens.' },
      { q: 'Is it only for children?', a: 'No. It can be enjoyed by students, working professionals, families and adults as a warm chocolate malt drink.' },
      { q: 'Can I drink it with water?', a: 'Yes, but hot milk gives a richer and creamier taste.' }
    ]
  },
  {
    id: 'mushroom-premix-soup',
    category: 'Premix Soups',
    title: 'Ayurmor Mushroom Premix Soup - Cream of Mushroom Soup Powder',
    price: 299,
    mrp: 349,
    image: '/Mushroom3.jpeg',
    images: ['/Mushroom3.jpeg', '/Mushroom1.jpeg', '/Mushroom2.jpeg', '/Mushroom4.jpeg'],
    svg_type: 'mushroom',
    rating_count: 110,
    tag: 'New Launch',
    net_weight: '100g Pouch',
    servings: 'Up to 20 Servings*',
    tagline: 'Goodness in Every Sip! Creamy • Delicious • Nourishing.',
    description: 'Ayurmor Mushroom Premix Soup Powder is a rich, creamy, and nourishing instant soup blend crafted with real oyster mushrooms, onion, garlic, black pepper, and aromatic herbs. Designed for everyday wellness and busy lifestyles, it delivers authentic comfort and warmth in just minutes — simply add hot water, stir well, and enjoy a wholesome cup without any added MSG or artificial colors.',
    benefits: [
      'Rich in Protein & Dietary Fiber from real Oyster Mushrooms',
      '100% Natural with No Added MSG & No Preservatives',
      'Instant & Easy — ready in 60 seconds, just add hot water',
      'Traditional Indian flavor with garlic, onion & black pepper',
      'Creamy, wholesome & deeply satisfying for anytime hunger'
    ],
    ingredients: 'Oyster mushroom powder, Onion powder, Garlic powder, Black pepper powder, Natural herbs & spices, Roasted cumin, Rock salt, Corn starch base.',
    allergen: 'Processed in a hygiene-controlled facility handling milk solids, gluten & nuts.',
    usage_instructions: 'Take 2 tbsp (20g) of soup powder in a cup or bowl. Add 150-180 ml hot water. Stir well & mix without lumps. Delicious hot soup is ready to enjoy! Garnish & relish.',
    taste_profile: 'Creamy, earthy, mildly savoury with warm garlic, black pepper and aromatic herbal notes.',
    perfect_for: 'Evening snack, office breaks, rainy day warmth, light dinner starter, healthy family refreshment.',
    storage: 'Store in a cool, dry place. Use a dry spoon. Reseal tightly after opening. Avoid direct sunlight and moisture.',
    nutritional_facts: [
      'Energy: 340 kcal (per 100g)',
      'Protein: 18g',
      'Carbohydrates: 52g',
      'Total Sugar: 3.0g',
      'Added Sugar: 0g (Zero Added Sugar)',
      'Total Fat: 3.2g',
      'Dietary Fiber: 10g',
      'Sodium: 780mg',
      'Iron: 14mg'
    ],
    faqs: [
      { q: 'What is Ayurmor Mushroom Premix Soup?', a: 'It is an instant, creamy gourmet soup mix made with real oyster mushrooms, garlic, onion, and herbs for quick preparation with hot water.' },
      { q: 'Does it require cooking or boiling?', a: 'No boiling needed! Simply add hot water (150-180 ml) to 2 tablespoons (20g), stir well until smooth, and enjoy.' },
      { q: 'Does it contain added MSG or artificial colors?', a: 'No, Ayurmor Mushroom Premix Soup has zero added MSG, zero preservatives, and no artificial colors.' },
      { q: 'What are the benefits of Oyster Mushrooms?', a: 'Oyster mushrooms are a natural source of protein, dietary fiber, essential vitamins, and antioxidants that support daily vitality and immunity.' },
      { q: 'When is the best time to consume it?', a: 'It is ideal as an office desk break, light evening refreshment, post-work comfort drink, or pre-dinner warm starter.' }
    ]
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const { addToCart, buyNow, openCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ing' | 'use' | 'nut' | 'rev'>('desc');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Product Reviews & Ratings States
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState({
    total: 0,
    average: 5.0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newHoverRating, setNewHoverRating] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState('');

  const fetchReviews = async (pid: string) => {
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(pid)}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
        if (data.stats) setReviewStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (!newName.trim() || !newTitle.trim() || !newReviewText.trim()) {
      setReviewErrorMsg('Please fill in your name, review headline, and detailed feedback.');
      return;
    }

    setSubmittingReview(true);
    setReviewErrorMsg('');
    setReviewSuccessMsg('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          name: newName,
          email: newEmail,
          location: newLocation || 'Verified Buyer',
          rating: newRating,
          title: newTitle,
          review: newReviewText
        })
      });

      const data = await res.json();
      if (data.success) {
        setReviewSuccessMsg('Thank you! Your rating & review has been published successfully.');
        setNewTitle('');
        setNewReviewText('');
        setNewName('');
        setNewEmail('');
        setNewLocation('');
        setNewRating(5);
        setShowReviewForm(false);
        await fetchReviews(product.id);
      } else {
        setReviewErrorMsg(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err: any) {
      setReviewErrorMsg(err.message || 'Submission error. Please check connection.');
    } finally {
      setSubmittingReview(false);
    }
  };

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
      } else if (pidStr === '4' || pidStr.includes('mushroom') || pidStr.includes('cream-of-mushroom')) {
        found = DEFAULT_PRODUCTS.find(p => p.svg_type === 'mushroom');
      }
    }

    if (found) {
      setProduct(found);
      setSelectedImage(found.image || found.images?.[0] || '/hero_moringa.png');
      fetchReviews(found.id);
    } else {
      fetchReviews(pidStr);
      // 3. API fetch fallback
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
          if (data && (data.id || data.title)) {
            const fallbackImg = data.image || (
              data.svg_type === 'abc' ? '/hero_abc.png' :
              data.svg_type === 'choco' ? '/hero_choco.png' :
              data.svg_type === 'mushroom' ? '/Mushroom3.jpeg' :
              '/Moringo1.jpeg'
            );
            const fallbackImages = data.images || (
              data.svg_type === 'abc' 
                ? ['/hero_abc.png', '/ABC1.jpeg', '/ABC2.jpeg', '/ABC3.jpeg', '/ABC4.jpeg']
                : data.svg_type === 'choco'
                ? ['/hero_choco.png', '/Choco1.jpeg', '/Choco2.jpeg']
                : data.svg_type === 'mushroom'
                ? ['/Mushroom3.jpeg', '/Mushroom1.jpeg', '/Mushroom2.jpeg', '/Mushroom4.jpeg']
                : ['/Moringo1.jpeg', '/Moringo2.jpeg', '/Moringo3.jpeg', '/Moringo4.jpeg', '/hero_moringa.png']
            );
            setProduct({
              id: String(data.id || productId),
              category: data.category || 'Instant Food Mixes',
              title: data.title || 'Ayurmor Wellness Mix',
              price: Number(data.price || 299),
              image: fallbackImg,
              images: fallbackImages,
              svg_type: data.svg_type || 'moringa',
              rating_count: data.rating_count || 100,
              tag: data.tag || 'FSSAI Registered',
              description: data.description,
              benefits: typeof data.benefits === 'string' ? data.benefits.split('\n') : (data.benefits || []),
              ingredients: data.ingredients,
              usage_instructions: data.usage_instructions,
              nutritional_facts: typeof data.nutrition === 'string' ? data.nutrition.split('\n') : (data.nutritional_facts || [])
            });
            setSelectedImage(fallbackImg);
          } else {
            setProduct(DEFAULT_PRODUCTS[0]);
            setSelectedImage(DEFAULT_PRODUCTS[0].image || '/hero_abc.png');
          }
        })
        .catch(() => {
          setProduct(DEFAULT_PRODUCTS[0]);
          setSelectedImage(DEFAULT_PRODUCTS[0].image || '/hero_abc.png');
        });
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F4F8FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0080FF]" />
      </div>
    );
  }

  const galleryList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || '/hero_moringa.png'];

  const currentImg = selectedImage || product.image || galleryList[0];
  const activeIndex = galleryList.indexOf(currentImg) !== -1 ? galleryList.indexOf(currentImg) : 0;

  const handlePrevImage = () => {
    const prevIdx = (activeIndex - 1 + galleryList.length) % galleryList.length;
    setSelectedImage(galleryList[prevIdx]);
  };

  const handleNextImage = () => {
    const nextIdx = (activeIndex + 1) % galleryList.length;
    setSelectedImage(galleryList[nextIdx]);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    buyNow(product, quantity);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-900 font-sans">
      {/* Header Announcement & Navbar */}
      <Navbar 
        onOpenCart={openCart} 
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
          
          {/* Left: Product Image Display Stage + Multi-Image Carousel */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-[#F4F8FC] rounded-3xl overflow-hidden border border-slate-200 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center group shadow-inner">
              {/* Subtle top gradient overlay */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none z-10" />

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

              {/* Left Carousel Arrow */}
              {galleryList.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-[#0A192F] hover:bg-[#0080FF] hover:text-white transition-all duration-200"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Right Carousel Arrow */}
              {galleryList.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-[#0A192F] hover:bg-[#0080FF] hover:text-white transition-all duration-200"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Image Counter Indicator */}
              {galleryList.length > 1 && (
                <span className="absolute bottom-4 z-20 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                  {activeIndex + 1} / {galleryList.length}
                </span>
              )}

              {/* Product Image - 100% Full Cover Stage */}
              <img
                src={currentImg}
                alt={`${product.title} view ${activeIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
              />
            </div>

            {/* Horizontal Multi-Image Carousel / Sequence Thumbnail Strip */}
            {galleryList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
                {galleryList.map((imgUrl, idx) => {
                  const isSelected = imgUrl === currentImg;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 shadow-sm ${
                        isSelected 
                          ? 'border-[#0080FF] ring-2 ring-[#0080FF]/30 scale-105 shadow-md' 
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
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

              {/* Review Stars & Trust Badges Strip (Page 9 Report Requirement) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <a href="#customer-reviews" className="flex items-center gap-2 text-amber-500 text-sm hover:underline cursor-pointer">
                  <div className="flex items-center">
                    {"★★★★★".split("").map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                  </div>
                  <span className="text-slate-800 text-xs font-bold">
                    {reviewStats.average} ({reviewStats.total > 0 ? reviewStats.total : product.rating_count} Customer Reviews)
                  </span>
                </a>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded-full border border-emerald-200">
                    🟢 100% Veg
                  </span>
                  <span className="text-[10px] bg-sky-50 text-[#0080FF] font-extrabold px-2.5 py-1 rounded-full border border-sky-200">
                    ⚡ Instant Mix
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full border border-slate-200">
                    🔥 No Boiling
                  </span>
                </div>
              </div>

              {/* Price & Pack Size Display */}
              <div className="flex items-baseline justify-between py-3 border-y border-slate-100 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold text-[#0A192F]">
                    Rs. {product.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    Rs. {product.mrp || 349}
                  </span>
                </div>
                
                <div className="text-right">
                  <span className="text-xs font-bold text-[#0A192F] bg-slate-100 px-3 py-1 rounded-full border border-slate-200 block mb-1">
                    📦 {product.net_weight || '100g Pouch'} ({product.servings || 'Up to 20 Servings*'})
                  </span>
                  <span className="text-[10px] text-[#0080FF] font-bold">
                    FREE Shipping on Prepaid Orders
                  </span>
                </div>
              </div>

              {/* Tagline & Short Description */}
              {product.tagline && (
                <p className="text-xs font-bold uppercase tracking-wider text-[#0080FF] mb-2">
                  {product.tagline}
                </p>
              )}
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Taste Profile & Perfect For (Page 9 & 10 Recommendation) */}
              {(product.taste_profile || product.perfect_for) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200">
                  {product.taste_profile && (
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A192F] block mb-0.5">Taste Profile:</span>
                      <p className="text-xs text-slate-700 font-medium">{product.taste_profile}</p>
                    </div>
                  )}
                  {product.perfect_for && (
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A192F] block mb-0.5">Perfect For:</span>
                      <p className="text-xs text-slate-700 font-medium">{product.perfect_for}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Health & Convenience Benefits List */}
              {product.benefits && (
                <div className="space-y-2.5 mb-8">
                  <h4 className="font-serif font-bold text-sm text-[#0A192F]">Why You Will Love It:</h4>
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

        {/* Detailed Specification Tabs: Ingredients, Directions, Nutrition, Storage & FAQ */}
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
              Ingredients & Allergens
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
              Nutritional Facts & Storage
            </button>
            <button 
              onClick={() => setActiveTab('faq' as any)}
              className={`pb-3 transition-all relative whitespace-nowrap ${
                activeTab === ('faq' as any) ? 'text-[#0080FF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0080FF]' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
            >
              Product FAQ
            </button>
          </div>

          <div className="text-sm leading-relaxed text-slate-800 font-light min-h-[160px]">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p className="text-base">{product.description}</p>

                {/* Storage Instructions Box */}
                {product.storage && (
                  <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
                    <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider mb-1">📌 Storage Instructions</h4>
                    <p className="text-xs text-amber-900 leading-relaxed font-medium">{product.storage}</p>
                  </div>
                )}

                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-xs text-[#0080FF] uppercase tracking-wider mb-2">Manufacturing & Quality Assurance</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Manufactured by:</strong> <strong className="text-[#0A192F] font-extrabold">Saish Technofarms</strong> (FSSAI Reg. No. 21224169000054 & ISO 9001:2015 Certified).<br />
                    <strong>Marketed by:</strong> <strong className="text-[#0080FF] font-extrabold">Zeyora Global Trading Co.</strong>, Tiruchengode – 637211 (FSSAI No. 124250140000673, GSTIN: 33AEQPT6920G1Z6).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ing' && (
              <div className="space-y-4">
                <div className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#0A192F]">Complete Ingredient Declaration (Descending Order by Weight):</h4>
                  <p className="text-sm italic text-slate-800">{product.ingredients}</p>
                </div>

                {product.allergen && (
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-xs text-red-800">
                    <strong>⚠️ Allergen Advice:</strong> {product.allergen}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'use' && (
              <div className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-serif font-bold text-base text-[#0A192F]">Step-by-Step 60-Second Preparation:</h4>
                <p className="text-sm text-slate-800 font-medium">{product.usage_instructions}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 font-bold text-[#0A192F]">1. Add 2-3 tsp / 1 sachet</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 font-bold text-[#0A192F]">2. Add 150-200ml hot liquid</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 font-bold text-[#0A192F]">3. Stir 15s & Enjoy Warm</div>
                </div>
              </div>
            )}

            {activeTab === 'nut' && (
              <div className="space-y-4">
                {/* Serving Size & Pack Info */}
                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 text-xs space-y-2.5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-md">
                      <span className="font-bold text-[#0080FF] uppercase tracking-wider block mb-0.5">Serving Size Suggestion:</span>
                      <span className="text-slate-800 font-semibold leading-relaxed">3 g to 10 g, approximately 1 to 3 teaspoons per cup, based on taste preference.</span>
                    </div>
                    <div className="shrink-0">
                      <span className="font-bold text-[#0080FF] uppercase tracking-wider block mb-0.5">Servings Per Pack:</span>
                      <span className="text-slate-800 font-semibold">Up to 20 servings*</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-2 border-t border-sky-100/80">
                    *Based on an average 5 g serving per cup. Actual servings may vary depending on quantity used.
                  </p>
                </div>

                <div className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-serif font-bold text-base text-[#0A192F] mb-4">Nutritional Facts Declaration (Per 100g & Per Serving):</h4>
                  {product.nutritional_facts ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.nutritional_facts.map((n, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-[#76BC21] shrink-0" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">Nutritional facts available on pouch label.</p>
                  )}
                </div>

                {/* Storage instruction */}
                {product.storage && (
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
                    <strong>📌 Storage Guidelines:</strong> {product.storage}
                  </div>
                )}

                {/* Product Level Disclaimer (Page 17 Standard) */}
                <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Standard Product Disclaimer:</strong> "This is a food product intended to complement a balanced diet. It is not intended to diagnose, treat, cure or prevent any disease."
                </div>
              </div>
            )}

            {activeTab === ('faq' as any) && (
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-[#0A192F] mb-3">Frequently Asked Questions for {product.title}:</h4>
                {product.faqs && product.faqs.length > 0 ? (
                  <div className="space-y-3">
                    {product.faqs.map((f, i) => (
                      <div key={i} className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200">
                        <h5 className="font-bold text-sm text-[#0A192F] mb-1">Q: {f.q}</h5>
                        <p className="text-xs text-slate-700 font-light leading-relaxed">A: {f.a}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No specific FAQs for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Dedicated Customer Reviews & Ratings Section (Below Spec Tabs Card) */}
        <section id="customer-reviews" className="bg-white rounded-3xl border border-slate-200 shadow-premium-lg p-6 sm:p-10 mb-16 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[#76BC21] text-xs font-extrabold uppercase tracking-widest bg-[#76BC21]/10 px-3.5 py-1 rounded-full border border-[#76BC21]/20 inline-block mb-1">
                Verified Customer Feedback
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A192F]">
                Customer Ratings & Reviews
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-3 bg-[#0080FF] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#0066CC] transition-all shadow-md active:scale-95 inline-flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <span>{showReviewForm ? 'Cancel Review' : '✍️ Write a Review'}</span>
            </button>
          </div>

          {/* Rating Summary Header */}
          <div className="bg-[#F4F8FC] p-6 sm:p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score Column */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6 space-y-2">
              <span className="text-xs font-bold text-[#76BC21] uppercase tracking-wider">Overall Customer Score</span>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="font-serif text-5xl font-bold text-[#0A192F]">{reviewStats.average}</span>
                <span className="text-slate-400 font-semibold text-sm">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-light">Based on {reviewStats.total} verified customer reviews</p>
            </div>

            {/* Star Rating Breakdown Bars */}
            <div className="md:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviewStats.breakdown[star] || 0;
                const percentage = reviewStats.total > 0 ? Math.round((count / reviewStats.total) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold text-slate-700 flex items-center gap-1 shrink-0">
                      {star} <Star className="w-3.5 h-3.5 text-amber-400 fill-current inline" />
                    </span>
                    <div className="flex-grow bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-slate-500 font-mono font-medium">{count} ({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review Success / Error Messages */}
          {reviewSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{reviewSuccessMsg}</span>
            </div>
          )}
          {reviewErrorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl text-xs font-semibold">
              {reviewErrorMsg}
            </div>
          )}

          {/* Interactive Rating & Review Submission Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#0080FF]/30 shadow-xl space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg text-[#0A192F]">Rate & Review {product.title}</h4>
                <p className="text-xs text-slate-500 font-light">Share your genuine experience with other customers.</p>
              </div>

              {/* Interactive 5 Star Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Your Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setNewHoverRating(star)}
                      onMouseLeave={() => setNewHoverRating(0)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          (newHoverRating || newRating) >= star
                            ? 'text-amber-400 fill-current'
                            : 'text-slate-300'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="ananya@gmail.com"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, KA"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline / Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Very comforting taste and easy 1-minute prep!"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none font-semibold text-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe how you prepare it, taste feedback, texture, packaging, or health benefits..."
                  value={newReviewText}
                  onChange={e => setNewReviewText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="px-8 py-3.5 bg-[#0080FF] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#0066CC] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {submittingReview ? 'Submitting Review...' : 'Submit Rating & Review'}
              </button>
            </form>
          )}

          {/* Customer Reviews Feed List */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#0A192F]">Customer Reviews ({reviews.length})</h4>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r, idx) => (
                  <div key={r.id || idx} className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0A192F] text-amber-300 font-serif font-bold text-xs flex items-center justify-center shadow">
                          {r.name ? r.name.substring(0, 2).toUpperCase() : 'CU'}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-[#0A192F] flex items-center gap-1.5">
                            {r.name}
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                            </span>
                          </h5>
                          <p className="text-[11px] text-slate-500 font-light">
                            {r.location || 'Verified Customer'} • {r.created_at || 'Recent Purchase'}
                          </p>
                        </div>
                      </div>

                      {/* Star rating display */}
                      <div className="flex items-center gap-1 text-amber-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        {[...Array(Number(r.rating) || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <span className="text-xs font-bold text-slate-800 ml-1">{r.rating}.0</span>
                      </div>
                    </div>

                    <div>
                      <h6 className="font-bold text-sm text-[#0A192F] mb-1">"{r.title}"</h6>
                      <p className="text-xs text-slate-700 leading-relaxed font-light whitespace-pre-wrap">{r.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F4F8FC] rounded-2xl border border-slate-200 text-slate-500 text-xs">
                No customer reviews submitted yet for this product. Be the first to rate & review!
              </div>
            )}
          </div>
        </section>

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
