import Image from "next/image";
import Hero from "@/components/Landing/Hero";
import { VideoDemo } from "@/components/Landing/VideoDemo";
import FAQsection from "@/components/Landing/FAQ";


export default function Home() {
  return (
    <>
    <Hero />
    <VideoDemo />
    <FAQsection />
    </>
  );
}
