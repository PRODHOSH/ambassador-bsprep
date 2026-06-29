import { LoginButton } from "@/components/login-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1A1A] via-[#111111] to-[#111111]"></div>
      
      <div className="relative z-10 w-full max-w-md mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#1A1A1A] px-4 py-1.5 text-xs font-semibold text-[#9ca3af] mb-8 uppercase tracking-widest">
          Authorized Personnel Only
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Ambassador<br />Portal
        </h1>
        
        <p className="text-[#6b7280] mb-12 max-w-xs mx-auto">
          Sign in to access your dashboard, referral links, and bounty tasks.
        </p>

        <LoginButton />
        
        <p className="mt-8 text-xs text-[#6b7280]">
          &copy; {new Date().getFullYear()} BSPrep. All rights reserved.
        </p>
      </div>
    </main>
  );
}
