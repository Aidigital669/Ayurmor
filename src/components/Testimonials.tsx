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
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    quote: "I absolutely love the Moringa Premix Soup! It is so refreshing, warming, and healthy. It takes only a minute to prepare and keeps me energized throughout my long working day. Perfect for my evening snack routine!",
    name: "Priya Sharma",
    title: "Verified Buyer",
    location: "Bengaluru, Karnataka",
    rating: 5,
    productUsed: "Moringa Premix Soup",
    avatar: "PS"
  },
  {
    id: 2,
    quote: "I've been drinking the Choco Multigrain Millet Malt daily, and it's delicious! The rich dark cocoa flavor makes it super tasty while the sprouted millets keep it highly nutritious. Even my kids ask for it every morning!",
    name: "Rahul Kulkarni",
    title: "Fitness Enthusiast",
    location: "Pune, Maharashtra",
    rating: 5,
    productUsed: "Choco Multigrain Millet Malt",
    avatar: "RK"
  },
  {
    id: 3,
    quote: "The ABC Malt Powder is my absolute favorite. The mix of apple, beetroot, and carrot with raw almonds and cashews tastes amazing. Plus, no need to boil — it's super convenient for my busy morning commute!",
    name: "Aisha Mohammed",
    title: "Working Professional",
    location: "Hyderabad, Telangana",
    rating: 5,
    productUsed: "ABC Malt Powder",
    avatar: "AM"
  },
  {
    id: 4,
    quote: "Finding authentic sprouted millet malts without refined sugar was tough until I found Ayurmor. Clean, high quality ingredients and lightning fast delivery across India!",
    name: "Suresh Hegde",
    title: "Verified Buyer",
    location: "Mangaluru, Karnataka",
    rating: 5,
    productUsed: "Choco Millet & ABC Malt",
    avatar: "SH"
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
        <div className="flex justify-center gap-2 mt-8">
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

      </div>
    </section>
  );
}
