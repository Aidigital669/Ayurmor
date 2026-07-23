'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, Clock, DollarSign, MapPin, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';

export default function ShippingPolicyPage() {
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
            <Truck className="w-3.5 h-3.5 text-[#76BC21]" />
            <span>Ayurmor Logistics Center</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Shipping & Delivery Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Fast, secure, and transparent shipping timeline details to ensure your orders reach you in perfect condition.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-width-1200 mx-auto px-6 py-20 flex-grow w-full">
        
        {/* 1. Core Timeline Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 relative hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 text-[#76BC21] rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#0A192F]">Order Processing</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Orders are typically processed within <strong>1–2 business days</strong> after confirmation.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 relative hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#F4F8FC] text-[#0080FF] rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#0A192F]">Delivery Times</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Once shipped, delivery times vary based on location, usually taking <strong>5–7 business days</strong>.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 relative hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="absolute top-2 right-4 text-[9px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold uppercase">Important</span>
            <h3 className="font-serif font-bold text-lg text-[#0A192F]">Weekends & Holidays</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Orders placed on weekends or public holidays will be processed on the next working day.
            </p>
          </div>

        </div>

        {/* 2. Detailed Rules Panel Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Left Block: Rates and Tracking */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
            
            {/* Rates */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#0A192F] flex items-center gap-2 border-b border-slate-100 pb-2">
                <DollarSign className="w-5 h-5 text-[#76BC21]" />
                <span>Shipping Charges</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Standard Shipping is ₹100 (varies based on location). We offer <strong>Free Shipping</strong> automatically on all orders above <strong>₹1,500</strong>. Additional charges may apply for remote locations or express shipping options.
              </p>
            </div>

            {/* Tracking */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#0A192F] flex items-center gap-2 border-b border-slate-100 pb-2">
                <MapPin className="w-5 h-5 text-[#0080FF]" />
                <span>Order Tracking</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Once your order is shipped, you will receive a tracking ID via email/SMS. You can track your order status using the tracking link provided in your message.
              </p>
            </div>

          </div>

          {/* Right Block: Damages and Cancellations */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
            
            {/* Damages */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#0A192F] flex items-center gap-2 border-b border-slate-100 pb-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <span>Damaged or Missing Products</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                If your order arrives damaged or incomplete, please contact us within 24 hours of delivery. We may require images/videos of the product and packaging for verification.
              </p>
            </div>

            {/* Cancellations */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#0A192F] flex items-center gap-2 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-5 h-5 text-[#76BC21]" />
                <span>Cancellation & Changes</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Orders can be canceled or modified only before shipping. Once shipped, cancellations or address changes may not be possible.
              </p>
            </div>

          </div>

        </div>

        {/* Contact details callout */}
        <div className="bg-[#F4F8FC] border-2 border-slate-200/60 rounded-3xl p-8 md:p-10 text-center space-y-6">
          <h4 className="font-serif text-2xl font-bold text-[#0A192F]">Questions Regarding Shipping?</h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
            If you have any questions or concerns regarding shipping and delivery, please contact us at:
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
