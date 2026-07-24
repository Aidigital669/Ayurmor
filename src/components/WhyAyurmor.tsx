'use client';

import { Check, X, ShieldCheck, Sparkles, Heart, Zap } from 'lucide-react';

export default function WhyAyurmor() {
  return (
    <section className="py-20 px-6 bg-[#F4F8FC]" id="values">
      <div className="max-width-1200 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0080FF] bg-[#0080FF]/10 px-3.5 py-1 rounded-full border border-[#0080FF]/20 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0080FF]" /> Everyday Convenience & Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
            Why Ayurmor Fits Modern Lifestyles
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
            Ayurmor brings together thoughtfully selected ingredients, instant preparation and familiar Indian flavours to make everyday wellness simple.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0080FF] flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              🌾
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-3">Traditional Grains & Millets</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-light">
              Millets and grains are valued traditional foods. Where sprouted ingredients are used, they are processed carefully to support taste, texture and everyday food value.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-lime-50 text-[#76BC21] flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              🍃
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-3">Balanced Sweetness</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-light">
              Balanced sweetness, where applicable. Please check each product label for complete sugar, jaggery or sweetener details and nutrition information.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 relative group overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0080FF] flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-3">Quick 60-Second Prep</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-light">
              Quick 60-second preparation. Mix with hot milk or hot water, stir well and enjoy a satisfying, comforting cup at home, office or while travelling.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-premium-lg overflow-hidden">
          <div className="bg-[#0A192F] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[#0080FF]/20">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">Ayurmor Instant Mixes vs What Customers Look For</h3>
              <p className="text-sky-200/80 text-xs mt-1">See how Ayurmor meets daily nutrition, taste and convenience expectations</p>
            </div>
            <span className="text-xs bg-[#76BC21] text-white font-extrabold px-3.5 py-1.5 rounded-full shadow border border-lime-300/30">
              FSSAI Reg. No. 21224169000054
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#E2EAF4] border-b border-slate-200 text-[#0A192F] uppercase font-bold text-[11px] tracking-wider">
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5 bg-sky-50 text-[#0080FF] font-extrabold text-center w-1/3 border-x border-[#0080FF]/10">
                    🌿 Ayurmor Instant Mixes
                  </th>
                  <th className="p-4 sm:p-5 text-slate-600 text-center w-1/3">
                    What Customers Usually Look For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/5 text-charcoal font-medium">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0A192F]">Preparation</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> Quick prep with hot milk or water</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 text-center">Less time, less effort</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0A192F]">Ingredient Clarity</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> Clear ingredient list on each product page</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 text-center">Transparency before purchase</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0A192F]">Use Cases</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> Home, office, travel, breakfast & evening</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 text-center">Easy daily use</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0A192F]">Taste & Texture</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> Familiar Indian flavours with modern ease</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 text-center">Healthy should still taste good</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0A192F]">Trust & Compliance</td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-[#0F3D2E] font-bold text-center">
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-600" /> FSSAI details & quality checked packaging</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 text-center">Safe and reliable product experience</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
