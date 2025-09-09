'use client'

import React, { useState, useEffect } from "react";
import { Edit, Plus, X, Trash2 } from "lucide-react";
import { useProtectedRoute } from "@/lib/hooks/useprotected";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileEditModal } from "@/components/ProfileEditmodal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppSidebar } from "@/components/Sidebarapp";
import { SidebarProvider } from "@/components/ui/sidebar";
import SocialMoal from "@/components/social-modal";

interface Social {
  id: string;
  platform: string;
  url: string;
}

// this is the schema in the DB too
interface Profile {
  username: string;
  email: string;
  profileimg: string; // ✅ required
  description: string;
}

// Social platform icons as SVG components
const SocialIcons = {
  tiktok: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  twitter: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  snapchat: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
    </svg>
  ),
  youtube: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  reddit: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.175c0 .873-.66 1.584-1.48 1.584-.66 0-1.22-.4-1.46-.97-.3-.1-.63-.15-.97-.15-.37 0-.72.05-1.03.15-.24.57-.8.97-1.46.97-.82 0-1.48-.71-1.48-1.584 0-.06.01-.12.03-.17-.58-.28-1.01-.9-1.01-1.614 0-.968.79-1.754 1.75-1.754.48 0 .9.18 1.21.49 1.19-.86 2.85-1.42 4.67-1.49l.8-3.747-2.6.55a1.25 1.25 0 0 1-2.5-.056c0-.688.56-1.25 1.25-1.25z"/>
    </svg>
  ),
  pinterest: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
    </svg>
  ),
  weibo: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.565 9.117c0-1.896 1.117-3.44 2.5-3.44s2.5 1.544 2.5 3.44c0 1.896-1.117 3.44-2.5 3.44s-2.5-1.544-2.5-3.44zm-7.13 0c0-1.896 1.117-3.44 2.5-3.44s2.5 1.544 2.5 3.44c0 1.896-1.117 3.44-2.5 3.44s-2.5-1.544-2.5-3.44zm14.26 0c0-1.896 1.117-3.44 2.5-3.44s2.5 1.544 2.5 3.44c0 1.896-1.117 3.44-2.5 3.44s-2.5-1.544-2.5-3.44z"/>
    </svg>
  ),
  wechat: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.597-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm-5.813 7.18c.642 0 1.162.529 1.162 1.188 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.659.52-1.188 1.162-1.188zm5.813 0c.642 0 1.162.529 1.162 1.188 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.659.52-1.188 1.162-1.188z"/>
    </svg>
  ),
  linkedin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  facebook: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tumblr: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.563 24c-5.508 0-8.752-3.033-8.752-8.325V9.317H2.5V5.5c3.41-1.24 5.95-4.15 6.25-7.5h3.813v5.5h5.5v3.817h-5.5v6.325c0 2.1.75 3.1 2.5 3.1.75 0 1.5-.15 2.25-.45v3.5c-.75.3-1.5.45-2.25.45z"/>
    </svg>
  ),
  medium: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
    </svg>
  ),
  twitch: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
  ),
  patreon: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z"/>
    </svg>
  )
};

const socialPlatforms = [
  { name: 'TikTok', key: 'tiktok', icon: SocialIcons.tiktok },
  { name: 'Twitter', key: 'twitter', icon: SocialIcons.twitter },
  { name: 'Instagram', key: 'instagram', icon: SocialIcons.instagram },
  { name: 'Snapchat', key: 'snapchat', icon: SocialIcons.snapchat },
  { name: 'YouTube', key: 'youtube', icon: SocialIcons.youtube },
  { name: 'Reddit', key: 'reddit', icon: SocialIcons.reddit },
  { name: 'Pinterest', key: 'pinterest', icon: SocialIcons.pinterest },
  { name: 'Weibo', key: 'weibo', icon: SocialIcons.weibo },
  { name: 'WeChat', key: 'wechat', icon: SocialIcons.wechat },
  { name: 'LinkedIn', key: 'linkedin', icon: SocialIcons.linkedin },
  { name: 'Facebook', key: 'facebook', icon: SocialIcons.facebook },
  { name: 'Tumblr', key: 'tumblr', icon: SocialIcons.tumblr },
  { name: 'Medium', key: 'medium', icon: SocialIcons.medium },
  { name: 'Twitch', key: 'twitch', icon: SocialIcons.twitch },
  { name: 'Patreon', key: 'patreon', icon: SocialIcons.patreon }
];

export default function Dashboard() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [socials, setSocials] = useState<Social[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [socialUrl, setSocialUrl] = useState('');
  const [editingSocial, setEditingSocial] = useState<Social | null>(null);

  const { session, status } = useProtectedRoute();
  const router = useRouter();




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
    { username: string; email: string; profileimg: string, description:string }) => {
    try {
      if (!data.profileimg) {
        toast.error("Profile image is required.");
        return;
      }

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("description",data.description);

      // Convert base64 → File
      if (data.profileimg.startsWith("data:")) {
        const res = await fetch(data.profileimg);
        const blob = await res.blob();
        const file = new File([blob], "profile.png", { type: blob.type });
        formData.append("profileImage", file);
      } else {
        // In case it's already a URL from Cloudinary
        formData.append("profileImage", data.profileimg);
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

  // Handle social link operations
  const handleSocialClick = (platform: string) => {
    setSelectedPlatform(platform);
    setSocialUrl('');
    setEditingSocial(null);
    setIsSocialModalOpen(true);
  };

  const handleEditSocial = (social: Social) => {
    setSelectedPlatform(social.platform);
    setSocialUrl(social.url);
    setEditingSocial(social);
    setIsSocialModalOpen(true);
  };

  const handleSocialSubmit = async () => {
    if (!selectedPlatform || !socialUrl) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingSocial) {
        // Update existing social
        const response = await fetch(`http://localhost:3000/api/socials/${editingSocial.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            platform: selectedPlatform,
            url: socialUrl,
          }),
        });

        if (!response.ok) throw new Error("Failed to update social link");

        const updatedSocial = await response.json();
        setSocials(socials.map(s => s.id === editingSocial.id ? updatedSocial : s));
        toast.success("Social link updated successfully");
      } else {
        // Create new social
        const response = await fetch("http://localhost:3000/api/socials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            platform: selectedPlatform,
            url: socialUrl,
          }),
        });

        if (!response.ok) throw new Error("Failed to add social link");

        const newSocial = await response.json();
        setSocials([...socials, newSocial]);
        toast.success("Social link added successfully");
      }

      setIsSocialModalOpen(false);
      setSelectedPlatform('');
      setSocialUrl('');
      setEditingSocial(null);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDeleteSocial = async (socialId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/socials/${socialId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete social link");

      setSocials(socials.filter(s => s.id !== socialId));
      toast.success("Social link deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const getSocialIcon = (platform: string) => {
    const socialPlatform = socialPlatforms.find(p => p.key === platform);
    return socialPlatform ? socialPlatform.icon : null;
  };

  const isSocialAdded = (platform: string) => {
    return socials.some(social => social.platform === platform);
  };

    // ✅ Instead of early return, handle loading and redirect via render logic
    if (status === "loading") {
      return <p>Loading...</p>;
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
    {/* Sidebar */}
    <AppSidebar username={profile?.username || ""} email={profile?.email || ""} profileimg={profile?.profileimg || ""} description={profile?.description || ""}/>


    {/*Main Content */}
    <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Profile Dashboard</h1>
            <p className="text-muted-foreground">Manage your profile and social presence</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/`)}>
              View Public Page
            </Button>
            <Button onClick={() => setIsEditModalOpen(true)}>
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        {profile && (
          <Card className="border border-border/60 shadow-sm bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-accent/20">
                      <AvatarImage src={profile.profileimg} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl">
                        {profile.username.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-foreground">{profile.username}</h2>
                    <p className="text-muted-foreground">{profile.email}</p>
                    {profile.description && (
                      <p className="mt-1 text-sm text-muted-foreground/90 max-w-2xl">{profile.description}</p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">Member</span>
                      <span className="inline-flex items-center rounded-full bg-accent/10 text-accent px-3 py-1 text-xs">Active</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 self-center lg:self-start">
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(window.location.origin + '/'+ (profile.username || ''))}>Copy URL</Button>
                  <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Social Links Section */}
        <Card className="border border-border/60 shadow-sm bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Social Links</h3>
              <p className="text-muted-foreground">They will appear on top of your regular Links.</p>
            </div>

            {/* Social Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                const isAdded = isSocialAdded(platform.key);
                const existingSocial = socials.find(s => s.platform === platform.key);
                
                return (
                  <div key={platform.key} className="relative group">
                    <button
                      onClick={() => existingSocial ? handleEditSocial(existingSocial) : handleSocialClick(platform.key)}
                      className={`w-full h-20 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center gap-2 group-hover:shadow-sm ${
                        isAdded 
                          ? 'border-emerald-400/60 bg-emerald-50 text-emerald-600' 
                          : 'border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="text-xs">{platform.name}</span>
                    </button>

                    {/* Delete button for added socials */}
                    {isAdded && existingSocial && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSocial(existingSocial.id);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Added Social Links Display */}
            {socials.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Your Social Links</h4>
                <div className="space-y-2">
                  {socials.map((social) => {
                    const IconComponent = getSocialIcon(social.platform);
                    return (
                      <div key={social.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {IconComponent && <IconComponent className="w-5 h-5 text-gray-600" />}
                          <div>
                            <p className="font-medium text-sm capitalize">{social.platform}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-xs">{social.url}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSocial(social)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSocial(social.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleProfileUpdate}
        username={profile?.username || ""}
        email={profile?.email || "" }
        profileimg={profile?.profileimg || ""}
        description={profile?.description || ""}
      />

      {/* Social Links Modal */}
      <Dialog open={isSocialModalOpen} onOpenChange={setIsSocialModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {editingSocial ? 'Edit Social Link' : 'Add Social Link'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              {selectedPlatform && (
                <div className="flex items-center justify-center gap-3 mb-4">
                  {getSocialIcon(selectedPlatform) && (
                    <div className="w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                      {React.createElement(getSocialIcon(selectedPlatform)!, { className: "w-6 h-6 text-gray-600" })}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-lg capitalize">{selectedPlatform}</p>
                    <p className="text-sm text-muted-foreground">Social Media Platform</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Input
                  id="platform"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  placeholder="Select platform"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  placeholder="https://example.com/your-profile"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSocialModalOpen(false);
                  setSelectedPlatform('');
                  setSocialUrl('');
                  setEditingSocial(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSocialSubmit}
                className="flex-1"
                disabled={!selectedPlatform || !socialUrl}
              >
                {editingSocial ? 'Update' : 'Add'} Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* <SocialMoal 
      isOpen={isSocialModalOpen}
      onClose={() => setIsSocialModalOpen(false)}
      onSubmit={handleSocialSubmit}
      /> */}
    </main>
    </div>
    </SidebarProvider>
  )
}