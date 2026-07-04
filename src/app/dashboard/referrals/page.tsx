import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";

export default async function ReferralsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  // Fetch referrals for this ambassador
  // Note: We are assuming bsprep.in will insert the user's MASKED email into a new 'referred_user_email' column
  const { data: referrals } = await supabase
    .from("referrals")
    .select("created_at, referred_user_email")
    .eq("ambassador_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white min-h-[80vh] flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div id="tour-referrals-header">
          <h1 className="text-xl sm:text-2xl mb-1 text-black dark:text-white tracking-tight">Your Referrals</h1>
          <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60">Students who signed up using your code.</p>
        </div>
        <div className="text-[10px] opacity-60 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
          <span className="text-[#5E0ED7] font-bold">{referrals?.length || 0}</span> Total
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm flex flex-col transition-colors">
        {(!referrals || referrals.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-12">
            <Users size={32} className="mb-4 text-[#5E0ED7] opacity-50" />
            <p className="text-xs normal-case">No referrals yet. Share your link to get started!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 text-[10px] opacity-50 pb-2 border-b border-slate-100 dark:border-white/5 px-2">
              <span>Student Email</span>
              <span className="text-right">Date Joined</span>
            </div>
            
            {referrals.map((ref: any, idx: number) => {
              const displayNumber = idx + 1;
              return (
                <div key={idx} className="grid grid-cols-2 items-center text-xs bg-slate-50 dark:bg-white/5 px-4 py-3 rounded-xl border border-slate-100 dark:border-white/5 transition-colors">
                  <span className="font-bold flex items-center gap-3">
                    <span className="text-[#5E0ED7] w-4 text-left">{displayNumber}.</span>
                    <span className="normal-case font-medium">{ref.referred_user_email || "h***@hidden.com"}</span>
                  </span>
                  <span className="text-right opacity-60 normal-case">
                    {new Date(ref.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
