'use client';

import { Sparkles, Leaf, Check } from 'lucide-react';

export default function IngredientTransparency() {
  const ingredients = [
    {
      name: 'Fresh Apples',
      subtitle: 'Dehydrated Apple Powder',
      benefits: 'Rich in dietary fiber & natural fruity sweetness',
      icon: '🍎',
      category: 'ABC Latte Mix'
    },
    {
      name: 'Beetroot',
      subtitle: 'Pure Beet Powder',
      benefits: 'Supports healthy blood circulation & daily stamina',
      icon: '🪴',
      category: 'ABC Latte Mix'
    },
    {
      name: 'Carrot',
      subtitle: 'Beta-Carotene Rich Powder',
      benefits: 'Essential nutrients for eye health & immunity',
      icon: '🥕',
      category: 'ABC Latte Mix'
    },
    {
      name: 'Moringa Leaf',
      subtitle: 'Pure Moringa Oleifera',
      benefits: 'High protein, iron & essential antioxidants',
      icon: '🌿',
      category: 'Moringa Soup'
    },
    {
      name: 'Sprouted Millets',
      subtitle: 'Ragi, Bajra & Foxtail Millet',
      benefits: 'Sprouted for maximum digestive absorption',
      icon: '🌾',
      category: 'Choco Malt'
    },
    {
      name: 'Pure Cocoa',
      subtitle: 'Natural Dutch Cocoa',
      benefits: 'Rich chocolate flavor loved by kids & adults',
      icon: '🍫',
      category: 'Choco Malt'
    },
    {
      name: 'Almonds & Cashews',
      subtitle: 'Crushed Nut Blend',
      benefits: 'Good fats, protein & natural creaminess',
      icon: '🥜',
      category: 'ABC & Choco'
    },
    {
      name: 'Wellness Mushroom',
      subtitle: 'Button Mushroom Extract',
      benefits: 'Rich earthy soup flavor & immune support',
      icon: '🍄',
      category: 'Mushroom Soup'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-width-1200 mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#76BC21] text-xs font-extrabold uppercase tracking-widest bg-[#76BC21]/10 px-4 py-1.5 rounded-full border border-[#76BC21]/20 inline-block mb-3">
            100% Label Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F] mb-3">
            Real Ingredients, Nothing to Hide
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every sachet is packed with real food ingredients sourced from trusted farms. No artificial chemicals, no hidden fillers.
          </p>
        </div>

        {/* 8 Ingredient Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ingredients.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#F4F8FC] rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#0080FF] bg-[#0080FF]/10 px-2.5 py-0.5 rounded-full border border-[#0080FF]/20">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0A192F] mb-1">
                  {item.name}
                </h3>
                <span className="text-xs font-semibold text-slate-500 block mb-3">
                  {item.subtitle}
                </span>
                <p className="text-slate-600 text-xs leading-relaxed font-light">
                  {item.benefits}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] font-bold text-[#76BC21]">
                <Check className="w-3.5 h-3.5" /> 100% Pure & Natural
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
