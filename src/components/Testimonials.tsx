'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  productUsed: string;
  avatar: string;
  promptCategory?: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    quote: "I love the Moringa Premix Soup. It is warm, tasty and easy to prepare during office breaks. Perfect for a quick, comforting cup between meetings!",
    name: "Priya Sharma",
    title: "Customer Feedback",
    location: "Bengaluru, Karnataka",
    rating: 5,
    productUsed: "Moringa Premix Soup",
    avatar: "PS",
    promptCategory: "Taste & Preparation"
  },
  {
    id: 2,
    quote: "I've been enjoying the Choco Multigrain Millet Malt drink daily. The rich chocolate taste and sprouted millets make it a great warm drink for the whole family. No boiling needed!",
    name: "Rahul Kulkarni",
    title: "Customer Feedback",
    location: "Pune, Maharashtra",
    rating: 5,
    productUsed: "Choco Multigrain Millet Malt",
    avatar: "RK",
    promptCategory: "Ease of Preparation"
  },
  {
    id: 3,
    quote: "The Ayurmor ABC Latte Mix is smooth and tasty with warm milk. It takes less than a minute to mix, perfect for busy morning routines before work.",
    name: "Aisha Mohammed",
    title: "Customer Feedback",
    location: "Hyderabad, Telangana",
    rating: 5,
    productUsed: "ABC Latte Mix",
    avatar: "AM",
    promptCategory: "Taste & Convenience"
  },
  {
    id: 4,
    quote: "Clear ingredient lists, great packaging, tasty wellness drinks and fast delivery. Highly recommend Ayurmor mixes for daily routines.",
    name: "Suresh Hegde",
    title: "Customer Feedback",
    location: "Mangaluru, Karnataka",
    rating: 5,
    productUsed: "ABC Malt & Moringa Soup",
    avatar: "SH",
    promptCategory: "Packaging & Delivery"
  },
  {
    id: 5,
    quote: "The new Mushroom Premix Soup is delicious and so creamy! Just hot water, stir and you have a restaurant-quality mushroom soup with zero MSG. Perfect evening comfort!",
    name: "Vikram Desai",
    title: "Verified Buyer",
    location: "Mumbai, Maharashtra",
    rating: 5,
    productUsed: "Mushroom Premix Soup",
    avatar: "VD",
    promptCategory: "Taste & Purity"
  }
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const activeReview = REVIEWS[currentIdx];

  return (
    <section className="py-24 px-6 bg-[#F5EFE6]" id="testimonials">
      <div className="max-width-1000 mx-auto text-center relative overflow-hidden">
        
        {/* Header */}
        <span className="text-xs font-bold uppercase tracking-widest text-[#0F3D2E] bg-white/80 px-3.5 py-1 rounded-full border border-[#0F3D2E]/10 inline-flex items-center gap-1.5 mb-3">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Real Customer Stories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-12">
          What Our Community Says
        </h2>

        {/* Animated Review Card */}
        <div className="relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-premium-lg border border-[#0F3D2E]/10 max-w-3xl mx-auto relative"
            >
              <Quote className="w-12 h-12 text-[#0F3D2E]/10 absolute top-4 left-6 pointer-events-none" />
              
              <div className="flex justify-center gap-1 text-amber-400 mb-4">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="font-serif italic text-base sm:text-lg text-charcoal/90 leading-relaxed mb-6">
                "{activeReview.quote}"
              </p>

              <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#0F3D2E]/10">
                <div className="w-11 h-11 rounded-full bg-[#0F3D2E] text-amber-300 font-serif font-bold text-sm flex items-center justify-center shadow">
                  {activeReview.avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[#0F3D2E] text-sm flex items-center gap-1.5">
                    {activeReview.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </h4>
                  <p className="text-xs text-sage-grey">
                    {activeReview.title} • {activeReview.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 mb-12">
          {REVIEWS.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIdx ? 'w-8 bg-[#0F3D2E]' : 'w-2.5 bg-[#0F3D2E]/20 hover:bg-[#0F3D2E]/40'
              }`}
              onClick={() => setCurrentIdx(index)}
              aria-label={`Go to Testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Customer Assurance Strip */}
        <div className="pt-8 border-t border-[#0F3D2E]/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs text-[#0F3D2E] font-medium">
          {["Secure Packaging", "Fast Dispatch", "Responsive Support", "Transparent Ingredients", "Quality Checked", "FSSAI Registered"].map((badge, idx) => (
            <div key={idx} className="bg-white/80 p-3 rounded-2xl border border-[#0F3D2E]/10 flex flex-col items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mb-1" />
              <span>{badge}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
