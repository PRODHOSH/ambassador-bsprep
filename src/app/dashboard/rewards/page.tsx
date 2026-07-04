import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function RewardsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  const ITEMS = [
    {
      id: 1,
      name: "Unstop T-Shirts",
      image: "/items/tshirt.png",
      description: "Premium cotton T-Shirts for our top ambassadors."
    },
    {
      id: 2,
      name: "Exclusive Diaries",
      image: "/items/unstop-books.png",
      description: "High-quality notebooks and pens for your daily hustle."
    },
    {
      id: 3,
      name: ".XYZ Premium Domains",
      image: "/items/xyz.png",
      description: "Launch your own portfolio or project with a free .xyz domain."
    },
    {
      id: 4,
      name: "Sticker Packs & Bookmarks",
      image: "/items/sticker-pack.png",
      description: "Developer and student-themed sticker packs to customize your gear."
    },
    {
      id: 5,
      name: "Letter of Recommendation",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
      description: "A personalized Letter of Recommendation from our Founders for top performers."
    },
    {
      id: 6,
      name: "LinkedIn Endorsements",
      image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80",
      description: "Boost your professional profile with official LinkedIn recommendations."
    },
    {
      id: 7,
      name: "Certificate of Excellence",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&q=80",
      description: "Official certification proving your impact and growth during the 50-day program."
    }
  ];

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white min-h-[80vh] flex flex-col">
      <div className="mb-10" id="tour-rewards-list">
        <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight">
          Prize Pool
        </h1>
        <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60 max-w-xl leading-relaxed">
          Here is a sneak peek at the incredible rewards available at the end of the 50-day program. Keep climbing the leaderboard to secure your prizes!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm flex flex-col hover:border-[#5E0ED7]/50 transition-colors"
          >
            {item.image ? (
              <div className="relative w-full h-48 bg-slate-50 dark:bg-white/5 rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-4">
                <Image src={item.image} alt={item.name} fill className="object-contain p-4 hover:scale-105 transition-transform" />
              </div>
            ) : (
              <div className="relative w-full h-48 bg-gradient-to-br from-[#5E0ED7]/10 to-[#5E0ED7]/5 rounded-2xl mb-6 flex items-center justify-center border border-[#5E0ED7]/20">
                <span className="text-[#5E0ED7] text-4xl">📜</span>
              </div>
            )}
            
            <h3 className="text-lg tracking-tight mb-2">{item.name}</h3>
            <p className="text-xs normal-case font-medium opacity-60 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
