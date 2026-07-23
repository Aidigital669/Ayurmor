'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, Clock, Mail } from 'lucide-react';

export default function ReturnRefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-900 flex flex-col justify-between font-sans selection:bg-[#76BC21]/20 selection:text-[#0b1a15]">
      {/* Top Navbar */}
      <Navbar 
        cartCount={0} 
        wishlistCount={0} 
        searchQuery="" 
        setSearchQuery={() => {}} 
        onOpenCart={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/#products';
          }
        }} 
      />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-[#0A192F] via-[#0F3D2E] to-[#0A192F] text-white py-24 px-6 relative overflow-hidden text-center border-b-4 border-[#76BC21]">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0080FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#76BC21]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-xs text-sky-300 font-bold uppercase tracking-wider">
            <RotateCcw className="w-3.5 h-3.5 text-[#76BC21]" />
            <span>Ayurmor Satisfaction Center</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Return & Refund Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Read our policy on refunds and returns. Customer satisfaction is our top priority.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-20 flex-grow w-full">
        
        {/* Core Customer Promise */}
        <div className="bg-[#0F3D2E] text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#76BC21]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs uppercase text-[#76BC21] font-bold tracking-widest block">Satisfaction Commitment</span>
            <h3 className="font-serif text-2xl font-bold">At Ayurmor, customer satisfaction is our top priority.</h3>
            <p className="text-sm text-slate-200 leading-relaxed font-light">
              We strive to offer a fair and transparent refund and return process across all categories of products we sell.
            </p>
          </div>
        </div>

        {/* General Guidelines Card List */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6 mb-16">
          <h3 className="font-serif text-2xl font-bold text-[#0A192F] border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#76BC21]" />
            <span>General Return & Refund Guidelines</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
            We offer a **3-day return or refund policy** on most items sold via Ayurmor, subject to the product category and return eligibility. Please ensure the following conditions are met:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-[#76BC21] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0A192F] text-xs uppercase tracking-wider block font-bold">3-Day Request</strong>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">Return/refund request must be initiated within 3 days of delivery.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-[#76BC21] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0A192F] text-xs uppercase tracking-wider block font-bold">Original Condition</strong>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">Item must be unused, undamaged, and returned in original packaging with all accessories, manuals, and tags intact.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0A192F] text-xs uppercase tracking-wider block font-bold">Hygienic Exclusions</strong>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">Products like personal care, cosmetics, innerwear, food items, or custom orders are non-returnable unless defective or damaged.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl">
              <Clock className="w-5 h-5 text-[#0080FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0A192F] text-xs uppercase tracking-wider block font-bold">Refund Processing</strong>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">Once approved and inspected, refunds are credited back within 3–10 business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category-Specific Guidelines */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6 mb-16">
          <h3 className="font-serif text-2xl font-bold text-[#0A192F] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-[#76BC21]/15 text-[#76BC21] rounded-full flex items-center justify-center text-xs font-bold font-serif shrink-0">📋</span>
            <span>Category-Specific Guidelines</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="space-y-1.5">
              <strong className="text-[#0A192F] text-sm block font-bold border-l-2 border-[#76BC21] pl-2">Electronics</strong>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Returns accepted only for defective, damaged, or incorrect products.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-[#0A192F] text-sm block font-bold border-l-2 border-[#76BC21] pl-2">Fashion & Lifestyle</strong>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Returns allowed for size issues or if the product is not as described. Must be returned unused and with tags.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-[#0A192F] text-sm block font-bold border-l-2 border-[#76BC21] pl-2">Beauty & Personal Care</strong>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Returns allowed only if item is damaged or different from what was ordered. Products must be sealed and unused.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-[#0A192F] text-sm block font-bold border-l-2 border-[#76BC21] pl-2">Home & Appliances</strong>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Returns accepted for defective or wrong items within 3 days. Installation issues must be reported with supporting photos/videos.
              </p>
            </div>

          </div>
        </div>

        {/* Contact details callout */}
        <div className="bg-[#F4F8FC] border-2 border-slate-200/60 rounded-3xl p-8 md:p-10 text-center space-y-6">
          <h4 className="font-serif text-2xl font-bold text-[#0A192F]">Need Return Assistance?</h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
            If you need help with a return or refund, contact our support team:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold">
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 text-[#0A192F] shadow-sm">
              <Mail className="w-4 h-4 text-[#76BC21]" />
              <span>Saishtechnofarms@gmail.com</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 text-[#0A192F] shadow-sm">
              <Clock className="w-4 h-4 text-[#0080FF]" />
              <span>10:00 AM – 6:00 PM (Mon–Sat)</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
