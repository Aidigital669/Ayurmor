'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'About Ayurmor',
    question: 'What is Ayurmor?',
    answer: 'Ayurmor is a wellness food brand offering instant malt drinks and premix soups made with carefully selected ingredients for modern daily routines.'
  },
  {
    category: 'Products & Ingredients',
    question: 'Are Ayurmor products made with natural ingredients?',
    answer: 'Ayurmor focuses on carefully selected food ingredients. Please refer to each product label for the complete ingredient list, sweetener information and nutrition details.'
  },
  {
    category: 'Preparation & Usage',
    question: 'Do Ayurmor products require boiling?',
    answer: 'No! Most Ayurmor instant mixes are designed for quick 60-second preparation without lengthy boiling or cooking. Add hot milk or hot water as instructed on the pack, stir well and enjoy.'
  },
  {
    category: 'Dietary & Vegetarian',
    question: 'Are the products vegetarian?',
    answer: 'Yes. Ayurmor products display the green vegetarian symbol on packaging. Please check individual product labels for complete confirmation.'
  },
  {
    category: 'Allergen Information',
    question: 'Do the products contain allergens?',
    answer: 'Some Ayurmor products contain nuts (almonds, cashews), milk solids, cocoa, or gluten depending on the formulation. Always check the ingredient list and allergen statement on each pack before consumption.'
  },
  {
    category: 'Medical Disclaimer',
    question: 'Can I consume Ayurmor products if I have a medical condition?',
    answer: 'If you are pregnant, nursing, have a medical condition or take medication, consult a healthcare professional before consuming any wellness food product.'
  },
  {
    category: 'Orders & Shipping',
    question: 'How does Free Shipping work on Ayurmor orders?',
    answer: 'Free shipping is available on prepaid orders across India as per current website offers. COD availability depends on pincode serviceability.'
  },
  {
    category: 'Storage & Shelf Life',
    question: 'What is the shelf life and storage instruction?',
    answer: 'Manufacturing date, expiry/best-before date and batch details are printed on every pack. Store in a cool, dry place; reseal after opening; use a dry spoon; avoid moisture and direct sunlight.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[#FDFBF7]" id="faq">
      <div className="max-width-1000 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sage bg-sage/10 px-3.5 py-1 rounded-full border border-sage/20 inline-flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Customer Help & Support
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Frequently Asked Questions
          </h2>
          <p className="text-sage-grey text-sm mt-3 leading-relaxed font-light">
            Everything you need to know about our pure botanical blends, certifications, preparation, and delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-forest/10 shadow-premium-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-forest hover:text-sage transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-[#0F3D2E]' : 'text-sage-grey/50'}`} />
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-cream/60 text-forest flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#0F3D2E] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light border-t border-forest/5 bg-cream/20">
                        <p>{faq.answer}</p>
                        <span className="inline-block mt-3 text-[10px] font-bold text-sage uppercase tracking-wider bg-sage/10 px-2.5 py-0.5 rounded">
                          {faq.category}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
