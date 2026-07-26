'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, X, Clock, User, CheckCircle2 } from 'lucide-react';

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
    category: 'Indian Ingredients',
    title: 'Why Millets and Moringa Are Returning to Modern Indian Diets',
    summary: 'Discover how traditional ingredients like sprouted millets and moringa are being reimagined into convenient instant malt drinks and 60-second soups.',
    readTime: '4 min read',
    author: 'Ayurmor Editorial Desk',
    date: 'July 20, 2026',
    image: '/hero_moringa.png',
    content: {
      intro: 'Traditional Indian kitchens long valued whole millets and moringa leaves for everyday food habits. Modern lifestyles require convenience, which is why instant malt drinks and premix soups are making these foods accessible again.',
      keyPoints: [
        {
          title: 'The Value of Traditional Indian Ingredients',
          text: 'Millets such as Ragi, Bajra, and Foxtail millet offer familiar taste, comforting texture, and wholesome daily food value.'
        },
        {
          title: 'Moringa Leaf Goodness',
          text: 'Pure Moringa Oleifera leaf powder combined with gentle herbs provides a warm, satisfying soup experience without lengthy cooking.'
        },
        {
          title: 'Modern Convenience for Busy Routines',
          text: 'Ayurmor combines these classic ingredients into 60-second mixes that fit seamlessly into office, home, and travel routines.'
        }
      ],
      conclusion: 'Reconnecting with traditional ingredients through modern instant formats makes everyday wellness simple and enjoyable.'
    }
  },
  {
    id: 'blog-2',
    category: 'Daily Snacking',
    title: 'Healthy Evening Snacks: Instant Soups and Malt Drinks for Busy Days',
    summary: 'Swap heavy fried snacks for warm, savoury moringa premix soups or delicious chocolate millet malts.',
    readTime: '3 min read',
    author: 'Ayurmor Food Desk',
    date: 'July 18, 2026',
    image: '/hero_abc.png',
    content: {
      intro: 'Evening hunger between lunch and dinner often leads to quick snack choices. Light, warm instant soups and malt drinks offer a comforting alternative.',
      keyPoints: [
        {
          title: 'Light Evening Warm Refreshment',
          text: 'A 60-second cup of Moringa Premix Soup provides a warm, savoury pause during office desk breaks.'
        },
        {
          title: 'Family-Friendly Malt Drinks',
          text: 'Ayurmor ABC Latte Mix and Choco Multigrain Millet Malt provide delicious warm drinks for kids, students, and working adults.'
        },
        {
          title: 'Quick Preparation Anywhere',
          text: 'Just add hot water or hot milk, stir well, and enjoy anywhere — no boiling or cooking required.'
        }
      ],
      conclusion: 'Smart evening routines start with light, warm, convenient choices that taste great and fit your schedule.'
    }
  },
  {
    id: 'blog-3',
    category: 'Healthy Habits',
    title: '5 Simple Daily Food Habits for Busy Professionals and Families',
    summary: 'Practical daily routines to integrate instant wellness mixes into your breakfast, office desk breaks, and family routines.',
    readTime: '5 min read',
    author: 'Ayurmor Wellness Team',
    date: 'July 15, 2026',
    image: '/hero_choco.png',
    content: {
      intro: 'Sustainable food habits are built on simple, repeatable choices rather than complicated diet plans.',
      keyPoints: [
        {
          title: 'Warm Morning Drink',
          text: 'Start your morning with a glass of ABC Latte Mix made with apple, beetroot, carrot, almonds, and cashews.'
        },
        {
          title: 'Desk-Friendly Office Snack',
          text: 'Keep Moringa premix soup sachets in your desk drawer for a quick 1-minute warm break.'
        },
        {
          title: 'Family Evening Drink',
          text: 'Serve warm Choco Multigrain Millet Malt to kids after school or sports.'
        }
      ],
      conclusion: 'Small everyday habits create long-term satisfaction and convenience for your whole family.'
    }
  },
  {
    id: 'blog-4',
    category: 'Quality & Safety',
    title: 'How Ayurmor Checks Quality: Ingredients, FSSAI, Packaging and Storage',
    summary: 'Inside our FSSAI-registered manufacturing and quality control standards at Saish Technofarms.',
    readTime: '4 min read',
    author: 'Quality Assurance Team',
    date: 'July 12, 2026',
    image: '/hero_moringa.png',
    content: {
      intro: 'At Saish Technofarms (Ayurmor), quality is guided by strict manufacturing, hygienic processing, and transparent ingredient labelling.',
      keyPoints: [
        {
          title: 'Carefully Selected Sourcing',
          text: 'We carefully select ingredients, including moringa, millets, fruits, nuts, and spices from verified suppliers.'
        },
        {
          title: 'FSSAI Registration & ISO 9001:2015 Standards',
          text: 'Manufactured under FSSAI Reg. No. 21224169000054 with ISO 9001:2015 Quality Management System oversight.'
        },
        {
          title: 'Hygienic Packaging & Clear Labelling',
          text: 'All packs display full ingredient declarations, allergen statements, expiry dates, and batch information.'
        }
      ],
      conclusion: 'Transparent labelling and quality standards build confidence and trust with every Ayurmor product.'
    }
  },
  {
    id: 'blog-5',
    category: 'Product Focus',
    title: 'ABC Malt Powder: Apple, Beetroot and Carrot in One Instant Drink',
    summary: 'Learn how ABC Latte Mix brings together dehydrated apple, beetroot, carrot, almond and cashew for everyday wellness.',
    readTime: '3 min read',
    author: 'Ayurmor Product Desk',
    date: 'July 10, 2026',
    image: '/hero_abc.png',
    content: {
      intro: 'ABC (Apple, Beetroot, Carrot) is famous for its vibrant taste and wholesome nutrients. Ayurmor brings it to you as an instant malt powder for milk or hot water.',
      keyPoints: [
        {
          title: 'Real Fruit & Vegetable Powder',
          text: 'Combines dehydrated apple, beetroot, and carrot powder with sprouted millet base and raw palm sugar.'
        },
        {
          title: 'Nutty Comfort',
          text: 'Blended with real almond and cashew powder for a rich, satisfying mouthfeel.'
        },
        {
          title: 'No Boiling Required',
          text: 'Stir 2-3 teaspoons in 150-200 ml hot milk or water. Ready in under 60 seconds.'
        }
      ],
      conclusion: 'A convenient, delicious beverage mix for breakfast, office breaks, and family routines.'
    }
  },
  {
    id: 'blog-6',
    category: 'Product Focus',
    title: 'Moringa Soup for Office Breaks: A Warm One-Minute Snack Idea',
    summary: 'Why office professionals love keeping Moringa Premix Soup sachets at their desks.',
    readTime: '3 min read',
    author: 'Ayurmor Wellness Team',
    date: 'July 08, 2026',
    image: '/hero_moringa.png',
    content: {
      intro: 'Long work hours at the desk call for light, comforting warm breaks. Ayurmor Moringa Premix Soup offers a savoury 60-second alternative.',
      keyPoints: [
        {
          title: 'Instant 60-Second Preparation',
          text: 'Just pour hot water from the office water dispenser, stir briskly, and enjoy warm.'
        },
        {
          title: 'Herbal & Zesty Spice Blend',
          text: 'Crafted with roasted cumin, black salt, lemon peel powder, ginger, and black pepper.'
        },
        {
          title: 'Light & Satisfying',
          text: 'A light savory snack option that fits busy workday schedules.'
        }
      ],
      conclusion: 'Keep a pouch in your desk drawer for a quick, comforting office break.'
    }
  }
];

export default function BlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section className="py-20 px-6 bg-[#F4F8FC]" id="blogs">
      <div className="max-width-1200 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0080FF] bg-[#0080FF]/10 px-3.5 py-1 rounded-full border border-[#0080FF]/20 inline-flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Ayurmor Wellness Knowledge Base
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
            Insights & Guides for Healthy Living
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
            Explore expert articles on Ayurvedic ingredients, healthy snacking tips, habit building, and our certified quality standards.
          </p>
        </div>

        {/* Blog Cards Grid - Full 100% Width Image Display Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOGS.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-premium-sm hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* 100% Full Width Card Image Stage */}
              <div className="h-52 w-full relative overflow-hidden bg-[#F4F8FC]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 left-3 bg-[#0A192F] text-sky-300 text-[10px] font-extrabold px-3 py-1 rounded-full shadow border border-[#0080FF]/30 tracking-wider">
                  {blog.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#0080FF]" />
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0A192F] group-hover:text-[#0080FF] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-light">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0080FF] group-hover:text-[#0066CC]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#0A192F] text-white p-6 relative border-b border-[#0080FF]/20">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-sky-300 bg-white/10 px-3 py-1 rounded-full border border-sky-400/20">
                  {selectedBlog.category}
                </span>
                <h2 className="font-serif text-2xl font-bold mt-3 leading-snug text-white">
                  {selectedBlog.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-sky-200/90 mt-3 font-light">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedBlog.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedBlog.readTime}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-800 leading-relaxed">
                <p className="text-base font-serif italic text-[#0A192F] bg-[#F4F8FC] p-4 rounded-xl border-l-4 border-[#0080FF]">
                  "{selectedBlog.content.intro}"
                </p>

                <div className="space-y-4 pt-2">
                  {selectedBlog.content.keyPoints.map((point, idx) => (
                    <div key={idx} className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200 space-y-1">
                      <h4 className="font-serif font-bold text-base text-[#0A192F] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#76BC21] flex-shrink-0" />
                        {point.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 pl-6 leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <h4 className="font-bold text-xs text-[#0080FF] uppercase tracking-wider mb-1">In Summary</h4>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium">
                    {selectedBlog.content.conclusion}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#F4F8FC] border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-6 py-2 bg-[#0080FF] text-white text-xs font-bold uppercase rounded-full hover:bg-[#0066CC] transition-colors shadow"
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
