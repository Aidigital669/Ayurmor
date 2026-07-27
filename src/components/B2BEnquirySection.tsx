'use client';

import { useState } from 'react';
import { Building2, Store, Gift, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function B2BEnquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Distributor / Retailer',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || 'b2b-lead@ayurmor.com',
          mobile: formData.phone,
          message: formData.message,
          type: 'b2b',
          enquiry_type: formData.enquiryType
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          enquiryType: 'Distributor / Retailer',
          message: ''
        });
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="b2b" className="py-16 sm:py-20 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0080FF]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#76BC21]/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-width-1200 mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: B2B Copy & Opportunities */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-sky-300 text-xs font-extrabold uppercase tracking-widest bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-500/30 inline-block">
              Institutional & Corporate Partnerships
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Partner with Ayurmor for Bulk & Distribution
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed font-light">
              We welcome distributors, retail store owners, corporate wellness teams, and gift pack buyers to partner with Ayurmor. Bring high-demand instant health mixes and premix soups to your customers.
            </p>

            {/* B2B Opportunity Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-colors">
                <Store className="w-6 h-6 text-sky-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Retail & Supermarket Distribution</h4>
                  <p className="text-xs text-slate-300 font-light mt-0.5">
                    Attractive trade margins, display materials, and steady stock supply for grocery & health stores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
                <Gift className="w-6 h-6 text-[#76BC21] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Corporate Wellness & Festival Hampers</h4>
                  <p className="text-xs text-slate-300 font-light mt-0.5">
                    Customized healthy wellness gift packs for employees, clients, and corporate events.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                <Building2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Colleges, Canteens & Institutions</h4>
                  <p className="text-xs text-slate-300 font-light mt-0.5">
                    Bulk supply of 60-second instant mixes ideal for office cafeterias and campus canteens.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://wa.me/917483849998?text=Hi%20Ayurmor!%20I%20am%20interested%20in%20Distributor%20/%20Bulk%20Order%20partnership."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] text-white font-bold text-xs rounded-full hover:bg-[#1eb956] shadow-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Instant B2B WhatsApp Enquiry
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Enquiry Form */}
          <div className="lg:col-span-6 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
            <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-1">
              Send B2B Enquiry
            </h3>
            <p className="text-xs text-slate-500 font-light mb-6">
              Fill in your details below. Our corporate sales team will contact you within 24 hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Enquiry Sent Successfully!</h4>
                <p className="text-xs text-emerald-700 font-light">
                  Thank you for reaching out to Ayurmor. Our institutional partnerships manager will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma (Sharma Wellness Stores)"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="business@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Partnership Interest *</label>
                  <select
                    value={formData.enquiryType}
                    onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none bg-white"
                  >
                    <option value="Distributor / Retailer">Distributor / Retail Store Supply</option>
                    <option value="Corporate Gifting">Corporate Wellness & Festival Gift Packs</option>
                    <option value="Institutional Canteen">Office / College Canteen Supply</option>
                    <option value="Export / Franchise">Export & Bulk Trade Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your city, store count, or estimated quantity requirement..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0080FF] text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#0066CC] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Partnership Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
