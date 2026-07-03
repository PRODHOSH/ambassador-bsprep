"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, Users, Trophy, Gift } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Rank", href: "/dashboard/leaderboard", icon: Trophy },
    { name: "Rewards", href: "/dashboard/rewards", icon: Gift },
    { name: "Tasks", href: "/dashboard/bounties", icon: Target },
    { name: "Referrals", href: "/dashboard/referrals", icon: Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#121212] border-t border-slate-200 dark:border-white/10 px-4 py-2 flex justify-between items-center z-40 transition-colors pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full py-2 gap-1 rounded-xl transition-colors ${
              isActive
                ? "text-[#5E0ED7]"
                : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <item.icon size={20} className={isActive ? "opacity-100" : "opacity-50"} />
            <span className="text-[10px] font-bold tracking-widest uppercase">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
