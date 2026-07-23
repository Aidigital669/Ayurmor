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
    question: 'Are Ayurmor products 100% natural and sugar-free?',
    answer: 'Yes! All Ayurmor mixes are crafted with 100% natural, pure botanical ingredients. We do not use any refined white sugars, artificial preservatives, synthetic colors, or chemical additives. Sweetness comes from raw palm sugar, real fruit crystals, or wholesome cocoa.'
  },
  {
    category: 'Usage & Safety',
    question: 'Are your malts and soups safe for growing kids and elders?',
    answer: 'Absolutely. Sprouted millets (Ragi, Bajra, Foxtail) and wild-crafted Moringa leaves are nutrient-dense superfoods packed with bio-available calcium, iron, and fiber, making them excellent daily nutrition for active children, adults, and seniors.'
  },
  {
    category: 'Certifications & Safety',
    question: 'Is Ayurmor certified by FSSAI and ISO?',
    answer: 'Yes. Ayurmor is manufactured by Saish Technofarms under FSSAI Reg. No. 21224169000054 & ISO 9001:2015 Certification, and marketed by Zeyora Global Trading Co. (Kombai Nagar, Tiruchengode – 637211, FSSAI No. 124250140000673, GSTIN: 33AEQPT6920G1Z6).'
  },
  {
    category: 'Preparation',
    question: 'How do I prepare Ayurmor mixes?',
    answer: 'Preparation takes under 15 seconds! For Moringa Soup: add 1 tbsp (10g) to 150ml boiling water, stir well, and enjoy. For ABC Malt & Choco Millet Malt: add 2 spoonfuls (20g-25g) to a cup of warm milk or hot water and stir briskly. No boiling required!'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you offer Free Shipping and Cash on Delivery (COD)?',
    answer: 'Yes! We provide 100% FREE express shipping across all pin codes in India. Cash on Delivery (COD) and Razorpay instant online payments are both supported. Orders are dispatched within 24 hours via automated Bigship logistics with live SMS/email tracking.'
  },
  {
    category: 'Shelf Life & Storage',
    question: 'What is the shelf life and storage instruction?',
    answer: 'Ayurmor products have a shelf life of 9 months from the date of manufacture. Store in a cool, dry place away from direct sunlight. Keep the food-grade pouch sealed or transfer to an airtight container after opening.'
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
