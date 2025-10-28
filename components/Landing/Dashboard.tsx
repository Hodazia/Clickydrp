// 
'use client'
import Image from 'next/image'
import {motion} from "framer-motion"
import dashboardlanding from "@/public/assets/dashboardlanding.png"

export function Dashboardedit() {
    //
    return (
        <>
        <section id='dashboard'>
            <motion.div
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02}}
            >
        <div className=' dark:bg-black text-[#2c2c2c] dark:text-white
        transition-colors duration-300 m-0  rounded-xl p-2'>
            <div className='sm|max-w-4xl 
            max-w-3xl mx-auto bg-indigo-400 dark:bg-indigo-600 text-white 
             mx-auto rounded-full p-2 text-3xl sm:text-4xl hover:bg-indigo-300
              dark:hover:bg-indigo-500 text-center hover:scale-105 border-2 border-foreground nb-shadow
             transition duration-300'>
                Edit your clickydrop with built-in theme-editor feature 🎨</div>
                <div className='mt-10'>
                <Image 
            src={dashboardlanding}
            alt='dashboard'
            className='w-[100%] h-[100%] md:w-[85%] md:h-[85%] mx-auto 
            border-2 rounded-md p-1 nb-shadow'
            />
                </div>

        </div>
        </motion.div>
        </section>

        </>
    )
}