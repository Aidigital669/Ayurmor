'use client';

import { ShieldCheck, Award, Leaf, CheckCircle, MapPin } from 'lucide-react';

export default function Certifications() {
  return (
    <section className="bg-gradient-to-r from-[#0F3D2E] via-[#164e3c] to-[#0F3D2E] text-white py-10 px-6 shadow-inner border-y border-amber-400/20">
      <div className="max-width-1200 mx-auto">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold px-3 py-1 bg-amber-400/10 rounded-full border border-amber-400/20">
            Quality Management Standards & Product Transparency
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {/* FSSAI Registration */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white mb-1">FSSAI Registered</h4>
            <p className="text-[10px] text-emerald-200/80 font-mono">Reg. No. 21224169000054</p>
            <span className="text-[9px] text-white/50 mt-1">Food Safety Standard</span>
          </div>

          {/* ISO 9001:2015 */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white mb-1">ISO 9001:2015</h4>
            <p className="text-[10px] text-emerald-200/80 font-mono">Cert: QCCI/25Q/SES/5850</p>
            <span className="text-[9px] text-white/50 mt-1">Quality Management System</span>
          </div>

          {/* Hygienically Manufactured */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white mb-1">Hygienic Process</h4>
            <p className="text-[10px] text-emerald-200/80">Securely Packed</p>
            <span className="text-[9px] text-white/50 mt-1">Quality Checked</span>
          </div>

          {/* Selected Ingredients */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white mb-1">Quality Ingredients</h4>
            <p className="text-[10px] text-emerald-200/80">Transparent Labels</p>
            <span className="text-[9px] text-white/50 mt-1">Check Product Packs</span>
          </div>

          {/* Made in India */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all duration-300 group col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white mb-1">Made in India</h4>
            <p className="text-[10px] text-emerald-200/80">Saish Technofarms</p>
            <span className="text-[9px] text-white/50 mt-1">Uttara Kannada, KA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
