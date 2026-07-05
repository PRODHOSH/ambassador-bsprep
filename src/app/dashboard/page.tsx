import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CopyLinkButton from "@/components/CopyLinkButton";
import AnimatedCounter from "@/components/AnimatedCounter";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/dashboard/login");
  }

  // Check if they are in the approved_ambassadors table
  // (Assuming you'll create this table in Supabase)
  const { data: approvedEmail, error: approvalError } = await supabase
    .from("approved_ambassadors")
    .select("email")
    .eq("email", user.email)
    .single();

  if (approvalError || !approvedEmail) {
    // If not approved, sign them out and redirect to login with an error
    await supabase.auth.signOut();
    redirect("/dashboard/login?error=not_approved");
  }

  // Check their points and referrals from the ambassadors table
  let { data: ambassadorData } = await supabase
    .from("ambassadors")
    .select("points, referral_code")
    .eq("id", user.id)
    .single();

  // Robust fallback: if they somehow skipped the callback auto-provisioning, create it now!
  if (!ambassadorData) {
    const namePart = (user.user_metadata?.full_name || user.email || 'AMB').substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '');
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const refCode = `${namePart}${randomPart}`;
    
    const { error: insertError } = await supabase.from('ambassadors').insert({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || "Ambassador",
      referral_code: refCode,
      points: 0
    });

    if (insertError) {
      console.error("Failed to insert ambassador record. Check RLS policies:", insertError);
    }

    ambassadorData = { points: 0, referral_code: refCode };
  }

  const points = ambassadorData?.points || 0;
  // Get actual referrals count
  const { count: referrals } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("ambassador_id", user.id);

  return (
    <main className="min-h-[90vh] text-black dark:text-white flex flex-col font-semibold tracking-widest uppercase p-4 sm:p-6 md:p-8">
      
      {/* Content */}
      <div className="w-full max-w-7xl">
        <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 mb-6 shadow-sm relative overflow-hidden transition-colors">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#5E0ED7]" />
          
          <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight">
            Welcome, <span className="text-[#5E0ED7]">{user.user_metadata?.full_name || "Ambassador"}!</span>
          </h1>
          <p className="text-xs normal-case font-medium opacity-60">Your ambassador journey starts here.</p>
          
          {ambassadorData?.referral_code && (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3" id="tour-referral-link">
              <div className="inline-flex items-center gap-4 bg-slate-50 dark:bg-white/5 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs shadow-inner overflow-x-auto max-w-full">
                <span className="opacity-60 whitespace-nowrap">Your Referral Link:</span> 
                <span className="text-[#5E0ED7] sm:text-base font-bold tracking-widest lowercase whitespace-nowrap mr-2">
                  https://bsprep.in/?ref={ambassadorData.referral_code}
                </span>
                <CopyLinkButton link={`https://bsprep.in/?ref=${ambassadorData.referral_code}`} />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
            <h2 className="text-lg mb-6 tracking-tight">Your Stats</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-5 flex justify-between items-center border border-slate-100 dark:border-white/5 transition-transform hover:scale-[1.02]">
                <span className="text-[10px] opacity-60">Total Points</span>
                <span className="text-2xl text-[#5E0ED7]">
                  <AnimatedCounter value={points} />
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-5 flex justify-between items-center border border-slate-100 dark:border-white/5 transition-transform hover:scale-[1.02]">
                <span className="text-[10px] opacity-60">Referrals</span>
                <span className="text-2xl text-[#5E0ED7]">
                  <AnimatedCounter value={referrals} />
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-5 flex justify-between items-center border border-slate-100 dark:border-white/5 transition-transform hover:scale-[1.02] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <span className="text-[10px] opacity-60">Daily Streak</span>
                </div>
                <div className="flex items-baseline gap-1 text-[#5E0ED7]">
                  <span className="text-2xl font-bold"><AnimatedCounter value={3} /></span>
                  <span className="text-[10px] opacity-60">Days</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center text-center transition-colors">
            <div className="w-16 h-16 bg-[#5E0ED7]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#5E0ED7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-lg mb-2">Claim Bounties</h2>
            <p className="text-xs normal-case font-medium opacity-60 mb-6 max-w-xs">
              Complete simple tasks like subscribing to our YouTube channel or posting on LinkedIn to earn massive bonus points.
            </p>
            <a href="/dashboard/bounties" className="bg-[#5E0ED7] dark:bg-white dark:text-black text-white px-6 py-3 rounded-full text-[10px] sm:text-xs hover:bg-black dark:hover:bg-slate-200 transition-all shadow-md">
              View Active Bounties &rarr;
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
