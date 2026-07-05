import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import IDCard from "@/components/IDCard";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/dashboard/login");
  }

  // Get ambassador info for the referral code
  const { data: ambassadorData } = await supabase
    .from("ambassadors")
    .select("referral_code")
    .eq("id", user.id)
    .single();

  const name = user.user_metadata?.full_name || "Ambassador";
  const email = user.email || "";
  const photoUrl = user.user_metadata?.avatar_url || "";
  const referralCode = ambassadorData?.referral_code;

  return (
    <main className="min-h-[90vh] text-black dark:text-white flex flex-col font-semibold tracking-widest uppercase p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight">Settings & Profile</h1>
          <p className="text-xs normal-case font-medium opacity-60">Manage your ambassador profile and access resources.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg mb-6 tracking-tight">Profile Details</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] opacity-60">Name</label>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl normal-case">
                    {name}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] opacity-60">Email Address</label>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl normal-case">
                    {email}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents & Resources */}
            <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg mb-6 tracking-tight">Documents & Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/pdf/bsprepoverview.pdf" target="_blank" className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold truncate">BSPrep Overview</span>
                    <span className="text-[10px] normal-case opacity-60">PDF Document</span>
                  </div>
                </a>

                <a href="/badges/bsprep_badge.png" target="_blank" className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
                    <img src="/badges/bsprep_badge.png" alt="Badge" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold truncate">Growth Fellow Badge</span>
                    <span className="text-[10px] normal-case opacity-60">Digital Asset (PNG)</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-lg mb-6 tracking-tight lg:hidden">Your ID Card</h2>
            <IDCard 
              name={name}
              email={email}
              photoUrl={photoUrl}
              referralCode={referralCode}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
