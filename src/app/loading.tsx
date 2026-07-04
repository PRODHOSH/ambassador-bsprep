export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] w-full font-semibold uppercase tracking-widest">
      <div className="relative w-16 h-16 flex items-center justify-center mb-6">
        {/* Background Track */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-white/5"></div>
        {/* Spinning Highlight */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#5E0ED7] animate-spin"></div>
        {/* Center Pulse */}
        <div className="w-3 h-3 bg-[#5E0ED7] rounded-full animate-pulse shadow-[0_0_15px_rgba(94,14,215,0.8)]"></div>
      </div>
      <p className="text-[10px] opacity-60 tracking-[0.2em] animate-pulse">
        Loading...
      </p>
    </div>
  );
}
