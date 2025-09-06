'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Palette, Share, Settings, LogOut, ChevronLeft,
    Link2, LucideIcon} from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { Sidebar,SidebarContent,SidebarFooter,SidebarGroup, 
    SidebarHeader, SidebarGroupLabel,SidebarGroupContent,SidebarMenu,SidebarMenuAction,
    SidebarMenuItem,SidebarMenuButton,
} from "./ui/sidebar";
import { Avatar,AvatarFallback,AvatarImage, } from "@radix-ui/react-avatar";


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
    { title: "Share", url: "/dashboard/share", Icon: Share },
];


const bottomItems = [
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar({username,email,profileimg,description}: Sidebarprop) {
    // The collapsed state is now managed directly with useState
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    // Function to check if a link is active based on the current pathname
    const isActive = (path:string) => pathname === path;

    // Function to generate dynamic classes for navigation links
    const getNavCls = ({ isActive }: { isActive: boolean }) =>
        isActive 
          ? "bg-accent/20 text-accent border-accent/30 glow-shadow" 
          : "hover:bg-accent/10 hover:text-accent-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} glass-card border-r-accent/20`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-accent/30">
              <AvatarImage src={profileimg}/>
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                AS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{username}</p>
              <p className="text-xs text-muted-foreground truncate">{description}</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8 ring-2 ring-accent/30">
              <AvatarImage src={profileimg} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                AS
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-wider text-xs">
            {!collapsed ? "Main" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg transition-all duration-200 p-3 ${collapsed ? 'justify-center' : ''}`}
                    >
                      <item.Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
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
            <SidebarMenu className="space-y-1">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg transition-all duration-200 p-3 ${collapsed ? 'justify-center' : ''}`}
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  className={`w-full hover:bg-destructive/20 hover:text-destructive rounded-lg p-3 ${collapsed ? 'justify-center' : 'justify-start'}`}
                >
                  <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && <span className="font-medium">Logout</span>}
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
