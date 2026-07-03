import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let points = 0;
  if (user) {
    const { data } = await supabase
      .from("ambassadors")
      .select("points")
      .eq("id", user.id)
      .single();
    points = data?.points || 0;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white font-semibold transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden relative">
        <TopNav user={user} points={points} />
        <div className="flex-1 bg-[#FDFBF7] dark:bg-[#121212] transition-colors pb-20 md:pb-0">
          {children}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
