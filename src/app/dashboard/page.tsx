import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Copy, Star, Zap, Award } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-[#27272a] pb-6">
          <div>
            <h1 className="text-3xl font-black mb-1">Welcome, {session.user?.name}</h1>
            <p className="text-[#9ca3af]">Level 1 Ambassador • Growth Fellow</p>
          </div>
          <div className="flex items-center gap-4 bg-[#1A1A1A] p-3 px-6 rounded-xl border border-[#27272a]">
             <div className="text-right">
                <div className="text-sm font-bold text-[#9ca3af]">Total Points</div>
                <div className="text-2xl font-black text-white">0</div>
             </div>
             <Star className="w-8 h-8 text-[#ffffff] opacity-20" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Action Area */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Referral Link Card */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#27272a]">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-white" />
                Your Referral Link
              </h2>
              <p className="text-[#9ca3af] text-sm mb-6">
                Share this link. You earn 50 points for every student who signs up and completes their profile.
              </p>
              
              <div className="flex items-center bg-[#111111] border border-[#27272a] rounded-lg overflow-hidden">
                <input 
                  type="text" 
                  readOnly 
                  value="https://bsprep.in/?ref=ambassador_pending" 
                  className="bg-transparent flex-1 p-3 text-sm text-[#9ca3af] outline-none"
                />
                <button className="bg-white text-black px-4 py-3 font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>

            {/* Active Bounties */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#27272a]">
              <h2 className="text-lg font-bold mb-6">Active Bounties</h2>
              
              <div className="space-y-4">
                <div className="border border-[#27272a] rounded-xl p-4 flex justify-between items-center bg-[#111111]">
                  <div>
                    <h4 className="font-bold text-sm">Post on LinkedIn</h4>
                    <p className="text-xs text-[#6b7280] mt-1">Share why you love BSPrep. Must tag our official page.</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-bold text-white text-lg">200 pts</span>
                    <button className="text-xs font-semibold underline text-[#9ca3af] hover:text-white mt-1">Submit URL</button>
                  </div>
                </div>
                
                <div className="border border-[#27272a] rounded-xl p-4 flex justify-between items-center bg-[#111111]">
                  <div>
                    <h4 className="font-bold text-sm">Join the Discord</h4>
                    <p className="text-xs text-[#6b7280] mt-1">Connect with other Growth Fellows.</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-bold text-white text-lg">50 pts</span>
                    <button className="text-xs font-semibold underline text-[#9ca3af] hover:text-white mt-1">Connect</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            {/* Rewards Progress */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#27272a]">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-white" />
                Rewards Tier
              </h2>
              
              <div className="relative pt-2">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block uppercase text-white">
                      Level 1
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-[#9ca3af]">
                      100 pts to Level 2
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#27272a]">
                  <div style={{ width: "0%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="text-sm flex justify-between items-center opacity-50">
                  <span className="line-through">Ambassador Badge</span>
                  <span className="text-xs">Unlocked</span>
                </div>
                <div className="text-sm flex justify-between items-center">
                  <span>Offer Letter</span>
                  <span className="text-xs text-[#9ca3af]">100 pts</span>
                </div>
                <div className="text-sm flex justify-between items-center">
                  <span>LOR & LinkedIn</span>
                  <span className="text-xs text-[#9ca3af]">500 pts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
