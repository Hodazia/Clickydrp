// 
'use client'
import dashboardprev from '@/public/assets/Dashboard-edit.png'
import Image from 'next/image'
import {motion} from "framer-motion"


export function Dashboardedit() {
    //
    return (
        <>
        <section id='dashboard'>
            <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 , x:-100}}
            whileInView={{ opacity: 1, scale: 0.9, y: 0 , x:0}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1}}
            >
        <div className='bg-[#fffbf0] dark:bg-black text-[#2c2c2c] dark:text-white pb-4 transition-colors duration-300'>
            <div className='sm:max-w-4xl 
            max-w-3xl mx-auto bg-indigo-400 dark:bg-indigo-600 text-white mb-2 
             mx-auto rounded-full p-2 text-3xl sm:text-4xl hover:bg-indigo-300 dark:hover:bg-indigo-500 hover:scale-105 
             transition duration-300'>
                Edit your clickydrop with built-in theme-editor feature 🎨</div>
                <div className='mt-10'>
                <Image 
            src={dashboardprev}
            alt='dashboard'
            className='w-[100%] h-[100%] md:w-[85%] md:h-[85%] mx-auto 
            border-indigo-400 dark:border-indigo-600 border-2 border-ring-2 rounded-md p-1 
            '
            />
                </div>

        </div>
        </motion.div>
        </section>

        </>
    )
}