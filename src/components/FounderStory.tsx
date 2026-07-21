'use client';

import { Heart, Sparkles, Shield, Compass } from 'lucide-react';

export default function FounderStory() {
  return (
    <section className="py-20 px-6 bg-[#F5EFE6] relative overflow-hidden" id="about">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F3D2E]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-width-1200 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-premium-lg border border-[#0F3D2E]/10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0F3D2E] text-amber-300 flex items-center justify-center shadow-lg mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage block">Our Foundation</span>
              <h3 className="font-serif text-2xl font-bold text-forest leading-snug">
                "Rooted in Tradition. Crafted for the World."
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Bridging ancient Ayurvedic botanical wisdom with modern daily convenience to nourish every Indian household.
              </p>

              <div className="pt-4 border-t border-[#0F3D2E]/10 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F3D2E] flex items-center justify-center font-bold text-xs">
                    🌱
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#0F3D2E]">100% Purity</h5>
                    <p className="text-[10px] text-sage-grey">No chemicals</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                    🌾
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#0F3D2E]">Sprouted Millets</h5>
                    <p className="text-[10px] text-sage-grey">Maximum bio-value</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0F3D2E]/5 rounded-2xl border border-[#0F3D2E]/10 text-xs text-[#0F3D2E] font-medium flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#0F3D2E] flex-shrink-0" />
                <span>Manufactured under FSSAI License Reg. No: <strong>21224169000054</strong></span>
              </div>
            </div>

            {/* Back card overlay */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#0F3D2E] rounded-3xl -z-0 opacity-90 hidden sm:block" />
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3 py-1 rounded-full border border-terracotta/20 inline-flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Founder's Story & Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                Reimagining Traditional Indian Nutrition for Everyday Modern Life
              </h2>
            </div>

            <div className="space-y-4 text-sm md:text-base text-charcoal/85 leading-relaxed font-light">
              <p className="font-serif italic text-lg text-[#0F3D2E] font-medium border-l-4 border-sage pl-4 py-1">
                Ayurmor was founded with a clear purpose—to bring the timeless wisdom of nature to modern lifestyles through thoughtfully crafted, premium nutrition.
              </p>
              
              <p>
                India has long been home to nourishing ingredients such as millets, mushrooms, herbs, and botanicals that have supported generations with wholesome nourishment. As fast-paced food habits evolved, many of these traditional super-ingredients became less common in everyday urban diets.
              </p>

              <p>
                We saw an opportunity to reimagine them in a way that is convenient, highly enjoyable, and completely relevant for today's health-conscious consumers.
              </p>

              <p>
                That vision became <strong>Ayurmor</strong>—a brand committed to creating high-quality, value-added food products inspired by nature and guided by uncompromised quality, authenticity, and scientific innovation.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center font-serif font-bold text-lg">
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
                Crafted with Purity & Authentic Heritage
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
