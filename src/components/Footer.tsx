'use client';

import Link from 'next/link';
import { 
  ShieldCheck as ShieldIcon, 
  Award as AwardIcon, 
  Truck as TruckIcon, 
  RotateCcw as RefreshIcon, 
  Lock as LockIcon, 
  Mail as MailIcon, 
  Phone as PhoneIcon, 
  MapPin as MapIcon, 
  MessageCircle as WhatsappIcon, 
  CheckCircle2 as CheckIcon 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-10 border-t border-[#0080FF]/20 relative overflow-hidden">
      {/* Subtle Background Glow Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0080FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#76BC21]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-width-1200 mx-auto px-6 relative z-10">
        
        {/* Customer Promise Banner inside Footer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <h4 className="text-white font-serif font-bold text-base flex items-center gap-2">
              <ShieldIcon className="w-5 h-5 text-[#76BC21]" />
              <span>Our Customer Promise</span>
            </h4>
            <span className="text-xs text-[#76BC21] font-semibold bg-[#76BC21]/10 px-3 py-1 rounded-full border border-[#76BC21]/20">
              Customer Satisfaction is Our Highest Priority
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {[
              "Carefully Selected Ingredients",
              "Quality Checked Products",
              "Secure Ordering & Payment",
              "Reliable Delivery Support",
              "Transparent Information",
              "Dedicated Assistance"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <CheckIcon className="w-4 h-4 text-[#76BC21] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white p-2.5 rounded-xl inline-block shadow-md hover:scale-105 transition-transform">
                <img 
                  src="/Ayurmor.png" 
                  alt="Ayurmor Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Ayurmor by Saish Technofarms crafts 100% natural, pure botanical health mixes, instant nutrient-rich Moringa soup, and sprouted multigrain millet malts.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <AwardIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong className="text-white">FSSAI Reg:</strong> 21224169000054</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-[#76BC21] shrink-0" />
                <span><strong className="text-white">ISO 9001:2015:</strong> QCCI/25Q/SES/5850</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://wa.me/917483849998" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp Support" 
                className="flex items-center gap-2 px-3.5 py-2 bg-[#25D366] text-white font-bold text-xs rounded-full hover:bg-[#20ba5a] transition-all shadow-md hover:scale-105"
              >
                <WhatsappIcon className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#0080FF] pl-2.5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/" className="hover:text-[#0080FF] transition-colors flex items-center gap-1.5"><span>Home</span></Link></li>
              <li><Link href="/#values" className="hover:text-[#0080FF] transition-colors flex items-center gap-1.5"><span>Why Ayurmor Science</span></Link></li>
              <li><Link href="/#products" className="hover:text-[#0080FF] transition-colors flex items-center gap-1.5"><span>Shop All Products</span></Link></li>
              <li><Link href="/#about" className="hover:text-[#0080FF] transition-colors flex items-center gap-1.5"><span>Founder's Story</span></Link></li>
              <li><Link href="/#blogs" className="hover:text-[#0080FF] transition-colors flex items-center gap-1.5"><span>Health Guides & Blogs</span></Link></li>
              <li><Link href="/#faq" className="hover:text-[#0080FF] transition-colors flex items-center gap-1.5"><span>FAQs</span></Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Policies */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#76BC21] pl-2.5">
              Legal & Policies
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <LockIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <TruckIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Shipping Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/return-refund-policy" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <RefreshIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Return & Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <ShieldIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <AwardIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-sky-300 transition-colors flex items-center gap-1.5 font-semibold text-white">
                  <MailIcon className="w-3.5 h-3.5 text-[#76BC21]" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact, Manufacturing & Marketing */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2.5">
              Manufacturing & Marketing
            </h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed font-light">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Manufactured by:</p>
                <h4 className="text-white text-base font-extrabold tracking-wide text-sky-300">
                  Saish Technofarms
                </h4>
                <div className="flex items-start gap-1.5 mt-1 text-[11px]">
                  <MapIcon className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Building No 330, Sy No 137/1, 137/5 Kagal Maneer, Manaki, Kumta, Uttara Kannada, KA - 581362.</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-semibold"><strong className="text-white font-bold">FSSAI Reg:</strong> 21224169000054</p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Marketed by:</p>
                <h4 className="text-white text-base font-extrabold tracking-wide text-[#76BC21]">
                  Zeyora Global Trading Co.
                </h4>
                <div className="flex items-start gap-1.5 mt-1 text-[11px]">
                  <MapIcon className="w-3.5 h-3.5 text-[#76BC21] shrink-0 mt-0.5" />
                  <span>Kombai Nagar, Tiruchengode – 637211.</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-semibold"><strong className="text-white font-bold">GSTIN:</strong> 33AEQPT6920G1Z6</p>
                <p className="text-[11px] text-slate-300 font-semibold"><strong className="text-white font-bold">FSSAI No:</strong> 124250140000673</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <p className="flex items-center gap-2 text-sky-300 font-medium">
                  <PhoneIcon className="w-3.5 h-3.5 text-sky-400" />
                  <a href="tel:+917483849998" className="hover:underline">+91 7483 849 998</a>
                </p>
                <p className="flex items-center gap-2 text-sky-300 font-medium">
                  <MailIcon className="w-3.5 h-3.5 text-sky-400" />
                  <a href="mailto:Saishtechnofarms@gmail.com" className="hover:underline">Saishtechnofarms@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="py-4 border-b border-white/5 text-[11px] text-slate-400 leading-normal">
          <p><strong className="text-slate-300">Disclaimer:</strong> Ayurmor products are nutritional food supplements intended to support general wellness and nutrition. They are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary based on lifestyle and health conditions.</p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Saish Technofarms (Ayurmor). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
