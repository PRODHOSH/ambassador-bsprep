import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-black pt-32 pb-20 px-5 sm:px-8 md:px-12 font-semibold">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 hover:text-[#5E0ED7] transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-8">
          <span className="text-black">Terms of</span> <span className="text-[#5E0ED7]">Service</span>
        </h1>

        <div className="space-y-8 normal-case font-medium opacity-80 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">1. Program Nature & Independence</h2>
            <p>
              By accessing the BSPrep Growth Fellows Portal, you acknowledge that this is a zero-profit, independent initiative created to support and empower students. 
              <strong> We are entirely independent and not affiliated, endorsed, or sponsored by IIT Madras in any capacity.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">2. Zero-Cost Guarantee</h2>
            <p>
              Participation in the Growth Fellows program is completely free of charge. We do not ask for payment, nor do we make any revenue from your participation, referrals, or bounty completions. The rewards, including domains, swags, and premium resources, are provided at zero cost to you as an incentive for your efforts.
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">3. Use of Technology & Data</h2>
            <p>
              To provide this service, we leverage third-party technologies including Google OAuth for secure login, Neon DB for storing your progress, and Google Analytics/Search Console for platform analytics. By using the platform, you consent to our use of these services. We strictly uphold a "No Data Selling" policy as outlined in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">4. Code of Conduct</h2>
            <p>
              As an ambassador, you agree to represent the BSPrep community with integrity. Fraudulent referrals, spamming, or misrepresentation (including falsely claiming affiliation with IIT Madras on our behalf) will result in immediate termination from the program and forfeiture of any earned points or rewards.
            </p>
          </section>

          <div className="pt-8 border-t border-black/10 text-xs opacity-60">
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}
