'use client'

import React, { useEffect, useState,Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { signIn, useSession } from "next-auth/react";
import logoright from "@/public/assets/ishowspeedright.png"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle";
import DashboardLoader from "@/components/Loader";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();


      // Show OAuth error if redirected with ?error=
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(`OAuth error: ${error}`);
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard/profile");
    }
  }, [session, router]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                // console.log("Signup submitted:", { username, email, password });
        // Add your signup logic here


        // Check if all fields are filled
        const toastId = toast.loading("Signing up...");

        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required!", { id: toastId });
            return;
        }

        try {
            // Note: Replace with your actual API endpoint
            const response = await fetch("/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if (data.exists) {
                toast.error("The user already exists. Please sign in!", { id: toastId });
            } else {
                toast.success("Successfully registered!", { id: toastId });
                router.push("/signin");
            }

        } catch {
            toast.error("Network error. Please try again.", {
                id: toastId,
            });
        }
    };

    const handleGoogleRegister = async () => {
        // toast.loading("Signing in with Google...");
        signIn("google", {
            callbackUrl: "/dashboard/profile",  // relative is fine
          });
    };

    const handleGitHubRegister = async () => {
        // toast.loading("Signing in with GitHub...");
        signIn("github", {
            callbackUrl: "/dashboard/profile",  // relative is fine
          });
    };
    

    return (
        <Suspense fallback={<DashboardLoader />}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl 
            dark:bg-black
            mx-auto bg-[#fffbf0] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                {/* Left Side: Signup Form */}
                <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    {/* Logo and Title */}
                    <div className="flex flex-col mb-8 sm:mb-12">
                        <span>
                        <ThemeToggle />
                        </span>
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#161615]
                         leading-tight dark:text-white">
                            Register to <br /> ClickyDrop
                        </span>
                        <p className="text-lg text-gray-500   dark:text-white mt-4">
                           Create your free bio page in minutes!
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex flex-col gap-4 mb-6">
                        <button
                            onClick={handleGoogleRegister}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <FcGoogle className="h-6 w-6" />
                            <span className="font-semibold  dark:text-white dark:hover:text-black ">Sign up with Google</span>
                        </button>
                        <button
                            onClick={handleGitHubRegister}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 
                            border border-gray-300 rounded-xl shadow-sm text-gray-700 
                            hover:bg-gray-50 transition-colors duration-200"
                        >
                            <SiGithub className="h-6 w-6" />
                            <span className="font-semibold  dark:text-white dark:hover:text-black ">Sign up with GitHub</span>
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
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                            required
                        />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email Address"
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
                            Sign Up
                        </button>
                    </form>

                    {/* Note to the user */}
                    <div className="text-center mt-6">
                        <span className="text-gray-500 dark:text-white">
                           Already have an account? {" "}
                           <Link href="/signin" className="text-indigo-600 font-semibold hover:underline">
                               Sign In
                           </Link>
                        </span>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="lg:flex flex-1 items-center justify-center
                 p-6 ">
                     <div className="w-full h-full max-w-lg">
                        <Image
                            src={logoright}
                            alt="App preview of a bio link page"
                            className="w-full h-full object-contain rounded-2xl
                            hover:scale-105 transition duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
        </Suspense>
        
    );
}
