import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function VerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.code;
  
  if (!code) {
    notFound();
  }

  const supabase = await createClient();

  // Look up the ambassador by referral code
  const { data: ambassador, error } = await supabase
    .from("ambassadors")
    .select("name, created_at")
    .eq("referral_code", code.toUpperCase())
    .single();

  if (error || !ambassador) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F2F0E9] p-4 text-[#1C364A]">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-[#1C364A]/10">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-widest mb-2">Invalid ID</h1>
          <p className="opacity-70 mb-6 text-sm font-medium">This Ambassador ID could not be found or has been revoked.</p>
          <Link href="/" className="inline-block bg-[#1C364A] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  const joinDate = new Date(ambassador.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F2F0E9] p-4 text-[#1C364A]">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-[#1C364A]/10 relative overflow-hidden">
        
        {/* Confetti / abstract bg effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1C364A]/5 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-6">
            <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" unoptimized />
          </div>

          <div className="flex items-center justify-center gap-2 text-green-500 mb-6">
            <CheckCircle2 size={32} />
            <h1 className="text-2xl font-black uppercase tracking-widest text-[#1C364A]">Verified</h1>
          </div>

          <p className="opacity-70 mb-2 text-sm font-bold uppercase tracking-widest">Official Growth Fellow</p>
          
          <h2 className="text-3xl font-black uppercase tracking-widest mb-6 text-[#1C364A] break-words">
            {ambassador.name}
          </h2>

          <div className="w-full bg-[#F2F0E9] rounded-xl p-4 mb-8 border border-[#1C364A]/10 flex justify-between items-center text-left">
            <div>
              <span className="block text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Access Code</span>
              <span className="font-mono font-bold tracking-widest">{code.toUpperCase()}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Active Since</span>
              <span className="font-bold tracking-widest">{joinDate}</span>
            </div>
          </div>

          <p className="text-xs opacity-60 font-medium max-w-xs mx-auto">
            This individual is an authorized representative of the BSPrep Student Ambassador Program.
          </p>
        </div>

      </div>
    </main>
  );
}
