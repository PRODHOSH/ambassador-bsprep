"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, Bell, LogOut, Users, Trophy, Gift } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Sidebar() {
  const pathname = usePathname();
  
  // Do not show sidebar on the login page
  if (pathname === "/dashboard/login") {
    return null;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
    { name: "Rewards", href: "/dashboard/rewards", icon: Gift },
    { name: "Bounties", href: "/dashboard/bounties", icon: Target },
    { name: "Referrals", href: "/dashboard/referrals", icon: Users },
    { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#121212] border-r border-slate-200 dark:border-white/10 h-screen sticky top-0 flex flex-col uppercase tracking-widest font-semibold text-xs shrink-0 hidden md:flex transition-colors">
      <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center gap-3">
        <div className="relative w-8 h-8 shrink-0">
          <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
        </div>
        <span className="text-black dark:text-white">Ambassador</span>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-[#5E0ED7] text-white shadow-md shadow-[#5E0ED7]/20" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
              }`}
            >
              <item.icon size={18} className={isActive ? "opacity-100" : "opacity-50"} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
