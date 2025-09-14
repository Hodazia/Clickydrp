'use client'
import Link from "next/link"
import { Github, MenuIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import logovector from "@/public/assets/Vector.svg"; 
import Image from "next/image";
import Hroimage from "@/public/assets/left-herosection.png"
import bdbarbie from "@/public/assets/bad-barbie.png"
import ishowspeed from "@/public/assets/ishow-speed.png"
import ronaldo from "@/public/assets/rnld-portrait.png"
import prfl from "@/public/assets/centerfeature-port.png"
import {motion} from "framer-motion"
import { useState } from "react";


export default function Hero()
{
  const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    return (
        <>
        <div className="bg-[#fffbf0] text-[#2c2c2c] min-h-screen">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 
      flex justify-between items-center">
        <motion.div
        initial={{opacity:0, scale:0}}
        animate={{ opacity:1, scale:1, transition: {duration: 1}}}
        whileHover={{ opacity:1,scale:1.2, rotate:2 }}
        >
        <div className="flex  gap-1 justify-center items-center text-4xl font-bold text-[#e9c882]">
          <Image 
          src={logovector}
          className=""
          alt="Logo"
          /> 
          <span className="text-3xl">ClickyDrop</span></div>
        </motion.div>
        <nav className="hidden md:flex space-x-6 text-[#6b6b6b] font-medium">
          <Link href="#videodemo" 
          className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">Demo</Link>
          <Link href="#features" className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">Features</Link>
          <Link href="#dashboard" className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">Dashboard</Link>
          <Link href="#faqs" className="hover:text-black transition-colors hover:bg-indigo-600
          hover:text-white p-2 rounded-full">FAQ&apos;s</Link>


        
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signin" className="text-white px-5 py-2 bg-indigo-600 hover:text-indigo-600 
          hover:bg-white rounded-full transition-colors hover:ring-2
          hover:scale-105 transition duration 800
           "
           >Login</Link>
          <Link href="/signup" className=" text-white px-5 py-2 rounded-full font-semibold 
          transition-colors bg-indigo-600 
          hover:scale-105 transition duration 200
          hover:text-indigo-600 hover:bg-white
           p-2 rounded-full hover:ring-2"
           >Register</Link>
        </div>


      </nav>
                  {/* Mobile Hamburger Menu Button */}
                  <div className="md:hidden flex items-center">
                  <button onClick={() => setIsOpen(!isOpen)}>
                      <MenuIcon className="w-8 h-8 text-indigo-400" />
                  </button>
            </div>
      </header>

{/* Mobile Menu */}
{isOpen && (
                <div className="relative top-0 left-0 w-full h-full bg-[#fffbf0] z-50 flex 
                flex-col items-center justify-start animate-fade-in border-b-indigo-200 border-2 pb-2">
                    <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-[#2c2c2c]">
                        <XIcon className="w-8 h-8 text-blue-400" />
                    </button>
                    <nav className="flex flex-col space-y-6 text-[#6b6b6b] text-xl font-medium">
                        <Link href="#videodemo" onClick={() => setIsOpen(false)} 
                        className="hover:text-black transition-colors hover:bg-indigo-600 hover:text-white p-2 rounded-full">
                          Demo
                          </Link>
                        <Link href="#features" onClick={() => setIsOpen(false)}
                         className="hover:text-black transition-colors hover:bg-indigo-600 hover:text-white p-2 rounded-full">
                          Features</Link>
                        <Link href="#dashboard" onClick={() => setIsOpen(false)} 
                        className="hover:text-black transition-colors hover:bg-indigo-600 hover:text-white p-2 rounded-full">
                          Dashboard</Link>
                        <Link href="#faqs" onClick={() => setIsOpen(false)} 
                        className="hover:text-black transition-colors hover:bg-indigo-600 hover:text-white p-2 rounded-full">
                          FAQ&apos;s</Link>
                    </nav>

                    <div className="flex flex-col items-center space-y-4 mt-8">
                        <Link href="/signin" onClick={() => setIsOpen(false)} 
                        className="text-white px-5 py-2 bg-indigo-600 hover:text-indigo-600 hover:bg-white 
                        rounded-full transition-colors hover:ring-2 hover:scale-105 duration-300">
                          Login</Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)} 
                        className="text-white px-5 py-2 rounded-full font-semibold transition-colors
                         bg-indigo-600 hover:scale-105 duration-200 hover:text-indigo-600 hover:bg-white p-2 
                         rounded-full hover:ring-2">Register</Link>
                    </div>
                </div>
            )}


      {/* Hero Content */}
      <main className="text-center grid grid-cols-1 lg:grid-cols-2  px-4 items-center">
      <motion.div
          initial={{ opacity:0,x:-100}}
          animate={{opacity:1, x:0, scale:1, 
            transition: {
            duration:1
          }}}
          >

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-playfair-display leading-tight">
          Single Link <br />
          Multi Benefits
        </h1>



        <p className="text-base mt-5 sm:text-lg text-[#2c2c2c] leading-relaxed">
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
            className="text-white px-4 py-3 rounded-full 
            font-semibold hover:bg-white hover:text-indigo-600
            bg-indigo-600 hover:ring-2
            hover:scale-105
            transition duration-300
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
        </motion.div>
        <motion.div
        initial={{scale:0.5,x:500,opacity:0}}
        animate={{
          scale:1,
          opacity:1,
          x:0,
          transition:{
            duration:1
          }
        }}
        whileHover={{ scale:1.1}}
        >
        <div className="relative mx-auto mt-8 lg:mt-0">
          <Image 
          src={Hroimage}
          alt="hero image"
          className="w-full h-auto max-h-[600px] object-contain mx-auto"
          />
          </div>
        </motion.div>


      </main>
      <div className="mt-20">
        <motion.div
        initial={{ opacity:0,y:-40}}
        animate={{ opacity:1, y:0}}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        >
        <div className="text-center text-white rounded-full p-1
         max-w-4xl text-4xl bg-indigo-400 mx-auto
         hover:bg-indigo-300 hover:scale-105
         transition duration-300">
          Create your profile in minutes just like the ones below! 👇
        </div>
        </motion.div>

              {/* Animated Images */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {[bdbarbie, ronaldo, prfl, ishowspeed].map((img, i) => (
          <motion.div
            key={i}
            className="w-1/2 sm:w-1/5"
            initial={{ opacity: 0, scale: 0.8, y: 40 , x:-100}}
            whileInView={{ opacity: 1, scale: 1, y: 0 , x:0}}
            transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }} 
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={img}
              alt={`profile-${i}`}
              className="h-auto rounded-xl object-cover shadow-md"
            />
          </motion.div>
        ))}
      </div>
      </div>
    </div>
        </>
    )
}