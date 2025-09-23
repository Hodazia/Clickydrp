'use client'

import Link from 'next/link'
import logovector from "@/public/assets/Vector.svg"; 
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="border-t border-indigo-100 dark:border-black dark:bg-black
      text-[#2c2c2c] dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4
       sm:px-6 lg:px-8 py-8 grid grid-cols-1
        md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-indigo-500 dark:text-indigo-400">
          <Image 
          src={logovector}
          className=""
          alt="Logo"
          /> 
          <span>ClickyDrop</span></h3>
          <p className="text-xl leading-relaxed">One link for everything you share. Open-source, themeable, and social-first.</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Product</h4>
          <ul className="space-y-2 text-lg">
            <li><a href="#videodemo" className="hover:text-indigo-600 dark:hover:text-indigo-400">Demo</a></li>
            <li><a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400">Features</a></li>
            <li><a href="#dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">Dashboard</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Resources</h4>
          <ul className="space-y-2 text-lg">
            <li><Link href="/signin" className="hover:text-indigo-600 dark:hover:text-indigo-400">Login</Link></li>
            <li><Link href="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400">Register</Link></li>
            <li><a href="https://github.com/Hodazia/Clickydrp" target="_blank" className="hover:text-indigo-600 dark:hover:text-indigo-400">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-indigo-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 
        sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center 
        justify-between text-xl text-gray-500">
          <p>© {new Date().getFullYear()} ClickyDrop. All rights reserved.</p>
          {/* <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400">Features</a>
            <a href="#faqs" className="hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</a>
            <a href="https://clickydrp.vercel.app/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Live</a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}


