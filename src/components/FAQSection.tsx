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
    category: 'Products & Ingredients',
    question: 'What is Ayurmor?',
    answer: 'Ayurmor is a wellness food brand offering instant malt drinks and premix soups made with carefully selected ingredients for modern daily routines.'
  },
  {
    category: 'Products & Ingredients',
    question: 'Are Ayurmor products made with natural ingredients?',
    answer: 'Ayurmor focuses on carefully selected food ingredients. Please refer to each product label for the complete ingredient and nutrition details.'
  },
  {
    category: 'Products & Ingredients',
    question: 'Are the products vegetarian?',
    answer: 'Products display the green vegetarian symbol where applicable. Please check each pack for confirmation.'
  },
  {
    category: 'Products & Ingredients',
    question: 'Do the products contain allergens?',
    answer: 'Some products may contain nuts, milk, cocoa, gluten or other allergens. Always check the ingredient and allergen statement before consumption.'
  },
  {
    category: 'Preparation & Usage',
    question: 'Do Ayurmor products require boiling?',
    answer: 'Most Ayurmor instant mixes are designed for quick preparation. Add hot milk or hot water as instructed, stir well and enjoy.'
  },
  {
    category: 'Preparation & Usage',
    question: 'How do I prepare Ayurmor mixes?',
    answer: 'Add the recommended quantity to a cup, pour hot milk or hot water as directed, stir well until dissolved and enjoy. Please follow product-specific instructions on each page.'
  },
  {
    category: 'Safety Disclaimer',
    question: 'Can children and senior adults consume Ayurmor products?',
    answer: 'Older children and adults can enjoy selected Ayurmor products as part of a balanced diet. Please check allergens and consult a healthcare professional for specific dietary needs.'
  },
  {
    category: 'Safety Disclaimer',
    question: 'Can I consume Ayurmor products if I have a medical condition?',
    answer: 'If you are pregnant, nursing, have a medical condition or take medication, consult a healthcare professional before consuming any wellness food product.'
  },
  {
    category: 'Safety Disclaimer',
    question: 'Is Ayurmor certified by FSSAI and ISO?',
    answer: 'Ayurmor products are manufactured under FSSAI registration details displayed on the pack. ISO 9001:2015 quality management information is also displayed where applicable. Please refer to product packaging for details.'
  },
  {
    category: 'Orders & Delivery',
    question: 'Where do you deliver?',
    answer: 'Ayurmor delivers to serviceable locations through logistics partners. Delivery availability may vary by pincode.'
  },
  {
    category: 'Orders & Delivery',
    question: 'How does Free Shipping work?',
    answer: 'Free shipping is available on prepaid orders as per current website offer.'
  },
  {
    category: 'Returns & Support',
    question: 'What if I receive a damaged or incorrect product?',
    answer: 'Contact support within 48 hours of delivery with order details and clear photos of the package and product for review.'
  },
  {
    category: 'Returns & Support',
    question: 'Can I return opened products?',
    answer: 'For hygiene and safety, opened or used consumable products are generally not eligible for return unless there is a verified quality issue.'
  },
  {
    category: 'Returns & Support',
    question: 'How can I contact Ayurmor?',
    answer: 'Use the website WhatsApp button, phone number or email support listed on the Contact page. Keep contact details consistent across website and packaging.'
  },
  {
    category: 'Storage & Shelf Life',
    question: 'What is the shelf life and storage instruction?',
    answer: 'Manufacturing date, expiry/best-before date and batch details are printed on the pack. Store in a cool, dry place; reseal after opening; use a dry spoon; avoid moisture and direct sunlight.'
  }
];

const CATEGORIES = [
  'All',
  'Products & Ingredients',
  'Preparation & Usage',
  'Storage & Shelf Life',
  'Orders & Delivery',
  'Returns & Support',
  'Safety Disclaimer'
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(f => {
    if (activeCategory === 'All') return true;
    return f.category === activeCategory;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[#FDFBF7]" id="faq">
      <div className="max-width-1000 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0080FF] bg-[#0080FF]/10 px-3.5 py-1 rounded-full border border-[#0080FF]/20 inline-flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Customer Help & Support
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
            Everything you need to know about our products, ingredients, preparation, delivery, and safety.
          </p>
        </div>

        {/* Category Filter Buttons (Report Page 18 Requirement) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#0080FF] text-white shadow-md'
                  : 'bg-white text-[#0A192F] hover:bg-[#E2EAF4] border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#0A192F] hover:text-[#0080FF] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-[#0080FF]' : 'text-slate-300'}`} />
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-[#0A192F] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#0080FF] text-white' : ''}`}>
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
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-light border-t border-slate-100 bg-slate-50/50">
                        <p>{faq.answer}</p>
                        <span className="inline-block mt-3 text-[10px] font-bold text-[#0080FF] uppercase tracking-wider bg-[#0080FF]/10 px-2.5 py-0.5 rounded border border-[#0080FF]/20">
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
