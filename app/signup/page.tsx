'use client'


import { useState } from "react"
import { Sparkle } from "lucide-react";


import axios from "axios"
import z from "zod";
import { signupSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import  { toast } from "sonner"

// logo should be therenext to ClickyDrop
export default  function Signup() {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [username,setusername] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log("Signup submitted:", { username, email, password });
        // Add your signup logic here


        // Check if all fields are filled
        if (!username || !email || !password) {
            toast.error("All fields are required!");
            return;
        }

        const {success,data,error} = signupSchema.safeParse({email,password,username});


        if(!success)
        {
            toast.error("The Data you enter is invalid");
        }

        // Show a loading toast
        const toastId = toast.loading('Signing up...');
        
        try {
            const response = await fetch(`http://localhost:3000/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If the response is not OK, we throw an error with the message from the backend
                throw new Error(data.message || 'Signup failed');
            }
            
            // On successful signup, dismiss the loading toast and show a success toast
            toast.success(`Welcome, ${data.user.username}! You can now sign in.`, {
                id: toastId, // Dismiss the specific loading toast
            });

            // Navigate to the signin page after a short delay
            setTimeout(() => {
                router.push("/signin")
            }, 1500);

        } catch (error: any) {
            // On error, dismiss the loading toast and show an error toast
            toast.error(error.message ||
                 "Network error. Please try again.", {
                id: toastId, // Dismiss the specific loading toast
            });
        }
    };



    return (
        <>
        <div className="min-h-screen bg-white text-white flex 
        items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl mx-auto bg-white text-black 
            rounded-3xl shadow-2xl overflow-hidden 
            grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side: Signup Form */}
                <div className="flex flex-col p-8 sm:p-12 lg:p-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8 sm:mb-12">
                        <Sparkle className="text-indigo-400" size={32} />
                        <span className="text-3xl font-bold ">ClickyDrop</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold 
                     mb-4 animate-fade-in">
                        Register to your ClickyDrop 
                        Create your free bio page in minutes!
                    </h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 
                    flex flex-col mt-10 text-black">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 
                            text-lg font-semibold text-[#A8AAA2] 
                            bg-[#161615] 
                            hover:text-white
                            hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-lg transform hover:scale-105"
                        >
                            Sign up
                        </button>
                    </form>
                    
                    {/* Note to the user */}
                    <div className="text-center mt-6">
                        <span className="text-gray-400">
                           Already have an account?  
                           <a href={"/signin"}
                           className="text-[#8129D9]"
                           >Signin</a>
                        </span>
                    </div>
                </div>

                {/* Right Side: Image Collage */}
                {/* <div className="lg:flex p-6 bg-indigo-900 items-center justify-center relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden
                     shadow-xl transform scale-95 transition-transform duration-500">
                        <img
                            src={register}
                            alt="App preview collage"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div> */}
            </div>
            </div>
        </>
    )
}