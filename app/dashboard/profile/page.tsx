'use client'

import { useState, useEffect } from "react";
import { Edit, Plus } from "lucide-react";
import { useProtectedRoute } from "@/lib/hooks/useprotected";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileEditModal } from "@/components/ProfileEditmodal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppSidebar } from "@/components/Sidebarapp";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Social {
  id: string;
  platform: string;
  url: string;
}

interface Profile {
  username: string;
  email: string;
  profileImage: string; // ✅ required
  description: string;
}

export default function Dashboard() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [socials, setSocials] = useState<Social[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const { session, status } = useProtectedRoute();
  const router = useRouter();

  // if no session, it should be signin, 
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/signin");
    return null;
  }

  // Fetch socials
  const fetchSocials = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/socials");
      if (!response.ok) throw new Error("Failed to fetch social links.");
      const data: Social[] = await response.json();
      setSocials(data);
    } catch {
      toast.error("Could not load social links.");
    }
  };

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profile.");
      const data: Profile = await response.json();
      setProfile(data);
    } catch {
      toast.error("Could not load profile.");
    }
  };

  useEffect(() => {
    if (session) {
      fetchSocials();
      fetchProfile();
    }
  }, [session]);

  // Handle profile update
  const handleProfileUpdate = async (data: 
    { username: string; email: string; profileImage: string, description:string }) => {
    try {
      if (!data.profileImage) {
        toast.error("Profile image is required.");
        return;
      }

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("description",data.description);

      // Convert base64 → File
      if (data.profileImage.startsWith("data:")) {
        const res = await fetch(data.profileImage);
        const blob = await res.blob();
        const file = new File([blob], "profile.png", { type: blob.type });
        formData.append("profileImage", file);
      } else {
        // In case it's already a URL from Cloudinary
        formData.append("profileImage", data.profileImage);
      }

      const res = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser: Profile = await res.json();
      setProfile(updatedUser);
      toast.success("Profile updated successfully 🎉");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (

    <SidebarProvider>

    <div className="flex h-screen">
    {/* Sidebar */}
    <AppSidebar />


    {/*Main Content */}
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Profile Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your profile and social links</p>
          </div>
        </div>

        {/* Profile Section */}
        {profile && (
          <Card className="glass-card border-accent/20">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 ring-4 ring-accent/30">
                      <AvatarImage src={profile.profileImage} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl">
                        {profile.username.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{profile.username}</h2>
                    <p className="text-muted-foreground mb-1">{profile.email}</p>
                    {profile.description && <p className="text-sm text-muted-foreground max-w-md">{
                    profile.description}</p>}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => setIsEditModalOpen(true)}
                  className="self-center lg:self-start"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Social Links Section */}
        <Card className="glass-card border-accent/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Social Links</h3>
                <p className="text-muted-foreground text-sm">Connect your social media accounts</p>
              </div>
              <Button variant="outline" size="icon" className="glass-card border-accent/30">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-accent/20">
            <CardContent className="p-6 text-center">
              <h4 className="text-2xl font-bold gradient-text">12.5K</h4>
              <p className="text-sm text-muted-foreground">Total Visits</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/20">
            <CardContent className="p-6 text-center">
              <h4 className="text-2xl font-bold gradient-text">2.1K</h4>
              <p className="text-sm text-muted-foreground">Link Clicks</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/20">
            <CardContent className="p-6 text-center">
              <h4 className="text-2xl font-bold gradient-text">89%</h4>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleProfileUpdate}
      />
    </main>
    </div>
    </SidebarProvider>
  )
}