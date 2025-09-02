'use client'

import ThemeEditor from "@/components/theme-editor"
import { useProtectedRoute } from "@/lib/hooks/useprotected"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function ThemePage() {

    const { session,status} = useProtectedRoute();
    console.log("Session is " , session);
    console.log("Status is ", status)
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; 

  return (
    <>
        <main className="min-h-dvh bg-background">
      <ThemeEditor />
    </main>
    <p className="p-10 ">Hey {session.user.name} welcome back!</p>
</>

  )
}
