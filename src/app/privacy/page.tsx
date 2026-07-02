import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-black pt-32 pb-20 px-5 sm:px-8 md:px-12 font-semibold">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 hover:text-[#5E0ED7] transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-8">
          <span className="text-black">Privacy</span> <span className="text-[#5E0ED7]">Policy</span>
        </h1>

        <div className="space-y-8 normal-case font-medium opacity-80 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">1. Non-Profit & Independence Disclaimer</h2>
            <p>
              The BSPrep Growth Fellows Portal is an independent, non-profit initiative designed solely for the benefit of students. 
              We are <strong>NOT affiliated with, endorsed by, or sponsored by IIT Madras</strong>. This platform exists to foster community growth and provide career acceleration resources at zero cost. We do not generate revenue from this ambassador program.
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">2. Data We Collect & How We Use It</h2>
            <p className="mb-4">
              To operate the Ambassador portal, we utilize industry-standard services to collect minimal necessary data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Google OAuth:</strong> We use Google Authentication to verify your identity and securely manage logins. We access your basic profile information (Name and Email) to create your dashboard profile.</li>
              <li><strong>Neon DB:</strong> Your ambassador profile, referral counts, and bounty progress are securely stored in Neon Database.</li>
              <li><strong>Google Analytics & Search Console:</strong> We use these tools to monitor website traffic, understand user behavior, and improve the platform's accessibility and performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">3. Absolute Zero Data Selling</h2>
            <p>
              Your privacy is our priority. <strong>We do not, and will never, sell your personal data to third parties.</strong> Your data is strictly used to maintain your dashboard, track your progress, and award your earned perks. 
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">4. Your Rights</h2>
            <p>
              You have the right to request the deletion of your account and associated data at any time. If you wish to leave the program or have your data removed from our databases, please contact us at <a href="mailto:support@bsprep.in" className="text-[#5E0ED7] hover:underline">support@bsprep.in</a>.
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
