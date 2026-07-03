import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Bell } from "lucide-react";

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white min-h-[80vh] flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl mb-1 text-black dark:text-white tracking-tight">Announcements</h1>
        <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60">Important updates from the BSPrep team.</p>
      </div>

      <div className="flex-1 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center transition-colors">
        <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 border border-slate-100 dark:border-white/10">
          <Bell size={24} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-lg mb-2 text-slate-600 dark:text-slate-300">No New Announcements</h2>
        <p className="text-xs normal-case font-medium opacity-50 max-w-sm">
          You're all caught up! When the team posts new events, updates, or special bounties, they will appear here.
        </p>
      </div>
    </main>
  );
}
