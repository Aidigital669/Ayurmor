'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, X, Clock, User, CheckCircle2, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  content: {
    intro: string;
    keyPoints: { title: string; text: string }[];
    conclusion: string;
  };
}

const BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    category: 'Ayurvedic Heritage',
    title: 'Why Traditional Indian Ingredients Still Matter Today',
    summary: 'Discover how millets, native herbs, and botanicals offer sustainable, bio-available nutrition for modern busy lives.',
    readTime: '4 min read',
    author: 'Ayurmor Wellness Team',
    date: 'July 20, 2026',
    image: '/hero_moringa.png',
    content: {
      intro: 'For centuries, traditional Indian kitchens relied on whole millets, therapeutic spices, wild botanicals, and functional herbs to maintain vitality and immunity. In recent decades, processed refined grains took over, leading to widespread nutrient gaps. Today, a wellness renaissance is bringing these superfoods back.',
      keyPoints: [
        {
          title: 'The Heritage of Indian Nutrition',
          text: 'Sprouted finger millet (Ragi), pearl millet (Bajra), and foxtail millet are rich in natural calcium, dietary fiber, and complex carbohydrates that keep blood sugar steady.'
        },
        {
          title: 'Botanicals & Functional Herbs',
          text: 'Wild-crafted Moringa leaves, roasted cumin, black pepper, and cardamom enhance digestion (Agni) and accelerate cellular detox without reliance on synthetic supplements.'
        },
        {
          title: 'Blending Tradition with Modern Convenience',
          text: 'Ayurmor reimagines these age-old ingredients into instant 10-second soup mixes and daily lattes so you can enjoy authentic wellness without hours of grinding or boiling.'
        }
      ],
      conclusion: 'Reconnecting with traditional Indian ingredients is not just a trend—it is a sustainable, time-tested approach to lifelong vigor and preventive health.'
    }
  },
  {
    id: 'blog-2',
    category: 'Daily Nutrition',
    title: 'Healthy Snacking Without Compromise',
    summary: 'Swap sugary energy drinks and refined snacks for nutrient-dense, sprouted malt drinks and instant herbal soups.',
    readTime: '3 min read',
    author: 'Dr. Wellness Desk',
    date: 'July 18, 2026',
    image: '/hero_abc.png',
    content: {
      intro: 'Mid-afternoon energy crashes often lead to unhealthy impulse snacking on refined sugars and fried foods. Smart snacking isn’t about eating less—it’s about choosing nutrient-dense foods that nourish your cells.',
      keyPoints: [
        {
          title: 'Why Healthy Snacks Matter',
          text: 'Consuming clean protein, wholesome fiber, and natural minerals between meals prevents glucose spikes, sharpens mental focus, and supports weight management.'
        },
        {
          title: 'Nutrient Density Over Empty Calories',
          text: 'Our ABC Malt (Apple, Beetroot, Carrot) and Choco Millet Malt deliver organic iron, natural cocoa polyphenols, and essential minerals without a single gram of refined sugar.'
        },
        {
          title: 'On-the-Go Convenience',
          text: 'Whether you are at your office desk, traveling, or preparing your kids for school, instant warm malts and soups offer instant nourishment in under 15 seconds.'
        }
      ],
      conclusion: 'Snack smarter by fueling your body with clean, natural ingredients that taste delicious and support long-term metabolic health.'
    }
  },
  {
    id: 'blog-3',
    category: 'Lifestyle & Habits',
    title: 'Building Better Eating Habits—One Small Step at a Time',
    summary: 'Simple, actionable micro-habits to transform your daily energy, digestion, and hydration routines effortlessly.',
    readTime: '5 min read',
    author: 'Ayurmor Health Coach',
    date: 'July 15, 2026',
    image: '/hero_choco.png',
    content: {
      intro: 'Drastic diets rarely last. Sustainable health comes from small, repeatable daily habits that naturally integrate into your existing lifestyle.',
      keyPoints: [
        {
          title: 'Start Your Morning Warm',
          text: 'Begin your day with a warm cup of ABC Malt or Moringa Soup to kickstart digestion, awaken your digestive fire, and rehydrate after night hours.'
        },
        {
          title: 'Prioritize Whole Foods Over Extracts',
          text: 'Whenever possible, choose whole sprouted millets, real fruit powders, and almonds over chemical isolate powders.'
        },
        {
          title: 'Consistent Meal Intervals',
          text: 'Avoid skipping meals. Pairing a nutrient-dense warm malt drink with your morning routine provides steady fuel for active minds.'
        }
      ],
      conclusion: 'Focus on progress over perfection. One wholesome choice each morning creates momentum toward lifelong well-being.'
    }
  },
  {
    id: 'blog-4',
    category: 'Quality & Science',
    title: 'Our Uncompromising Commitment to Quality at Ayurmor',
    summary: 'Inside our FSSAI-registered & ISO 9001:2015 certified process—from ethical sourcing to packaging freshness.',
    readTime: '4 min read',
    author: 'Quality Assurance Head',
    date: 'July 12, 2026',
    image: '/hero_moringa.png',
    content: {
      intro: 'At Saish Technofarms (Ayurmor), quality is not an afterthought—it is the foundation of everything we craft. From farm sourcing to final sealed pouch, every batch undergoes rigorous quality testing.',
      keyPoints: [
        {
          title: 'Ethical & Pure Sourcing',
          text: 'We source 100% wild-crafted Moringa leaves, sprouted ancient millets, and raw cocoa directly from trusted growers committed to clean cultivation.'
        },
        {
          title: 'ISO 9001:2015 & FSSAI Standards',
          text: 'Operating under FSSAI Reg. No. 21224169000054 and ISO 9001:2015 certification (QCCI/25Q/SES/5850), our facility follows strict hygienic repacking & quality protocols.'
        },
        {
          title: 'Preserving Bio-Activity & Freshness',
          text: 'We use gentle, low-temperature milling to protect sensitive enzymes, vitamins, and natural aromas, sealed in moisture-barrier food-grade packaging.'
        }
      ],
      conclusion: 'When you choose Ayurmor, you are bringing certified purity, safety, and authentic wellness into your home.'
    }
  }
];

export default function BlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section className="py-20 px-6 bg-white" id="blogs">
      <div className="max-width-1200 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sage bg-sage/10 px-3.5 py-1 rounded-full border border-sage/20 inline-flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Ayurmor Wellness Knowledge Base
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Insights & Guides for Healthy Living
          </h2>
          <p className="text-sage-grey text-sm mt-3 leading-relaxed font-light">
            Explore expert articles on Ayurvedic ingredients, healthy snacking tips, habit building, and our certified quality standards.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOGS.map((blog) => (
            <div
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className="bg-[#FDFBF7] border border-forest/10 rounded-2xl overflow-hidden shadow-premium-sm hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="h-44 bg-cream/60 p-4 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-3 left-3 bg-[#0F3D2E] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  {blog.category}
                </span>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-28 h-32 object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-sage-grey mb-2 font-medium">
                    <Clock className="w-3 h-3 text-sage" />
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-forest group-hover:text-sage transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 line-clamp-2 mt-2 leading-relaxed font-light">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-forest/5 flex items-center justify-between text-xs font-bold text-forest group-hover:text-sage">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedBlog(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-forest/10 overflow-hidden z-10 my-8 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#0F3D2E] text-white p-6 relative">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-amber-300/20">
                  {selectedBlog.category}
                </span>
                <h2 className="font-serif text-2xl font-bold mt-3 leading-snug text-white">
                  {selectedBlog.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-emerald-200/90 mt-3 font-light">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedBlog.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedBlog.readTime}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-charcoal leading-relaxed">
                <p className="text-base font-serif italic text-[#0F3D2E] bg-cream/60 p-4 rounded-xl border-l-4 border-[#0F3D2E]">
                  "{selectedBlog.content.intro}"
                </p>

                <div className="space-y-4 pt-2">
                  {selectedBlog.content.keyPoints.map((point, idx) => (
                    <div key={idx} className="bg-cream/30 p-4 rounded-2xl border border-forest/5 space-y-1">
                      <h4 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0" />
                        {point.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal/80 pl-6 leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#0F3D2E]/5 rounded-2xl border border-[#0F3D2E]/10">
                  <h4 className="font-bold text-xs text-[#0F3D2E] uppercase tracking-wider mb-1">In Summary</h4>
                  <p className="text-xs sm:text-sm text-[#0F3D2E]/90 font-medium">
                    {selectedBlog.content.conclusion}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-cream/40 border-t border-forest/10 flex justify-end">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-6 py-2 bg-[#0F3D2E] text-white text-xs font-bold uppercase rounded-full hover:bg-terracotta hover:text-forest transition-colors shadow"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
