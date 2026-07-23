'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  RotateCcw, 
  FileText, 
  AlertCircle, 
  Mail, 
  ChevronRight,
  Sparkles,
  Heart,
  CheckCircle2
} from 'lucide-react';

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const POLICY_NAV_ITEMS = [
  { label: 'Privacy Policy', path: '/privacy-policy', icon: Lock },
  { label: 'Shipping Policy', path: '/shipping-policy', icon: Truck },
  { label: 'Return & Refund Policy', path: '/return-refund-policy', icon: RotateCcw },
  { label: 'Terms & Conditions', path: '/terms-and-conditions', icon: FileText },
  { label: 'Disclaimer', path: '/disclaimer', icon: AlertCircle },
  { label: 'Contact Us', path: '/contact-us', icon: Mail },
];

export default function PolicyLayout({ title, subtitle, icon, children }: PolicyLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-900 flex flex-col justify-between font-sans">
      {/* Standard Header Navbar */}
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

      {/* Hero Header Section for Policy Pages */}
      <section className="bg-[#0A192F] text-white py-12 md:py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0F2942] to-[#0A192F]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0080FF]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#76BC21]/10 rounded-full blur-3xl" />

        <div className="max-width-1200 mx-auto relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-sky-300/80 mb-4 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-xs text-sky-300 font-medium">
                {icon}
                <span>Ayurmor Official Assurance</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
                {title}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-slate-300 max-w-xs">
              <Sparkles className="w-8 h-8 text-[#76BC21] shrink-0" />
              <div>
                <strong className="text-white block font-semibold">100% Transparent Policies</strong>
                <span>FSSAI & ISO Certified Quality Standards for your trust & peace of mind.</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Tabs bar */}
          <div className="mt-8 pt-6 border-t border-white/10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {POLICY_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0080FF] text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-width-1200 mx-auto px-6 py-12 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sticky Navigation Menu on Desktop */}
          <aside className="hidden lg:block lg:col-span-1 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm sticky top-24">
              <h3 className="font-serif font-bold text-sm text-[#0A192F] mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0080FF]" />
                <span>Policy Center</span>
              </h3>
              <nav className="flex flex-col gap-1 text-xs">
                {POLICY_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.path;
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-[#0A192F] text-white font-bold shadow'
                          : 'text-slate-600 hover:bg-[#F4F8FC] hover:text-[#0A192F]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#76BC21]' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                    </Link>
                  );
                })}
              </nav>

              {/* Assistance Box */}
              <div className="mt-6 pt-4 border-t border-slate-100 bg-[#F4F8FC] p-4 rounded-2xl text-xs space-y-2">
                <p className="font-bold text-[#0A192F]">Need Any Help?</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Our customer support team is available Mon–Sat (10 AM – 6 PM).
                </p>
                <a 
                  href="mailto:Saishtechnofarms@gmail.com" 
                  className="inline-block text-[#0080FF] font-semibold hover:underline text-[11px]"
                >
                  Saishtechnofarms@gmail.com
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Policy Content Body */}
          <div className="lg:col-span-3 space-y-8">
            
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
              {children}
            </div>

            {/* Customer Satisfaction Commitment Box from PDF */}
            <div className="bg-gradient-to-br from-[#0A192F] to-[#0F2942] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-[#76BC21] text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-[#76BC21]" />
                  <span>Customer Satisfaction Commitment</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Built Through Quality, Transparency & Customer Care
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  At Ayurmor, we believe trust is built through quality, transparency, and customer care. Every order is treated with utmost responsibility, and we continuously strive to provide a satisfying experience from purchase to delivery. Your wellness journey is important to us, and we remain committed to improving our products and services every day.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 text-xs">
                  {[
                    "Premium Wellness Products",
                    "Quality Focused Manufacturing",
                    "Customer-Centric Approach",
                    "Honest Communication",
                    "Proudly Made in India",
                    "Responsible Practices"
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl text-slate-200 border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#76BC21]" />
                      <span className="text-[11px] font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
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
