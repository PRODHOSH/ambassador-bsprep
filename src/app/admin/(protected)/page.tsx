import { createClient } from "@/lib/supabase/server";
import { Users, Target, CheckCircle, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch stats
  const { count: totalAmbassadors } = await supabase
    .from("ambassadors")
    .select("*", { count: 'exact', head: true });
    
  const { count: pendingBounties } = await supabase
    .from("bounty_submissions")
    .select("*", { count: 'exact', head: true })
    .eq('status', 'pending');
    
  const { count: approvedBounties } = await supabase
    .from("bounty_submissions")
    .select("*", { count: 'exact', head: true })
    .eq('status', 'approved');

  const { data: topAmbassadors } = await supabase
    .from("ambassadors")
    .select("name, email, points, referral_code")
    .eq("is_admin", false)
    .order("points", { ascending: false })
    .limit(5);

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white">
      <div className="mb-10">
        <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60 max-w-xl leading-relaxed">
          Welcome to the BSPrep Ambassador Admin Panel. Oversee growth and approve bounties.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <div className="text-[10px] opacity-60 mb-1">Total Ambassadors</div>
          <div className="text-3xl font-bold">{totalAmbassadors || 0}</div>
        </div>
        
        <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <div className="text-[10px] opacity-60 mb-1">Pending Bounties</div>
          <div className="text-3xl font-bold text-amber-500">{pendingBounties || 0}</div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle size={24} />
          </div>
          <div className="text-[10px] opacity-60 mb-1">Approved Bounties</div>
          <div className="text-3xl font-bold">{approvedBounties || 0}</div>
        </div>
      </div>

      {/* Top Ambassadors */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        <h2 className="text-sm mb-6 flex items-center gap-2">
          <Target size={16} className="text-[#5E0ED7]" /> Top Ambassadors
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5">
              <tr>
                <th className="pb-3 font-medium">Rank</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Points</th>
                <th className="pb-3 font-medium">Ref Code</th>
              </tr>
            </thead>
            <tbody>
              {topAmbassadors?.map((ambassador, i) => (
                <tr key={i} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 text-[#5E0ED7]">#{i + 1}</td>
                  <td className="py-4 font-bold">{ambassador.name || "Unknown"}</td>
                  <td className="py-4 normal-case opacity-70">{ambassador.email}</td>
                  <td className="py-4">{ambassador.points}</td>
                  <td className="py-4 font-mono text-[10px] opacity-60">{ambassador.referral_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
