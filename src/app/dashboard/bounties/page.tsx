import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BountyCard from "@/components/BountyCard";

export default async function BountiesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  // Fetch the ambassador data
  const { data: ambassadorData } = await supabase
    .from("ambassadors")
    .select("id, referral_code")
    .eq("id", user.id)
    .single();

  const referralCode = ambassadorData?.referral_code || "CODE_ERROR";

  // Fetch active bounties
  const { data: bounties } = await supabase
    .from("bounties")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  // Fetch ambassador's submissions
  const { data: submissions } = await supabase
    .from("bounty_submissions")
    .select("*")
    .eq("ambassador_id", ambassadorData?.id);

  const totalCompleted = submissions?.filter(s => s.status === 'approved').length || 0;

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white">
      <div className="flex justify-between items-end mb-6" id="tour-bounties-list">
        <div>
          <h1 className="text-xl sm:text-2xl mb-1 text-black dark:text-white tracking-tight">Active Bounties</h1>
          <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60">Complete tasks to earn massive bonus points.</p>
        </div>
        <div className="text-[10px] hidden sm:block opacity-60">
          <span className="text-[#5E0ED7] font-bold">{totalCompleted}/{bounties?.length || 0}</span> Approved
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bounties?.map((bounty) => {
          const submission = submissions?.find(s => s.bounty_id === bounty.id);
          return (
            <BountyCard 
              key={bounty.id} 
              bounty={bounty} 
              referralCode={referralCode} 
              submission={submission}
            />
          );
        })}
      </div>

      <div className="mt-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] rounded-3xl p-5 shadow-sm transition-colors">
        <p className="text-[10px] normal-case font-medium opacity-60 flex items-start gap-2 leading-relaxed">
          <svg className="w-4 h-4 shrink-0 text-[#5E0ED7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Bonus points appear on the leaderboard after manual verification. Each task is checked by our team. Fraudulent proofs will result in disqualification and account ban.
        </p>
      </div>
    </main>
  );
}
