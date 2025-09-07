'use client'

import ThemeEditor from "@/components/theme-editor"
import { useProtectedRoute } from "@/lib/hooks/useprotected"
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/Sidebarapp";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ThemePage() {
    const { session,status} = useProtectedRoute();
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; 

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar 
          username={session?.user?.name || ''}
          email={session?.user?.email || ''}
          profileimg={session?.user?.image || ''}
          description={"Customize your page theme"}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
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
