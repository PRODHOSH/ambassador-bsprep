"use client";

import { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function BountyCard({ 
  bounty, 
  referralCode,
  submission 
}: { 
  bounty: any, 
  referralCode: string,
  submission?: any 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedLocal, setIsSubmittedLocal] = useState(false);

  const isAlreadySubmitted = !!submission || isSubmittedLocal;
  const isApproved = submission?.status === 'approved';
  const isPending = submission?.status === 'pending';
  const isRejected = submission?.status === 'rejected';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || isSubmitting) return;
    
    setIsSubmitting(true);
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("bounty_submissions")
      .insert({
        ambassador_id: user.id,
        bounty_id: bounty.id,
        proof_text: inputValue
      });

    setIsSubmitting(false);

    if (error) {
      alert("Error submitting claim: " + error.message);
      return;
    }
    
    setIsSubmittedLocal(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <>
      <div className={`bg-white dark:bg-[#1A1A1A] border ${isApproved ? 'border-green-500/50' : 'border-slate-200 dark:border-white/10'} rounded-3xl p-6 shadow-sm flex flex-col relative overflow-hidden group hover:border-[#5E0ED7]/30 transition-colors`}>
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-[#5E0ED7]">
            <Upload size={18} />
          </div>
          
          {isAlreadySubmitted ? (
            <div className={`text-[10px] px-3 py-1.5 rounded-full font-bold ${
              isApproved ? 'bg-green-500/10 text-green-500' :
              isRejected ? 'bg-red-500/10 text-red-500' :
              'bg-amber-500/10 text-amber-500'
            }`}>
              {isApproved ? 'APPROVED' : isRejected ? 'REJECTED' : 'PENDING'}
            </div>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[10px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Claim Now
            </button>
          )}
        </div>

        <h3 className="text-xs mb-2">{bounty.title}</h3>
        <p className="text-[10px] normal-case font-medium opacity-60 mb-6 flex-1 leading-relaxed">
          {bounty.description}
        </p>

        <div className={`bg-[#5E0ED7]/5 text-[#5E0ED7] border border-[#5E0ED7]/20 rounded-xl py-2 px-4 text-[10px] flex items-center gap-2 ${isApproved ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}`}>
          <div className="w-3.5 h-3.5 bg-[#5E0ED7] rounded-full text-white flex items-center justify-center font-bold text-[8px]">
            P
          </div>
          +{bounty.reward_points} Bonus Points
        </div>
      </div>

      {isModalOpen && !isAlreadySubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                  {bounty.title}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="opacity-50 hover:opacity-100">
                  <X size={18} />
                </button>
              </div>

              {isSubmittedLocal ? (
                <div className="py-8 text-center text-[#5E0ED7] flex flex-col items-center">
                  <svg className="w-12 h-12 mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs">Claim submitted for verification!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-2">
                  <p className="text-xs normal-case opacity-70 mb-4">
                    Complete the task above and submit your proof (URL to post, document, or image link) below.
                    <br/><br/>
                    <strong>Note:</strong> Be sure to include your referral code ({referralCode}) if the task requires it.
                  </p>
                  
                  <input
                    type="text"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs normal-case outline-none focus:border-[#5E0ED7] transition-colors mb-4"
                  />

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#5E0ED7] hover:bg-black dark:hover:bg-white dark:hover:text-black text-white px-4 py-3 rounded-xl text-xs transition-colors font-bold tracking-widest uppercase disabled:opacity-50"
                  >
                    {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                    Submit for Verification
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
