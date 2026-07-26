'use client';

import { Heart, Sparkles, Shield, Compass, Quote } from 'lucide-react';

export default function FounderStory() {
  return (
    <section className="py-20 px-6 bg-[#F5EFE6] relative overflow-hidden" id="about">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F3D2E]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-width-1200 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28">
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-premium-lg border border-[#0F3D2E]/10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0F3D2E] text-amber-300 flex items-center justify-center shadow-lg mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0080FF] block">Our Foundation</span>
              <h3 className="font-serif text-2xl font-bold text-forest leading-snug">
                "Rooted in Tradition. Crafted for the World."
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Bringing the goodness of traditional Indian ingredients into convenient, modern food formats for everyday lifestyles.
              </p>

              <div className="pt-4 border-t border-[#0F3D2E]/10 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center p-2 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="text-sm mb-1">🌾</span>
                  <h5 className="font-bold text-[11px] text-[#0F3D2E]">Quality-Focused Ingredients</h5>
                </div>

                <div className="flex flex-col items-center text-center p-2 bg-sky-50/60 rounded-xl border border-sky-100">
                  <span className="text-sm mb-1">🔍</span>
                  <h5 className="font-bold text-[11px] text-[#0080FF]">Transparent Product Info</h5>
                </div>

                <div className="flex flex-col items-center text-center p-2 bg-amber-50/60 rounded-xl border border-amber-100">
                  <span className="text-sm mb-1">📦</span>
                  <h5 className="font-bold text-[11px] text-amber-800">Hygienically Packed</h5>
                </div>
              </div>

              <div className="p-4 bg-[#0F3D2E]/5 rounded-2xl border border-[#0F3D2E]/10 text-xs text-[#0F3D2E] font-medium flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#0F3D2E] flex-shrink-0" />
                <span>Manufactured by <strong>Saish Technofarms</strong> under FSSAI Reg. No. <strong>21224169000054</strong></span>
              </div>
            </div>

            {/* Back card overlay */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#0F3D2E] rounded-3xl -z-0 opacity-90 hidden sm:block" />
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0080FF] bg-[#0080FF]/10 px-3.5 py-1 rounded-full border border-[#0080FF]/20 inline-flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Founder & Brand Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                Rooted in Tradition. Crafted for the World.
              </h2>
            </div>

            <div className="space-y-5 text-sm md:text-base text-charcoal/85 leading-relaxed font-light">
              <p className="font-serif italic text-base sm:text-lg text-[#0F3D2E] font-medium border-l-4 border-[#0080FF] pl-4 py-2 bg-white/60 rounded-r-xl shadow-sm">
                Ayurmor was created to make everyday wellness foods simple, tasty and convenient. We combine familiar Indian ingredients such as millets, mushrooms, moringa, fruits, nuts and spices with modern processing and packaging to deliver instant malt drinks and premix soups that fit busy routines.
              </p>

              {/* 3 Clear Structured Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#0A192F] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0080FF] text-white text-xs flex items-center justify-center font-bold">1</span>
                    Our Purpose
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-light">
                    Bringing the goodness of traditional Indian ingredients into convenient, modern food formats for everyday lifestyles.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#0A192F] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#76BC21] text-white text-xs flex items-center justify-center font-bold">2</span>
                    Our Products
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-light">
                    Instant malt drinks and premix soups crafted for modern daily routines - home, office, travel and family refreshment.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#0A192F] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0A192F] text-white text-xs flex items-center justify-center font-bold">3</span>
                    Our Quality Promise
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-light">
                    Carefully selected food ingredients, transparent product labels, FSSAI registration details, and secure packaging.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#0080FF]/20 shadow-sm relative overflow-hidden my-4">
                <Quote className="absolute -top-2 -right-2 w-16 h-16 text-[#0080FF]/10 pointer-events-none" />
                <p className="font-serif font-bold text-forest text-base sm:text-lg italic leading-snug text-[#0F3D2E]">
                  "Ayurmor is created to make everyday wellness foods simple, tasty and convenient for busy modern routines."
                </p>
                <p className="text-right text-xs font-bold tracking-wider uppercase text-[#0080FF] mt-3">
                  — Founder, Ayurmor / Saish Technofarms
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center font-serif font-bold text-lg">
                  ST
                </div>
                <div>
                  <h4 className="font-bold text-forest text-sm">Saish Technofarms</h4>
                  <p className="text-xs text-sage-grey">Uttara Kannada, Karnataka</p>
                </div>
              </div>

              <div className="h-10 w-[1px] bg-forest/15 hidden sm:block" />

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                <Heart className="w-4 h-4 text-emerald-600 fill-current" />
                Crafted with Integrity, Quality & Purpose
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
