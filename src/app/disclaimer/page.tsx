'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertCircle, Stethoscope, Award, Heart, Mail, CheckCircle2 } from 'lucide-react';

export default function DisclaimerPage() {
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
            <AlertCircle className="w-3.5 h-3.5 text-[#76BC21]" />
            <span>Ayurmor Medical Disclaimer</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Product Disclaimer
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Important health guidance and clinical usage limitations for all Ayurmor wellness nutrition botanical blends.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-20 flex-grow w-full">
        
        {/* Core Disclaimer Warning Card */}
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden text-slate-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs uppercase text-amber-700 font-bold tracking-widest block">Regulatory Compliance Notice</span>
            <h3 className="font-serif text-2xl font-bold text-amber-950 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <span>Ayurmor Health & Wellness Statement</span>
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-amber-900 font-light">
              Ayurmor products are intended to support general wellness and nutrition. They are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p className="text-xs text-amber-800 font-light leading-relaxed">
              Individual results may vary depending on lifestyle and health conditions. Customers with existing medical conditions, pregnant or nursing women, and individuals taking medication should consult a healthcare professional before using any wellness product.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Nutritional Intentions */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-sky-50 text-[#0080FF] rounded-2xl flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">Nutritional Food Supplements</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              All ingredients in Moringa Premix Soup, ABC Malt, and Choco Millet Malt are natural grains, botanicals, and whole spices. They act as supportive food elements, not prescription therapies.
            </p>
          </div>

          {/* Card 2: Consult Your Physician */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">Medical Consultations</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Consult a medical doctor before consuming Ayurmor if you are undergoing regular therapeutics, insulin treatments, cardiorespiratory treatment, or have known food allergies.
            </p>
          </div>

        </div>

        {/* Certifications and Compliance Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#0A192F] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#76BC21]" />
            <span>Manufacturing & Marketing Details</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
            All Ayurmor products are manufactured and packed under clinical safety parameters by Saish Technofarms and marketed by Zeyora Global Trading Co. under FSSAI licensing and ISO standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl border border-slate-200/50">
              <CheckCircle2 className="w-5 h-5 text-[#76BC21] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-500 text-xs block font-bold uppercase tracking-wider">Manufacturer</strong>
                <span className="text-sm font-extrabold text-[#0A192F] block mt-0.5">Saish Technofarms</span>
                <span className="text-[10px] text-slate-600 font-semibold block mt-1">FSSAI Reg: 21224169000054</span>
                <span className="text-[10px] text-slate-600 block">ISO 9001:2015 Certified</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl border border-slate-200/50">
              <CheckCircle2 className="w-5 h-5 text-[#0080FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-500 text-xs block font-bold uppercase tracking-wider">Marketed By</strong>
                <span className="text-sm font-extrabold text-[#0080FF] block mt-0.5">Zeyora Global Trading Co.</span>
                <span className="text-[10px] text-slate-600 font-medium block mt-1">Kombai Nagar, Tiruchengode – 637211</span>
                <span className="text-[10px] text-slate-600 font-semibold block">FSSAI No: 124250140000673</span>
                <span className="text-[10px] text-slate-600 font-semibold block">GSTIN: 33AEQPT6920G1Z6</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F4F8FC] rounded-2xl border border-slate-200/50">
              <CheckCircle2 className="w-5 h-5 text-[#76BC21] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 text-xs block font-bold">Quality Standard</strong>
                <span className="text-xs font-semibold text-slate-700 block">100% Botanical Natural</span>
                <span className="text-[10px] text-slate-500 block mt-1">ISO Certificate: QCCI/25Q/SES/5850</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
