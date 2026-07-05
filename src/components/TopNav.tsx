"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut, ChevronDown, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface TopNavProps {
  user: any;
  points: number;
}

export default function TopNav({ user, points }: TopNavProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hide on login page
  if (pathname === "/dashboard/login") {
    return null;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-20 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-md sticky top-0 z-40 px-5 sm:px-8 flex items-center justify-between transition-colors">
      
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
        >
          <Sun size={18} className="hidden dark:block" />
          <Moon size={18} className="block dark:hidden" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Points Display */}
        <div className="flex items-center gap-2 bg-[#FDFBF7] dark:bg-white/5 border border-amber-200 dark:border-amber-500/30 px-4 py-2 rounded-full shadow-sm">
          <div className="relative w-5 h-5">
            <Image src="/coin.png" alt="Coins" fill className="object-contain" />
          </div>
          <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">{points} pts</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            id="tour-profile-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10">
              {user?.user_metadata?.avatar_url ? (
                <Image src={user.user_metadata.avatar_url} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                {user?.user_metadata?.full_name || "Ambassador"}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setDropdownOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden py-2 transform origin-top-right transition-all">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                  <p className="text-xs font-semibold text-black dark:text-white uppercase tracking-wider">Signed in as</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">{user?.email}</p>
                </div>
                
                <div className="p-2">
                  <Link 
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all uppercase tracking-wider mb-1"
                  >
                    <Settings size={14} />
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 transition-all uppercase tracking-wider"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
