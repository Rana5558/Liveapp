import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Trending from "@/components/Trending";
import AIPlatformFeatures from "@/components/AIPlatformFeatures";
import MoreFeatures from "@/components/MoreFeatures";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Features />
      <Trending />
      <FAQ />
      <AIPlatformFeatures />
      <CTA />
      <MoreFeatures />
      <Pricing />
      <Footer />
    </main>
  );
}
