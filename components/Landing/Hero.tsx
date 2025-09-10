/*
-> code the hero section end to end!
    - with a different background , closer to indigo-100 to indigo-600
    - Sections in the landing page, 
    #DONE
-> Demo, -> Watch a tutorial to get started,
-> Dashboard -> A dashboard photo of theme editor customize ur clickydrop the way u want
-> Some very beautiful theme portrayals in the mobile preview , give at least 5
  -> How to style which designs to follow look for the inspirations in designs from figma, dribble
-> Features for the page! , 
  -> A small gif also for the theme editor!
-> FAQ's #DONE
-> Footer
*/

'use client'
import Link from "next/link"
import { Github } from "lucide-react"
import { useRouter } from "next/navigation"
import logovector from "@/public/assets/Vector.svg"; 
import Image from "next/image";

export default function Hero()
{
    const router = useRouter();
    return (
        <>
        <div className="bg-[#fffbf0] text-[#2c2c2c] min-h-screen">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 
      flex justify-between items-center">
        <div className="flex  gap-1 justify-center items-center text-4xl font-bold text-[#e9c882]">
          <Image 
          src={logovector}
          className=""
          alt="Logo"
          /> 
          <span className="text-3xl">ClickyDrop</span></div>
        <nav className="hidden md:flex space-x-6 text-[#6b6b6b] font-medium">
          <a href="#videodemo" 
          className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">Demo</a>
          <a href="#" className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">Features</a>
          <a href="#" className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">Dashboard</a>
          <a href="#" className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">FAQ's</a>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white px-5 py-2 bg-indigo-600 hover:text-indigo-600 
          hover:bg-white rounded-full transition-colors hover:ring-2
           "
           onClick={() => {
            router.push("/signin")
           }}
           >Login</a>
          <a href="#" className=" text-white px-5 py-2 rounded-full font-semibold 
          transition-colors bg-indigo-600 hover:text-indigo-600 hover:bg-white
           p-2 rounded-full hover:ring-2"
           onClick={() => {
            router.push("/signup")
           }}
           >Register</a>
        </div>
      </header>

      {/* Hero Content */}
      <main className="text-center py-10 px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-playfair-display leading-tight">
          Single Link <br />
          Multi Benefits
        </h1>

        <div className="flex justify-center items-center mt-6 space-x-4">
          <div className="flex">
            <div className="w-10 h-10 rounded-full border-2 border-[#fffbf0] bg-red-400 -mr-2"></div>
            <div className="w-10 h-10 rounded-full border-2 border-[#fffbf0] bg-blue-400 -mr-2"></div>
            <div className="w-10 h-10 rounded-full border-2 border-[#fffbf0] bg-green-400 -mr-2"></div>
            <div className="w-10 h-10 rounded-full border-2 border-[#fffbf0] bg-purple-400"></div>
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Trust Pilot</p>
            <p className="text-yellow-400 text-lg">★★★★★</p>
            <p className="text-xs text-[#6b6b6b]">rated 5.0 over 12.5k reviews</p>
          </div>
        </div>

        <p className="text-base sm:text-lg mt-8 text-[#2c2c2c] leading-relaxed">
          ClickyDrop is an open-source alternative to <br className="hidden sm:block" />
          Linktree for their bio links!
          <br />
          Have one URL for all of your links
          <br />
          Check out the repo 
          <a href="https://github.com/Hodazia/Clickydrp" target="__blank">
          <Github className="w-8 h-8 mx-auto bg-black text-white p-1 rounded-full"/>
          </a>
          
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-full p-2 w-full max-w-sm">
            <span className="text-sm sm:text-base text-[#6b6b6b] pl-3 pr-1 whitespace-nowrap">
                www.clickydrop.vercel.app/</span>
            <input 
              type="text" 
              placeholder="username" 
              className="flex-1 bg-transparent outline-none
               text-sm sm:text-base text-[#2c2c2c] placeholder-[#a0a0a0]" 
            />
          </div>
          <a 
            href="#" 
            className="text-white px-8 py-3 rounded-full 
            font-semibold hover:bg-white hover:text-indigo-600
            bg-indigo-600 hover:ring-2
            transition-colors w-full sm:w-auto text-center
            flex justify-center items-center gap-2
            
            "
            onClick={() => {
                router.push("/signup")
               }}
          >
            Claim your clickydrop
            <Image 
            src={logovector}
            alt="logobutton"
            />
          </a>
        </div>
      </main>
    </div>
        </>
    )
}