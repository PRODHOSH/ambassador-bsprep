"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Target, ShieldAlert, Bell } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Leaderboard", href: "/admin/leaderboard", icon: Users },
    { name: "Bounty Review", href: "/admin/bounties", icon: Target },
    { name: "Announcements", href: "/admin/announcements", icon: Bell },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0a] text-white border-r border-white/10 h-screen sticky top-0 flex flex-col uppercase tracking-widest font-semibold text-xs shrink-0 hidden md:flex">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="relative w-8 h-8 shrink-0">
          <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-white">BSPrep</span>
          <span className="text-[9px] text-[#5E0ED7] font-bold flex items-center gap-1 mt-0.5">
            <ShieldAlert size={10} /> ADMIN PANEL
          </span>
        </div>
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
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} className={isActive ? "opacity-100" : "opacity-50"} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto">
         <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all w-full"
          >
            Switch to User View
         </Link>
      </div>
    </aside>
  );
}
