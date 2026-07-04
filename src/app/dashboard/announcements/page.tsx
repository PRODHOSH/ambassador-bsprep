import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Bell, Calendar } from "lucide-react";

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  const { data: announcements } = await supabase
    .from("announcements_ambassador")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white min-h-[80vh] flex flex-col">
      <div className="mb-8" id="tour-announcements-header">
        <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight flex items-center gap-3">
          Announcements
          {announcements && announcements.length > 0 && (
            <span className="bg-[#5E0ED7] text-white text-[10px] px-2 py-1 rounded-full">
              {announcements.length} NEW
            </span>
          )}
        </h1>
        <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60">Important updates from the BSPrep team.</p>
      </div>

      {!announcements || announcements.length === 0 ? (
        <div className="flex-1 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center transition-colors">
          <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 border border-slate-100 dark:border-white/10">
            <Bell size={24} className="text-slate-400 dark:text-slate-500" />
          </div>
          <h2 className="text-lg mb-2 text-slate-600 dark:text-slate-300">No New Announcements</h2>
          <p className="text-xs normal-case font-medium opacity-50 max-w-sm">
            You're all caught up! When the team posts new events, updates, or special bounties, they will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 shadow-sm transition-colors relative overflow-hidden group hover:border-[#5E0ED7]/50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5E0ED7]/20 via-[#5E0ED7] to-[#5E0ED7]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-xl text-[#5E0ED7] tracking-tight">{announcement.title}</h2>
                <div className="flex items-center gap-2 text-[10px] opacity-50 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5 shrink-0">
                  <Calendar size={12} />
                  {new Date(announcement.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              
              <p className="text-sm normal-case font-medium opacity-80 leading-relaxed whitespace-pre-wrap">
                {announcement.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
