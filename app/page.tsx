
import Hero from "@/components/Landing/Hero";
import { VideoDemo } from "@/components/Landing/VideoDemo";
import FAQsection from "@/components/Landing/FAQ";
import { Dashboardedit } from "@/components/Landing/Dashboard";
import Features from "@/components/Landing/Features";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Dashboardedit />
      <Features />
      <VideoDemo />
      <FAQsection />
    </div>
  );
}
