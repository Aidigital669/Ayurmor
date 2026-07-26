'use client';

import { Sparkles, CupSoda, Flame, Heart, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Add Mix to Cup',
      desc: 'Scoop 2-3 teaspoons (15-20g) of Ayurmor mix into your favorite cup or bowl.',
      icon: '🥄',
      tag: 'Step 1'
    },
    {
      step: '02',
      title: 'Add Hot Milk or Water',
      desc: 'Pour 180-200ml of hot milk for malt drinks or warm water for savoury soups.',
      icon: '🥛',
      tag: 'Step 2'
    },
    {
      step: '03',
      title: 'Stir Well for 10 Sec',
      desc: 'Stir briskly until completely smooth. No boiling or long cooking required!',
      icon: '🥣',
      tag: 'Step 3'
    },
    {
      step: '04',
      title: 'Sip & Enjoy Everyday',
      desc: 'Sip warm and nourishing goodness for breakfast, office breaks, or evening snacks.',
      icon: '✨',
      tag: 'Step 4'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F4F8FC] to-white border-b border-slate-200">
      <div className="max-width-1200 mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#0080FF] text-xs font-extrabold uppercase tracking-widest bg-[#0080FF]/10 px-4 py-1.5 rounded-full border border-[#0080FF]/20 inline-block mb-3">
            Simple 60-Second Routine
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F] mb-3">
            How Ayurmor Works
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Crafted for busy daily routines. No boiling, no hassle — just pure, delicious nourishment ready in under a minute.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-slate-200 group-hover:text-[#0080FF] transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold text-[#76BC21] bg-[#76BC21]/10 px-2.5 py-0.5 rounded-full border border-[#76BC21]/20">
                    {item.tag}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#F4F8FC] border border-slate-200 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0A192F] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-[#76BC21] font-bold">
                <CheckCircle2 className="w-4 h-4" /> Ready in 60 seconds
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
