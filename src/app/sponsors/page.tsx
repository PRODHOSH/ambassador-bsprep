import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";

const SPONSORS_DATA = [
  {
    name: "StickerFever",
    src: "/sponsors/stickerfever.png",
    website: "https://stickerfever.in",
    description: "An Indian brand specializing in premium, stylish, and waterproof vinyl stickers. They provide high-quality, durable stickers for laptops and accessories to help our students personalize their gear and express their unique tech persona.",
  },
  {
    name: "TruScholar",
    src: "/sponsors/truscholar.png",
    website: "https://www.truscholar.io",
    description: "A blockchain-powered platform for the issuance and verification of academic credentials. They empower the BSPrep community by issuing immutable, digital certificates and badges that can be securely showcased to employers worldwide.",
  },
  {
    name: "Unstop",
    src: "/sponsors/unstop.png",
    website: "https://unstop.com",
    description: "The leading early talent platform for students and professionals to learn, practice, and participate in global competitions and hackathons. They support our fellows by providing premium access to top-tier learning resources.",
  },
  {
    name: ".XYZ Domain",
    src: "/sponsors/xyz.png",
    website: "https://gen.xyz",
    description: "The universally recognized .xyz domain provider. They sponsor our top performers with free 1-year custom domains to help students build their personal portfolios and kickstart their professional digital presence on the web.",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-black pt-32 pb-20 px-5 sm:px-8 md:px-12 font-semibold uppercase">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest text-black/60 hover:text-[#5E0ED7] transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
          <span className="text-black">OUR</span> <span className="text-[#5E0ED7]">SPONSORS</span>
        </h1>
        <p className="text-xs sm:text-sm opacity-50 tracking-widest mb-16 max-w-lg">
          The industry leaders and visionary platforms that make the BSPrep Growth Fellows program possible.
        </p>

        <div className="flex flex-col gap-8 mb-24">
          {SPONSORS_DATA.map((sponsor) => (
            <div key={sponsor.name} className="bg-white border border-black/5 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(94,14,215,0.1)] transition-all">
              <div className="relative w-40 h-20 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image src={sponsor.src} alt={sponsor.name} fill className="object-contain object-left md:object-center" />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <h2 className="text-xl tracking-widest">{sponsor.name}</h2>
                <p className="normal-case opacity-70 text-sm leading-relaxed max-w-xl">
                  {sponsor.description}
                </p>
                <a 
                  href={sponsor.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs tracking-widest text-[#5E0ED7] hover:text-black transition-colors mt-2"
                >
                  Visit Website <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#5E0ED7] text-white p-10 sm:p-16 text-center flex flex-col items-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4">WANNA SPONSOR US?</h2>
          <p className="normal-case text-white/80 max-w-md mb-8 text-sm leading-relaxed">
            Partner with us to empower the next generation of tech leaders. Get your brand in front of thousands of highly motivated students across campuses.
          </p>
          <a 
            href="mailto:sponsorship@bsprep.in" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl"
          >
            <Mail size={18} />
            sponsorship@bsprep.in
          </a>
        </div>
      </div>
    </main>
  );
}
