'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A192F] text-[#F3EFE9] font-sans antialiased">
      <div className="w-full max-w-md p-8 bg-[#0b1a15] rounded-2xl border border-white/10">
        <h2 className="mb-6 text-center text-2xl font-serif font-bold">Admin Login</h2>
        {error && (
          <div className="mb-4 rounded bg-rose-900/30 p-2 text-rose-200 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-[#5A8B73] mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full bg-[#0b1a15] border border-white/10 rounded-xl p-2 text-white placeholder-white/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase text-[#5A8B73] mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-[#0b1a15] border border-white/10 rounded-xl p-2 text-white placeholder-white/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#E7977D] px-5 py-2.5 text-[#0b1a15] font-bold uppercase tracking-wider transition-colors hover:bg-[#ffebe5]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-[#5A8B73] hover:underline flex items-center justify-center gap-1">
            <X className="w-3 h-3" /> Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
