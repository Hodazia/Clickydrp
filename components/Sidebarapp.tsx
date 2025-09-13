'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Palette, Share, Settings, LogOut, ChevronLeft,
    Link2, LucideIcon} from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { Sidebar,SidebarContent,SidebarGroup, 
    SidebarHeader, SidebarGroupLabel,SidebarGroupContent,SidebarMenu,
    SidebarMenuItem,SidebarMenuButton,
} from "./ui/sidebar";
import { Avatar,AvatarFallback,AvatarImage, } from "@radix-ui/react-avatar";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logovector from "@/public/assets/Vector.svg"; 


interface Sidebarprop {
  username:string,
  email:string,
  description:string,
  profileimg:string
}

interface ItemProps  {
    title: string,
    url: string;
    Icon: LucideIcon
}

// Define menu items and their corresponding icons
const mainItems: ItemProps[] = [
    { title: "Profile", url: "/dashboard/profile", Icon: User },
    { title: "Links", url: "/dashboard/links", Icon: Link2 },
    { title: "Themes", url: "/dashboard/theme", Icon: Palette },
];

const bottomItems = [
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
];



export function AppSidebar({username,email,profileimg,description}: Sidebarprop) {
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path:string) => pathname === path;

    const getNavCls = ({ isActive }: { isActive: boolean }) =>
        isActive 
          ? `bg-indigo-50 text-indigo-600 border-indigo-600 hover:bg-gray-100
          hover:ring-2 hover:ring-indigo-600 active:shadow-none glow-shadow`
          : `hover:bg-accent/10 hover:text-accent-foreground hover:ring-2 
          hover:ring-indigo-600`;

    const handlelogout = async () => {
      setTimeout(async () => {
        await signOut({
          redirect: false
        });
        toast.success("You've been successfully logged out!");
        router.push("/signin");
      }, 1500);
    };

    if (isMobile) {
        return (
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t border-indigo-600 z-50 md:hidden">
                <nav className="flex justify-around items-center h-16">
                    {mainItems.map((item) => (
                        <Link 
                            key={item.title} 
                            href={item.url}
                            className={`flex flex-col items-center justify-center p-2 text-sm transition-all duration-200 
                                ${isActive(item.url) ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                        >
                            <item.Icon className="h-6 w-6" />
                            <span className="mt-1 text-xs">{item.title}</span>
                        </Link>
                    ))}
                    
                    <button 
                        onClick={handlelogout}
                        className="flex flex-col items-center justify-center p-2 text-sm transition-all duration-200 text-gray-500 hover:text-red-500"
                    >
                        <LogOut className="h-6 w-6" />
                        <span className="mt-1 text-xs">Logout</span>
                    </button>
                </nav>
            </div>
        );
    }

    return (
        <Sidebar
            className="w-64 glass-card border-r-indigo-600 md:block hidden"
            collapsible="icon"
        >
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-20 w-20">
                        <div className="flex gap-3">
                            <Image src={logovector} 
                            alt="logo"
                            className="rounded-xl p-1 border border-gray-300 border-2 border-ring-2
                            h-13 w-13 object-cover bg-indigo-600" />
                            {/* <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl">
                                {username.charAt(0)}{description.charAt(0)}
                            </AvatarFallback> */}
                            <div className="text-lg font-bold text-gray-600
                             flex justify-center items-center
                            ">
                                Clickydrop
                            </div>
                        </div>
  
                        {/* <div className="text-lg mt-2 font-bold text-indigo-500">
                            DASHBOARD
                        </div> */}
                    </Avatar>
                    {/* <div className="flex-1 p-2 min-w-0">
                        <p className="text-lg font-bold text-foreground truncate">{username}</p>
                        <p className="text-sm text-muted-foreground truncate">{description}</p>
                    </div> */}
                </div>
            </SidebarHeader>

            <SidebarContent className="border border-t-indigo-600 px-3 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-base
                    uppercase tracking-wider text-xl p-3 mb-2">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={`${getNavCls({ isActive: isActive(item.url) })} 
                                            rounded-lg transition-all duration-200 p-3 flex items-center space-x-3`}
                                        >
                                            <item.Icon className="h-6 w-6" />
                                            <span className="font-medium text-base">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="flex-1" />

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {/* {bottomItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg transition-all duration-200 p-3 flex items-center space-x-3`}
                                        >
                                            <item.icon className="h-6 w-6" />
                                            <span className="font-medium text-base">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))} */}
                            <SidebarMenuItem>

                                <div className="text-black flex flex-col justify-between text-xl mb-2">
                                    <div className="flex gap-3 border border-2 border-indigo-400 
                                    border-ring-2
                                    bg-indigo-300 p-1 rounded-xl">
                                        {profileimg && (
                                        <Image 
                                        src={profileimg}
                                        alt="profileimage"
                                        width={50}
                                        height={50}
                                        className="rounded-full h-12 w-12 object-cover"
                                        />
                                        )}
                                        <div className="flex flex-col flex-wrap 
                                          text-white">
                                        <div className="break-words max-w-[200px] ">
                                            <div>{username}</div>
                                            <div className="text-sm">{email}</div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    className="w-full hover:bg-white hover:text-indigo-600 
                                    hover:border-2 hover:border-indigo-200 hover:ring-2
                                    bg-indigo-400 text-white
                                     rounded-lg p-3 justify-start flex items-center space-x-3"
                                    onClick={handlelogout}
                                >
                                    <LogOut className="h-6 w-6" />
                                    <span className="font-medium text-base">Logout</span>
                                </Button>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}