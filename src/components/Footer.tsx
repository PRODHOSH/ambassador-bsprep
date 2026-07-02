import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-5 sm:px-8 md:px-12 py-16 md:py-24 font-semibold uppercase tracking-widest text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
            </div>
            <span className="text-lg">BSPrep</span>
          </div>
          <div className="opacity-50 mt-auto pt-4">
            &copy; {new Date().getFullYear()} BSPrep
          </div>
        </div>

        {/* Portals & Socials Column */}
        <div className="flex flex-col gap-4 opacity-70">
          <span className="opacity-50 mb-2">Websites & Socials</span>
          <a href="https://bsprep.in" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Main Website</a>
          <a href="https://blog.bsprep.in" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Blogs Portal</a>
          <a href="https://www.linkedin.com/company/bs-prep/" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors mt-2">LinkedIn</a>
          <a href="https://www.youtube.com/@DataScienceIITMTamil" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">YouTube</a>
          <a href="https://www.instagram.com/bsprep.in" target="_blank" rel="noreferrer" className="hover:text-[#5E0ED7] transition-colors">Instagram</a>
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
          <a href="#" className="hover:text-[#5E0ED7] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#5E0ED7] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#5E0ED7] transition-colors">Cookie Policy</a>
        </div>

      </div>
    </footer>
  );
}
