import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Timeline from "@/components/Timeline";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Sponsors />
      <Timeline />
      <Benefits />
      <Features />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
