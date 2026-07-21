'use client';

import { Check, X, ShieldCheck, Sparkles, Heart, Zap } from 'lucide-react';

export default function WhyAyurmor() {
  return (
    <section className="py-20 px-6 bg-[#FDFBF7]" id="values">
      <div className="max-width-1200 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full border border-terracotta/20 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Clean Science & Botanical Purity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Why Choose Ayurmor Health Mixes?
          </h2>
          <p className="text-sage-grey text-sm mt-3 leading-relaxed font-light">
            Compare our 100% natural sprouted malts & herbal soups against ordinary sugary market health drinks.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-forest/10 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0F3D2E] flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              🌾
            </div>
            <h3 className="font-serif text-xl font-bold text-forest mb-3">Sprouted Ancient Grains</h3>
            <p className="text-xs text-charcoal/80 leading-relaxed font-light">
              Sprouting unlocks dormant digestive enzymes, neutralizing anti-nutrients and increasing bio-available calcium, iron, and dietary fiber by up to 300%.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-forest/10 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              🚫
            </div>
            <h3 className="font-serif text-xl font-bold text-forest mb-3">Zero Refined Sugars</h3>
            <p className="text-xs text-charcoal/80 leading-relaxed font-light">
              Sweetened naturally with raw palm sugar, real fruit crystals, or savory Ayurvedic spices. No artificial corn syrup, maltodextrin, or hidden sugars.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-forest/10 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="font-serif text-xl font-bold text-forest mb-3">Instant 10-Second Warm Prep</h3>
            <p className="text-xs text-charcoal/80 leading-relaxed font-light">
              Micro-milled to dissolve effortlessly in hot water or warm milk. Enjoy a comforting, nutrient-dense cup at home, work, or on the go in 10 seconds.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-forest/10 shadow-premium-lg overflow-hidden">
          <div className="bg-[#0F3D2E] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">Ayurmor vs. Ordinary Market Health Drinks</h3>
              <p className="text-emerald-200/80 text-xs mt-1">See the difference natural ingredients and certified quality make</p>
            </div>
            <span className="text-xs bg-amber-400 text-[#0F3D2E] font-extrabold px-3 py-1.5 rounded-full shadow">
              FSSAI Reg: 21224169000054
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-cream/40 border-b border-forest/10 text-forest uppercase font-bold text-[11px] tracking-wider">
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5 bg-emerald-50/80 text-[#0F3D2E] font-extrabold text-center w-1/3">
                    🌿 Ayurmor Wellness
                  </th>
                  <th className="p-4 sm:p-5 text-gray-400 text-center w-1/3">
                    Ordinary Market Drinks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/5 text-charcoal font-medium">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-forest">Ingredient Sourcing</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> 100% Organic & Wild-Crafted</span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400 text-center">Synthetic & Industrial Solvents</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-forest">Added Refined Sugars</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> ZERO Refined Sugar</span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400 text-center">Up to 60% Refined Sugar / Maltodextrin</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-forest">Grains & Processing</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> Sprouted Millets & Raw Cocoa</span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400 text-center">Processed Wheat Flour & Artificial Flavors</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-forest">Quality Certification</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> ISO 9001:2015 & FSSAI Certified</span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400 text-center">Basic Commercial Standards</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-forest">Preservatives & Additives</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> 100% Chemical-Free</span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400 text-center">Artificial Colors & Chemical Preservatives</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
