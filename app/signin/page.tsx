'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { toast } from "sonner";
import { signinSchema } from "@/lib/schema";
import Image from 'next/image'; // Import the Image component
import prfpng from "@/public/assets/bad-barbie.png"; // Your image import
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";


export default function Signin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const toastId = toast.loading("Signing in...");

        const { success } = signinSchema.safeParse(formData);

        if (!success) {
            toast.error("The data you entered is invalid", { id: toastId });
            return;
        }

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res?.error) {
                toast.error("Invalid email or password!", { id: toastId });
            } else {
                toast.success("Successfully signed in!", { id: toastId });
                router.push("/dashboard/profile"); // route to the profile page,
            }

        } catch  {
            toast.error("Network error. Please try again.", {
                id: toastId,
            });
        }
    };

    const handleGoogleLogin = async () => {
        // toast.loading("Signing in with Google...");
        signIn("google", {
            callbackUrl: "/dashboard/profile",  // relative is fine
          });
    };

    const handleGitHubLogin = async () => {
        // toast.loading("Signing in with GitHub...");
        signIn("github", {
            callbackUrl: "/dashboard/profile",  // relative is fine
          });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto
            dark:bg-black
            bg-[#fffbf0] text-[#2c2c2c] rounded-3xl overflow-hidden flex flex-col lg:flex-row border-2 border-foreground nb-shadow">
                {/* Left Side: Signup Form */}
                <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    {/* Logo and Title */}
                    <span > <ThemeToggle /></span>
                    <div className="flex flex-col mb-8 sm:mb-12 border-2 border-foreground rounded-xl p-4 nb-shadow">
                        
                        <span className="text-4xl sm:text-5xl font-extrabold 
                        dark:text-white
                        text-[#161615] leading-tight">
                            Login to <br /> ClickyDrop
                        </span>
                        <p className="text-lg text-gray-500 mt-4 dark:text-white">
                            Manage your links & customize your profile.
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex flex-col gap-4 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-foreground rounded-xl text-gray-700 hover:bg-white transition-colors duration-200 nb-pressable nb-shadow"
                        >
                            <FcGoogle className="h-6 w-6" />
                            <span className="font-semibold dark:text-white dark:hover:text-black ">Sign in with Google</span>
                        </button>
                        <button
                            onClick={handleGitHubLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-foreground rounded-xl text-gray-700 hover:bg-white transition-colors duration-200 nb-pressable nb-shadow"
                        >
                            <SiGithub className="h-6 w-6" />
                            <span className="font-semibold dark:text-white dark:hover:text-black ">Sign in with GitHub</span>
                        </button>
                    </div>

                    <div className="relative flex items-center py-5">
                        <div className="flex-grow border-t border-foreground"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or continue with</span>
                        <div className="flex-grow border-t border-foreground"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full 
                            dark:text-white
                            px-5 py-3 border-2 border-foreground rounded-xl transition-colors duration-200 nb-shadow-sm bg-white dark:bg-input/30"
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border-2 border-foreground 
                            dark:text-white rounded-xl transition-colors duration-200 nb-shadow-sm bg-white dark:bg-input/30"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 border-2 border-foreground nb-pressable nb-shadow"
                        >
                            Sign In
                        </button>
                    </form>
                    
                    {/* Note to the user */}
                    <div className="text-center mt-6">
                        <span className="text-gray-500 dark:text-white">
                           Don&apos;t have an account? {" "}
                           <Link href="/signup" className="text-indigo-600
                           
                           font-semibold hover:underline">
                               Sign Up
                           </Link>
                        </span>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="lg:flex flex-1 items-center 
                justify-center p-6 ">
                     <div className="w-full h-full max-w-lg">
                        <Image
                            src={prfpng}
                            alt="App preview of a bio link page"
                            className="w-full h-full object-contain rounded-2xl
                            hover:scale-105 transition duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
