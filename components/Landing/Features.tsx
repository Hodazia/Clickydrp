// components/LandingPage.js
'use client';

import Image from 'next/image';
import { Link, Sparkles, User, Share2, Globe,Palette } from 'lucide-react';
import React from 'react';
import FeaturePortrait from "@/public/assets/centerfeature-port.png"
import {motion} from "framer-motion"


const features = [
  {
    icon: <User className="h-6 w-6 text-[#9a55ff] dark:text-white" />,
    title: 'PERSONAL URL',
    description: 'Create your personal Url and place it in your Instagram Bio.',
  },
  {
    icon: <Link className="h-6 w-6 text-[#9a55ff] dark:text-white" />,
    title: 'UNLIMITED LINKS',
    description: 'Add as many links as you wish, change them as often as you want.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-[#9a55ff] dark:text-white" />,
    title: 'ELEGANT AND PERFECT',
    description: 'With a cutting-edge interface, followers clicking on your Url will experience a great visual.',
  },
];

const securityFeatures = [
  {
    icon:  <Palette className="h-6 w-6 text-[#9a55ff] dark:text-white" />,
    title: 'THEME EDITOR',
    description: 'U can edit the display of your clickydrop with the custom theme-editor feature provided in the app',
  },
  {
    icon: <Share2 className="h-6 w-6 text-[#9a55ff] dark:text-white" />,
    title: 'SOCIAL FIRST',
    description: 'Cross-link all your social profiles and optimize the engagement across your different channels.',
  },
  {
    icon: <Globe className="h-6 w-6 text-[#9a55ff] dark:text-white" />,
    title: 'WEB-BASED',
    description: 'No need to install anything, just access anytime via browser from any device.',
  },
];

// const socialIcons = [
//   { src: '/assets/instagram.svg', alt: 'Instagram', title: 'Instagram' },
//   { src: '/assets/tiktok.svg', alt: 'TikTok', title: 'TikTok' },
//   { src: '/assets/twitter.svg', alt: 'Twitter', title: 'Twitter' },
//   { src: '/assets/youtube.svg', alt: 'YouTube', title: 'YouTube' },
//   { src: '/assets/spotify.svg', alt: 'Spotify', title: 'Spotify' },
//   { src: '/assets/apple-music.svg', alt: 'Apple Music', title: 'Apple Music' },
// ];

// const songs = [
//   'AT LAST',
//   'I JUST WANT MAKE LOVE TO YOU',
//   'A SUNDAY KIND OF LOVE',
//   'STORMY WEATHER',
// ];

export default function Features() {
  return (
    <>
    <section id='features'>
    <div className=" dark:bg-black text-[#2c2c2c] 
    dark:text-white p-10 md:p-20 font-sans
     min-h-screen transition-colors duration-300">
      <motion.div
      initial={{ scale:0.5,}}
      whileInView={{ scale:1, }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      >
      <div className='text-center  mb-2 '>
      <span className='items-center text-3xl 
            bg-indigo-400 text-white mb-2 
             mx-auto rounded-full p-2 
             hover:bg-indigo-300 hover:scale-105
             transition duration-300
             '>FEATURES
      </span>
      </div>
      </motion.div>

      <div className='text-center mt-4'>
      <span className='items-center text-3xl text-indigo-300 dark:text-indigo-400 '>
        A lot of amazing & cool features
      </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3
       gap-10 items-center justify-items-center">
        {/* Left Side Features */}
        <div className="flex flex-col gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col 
            md:flex-row items-center md:items-start text-center
            ml-2
            md:text-left gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f3e8ff] dark:bg-indigo-900">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg dark:text-white">{feature.title}</h3>
                <p className="mt-1 text-sm dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Phone Mockup */}
        <motion.div
      initial={{ scale:0.5,}}
      whileInView={{ scale:1, }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      >
        <div className="w-[80%] max-w-sm md:max-w-xs ml-10 lg:max-w-sm">
            {/* Profile Section */}
            <Image
                  src={FeaturePortrait}
                  alt="Profile"
                  className="rounded-md "
                />
        </div>
        </motion.div>
        {/* Right Side Features */}
        <div className="flex flex-col gap-10">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f3e8ff] dark:bg-indigo-900">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg dark:text-white">{feature.title}</h3>
                <p className="mt-1 text-sm dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
    </>
    
  );
}