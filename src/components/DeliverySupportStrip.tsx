'use client';

import { Truck, Clock, MessageCircle } from 'lucide-react';

export default function DeliverySupportStrip() {
  const trustItems = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On all prepaid orders across India',
      color: 'text-[#0080FF]'
    },
    {
      icon: Clock,
      title: 'Ready in 60 Seconds',
      subtitle: 'Instant preparation — no boiling required',
      color: 'text-amber-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      subtitle: 'Direct help & order tracking 24/7',
      color: 'text-emerald-500'
    }
  ];

  return (
    <section className="bg-white border-y border-slate-200 py-6 shadow-sm">
      <div className="max-width-1200 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 group">
                <div className={`w-12 h-12 rounded-2xl bg-[#F4F8FC] border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0A192F] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
