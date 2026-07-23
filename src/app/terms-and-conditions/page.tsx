'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, ShieldCheck, AlertCircle, Mail, HelpCircle } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
            <FileText className="w-3.5 h-3.5 text-[#76BC21]" />
            <span>Ayurmor Legal Center</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            By using the Ayurmor website, you agree to comply with our terms, conditions, policies, and guidelines.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-20 flex-grow w-full">
        
        {/* 1. Core Introductory Note */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-12 h-12 bg-sky-50 text-[#0080FF] rounded-2xl flex items-center justify-center font-bold shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-[#0A192F] mb-1">User Agreement</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              By using the Ayurmor website, you agree to comply with our policies and terms of use. Product information provided on the website is intended for general information purposes only.
            </p>
          </div>
        </div>

        {/* 2. Detailed Guidelines List */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-8">
          
          <div className="space-y-2.5">
            <h3 className="font-serif text-xl font-bold text-[#0A192F] border-b border-slate-100 pb-2">1. Site Scope & Content</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Prices, offers, and product availability are subject to change without prior notice. Unauthorized reproduction or misuse of website content is prohibited.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-serif text-xl font-bold text-[#0A192F] border-b border-slate-100 pb-2">2. Accuracy of Material</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              The information and descriptions of botanical products, sprouted grains, and soups are prepared as general wellness references. We make absolute efforts to maintain transparency, but we cannot warrant that all labels and visual graphics are entirely free of error.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-serif text-xl font-bold text-[#0A192F] border-b border-slate-100 pb-2">3. Prohibited Usage</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              You may not use this website or its resources for any illegal purposes or to distribute malware. Scraping database listings, copying product description text, or reverse engineering any front-end elements is strictly prohibited.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-serif text-xl font-bold text-[#0A192F] border-b border-slate-100 pb-2">4. Order Acceptance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Saish Technofarms reserves the right to reject or cancel any order placed on our store due to payment failure, suspected fraud, pricing errors, or shipping zone service limits.
            </p>
          </div>

        </div>

        {/* Contact details callout */}
        <div className="bg-[#F4F8FC] border-2 border-slate-200/60 rounded-3xl p-8 md:p-10 text-center space-y-6 mt-12">
          <h4 className="font-serif text-2xl font-bold text-[#0A192F]">Legal & Corporate Enquiries</h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
            If you have questions regarding our legal framework or wish to report intellectual property issues, contact us:
          </p>
          <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-[#0A192F] shadow-sm">
            <Mail className="w-4 h-4 text-[#76BC21]" />
            <span>Saishtechnofarms@gmail.com</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
