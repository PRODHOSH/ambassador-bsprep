import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import MobileNav from "@/components/MobileNav"; // Wait, maybe we need a MobileAdminNav? For now, we can just omit or use standard MobileNav if it supports admin links. I'll omit mobile nav for admin for now to keep it simple, or just rely on desktop for admin panel.

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Check if user is an admin
  const { data: ambassador } = await supabase
    .from("ambassadors")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!ambassador?.is_admin) {
    // If not an admin, redirect them to the regular dashboard
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-black text-black dark:text-white selection:bg-[#5E0ED7] selection:text-white font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
