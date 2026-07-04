import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LeaderboardTable from "@/components/LeaderboardTable";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  // Fetch all ambassadors, ordered by points (highest first)
  const { data: ambassadors, error } = await supabase
    .from("ambassadors")
    .select("id, name, referral_code, points")
    .eq("is_admin", false)
    .order("points", { ascending: false });

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white min-h-[80vh] flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div id="tour-leaderboard-header">
          <h1 className="text-xl sm:text-2xl mb-1 text-black dark:text-white tracking-tight">Global Leaderboard</h1>
          <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60">See how you stack up against other ambassadors.</p>
        </div>
        <div className="text-[10px] opacity-60 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-xl flex flex-col items-center">
          <span className="opacity-70 mb-1">Total Ambassadors</span>
          <span className="text-[#5E0ED7] font-bold text-lg">{ambassadors?.length || 0}</span>
        </div>
      </div>

      {error ? (
        <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-200 dark:border-red-500/20">
          Error loading leaderboard data.
        </div>
      ) : (
        <LeaderboardTable ambassadors={ambassadors || []} />
      )}
    </main>
  );
}
