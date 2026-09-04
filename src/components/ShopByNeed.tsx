'use client';

import { motion } from 'framer-motion';
import { 
  Coffee, 
  Soup, 
  Heart, 
  Briefcase, 
  Plane, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const ROUTINES = [
  {
    title: 'Morning Drink',
    subtitle: 'ABC Latte Mix',
    desc: 'Apple, beetroot & carrot with almonds & cashews',
    icon: Coffee,
    badge: 'Breakfast Boost',
    color: 'from-[#FFEBE5] to-[#FFD5C6]'
  },
  {
    title: 'Green Detox Soup',
    subtitle: 'Moringa Premix',
    desc: 'Warm, savoury 60-second soup for post-work comfort',
    icon: Soup,
    badge: 'Light Snack',
    color: 'from-[#EEF5F1] to-[#D5E6DC]'
  },
  {
    title: 'Creamy Gourmet',
    subtitle: 'Mushroom Soup',
    desc: 'Rich oyster mushroom with garlic & herbs',
    icon: Soup,
    badge: 'Evening Comfort',
    color: 'from-[#FBF8F3] to-[#EADBCE]'
  },
  {
    title: 'Family Malt',
    subtitle: 'Choco Multigrain',
    desc: 'Chocolate sprouted millet malt for kids & adults',
    icon: Heart,
    badge: 'Family Daily Use',
    color: 'from-[#FDFBF7] to-[#EADBCE]'
  },
  {
    title: 'Office Break',
    subtitle: 'Instant Soups',
    desc: 'Quick 1-minute warm refreshment at your desk',
    icon: Briefcase,
    badge: 'Instant Convenience',
    color: 'from-[#EBF3FA] to-[#D4E4F5]'
  },
  {
    title: 'Travel Friendly',
    subtitle: 'All Instant Mixes',
    desc: 'No boiling required, just add hot water or milk',
    icon: Plane,
    badge: 'Easy Pack',
    color: 'from-[#F5EFE6] to-[#E8DCB8]'
  }
];



const HOW_IT_WORKS = [
  { step: '1', title: 'Add Mix to Cup', text: 'Add 2-3 teaspoons or 1 soup sachet into your favourite cup.' },
  { step: '2', title: 'Add Hot Milk or Water', text: 'Pour 150-200 ml of hot milk (for malts) or hot water (for soups).' },
  { step: '3', title: 'Stir Well', text: 'Stir briskly for 10-15 seconds until completely smooth. No boiling needed.' },
  { step: '4', title: 'Enjoy Warm', text: 'Savour a warm, nourishing cup at home, work or on the go.' }
];

export default function ShopByNeed() {
  return (
    <section className="py-20 px-6 bg-[#F4F8FC] border-y border-slate-200/80">
      <div className="max-width-1200 mx-auto space-y-20">
        
        {/* 1. Shop By Need / Routine Selector */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0080FF] bg-[#0080FF]/10 px-3.5 py-1 rounded-full border border-[#0080FF]/20 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0080FF]" /> Daily Life Routines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
              Shop by Everyday Need
            </h2>
            <p className="text-slate-600 text-sm mt-3 font-light">
              Choose your Ayurmor routine: Morning Drink, Green Detox Soup, Creamy Mushroom Soup, Family Malt, Office Break or Travel-Friendly Mix.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {ROUTINES.map((r, i) => {
              const IconComp = r.icon;
              return (
                <a
                  key={i}
                  href="#products"
                  className={`p-6 rounded-3xl bg-gradient-to-b ${r.color} border border-slate-200 shadow-sm hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#0A192F] flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-[#0080FF]" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-white/70 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {r.badge}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#0A192F]">{r.title}</h3>
                    <p className="text-xs font-semibold text-[#0080FF] mt-0.5">{r.subtitle}</p>
                    <p className="text-xs text-slate-700 mt-2 font-light leading-relaxed">{r.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#0A192F] group-hover:text-[#0080FF]">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 2. How It Works Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-premium-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#76BC21] bg-[#76BC21]/10 px-3.5 py-1 rounded-full border border-[#76BC21]/20 inline-flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> No Boiling Required
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A192F]">
              How Ayurmor Preparation Works
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 font-light">
              Enjoy fresh, warm, wholesome malt drinks and premix soups in less than a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, idx) => (
              <div key={idx} className="bg-[#F4F8FC] p-6 rounded-2xl border border-slate-200 relative group hover:border-[#0080FF]/40 transition-colors">
                <span className="w-9 h-9 rounded-full bg-[#0080FF] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow">
                  {item.step}
                </span>
                <h4 className="font-serif font-bold text-base text-[#0A192F] mb-1">{item.title}</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>



        {/* 4. Delivery & Customer Support Assurance Strip */}
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#0080FF]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0080FF] text-white flex items-center justify-center shrink-0 shadow">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Prepaid Free Shipping Nationwide</h4>
              <p className="text-xs text-sky-200/80 font-light">Fast dispatch across all PIN codes in India.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917483849998"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white text-xs font-bold uppercase rounded-full hover:bg-[#1eb956] shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
