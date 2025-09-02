'use client'

import { useState } from "react"

import login from "../assets/LogIN.png"

import axios from "axios";

import  { toast } from "sonner"
import { signinSchema } from "@/lib/schema";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useRouter } from "next/navigation";
import React from "react";

// interface SigninProps {
//     setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

export default function Signin()  {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e:any) => {
        // console.log("I am getting changed ! ")
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Signing in...");
        console.log("Signup submitted:",);


        const {success,data,error} = signinSchema.safeParse(formData);


        if(!success)
        {
            toast.error("The Data you enter is invalid", { id: toastId});
            return;
        }

        try {
            const res = await signIn("credentials", {
                redirect: false, // prevent auto redirect
                email: formData.email,
                password: formData.password,
            });

            console.log("Response is ", res);
        
            if (res?.error) {
                toast.error("Invalid email or password!", { id: toastId });
            } else {
                toast.success("Successfully signed in!",  { id: toastId });
                router.push("/dashboard"); // redirect wherever you want
            }
    
            console.log("Form submitted! ")
            console.log("The email and password is ", formData.email, "\n Password ",formData.password );

            // setTimeout(() => {
            //    router.push("/dashboard")
            // },1500)

        } catch (error: any) {
            // On error, dismiss the loading toast and show an error toast
            toast.error(error.message ||
                 "Network error. Please try again.", {
                id: toastId, // Dismiss the specific loading toast
            });
        }
    };


    const GoogleLoginhandle =async () => {
        const toastId = toast.loading("Signing in with Google...");
        try {
            
            console.log("Google button clicked ! ")
            const res = await signIn("google", {
              redirect: false, // prevent auto redirect
              callbackUrl: "/dashboard", // where to go after login
            });
        
            if (res?.error) {
              toast.error("Google registration failed!",{ id: toastId });
              console.error("Google registration error:", res.error);
            } else {
              toast.success("Successfully Signed in with Google!", { id: toastId });
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Unexpected Google registration error:", error);
            toast.error("Something went wrong. Try again!", { id: toastId });
          }
    }

    const handlegitlogin = async () => {
        const toastId = toast.loading("Signing in with Google...");
        try {
            const res = await signIn("github", {
              redirect: false, // prevent auto redirect
              callbackUrl: "/dashboard", // where to go after login
            });
        
            if (res?.error) {
              toast.error("GitHub registration failed!", { id: toastId });
              console.error("GitHub registration error:", res.error);
            } else {
              toast.success("Signed in with GitHub!",{ id: toastId });
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Unexpected GitHub Registration error:", error);
            toast.error("Something went wrong. Try again!",{ id: toastId });
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

                        <span className="text-3xl font-bold ">ClickyDrop</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold 
                     mb-4 animate-fade-in">
                        LogIn to your ClickyDrop Manage your links
                        & customize your profile 
                    </h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 
                    flex flex-col mt-10 text-black">
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
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
                            Sign In
                        </button>
                    </form>
                    
                    {/* Note to the user */}
                    <div className="text-center mt-6">
                        <span className="text-gray-400">
                           Don't have an account?  
                           <a href={"/signup"}
                           className="text-[#8129D9]"
                           >SignUp</a>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                {/*add socials here like google and github */}
                <div className="flex justify-between w-full">
                    <Button variant="outline" className="w-[75px] h-[40px]"
                    onClick={GoogleLoginhandle}><FcGoogle 
                    className="h-10 w-10" /></Button>
                    <Button variant="outline" className="w-[75px] h-[40px]"
                    onClick={handlegitlogin}><SiGithub
                    className="h-10 w-10" /></Button>
                </div>
            </div>

                {/* Right Side: Image Collage */}
                {/* <div className="lg:flex p-6 bg-indigo-900 items-center justify-center relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden
                     shadow-xl transform scale-95 transition-transform duration-500">
                        <img
                            src={login}
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