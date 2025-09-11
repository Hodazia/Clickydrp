'use client'

import ThemeEditor from "@/components/theme-editor"
import { useProtectedRoute } from "@/lib/hooks/useprotected"
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/Sidebarapp";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLoader from "@/components/Loader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface Profile {
  username: string;
  email: string;
  profileimg: string; // ✅ required
  description: string;
}



export default function ThemePage() {
    const { session,status} = useProtectedRoute();
    const [profile,setprofile] = useState<Profile | null>(null);

    const router = useRouter();

    console.log("Session data has " , session);

      // Fetch profile
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profile.");
      const data: Profile = await response.json();
      setprofile(data);
    } catch {
      toast.error("Could not load profile.");
    }
  };

  // 
  useEffect(() => {
    if(session)
    {
      fetchProfile()
    }
  }, [session])


    // ✅ Instead of early return, handle loading and redirect via render logic
    if (status === "loading") {
      return <DashboardLoader />
    }
  
    if (!session) {
      // router.push runs inside useEffect to avoid hook mismatch
      useEffect(() => {
        router.push("/signin");
      }, [router]);
  
      return null; // still render null here safely
    }


  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar 
          username={profile?.username || ''}
          email={profile?.email || ''}
          profileimg={profile?.profileimg || ''}
          description={profile?.description || ''}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-[#fffbf0] text-[#2c2c2c]">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text">Theme Editor</h1>
                <p className="text-muted-foreground mt-1">Customize the appearance of your link page</p>
              </div>
            </div>
            <ThemeEditor />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
