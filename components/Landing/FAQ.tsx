
/*
Coding an FAQ Section! , , 




*/
'use client'

import { useState } from "react"
import { ArrowUp,ArrowDown } from "lucide-react"

interface faq {
    id:number,
    question:string,
    answer:string
}


export default function FAQsection(){
    const [openfq,setopenfq] = useState<number | null>(null);
    const faqs: faq[] = [
        {
      id: 1,
      question: "What is this open-source QuickyDrop",
      answer:`This project is a free and open-source platform designed to help you create a single landing page for all your social media links and online content. It is a powerful, customizable, 
      and community-driven alternative to proprietary bio link services.`
    },
    {
      id: 2,
      question: "How is this different from Linktree?",
      answer: `Unlike Linktree, this project is completely open-source, giving you full control over your data and code. It is free to use, highly customizable, and supported by a community of developers,
       meaning you can add new features and integrations as you see fit.`
    },
    {
      id: 3,
      question: "Is it really free to use?",
      answer: `Yes! The code is completely free and licensed under an open-source license. The only costs you might incur are for hosting, 
      should you choose to self-host your instance on a platform like Vercel, Netlify, or a VPS.`
    },
    {
      id: 4,
        question: 'How do I add and manage my links?',
        answer: `Our platform offers a simple drag-and-drop interface. You can add unlimited links, rearrange them with a simple click, and toggle them on or off instantly. 
        You can also add rich content like embedded videos, music, and forms directly to your page.`
     },
     {
        id:5,
        question:"Will i get my seperate domain for quickydrop",
        answer:`Yes for every memeber they have their speerate domain 
        which they can attatch to ig,yt,fb and so on`
     }

    ]

    const toggleFAQ = (id:number) => {
        setopenfq(openfq === id ? null: id); // toggling the state
    }

    return (
        <>
        <section
        id="faqs" 
        className="bg-[#fffbf0] text-[#2c2c2c]"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl p-2 font-bold text-indigo-400">
                        Frequently Asked Questions!
                    </h2>
                    <div className="space-y-4 pt-10 pb-5">
                {faqs.map((item, index) => (
                    <div
                    key={index}
                    className="border border-[#dcdcdc] rounded-xl p-6 cursor-pointer
                     text-white bg-indigo-600 transition-colors duration-300"
                    onClick={() => toggleFAQ(index)}
                    >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-medium text-white">{item.question}</h3>
                        <ArrowDown
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                            openfq === index ? 'rotate-180' : ''
                        }`}
                        />
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openfq === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <p className="text-white mx-auto leading-relaxed text-xl">{item.answer}</p>
                    </div>
                    </div>
                ))}
        </div>
                </div>
            </div>
        </section>
        
        
        </>
    )
}