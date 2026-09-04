'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    category: "Instant Wellness Mixes for Modern Daily Routines",
    title: "Ayurmor Instant Wellness Mixes",
    subtitle: "ABC Malt Powder for Everyday Nourishment",
    tagline: "Ayurmor ABC Malt Powder is an instant wellness beverage made with apple, beetroot, carrot, almonds and cashews. It mixes easily with hot milk or water to create a smooth, satisfying drink for breakfast, evening refreshment or daily routines.",
    badge: "Natural Goodness. Instant Convenience.",
    bgColor: "from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]",
    image: "/hero_abc.png"
  },
  {
    id: 2,
    category: "Instant Premix Soup",
    title: "Ayurmor Moringa Premix Soup",
    subtitle: "Instant Moringa Soup Powder",
    tagline: "Enjoy the comforting taste of moringa in a warm, savoury soup that is ready in just one minute. Ayurmor Moringa Premix Soup is crafted for busy lifestyles - simply add hot water, stir well and enjoy a light, satisfying soup at home, work or while travelling.",
    badge: "Ready in 60s",
    bgColor: "from-[#EEF5F1] via-[#D0E2D7] to-[#88B29C]",
    image: "/hero_moringa.png"
  },
  {
    id: 3,
    category: "Instant Chocolate Malt",
    title: "Ayurmor Choco Multigrain Millet Malt",
    subtitle: "Instant Chocolate Millet Drink",
    tagline: "Ayurmor Choco Multigrain Millet Malt Mix brings together carefully selected millets with rich chocolate flavour. Ready in less than a minute, it mixes easily with hot milk or water and makes a creamy, satisfying drink for breakfast, evening refreshment or daily routines.",
    badge: "Everyday Wellness",
    bgColor: "from-[#FDFBF7] via-[#EADBCE] to-[#AC8C7D]",
    image: "/hero_choco.png"
  },
  {
    id: 4,
    category: "Instant Gourmet Soup",
    title: "Ayurmor Mushroom Premix Soup",
    subtitle: "Cream of Mushroom Soup Powder",
    tagline: "Rich, creamy, and wholesome oyster mushroom soup blended with garlic and aromatic herbs. Ready in 60 seconds with zero added MSG for comfort in every sip.",
    badge: "New Launch",
    bgColor: "from-[#FBF8F3] via-[#EFE6DB] to-[#D5C2AF]",
    image: "/Mushroom3.jpeg"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[600px] sm:min-h-[85vh] w-full overflow-hidden group py-12 sm:py-16" id="home">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${activeSlide.bgColor} -z-10`}
        />
      </AnimatePresence>

      <div className="max-width-1200 mx-auto px-6 h-full flex items-center min-h-[500px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 z-10 text-center lg:text-left">
            <motion.div
              key={`badge-${activeSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#0080FF] bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full shadow-sm border border-[#0080FF]/20 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#76BC21]" />
                {activeSlide.badge} • {activeSlide.category}
              </span>
            </motion.div>

            <motion.h1
              key={`title-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A192F] leading-tight"
            >
              {activeSlide.title}
            </motion.h1>
            <motion.h2
              key={`subtitle-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-2xl sm:text-3xl font-sans text-[#0A192F]/80 font-normal mt-2"
            >
              {activeSlide.subtitle}
            </motion.h2>

            <motion.p
              key={`tagline-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
            >
              {activeSlide.tagline}
            </motion.p>

            <motion.div
              key={`buttons-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#products"
                className="px-7 py-3.5 bg-[#0080FF] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#0066CC] shadow-premium-lg transition-all duration-300 flex items-center gap-2"
              >
                <span>Shop Wellness Mixes</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#products"
                className="px-6 py-3.5 bg-white/90 hover:bg-white text-[#0A192F] font-bold text-xs uppercase tracking-wider rounded-full border border-[#0080FF]/20 shadow-sm transition-all duration-300 hover:text-[#0080FF]"
              >
                Explore Soups & Malt Drinks
              </a>

              <a
                href="#values"
                className="px-6 py-3.5 bg-white/70 hover:bg-white text-slate-700 font-bold text-xs uppercase tracking-wider rounded-full border border-slate-300/40 shadow-xs transition-all duration-300 hover:text-[#0080FF]"
              >
                View Quality Promise
              </a>
            </motion.div>
          </div>

          {/* Product Image Stage */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              key={`img-${activeSlide.id}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 3 }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-80 sm:w-80 sm:h-96 flex items-center justify-center overflow-hidden bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-2xl"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.subtitle}
                className="w-full h-full object-cover filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/60 hover:bg-white text-[#0F3D2E] flex items-center justify-center shadow border border-white/80 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/60 hover:bg-white text-[#0F3D2E] flex items-center justify-center shadow border border-white/80 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-[#0F3D2E]' : 'w-2.5 bg-[#0F3D2E]/20 hover:bg-[#0F3D2E]/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
