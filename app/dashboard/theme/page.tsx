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
  profileimg: string;
  description: string;
}

export default function ThemePage() {
  const { session, status } = useProtectedRoute();
  const [profile, setprofile] = useState<Profile | null>(null);
  const router = useRouter();

  // Use a single useEffect to handle redirection and profile fetching
  useEffect(() => {
    if (status === "loading") {
      // Don't do anything while loading
      return;
    }
    
    // If there is no session, redirect to the home page
    if (!session) {
      router.push("/");
    } else {
      // If a session exists, fetch the profile
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api/profile");
          if (!response.ok) throw new Error("Failed to fetch profile.");
          const data: Profile = await response.json();
          setprofile(data);
        } catch {
          toast.error("Could not load profile.");
        }
      };
      fetchProfile();
    }
  }, [session, status, router]);

  // Handle loading state
  if (status === "loading") {
    return <DashboardLoader />;
  }

  // If there's no session, return null to avoid rendering the rest of the component
  if (!session) {
    return null;
  }

  // Render the dashboard if a session exists
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          username={profile?.username || ''}
          email={profile?.email || ''}
          profileimg={profile?.profileimg || ''}
        />
        <main className="flex-1 p-6 overflow-y-auto bg-[#fffbf0] text-[#2c2c2c]">
          <div className="max-w-6xl mx-auto space-y-8">
            <ThemeEditor />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}