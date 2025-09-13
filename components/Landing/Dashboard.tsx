// 
import dashboard from '@/public/assets/Dashboard-edit-front.png'
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
            <Image 
            src={dashboard}
            alt='dashboard'
            className='w-[100%] h-[100%] md:w-[85%] md:h-[85%] mx-auto 
            '
            />
        </div>
        </section>

        </>
    )
}