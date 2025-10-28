
import Hero from "@/components/Landing/Hero";
import { VideoDemo } from "@/components/Landing/VideoDemo";
import FAQsection from "@/components/Landing/FAQ";
import { Dashboardedit } from "@/components/Landing/Dashboard";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden
    bg-[radial-gradient(50%_38%_at_50%_41.3%,_#ffede8_0%,_rgb(255,253,250)_100%)]">
      <Hero />
      <div className="px-2 sm:px-4">
        <Dashboardedit />
      </div>
      <div className="px-2 sm:px-4">
        <Features />
      </div>
      <div className="px-2 sm:px-4">
        <VideoDemo />
      </div>
      <div className="px-2 sm:px-4">
        <FAQsection />
      </div>
      <Footer />
    </div>
  );
}
