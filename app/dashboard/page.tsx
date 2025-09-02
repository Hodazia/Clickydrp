'use client'

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useProtectedRoute } from "@/lib/hooks/useprotected";


export default function Dashboard()  {
    const { session, status } = useProtectedRoute();
    console.log("Session is " , session);
    console.log("Status is ", status)
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; 

    const handlelogout = async () => {

       
        // but the token is still there, so if u go to dashboard u won't be navigated to /signin
        // so what to do to remove the tokens,??
        // to do so 
        setTimeout( async () => {
            await signOut({
                redirect: false, // prevents auto redirect
              });
              toast.success("You are successfully logged out")
              router.push("/signin");
        }, 1500)

        return null
    }
    return (
        <>
        <p>This is dashboard</p>
        <p>Welcome back {session.user?.name} ur email is {session.user?.email}</p>
        <div className="flex flex-col gap-5 w-[150px]">
        <Button size="lg"
        className="p-2 bg-red-400 text-gray-300 "
        onClick={handlelogout}>
            Logout
        </Button>
        <Button className="p-2 bg-orange-500 text-white"
        onClick={() => {
            router.push("/dashboard/theme")
        }}
        >
            Go to Themes
        </Button>
        <Button className="p-2 bg-blue-400 text-white"
        onClick={() => {
            router.push("/dashboard/links")
        }}>
            Go to Links
        </Button>
        <Button className="p-2 bg-green-400 text-white"
        onClick={() => {
            router.push("/dashboard/profile")
        }}>
            Go to Profile
        </Button>
        </div>

        </>
        
    )
}