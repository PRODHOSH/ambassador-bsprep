"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, X, ExternalLink, Loader2 } from "lucide-react";

export default function AdminBountiesPage() {
  const [bounties, setBounties] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch all active bounties
    const { data: bountiesData } = await supabase
      .from("bounties")
      .select("id, title, reward_points")
      .eq("active", true)
      .order("created_at", { ascending: true });

    // Fetch ALL submissions (pending, approved, rejected)
    const { data: submissionsData } = await supabase
      .from("bounty_submissions")
      .select(`
        id,
        bounty_id,
        proof_text,
        status,
        created_at,
        ambassadors ( id, name, email )
      `)
      .order("created_at", { ascending: false });

    setBounties(bountiesData || []);
    setSubmissions(submissionsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (submissionId: string, status: "approved" | "rejected") => {
    setActionLoading(submissionId);
    
    const { error } = await supabase
      .from("bounty_submissions")
      .update({ status })
      .eq("id", submissionId);
      
    if (!error) {
      // Update local state instead of removing
      setSubmissions(prev => 
        prev.map(s => s.id === submissionId ? { ...s, status } : s)
      );
    } else {
      alert("Error updating submission: " + error.message);
    }
    
    setActionLoading(null);
  };

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white">
      <div className="mb-10">
        <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight">
          Bounty Review
        </h1>
        <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60 max-w-xl leading-relaxed">
          Review ambassador submissions grouped by task.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-[#5E0ED7]">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <div className="space-y-12">
          {bounties.map((bounty) => {
            const bountySubmissions = submissions.filter(s => s.bounty_id === bounty.id);
            
            if (bountySubmissions.length === 0) return null;

            return (
              <div key={bounty.id} className="bg-[#121212] rounded-3xl p-6 md:p-8 shadow-xl border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-lg text-white">{bounty.title}</h2>
                    <span className="text-[10px] text-[#5E0ED7] font-bold">REWARD: {bounty.reward_points} PTS</span>
                  </div>
                  <div className="bg-white/5 px-4 py-2 rounded-xl text-xs">
                    {bountySubmissions.length} Submissions
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {bountySubmissions.map((sub) => (
                    <div key={sub.id} className="border border-white/5 bg-black/40 rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center transition-colors hover:bg-white/5">
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xs normal-case font-medium opacity-80 mb-3 text-white">
                          Ambassador: <strong className="text-white">{sub.ambassadors?.name || "Unknown"}</strong> ({sub.ambassadors?.email})
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 overflow-hidden">
                          <div className="text-[10px] opacity-50 mb-2 font-bold tracking-widest text-white">PROOF:</div>
                          {sub.proof_text.startsWith("http") ? (
                            <a href={sub.proof_text} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-2 normal-case text-sm truncate block">
                              <ExternalLink size={14} className="shrink-0" />
                              <span className="truncate">{sub.proof_text}</span>
                            </a>
                          ) : (
                            <p className="normal-case text-sm font-medium text-white/80 break-words">{sub.proof_text}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 justify-end">
                        {sub.status === "pending" ? (
                          <>
                            <button 
                              onClick={() => handleAction(sub.id, "approved")}
                              disabled={actionLoading === sub.id}
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === sub.id ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                              Approve
                            </button>
                            <button 
                              onClick={() => handleAction(sub.id, "rejected")}
                              disabled={actionLoading === sub.id}
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 text-red-500 px-6 py-3 rounded-xl hover:bg-red-500/20 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === sub.id ? <Loader2 className="animate-spin" size={16} /> : <X size={16} />}
                              Reject
                            </button>
                          </>
                        ) : (
                          <div className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold ${
                            sub.status === "approved" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          }`}>
                            {sub.status === "approved" ? <Check size={16} /> : <X size={16} />}
                            {sub.status.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {submissions.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-[#121212] rounded-3xl border border-white/10">
              <Check size={48} className="text-green-500 mb-4 opacity-50" />
              <h3 className="text-lg text-white">All caught up!</h3>
              <p className="text-xs normal-case font-medium opacity-60 mt-2 text-white">No bounty submissions found in the database.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
