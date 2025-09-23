
import Hero from "@/components/Landing/Hero";
import { VideoDemo } from "@/components/Landing/VideoDemo";
import FAQsection from "@/components/Landing/FAQ";
import { Dashboardedit } from "@/components/Landing/Dashboard";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen 
    bg-[radial-gradient(50%_38%_at_50%_41.3%,_#ffede8_0%,_rgb(255,253,250)_100%)]">
      <Hero />
      <Dashboardedit />
      <Features />
      <VideoDemo />
      <FAQsection />
      <Footer />
    </div>
  );
}
