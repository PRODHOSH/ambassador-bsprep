"use client";

import { useState } from "react";
import { Search, Trophy, Medal } from "lucide-react";

export default function LeaderboardTable({ ambassadors }: { ambassadors: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter by search query
  const filteredAmbassadors = ambassadors.filter((ambassador) =>
    (ambassador.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ambassador.referral_code || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAmbassadors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAmbassadors = filteredAmbassadors.slice(startIndex, startIndex + itemsPerPage);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={16} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={16} className="text-slate-400" />;
    if (rank === 3) return <Medal size={16} className="text-amber-600" />;
    return <span className="text-[10px] opacity-50 font-bold ml-1">#{rank}</span>;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search by name or code..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
          className="w-full bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs normal-case outline-none focus:border-[#5E0ED7] transition-colors shadow-sm"
        />
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm transition-colors">
        <div className="grid grid-cols-12 text-[10px] opacity-50 px-6 py-4 border-b border-slate-100 dark:border-white/5">
          <span className="col-span-2 sm:col-span-1">Rank</span>
          <span className="col-span-7 sm:col-span-8">Ambassador</span>
          <span className="col-span-3 text-right">Points</span>
        </div>
        
        {paginatedAmbassadors.length === 0 ? (
          <div className="p-8 text-center text-xs opacity-50 normal-case">
            No ambassadors found.
          </div>
        ) : (
          <div className="flex flex-col">
            {paginatedAmbassadors.map((ambassador, idx) => {
              // Calculate actual rank based on overall index
              const actualRank = ambassadors.findIndex(a => a.id === ambassador.id) + 1;
              const isTop3 = actualRank <= 3;
              
              return (
                <div 
                  key={ambassador.id} 
                  className={`grid grid-cols-12 items-center text-xs px-6 py-4 border-b border-slate-50 dark:border-white/5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${
                    isTop3 ? 'bg-[#5E0ED7]/5 dark:bg-[#5E0ED7]/10' : ''
                  }`}
                >
                  <div className="col-span-2 sm:col-span-1 flex items-center">
                    {getRankIcon(actualRank)}
                  </div>
                  
                  <div className="col-span-7 sm:col-span-8 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isTop3 
                        ? 'bg-[#5E0ED7] text-white' 
                        : 'bg-slate-100 dark:bg-white/10 text-[#5E0ED7]'
                    }`}>
                      {(ambassador.name || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-bold ${isTop3 ? 'text-[#5E0ED7]' : ''}`}>
                        {ambassador.name || "Anonymous Ambassador"}
                      </span>
                      <span className="text-[10px] opacity-50 normal-case">{ambassador.referral_code}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-right font-bold text-[#5E0ED7]">
                    {ambassador.points} pts
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 mt-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-[10px] px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            PREV
          </button>
          <span className="text-[10px] opacity-50">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-[10px] px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
}
