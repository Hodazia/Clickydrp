// 
import dashboardprev from '@/public/assets/Dashboard-edit.png'
import Image from 'next/image'

export function Dashboardedit() {
    //
    return (
        <>
        <section id='dashboard'>
        <div className='bg-[#fffbf0] text-[#2c2c2c] pb-4'>
            <div className='max-w-4xl mx-auto text-indigo-500 mb-2 pb-1 border-b-3 border-indigo-500
             text-center text-4xl'>
                Edit your clickydrop with built-in theme-editor feature</div>
                <div className='mt-10'>
                <Image 
            src={dashboardprev}
            alt='dashboard'
            className='w-[100%] h-[100%] md:w-[85%] md:h-[85%] mx-auto 
            border-indigo-400 border-2 border-ring-2 rounded-md p-1 
            '
            />
                </div>

        </div>
        </section>

        </>
    )
}