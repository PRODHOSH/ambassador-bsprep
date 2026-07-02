import Image from "next/image";
import Link from "next/link";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white px-5 sm:px-8 md:px-12 py-16 md:py-24 font-semibold uppercase tracking-widest text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
            </div>
            <span className="text-lg">BSPrep</span>
          </div>
          
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com/company/bs-prep/" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#5E0ED7] hover:text-white transition-all">
              <LinkedinIcon />
            </a>
            <a href="https://www.youtube.com/@DataScienceIITMTamil" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#5E0ED7] hover:text-white transition-all">
              <YoutubeIcon />
            </a>
            <a href="https://www.instagram.com/bsprep.in" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#5E0ED7] hover:text-white transition-all">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Portals Column */}
        <div className="flex flex-col gap-4 opacity-70">
          <span className="opacity-50 mb-2">Websites</span>
          <a href="https://bsprep.in" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Main Website</a>
          <a href="https://blog.bsprep.in" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Blogs Portal</a>
        </div>

        {/* Forms & Contact Column */}
        <div className="flex flex-col gap-4 opacity-70">
          <span className="opacity-50 mb-2">Contact & Forms</span>
          <a href="mailto:support@bsprep.in" className="hover:text-[#5E0ED7] transition-colors lowercase font-medium">support@bsprep.in</a>
          <a href="mailto:careers@bsprep.in" className="hover:text-[#5E0ED7] transition-colors lowercase font-medium">careers@bsprep.in</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc8lSGsbLay_yvhHWjL2rtCd0YJCgjXmxNZ3ttB4IcFB0Js8g/viewform?usp=dialog" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors mt-2">Contact Form</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeqAmEuz6NrH6P-sa7jD9-0272a-cwm9eASrbvHor7nJN_TtQ/viewform?usp=dialog" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Feedback Form</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfyhCw9tPgKmMWYPhjV6Kzixp2RdYEi-x7JPL6JUxoLwbnB_g/viewform?usp=dialog" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Join Community</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfvet6P3yTtm4Ui3VE7M0gDSAsltxZ-Rrtd4fgUY0_iL7lkNg/viewform?usp=dialog" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Hiring Form</a>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-4 opacity-70">
          <span className="opacity-50 mb-2">Legal</span>
          <Link href="/terms" className="hover:text-[#5E0ED7] transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#5E0ED7] transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-[#5E0ED7] transition-colors">Cookie Policy</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="opacity-50">
            &copy; {new Date().getFullYear()} BSPrep
          </span>
          <span className="opacity-40 normal-case font-medium text-[10px] max-w-lg">
            Disclaimer: BSPrep is an independent, non-profit initiative and is NOT affiliated with, endorsed by, or sponsored by IIT Madras. 
          </span>
        </div>
      </div>
    </footer>
  );
}
