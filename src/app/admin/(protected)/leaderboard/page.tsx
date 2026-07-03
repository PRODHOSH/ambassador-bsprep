import { createClient } from "@/lib/supabase/server";

export default async function AdminLeaderboardPage() {
  const supabase = await createClient();

  const { data: ambassadors } = await supabase
    .from("ambassadors")
    .select("id, name, email, points, referral_code")
    .eq("is_admin", false)
    .order("points", { ascending: false });

  return (
    <main className="p-6 md:p-10 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-black dark:text-white">Full Leaderboard</h1>
        <p className="text-xs normal-case opacity-60 text-black dark:text-white mt-2">
          Complete, unmasked view of all ambassadors and their rankings.
        </p>
      </div>

      <div className="bg-[#121212] rounded-3xl p-6 border border-white/10 shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-[#5E0ED7]">
              <th className="pb-4 px-4 font-bold w-16">S.No</th>
              <th className="pb-4 px-4 font-bold">Name</th>
              <th className="pb-4 px-4 font-bold">Email</th>
              <th className="pb-4 px-4 font-bold">Referral Code</th>
              <th className="pb-4 px-4 font-bold text-right">Points</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium">
            {ambassadors?.map((ambassador, index) => (
              <tr 
                key={ambassador.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4 text-white/50">#{index + 1}</td>
                <td className="py-4 px-4">{ambassador.name || "Unknown"}</td>
                <td className="py-4 px-4 normal-case tracking-normal">{ambassador.email}</td>
                <td className="py-4 px-4 tracking-widest">{ambassador.referral_code}</td>
                <td className="py-4 px-4 text-right text-[#5E0ED7] font-bold">
                  {ambassador.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {ambassadors?.length === 0 && (
          <div className="text-center py-10 text-white/40 text-xs">
            No ambassadors found.
          </div>
        )}
      </div>
    </main>
  );
}
