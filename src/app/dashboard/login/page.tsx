"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col uppercase tracking-widest font-semibold relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5E0ED7]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="p-5 sm:p-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
          </div>
          <span className="text-sm">BSPrep</span>
        </div>
        <Link href="/" className="flex items-center gap-2 text-xs hover:text-[#5E0ED7] transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </header>

      {/* Login Box */}
      <div className="flex-1 flex items-center justify-center p-5 relative z-10">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl mb-4">Welcome Back</h1>
          <p className="text-[10px] sm:text-xs opacity-60 mb-10 normal-case font-medium">
            Verified ambassadors allowed only. Please sign in with your registered Google account to access your dashboard.
          </p>

          <Link href="/dashboard" className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 rounded-full hover:bg-gray-200 transition-colors group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm">Continue with Google</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
