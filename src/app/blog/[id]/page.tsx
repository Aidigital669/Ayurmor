'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  User, 
  CheckCircle2, 
  Share2, 
  ChevronRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          text: 'Our ABC Malt (Apple, Beetroot, Carrot) and Choco Millet Malt deliver natural iron, natural cocoa polyphenols, and essential minerals without a single gram of refined sugar.'
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
          text: 'Operating under FSSAI Reg. No. 21224169000054 and ISO 9001:2015 certification (QCCI/25Q/SES/5850), our facility follows strict hygienic packaging & quality protocols.'
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

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const found = BLOGS.find(b => b.id === blogId);
    if (found) {
      setBlog(found);
    } else {
      setBlog(BLOGS[0]);
    }
  }, [blogId]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F4F8FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0080FF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-900 font-sans">
      <Navbar onOpenCart={() => {}} cartCount={0} wishlistCount={0} />

      <main className="max-width-1200 mx-auto px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0080FF] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/#blogs" className="hover:text-[#0080FF] transition-colors">Health Guides</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0A192F] font-bold">{blog.title}</span>
          </nav>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-bold text-[#0A192F] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:border-[#0080FF] transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>
        </div>

        {/* Blog Hero Header */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-premium-lg overflow-hidden mb-16">
          {/* Featured Full Header Stage */}
          <div className="h-[320px] sm:h-[420px] w-full relative overflow-hidden bg-[#0A192F]">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white space-y-4">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-sky-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-sky-400/30 backdrop-blur">
                {blog.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-4xl text-white">
                {blog.title}
              </h1>
              <div className="flex items-center gap-6 text-xs text-sky-200 font-light pt-2">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#76BC21]" /> {blog.author}</span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0080FF]" /> {blog.readTime}</span>
                <span className="mx-1">•</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-14 max-w-4xl mx-auto space-y-8 text-base text-slate-800 leading-relaxed font-light">
            <p className="text-xl font-serif italic text-[#0A192F] bg-[#F4F8FC] p-6 rounded-2xl border-l-4 border-[#0080FF] shadow-sm">
              "{blog.content.intro}"
            </p>

            <div className="space-y-6 pt-4">
              {blog.content.keyPoints.map((point, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-serif font-bold text-xl text-[#0A192F] flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#76BC21] flex-shrink-0" />
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed pl-7">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 space-y-2">
              <h4 className="font-bold text-xs text-[#0080FF] uppercase tracking-wider">Takeaway & Summary</h4>
              <p className="text-sm text-slate-900 font-medium leading-relaxed">
                {blog.content.conclusion}
              </p>
            </div>

            {/* Author Assurance Box */}
            <div className="p-6 bg-[#0A192F] text-white rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold">Have Questions About Ayurvedic Botanicals?</h4>
                <p className="text-xs text-sky-200 mt-1">Our certified team is happy to guide your wellness journey.</p>
              </div>
              <a 
                href="https://wa.me/917483849998?text=Hi%20Ayurmor!%20I%20have%20a%20question%20about%20your%20health%20guides."
                target="_blank"
                rel="noopener"
                className="px-6 py-3 bg-[#76BC21] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#8ED638] transition-all shadow whitespace-nowrap flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Ask Our Wellness Desk
              </a>
            </div>
          </div>
        </article>

        {/* More Related Articles */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">More Health Guides & Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS.filter(b => b.id !== blog.id).slice(0, 3).map(rel => (
              <Link
                key={rel.id}
                href={`/blog/${rel.id}`}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium-lg transition-all group flex flex-col justify-between"
              >
                <div className="h-44 w-full relative overflow-hidden bg-[#F4F8FC]">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[#0080FF] text-[10px] font-extrabold uppercase tracking-widest">{rel.category}</span>
                    <h4 className="font-serif font-bold text-base text-[#0A192F] group-hover:text-[#0080FF] transition-colors mt-1">{rel.title}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#0080FF] mt-4">
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
