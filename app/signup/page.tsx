'use client'


import React, { useState } from "react"
import { Sparkle } from "lucide-react";


import axios from "axios"
import z from "zod";
import { signupSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import  { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { signIn } from "next-auth/react"

// logo should be therenext to ClickyDrop
export default  function Signup() {

    const [formData,setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const router = useRouter();
    const handleChange = (e:any) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // console.log("Signup submitted:", { username, email, password });
        // Add your signup logic here


        // Check if all fields are filled
        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required!");
            return;
        }

        const {success,data,error} = signupSchema.safeParse(formData);


        if(!success)
        {
            toast.error("The Data you enter is invalid");
        }

        
        try {

            const response = await axios.post("http://localhost:3000/api/register",formData,
                {
                    headers: {
                        "Content-Type":"Application/json"
                    }
                }
            );
            console.log("REsponse Data is ", response.data);

            if(response.data.exists)
                {
                    toast.error("The user already exists, Enter new credentials! ");
                   
                }
                else {
                    toast.success("Successfully registered! ")
                    router.push("/signin");
                }


        } catch (error: any) {
            // On error, dismiss the loading toast and show an error toast
            toast.error(error.message ||
                 "Network error. Please try again.", {
            });
        }
    };

    const GoogleRegisterhandle =async () => {
        try {
            console.log("Google button clicked ! ")
            const res = await signIn("google", {
              redirect: false, // prevent auto redirect
              callbackUrl: "/dashboard", // where to go after login
            });
        
            if (res?.error) {
              toast.error("Google registration failed!");
              console.error("Google registration error:", res.error);
            } else {
              toast.success("Signed in with Google!");
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Unexpected Google registration error:", error);
            toast.error("Something went wrong. Try again!");
          }
    }

    const handlegitRegister = async () => {
        try {
            const res = await signIn("github", {
              redirect: false, // prevent auto redirect
              callbackUrl: "/dashboard", // where to go after login
            });
        
            if (res?.error) {
              toast.error("GitHub registration failed!");
              console.error("GitHub registration error:", res.error);
            } else {
              toast.success("Signed in with GitHub!");
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Unexpected GitHub Registration error:", error);
            toast.error("Something went wrong. Try again!");
          }
    }


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
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            
                        />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
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
                    <div className="flex flex-col gap-4">
                {/*add socials here like google and github */}
                <div className="flex justify-between w-full">
                    <Button variant="outline" className="w-[75px] h-[40px]"
                    onClick={GoogleRegisterhandle}><FcGoogle 
                    className="h-10 w-10" /></Button>
                    <Button variant="outline" className="w-[75px] h-[40px]"
                    onClick={handlegitRegister}><SiGithub
                    className="h-10 w-10" /></Button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button>
                        <a href="/login">
                        Already have an account Sign IN
                        </a>
                    </Button>
                </div>
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