'use client';

import { useState } from 'react';
import { ShieldCheck, Check, Info, FileText } from 'lucide-react';

export default function ProductLabelGallery() {
  const [activeTab, setActiveTab] = useState<'abc' | 'moringa' | 'choco'>('abc');

  const labelData = {
    abc: {
      title: 'Ayurmor ABC Latte Mix',
      subtitle: 'Apple, Beetroot, Carrot with Almond & Cashew',
      frontImg: '/ABC1.jpeg',
      backImg: '/ABC2.jpeg',
      netWeight: '200g Pouch / 20 Servings',
      fssai: 'FSSAI Reg. No. 21224169000054',
      ingredients: 'Dehydrated Apple Powder, Beetroot Powder, Carrot Powder, Almond Powder, Cashew Powder, Sprouted Ragi Base, Cardamom, Palm Sugar.',
      nutrition: [
        { label: 'Energy', val: '385 kcal' },
        { label: 'Protein', val: '12.0g' },
        { label: 'Carbohydrates', val: '68.0g' },
        { label: 'Dietary Fiber', val: '8.2g' },
        { label: 'Calcium', val: '180mg' }
      ]
    },
    moringa: {
      title: 'Ayurmor Moringa Premix Soup',
      subtitle: 'Shade-Dried Moringa Leaf with Cumin & Rock Salt',
      frontImg: '/Moringo1.jpeg',
      backImg: '/Moringo2.jpeg',
      netWeight: '150g Pouch / 15 Servings',
      fssai: 'FSSAI Reg. No. 21224169000054',
      ingredients: 'Pure Moringa Leaf Powder, Roasted Cumin Powder, Black Salt, Lemon Peel Powder, Ginger Powder, Black Pepper, Spices & Herbs.',
      nutrition: [
        { label: 'Energy', val: '320 kcal' },
        { label: 'Protein', val: '22.0g' },
        { label: 'Carbohydrates', val: '48.0g' },
        { label: 'Dietary Fiber', val: '12.5g' },
        { label: 'Iron', val: '25mg' }
      ]
    },
    choco: {
      title: 'Ayurmor Choco Multigrain Millet Malt',
      subtitle: 'Sprouted Millets with Dutch Cocoa Powder',
      frontImg: '/Choco1.jpeg',
      backImg: '/Choco2.jpeg',
      netWeight: '200g Pouch / 20 Servings',
      fssai: 'FSSAI Reg. No. 21224169000054',
      ingredients: 'Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Dutch Cocoa Powder, Almond Powder, Milk Solids, Sugar.',
      nutrition: [
        { label: 'Energy', val: '360 kcal' },
        { label: 'Protein', val: '14.0g' },
        { label: 'Carbohydrates', val: '65.0g' },
        { label: 'Dietary Fiber', val: '9.0g' },
        { label: 'Calcium', val: '410mg' }
      ]
    }
  };

  const current = labelData[activeTab];

  return (
    <section className="py-16 sm:py-20 bg-[#F4F8FC] border-b border-slate-200">
      <div className="max-width-1200 mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#0080FF] text-xs font-extrabold uppercase tracking-widest bg-[#0080FF]/10 px-4 py-1.5 rounded-full border border-[#0080FF]/20 inline-block mb-3">
            Real Packaging Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F] mb-3">
            Inspect Product Labels & FSSAI Details
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            See the actual front and back label photography, verified ingredient breakdowns, and official FSSAI registration info.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('abc')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
              activeTab === 'abc' 
                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-md' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            🍎 ABC Latte Mix
          </button>
          <button
            onClick={() => setActiveTab('moringa')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
              activeTab === 'moringa' 
                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-md' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            🌿 Moringa Soup
          </button>
          <button
            onClick={() => setActiveTab('choco')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
              activeTab === 'choco' 
                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-md' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            🍫 Choco Millet
          </button>
        </div>

        {/* Content Showcase Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-premium-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          
          {/* Packaging Images Column */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-[#F4F8FC] rounded-2xl overflow-hidden border border-slate-200 p-2 shadow-inner group">
              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 inline-block mb-2">
                Front View
              </span>
              <div className="h-64 sm:h-72 overflow-hidden rounded-xl">
                <img 
                  src={current.frontImg} 
                  alt={`${current.title} front packaging`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="bg-[#F4F8FC] rounded-2xl overflow-hidden border border-slate-200 p-2 shadow-inner group">
              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 inline-block mb-2">
                Back Label Details
              </span>
              <div className="h-64 sm:h-72 overflow-hidden rounded-xl">
                <img 
                  src={current.backImg} 
                  alt={`${current.title} back label`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Details & Nutrition Breakdown Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#76BC21]" />
                <span className="text-xs font-bold text-[#76BC21] bg-[#76BC21]/10 px-3 py-0.5 rounded-full border border-[#76BC21]/20">
                  {current.fssai}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-1">
                {current.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 mb-4">
                {current.subtitle} • <span className="text-[#0080FF]">{current.netWeight}</span>
              </p>

              {/* Exact Ingredients Box */}
              <div className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200 mb-6">
                <h4 className="font-serif text-xs font-bold text-[#0A192F] mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#0080FF]" /> Exact Ingredients Listed on Label:
                </h4>
                <p className="text-xs leading-relaxed text-slate-700 italic font-light">
                  "{current.ingredients}"
                </p>
              </div>

              {/* Nutrition Facts Table */}
              <div>
                <h4 className="font-serif text-xs font-bold text-[#0A192F] mb-3 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#76BC21]" /> Nutritional Values (Approx. per 100g):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {current.nutrition.map((item, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center">
                      <span className="text-[10px] text-slate-500 block font-semibold">{item.label}</span>
                      <span className="text-xs font-bold text-[#0A192F]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1 text-[#76BC21]">
                <Check className="w-4 h-4" /> 100% Genuine Quality
              </span>
              <span>Batch & Expiry Date Printed on Pouch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
