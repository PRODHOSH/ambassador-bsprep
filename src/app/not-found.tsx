import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] w-full text-center px-6 font-semibold uppercase tracking-widest">
      <div className="text-[#5E0ED7] font-bold text-7xl sm:text-9xl mb-6 tracking-tighter">
        404
      </div>
      
      <h1 className="text-xl sm:text-2xl mb-4 tracking-tight">
        Lost in the Void
      </h1>
      
      <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60 max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for has been moved, deleted, or never existed in the first place. Let's get you back on track.
      </p>
      
      <Link 
        href="/dashboard"
        className="flex items-center gap-2 text-xs sm:text-sm text-white bg-[#5E0ED7] px-6 py-3 rounded-full hover:bg-[#4a0ba8] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Dashboard
      </Link>
    </main>
  );
}
