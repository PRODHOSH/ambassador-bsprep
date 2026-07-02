"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/dashboard/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#5E0ED7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-semibold tracking-widest uppercase">
      {/* Navigation */}
      <header className="border-b border-white/10 p-5 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
          </div>
          <span className="text-sm">Dashboard</span>
        </div>

        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer">
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-8 max-w-7xl mx-auto w-full">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 mb-8">
          <h1 className="text-2xl sm:text-3xl mb-2 text-[#5E0ED7]">
            Welcome, {session?.user?.name || "Fellow"}!
          </h1>
          <p className="text-xs sm:text-sm normal-case font-medium opacity-60">Your ambassador journey starts here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:col-span-2">
            <h2 className="text-lg mb-4">Active Bounties</h2>
            <div className="text-xs normal-case font-medium opacity-50 flex h-32 items-center justify-center border border-dashed border-white/20 rounded-xl">
              No active bounties available right now.
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-lg mb-4">Your Stats</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-black/40 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <span className="text-[10px] opacity-60">Total Points</span>
                <span className="text-xl text-[#5E0ED7]">0</span>
              </div>
              <div className="bg-black/40 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <span className="text-[10px] opacity-60">Referrals</span>
                <span className="text-xl text-[#5E0ED7]">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
