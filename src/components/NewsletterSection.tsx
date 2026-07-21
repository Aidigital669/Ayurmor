'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Gift } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-width-1200 mx-auto bg-gradient-to-br from-[#0F3D2E] via-[#164e3c] to-[#0F3D2E] p-8 md:p-14 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,#5A8B73_0%,transparent_50%)] opacity-20 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-amber-300/20 inline-flex items-center gap-1 mb-3">
              <Gift className="w-3.5 h-3.5" /> Special Welcome Gift
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-white text-left">
              Get 15% Off Your First Order
            </h2>
            <p className="text-white/80 text-sm leading-relaxed font-light">
              Subscribe to Ayurmor for weekly botanical wellness tips, sprouted millet recipes, and exclusive flash sales.
            </p>
          </div>

          <div>
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-grey pointer-events-none" />
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-7 py-3.5 bg-amber-400 text-[#0F3D2E] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-amber-300 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                  Claim 15% Off
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 p-5 rounded-2xl border border-white/20 text-center space-y-2"
              >
                <CheckCircle2 className="w-8 h-8 text-amber-300 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-white">You're Subscribed! 🎉</h4>
                <p className="text-xs text-emerald-200">
                  Use promo code <strong className="font-mono text-amber-300 bg-white/10 px-2 py-0.5 rounded">AYUR15</strong> at checkout for 15% off!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
