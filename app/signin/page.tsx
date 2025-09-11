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
import prfpng from "@/public/assets/link.png"; // Your image import

export default function Signin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e:any) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const toastId = toast.loading("Signing in...");

        const { success, data, error } = signinSchema.safeParse(formData);

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

        } catch (error:any) {
            toast.error(error.message || "Network error. Please try again.", {
                id: toastId,
            });
        }
    };

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Signing in with Google...");
        try {
            const res = await signIn("google", {
                redirect: false,
                callbackUrl: "/dashboard",
            });

            if (res?.error) {
                toast.error("Google sign-in failed!", { id: toastId });
            } else {
                toast.success("Successfully signed in with Google!", { id: toastId });
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again!", { id: toastId });
        }
    };

    const handleGitHubLogin = async () => {
        const toastId = toast.loading("Signing in with GitHub...");
        try {
            const res = await signIn("github", {
                redirect: false,
                callbackUrl: "/dashboard",
            });

            if (res?.error) {
                toast.error("GitHub sign-in failed!", { id: toastId });
            } else {
                toast.success("Signed in with GitHub!", { id: toastId });
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again!", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto bg-[#fffbf0] text-[#2c2c2c] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                {/* Left Side: Signup Form */}
                <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    {/* Logo and Title */}
                    <div className="flex flex-col mb-8 sm:mb-12">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#161615] leading-tight">
                            Login to <br /> ClickyDrop
                        </span>
                        <p className="text-lg text-gray-500 mt-4">
                            Manage your links & customize your profile.
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex flex-col gap-4 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <FcGoogle className="h-6 w-6" />
                            <span className="font-semibold">Sign in with Google</span>
                        </button>
                        <button
                            onClick={handleGitHubLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <SiGithub className="h-6 w-6" />
                            <span className="font-semibold">Sign in with GitHub</span>
                        </button>
                    </div>

                    <div className="relative flex items-center py-5">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or continue with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    </form>
                    
                    {/* Note to the user */}
                    <div className="text-center mt-6">
                        <span className="text-gray-500">
                           Don't have an account? {" "}
                           <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
                               Sign Up
                           </a>
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
                            className="w-full h-full object-contain rounded-2xl shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
