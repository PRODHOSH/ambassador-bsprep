"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-black flex flex-col uppercase tracking-widest font-semibold relative overflow-hidden">
      {/* Decorative background elements */}

      {/* Header */}
      <header className="p-5 sm:p-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 shrink-0">
            <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
          </div>
          <span className="text-sm">BSPrep</span>
        </div>
        <Link href="/" className="flex items-center gap-2 text-xs text-black/60 hover:text-[#5E0ED7] transition-colors font-medium">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </header>

      {/* Login Box */}
      <div className="flex-1 flex items-center justify-center p-5 relative z-10">
        <div className="w-full max-w-md bg-white p-8 sm:p-12 text-center shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden group">
          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#5E0ED7]" />
          
          <div className="w-16 h-16 bg-[#5E0ED7]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#5E0ED7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl mb-4 text-black/90 tracking-tight">Welcome Back</h1>
          <p className="text-[10px] sm:text-xs text-black/50 mb-10 normal-case font-medium leading-relaxed">
            Verified ambassadors allowed only. Please sign in with your registered Google account to access your dashboard.
          </p>

          <button 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-3 w-full bg-white border border-black/10 text-black/80 py-4 hover:bg-slate-50 hover:shadow-md transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm font-semibold tracking-wider">Continue with Google</span>
          </button>
        </div>
      </div>
    </main>
  );
}
