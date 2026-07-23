'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lock, ShieldCheck, Mail, MapPin, Eye, CheckCircle2, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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

        <div className="max-width-1200 mx-auto px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-xs text-sky-300 font-bold uppercase tracking-wider mx-auto">
            <Lock className="w-3.5 h-3.5 text-[#76BC21]" />
            <span>Ayurmor Data Integrity Center</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Privacy & Data Security
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            At Ayurmor, we value transparency and are committed to protecting your personal information. Read our policy on how we collect, use, and safeguard your data.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-width-1200 mx-auto px-6 py-20 flex-grow w-full">
        
        {/* Core Intro Card */}
        <div className="bg-[#0F3D2E] text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#76BC21]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs uppercase text-[#76BC21] font-bold tracking-widest block">Executive Summary</span>
            <p className="font-serif text-lg sm:text-xl leading-relaxed text-slate-100">
              Any personal information shared with us, including your name, phone number, email address, and delivery details, will be used only for order processing, customer support, and improving your shopping experience.
            </p>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              We do not sell or share your personal information with third parties except trusted logistics and payment partners required to fulfill your order. All transactions are handled through secure systems to protect customer data.
            </p>
          </div>
        </div>

        {/* Detailed Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Information We Collect */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-sky-50 text-[#0080FF] rounded-2xl flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">1. Information We Collect</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              We may collect personal details such as your name, email, phone number, and shipping address when you make a purchase or contact us. This is stored securely within our certified database.
            </p>
            <ul className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76BC21] shrink-0" />
                <span>Secure Customer Registrations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76BC21] shrink-0" />
                <span>Encrypted Order History Details</span>
              </li>
            </ul>
          </div>

          {/* Card 2: How We Use Your Information */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-[#76BC21] rounded-2xl flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">2. How We Use Your Information</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              The information collected is used to process orders, provide customer support, and improve our services. We do not sell, trade, or rent your personal data to third parties.
            </p>
            <ul className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76BC21] shrink-0" />
                <span>Instant dispatch processing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76BC21] shrink-0" />
                <span>Strict non-distribution protocols</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Data Protection and Security */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">3. Data Protection and Security</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure, so we encourage you to use strong passwords and avoid sharing sensitive details online.
            </p>
          </div>

          {/* Card 4: Changes to This Privacy Policy */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">4. Policy Updates</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Ayurmor reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page, and users are encouraged to review this policy periodically.
            </p>
          </div>

        </div>

        {/* Contact details callout */}
        <div className="bg-[#F4F8FC] border-2 border-slate-200/60 rounded-3xl p-8 md:p-10 text-center space-y-6">
          <h4 className="font-serif text-2xl font-bold text-[#0A192F]">Need Privacy Clarifications?</h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
            If you have any questions or concerns regarding this Privacy Policy, feel free to contact us at:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold">
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 text-[#0A192F] shadow-sm">
              <Mail className="w-4 h-4 text-[#76BC21]" />
              <span>Saishtechnofarms@gmail.com</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 text-[#0A192F] shadow-sm">
              <MapPin className="w-4 h-4 text-[#0080FF]" />
              <span>Ayurmor, Karnataka, India</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
