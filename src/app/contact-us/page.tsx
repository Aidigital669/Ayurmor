'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  User,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'contact' })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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
            <Mail className="w-3.5 h-3.5 text-[#76BC21]" />
            <span>Ayurmor Support Desk</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Contact Support
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            We are here to help you! Reach out for callback support, bulk queries, or order tracking questions.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex-grow w-full">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Contact Methods (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase text-[#76BC21] font-bold tracking-widest block">Direct Communications</span>
              <h2 className="font-serif text-3xl font-bold text-[#0A192F]">Let's Connect</h2>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Connect with us directly for fast support answers or submit the callback form for wellness consultation calls.
              </p>
            </div>

            {/* Address - Manufacturer & Marketer */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-50 text-[#0080FF] rounded-2xl flex items-center justify-center font-bold shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-400">Manufactured By:</h4>
                  <p className="text-sm font-extrabold text-[#0A192F] tracking-wide my-0.5">
                    Saish Technofarms
                  </p>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Building No 330, Sy No 137/1, 137/5 Kagal Maneer, Kumta, Karnataka - 581362.<br />
                    <span className="text-slate-700 font-semibold text-[11px]">FSSAI Reg: 21224169000054</span>
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-400">Marketed By:</h4>
                  <p className="text-sm font-extrabold text-[#0080FF] tracking-wide my-0.5">
                    Zeyora Global Trading Co.
                  </p>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Kombai Nagar, Tiruchengode – 637211.<br />
                    <span className="text-slate-700 font-semibold text-[11px]">FSSAI No: 124250140000673 | GSTIN: 33AEQPT6920G1Z6</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Mail */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-[#76BC21] rounded-2xl flex items-center justify-center font-bold shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif font-bold text-base text-[#0A192F]">Email Inquiries</h4>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>
                    <strong className="text-slate-700">Support:</strong>{' '}
                    <a href="mailto:Saishtechnofarms@gmail.com" className="text-[#0080FF] hover:underline font-semibold">
                      Saishtechnofarms@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong className="text-slate-700">Collaboration:</strong>{' '}
                    <a href="mailto:info@Ayurmor.com" className="text-[#0080FF] hover:underline font-semibold">
                      info@Ayurmor.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Block */}
            <div className="bg-gradient-to-br from-[#0F3D2E] to-[#0A192F] text-white rounded-3xl p-6 border border-white/10 shadow-lg text-center space-y-4">
              <div className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-white">Live WhatsApp Chat</h4>
                <p className="text-xs text-slate-300 font-light mt-1">Get immediate answers on order dispatch & stock availability.</p>
              </div>
              <a 
                href="https://wa.me/917483849998" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-full transition-all shadow-md hover:scale-105"
              >
                <span>Start WhatsApp Chat</span>
              </a>
            </div>

          </div>

          {/* Right Block: Request CallBack Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
            
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76BC21] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Call Center Routing</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A192F]">Request Callback</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                To know more about services offered by us kindly fill in the details below. You will get a call back soon.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-[#76BC21] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-emerald-950">Callback Scheduled!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you <strong>{formData.name}</strong>. A support manager will reach out on your mobile number (<strong>{formData.mobile}</strong>) within business hours.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', mobile: '', message: '' });
                  }}
                  className="mt-2 text-xs font-bold text-[#0080FF] hover:underline"
                >
                  Submit another query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-slate-700 block font-bold">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] bg-[#F4F8FC]/50 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-slate-700 block font-bold">Email ID *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input 
                        type="email" 
                        required 
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] bg-[#F4F8FC]/50 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-slate-700 block font-bold">Mobile Number *</label>
                    <div className="relative">
                      <PhoneCall className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input 
                        type="tel" 
                        required 
                        placeholder="Enter 10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] bg-[#F4F8FC]/50 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-slate-700 block font-bold">Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <textarea 
                        rows={4}
                        placeholder="Enter details of query or callback request..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] bg-[#F4F8FC]/50 transition-all font-light"
                      />
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-[#0080FF] hover:bg-[#0066CC] text-white font-bold tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Callback</span>
                    </>
                  )}
                </button>

                {/* Support Hours disclaimer */}
                <p className="text-[10px] text-slate-400 italic pt-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Callback support is operational Monday to Saturday (10:00 AM – 6:00 PM IST).</span>
                </p>

              </form>
            )}

          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
