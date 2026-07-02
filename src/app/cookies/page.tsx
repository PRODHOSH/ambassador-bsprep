import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-black pt-32 pb-20 px-5 sm:px-8 md:px-12 font-semibold">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 hover:text-[#5E0ED7] transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-8">
          <span className="text-black">Cookie</span> <span className="text-[#5E0ED7]">Policy</span>
        </h1>

        <div className="space-y-8 normal-case font-medium opacity-80 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences over time, making your browsing experience more efficient.
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              As a non-profit, student-focused platform, we use cookies purely for functional and analytical purposes, ensuring the portal runs smoothly. We use them for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Authentication:</strong> We use secure, HTTP-only cookies provided by NextAuth and Google OAuth to keep you logged in to your dashboard securely without needing to re-authenticate on every page load.</li>
              <li><strong>Analytics:</strong> We utilize Google Analytics to understand traffic patterns and improve the accessibility of our portal. This data is aggregated and never used for targeted advertising.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">3. No Advertising Cookies</h2>
            <p>
              Because BSPrep does not generate revenue from this platform and strictly adheres to a "No Data Selling" policy, we <strong>do not</strong> use any third-party advertising cookies or tracking pixels designed to serve you ads across the internet.
            </p>
          </section>

          <section>
            <h2 className="text-xl uppercase tracking-widest font-semibold text-black mb-4">4. Managing Your Cookies</h2>
            <p>
              You can control or delete cookies at any time through your browser settings. However, please note that disabling authentication cookies will prevent you from logging into your ambassador dashboard.
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
