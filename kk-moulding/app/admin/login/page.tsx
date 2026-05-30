// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) { toast.error('Enter passcode.'); return; }
    setLoading(true);
    try {
      await login(code);
      router.replace('/admin');
    } catch (err: any) {
      toast.error('Invalid passcode. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#FFFFFF]"
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">
            K K Moulding
          </h1>
          <p className="font-sans text-xs mt-2 tracking-widest uppercase text-[#8C6239]">
            Admin Panel
          </p>
        </div>

        <div className="p-10 bg-[#FFFFFF] rounded-[4px] border border-[#E6D5C3] shadow-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999999] mb-3 block font-medium text-center" htmlFor="admin-code">Enter Passcode</label>
              <input
                id="admin-code"
                type="password"
                className="w-full bg-transparent border-b border-[#E6D5C3] pb-3 text-center text-2xl tracking-[0.5em] focus:border-[#3E2723] outline-none rounded-none px-0 text-[#3E2723] transition-colors"
                placeholder="••••••••"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="btn-pill-dark w-full justify-center mt-8"
            >
              {loading ? 'Verifying…' : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <p className="font-sans text-xs text-center mt-8 text-[#999999]">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
