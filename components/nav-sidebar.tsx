"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import {
  Settings,
  Flame,
  UserRound,
  LogOut,
  MapPinPlusInside,
  Drumstick,
  Tags,
  LogIn,
  Dessert,
  Aperture,
} from "lucide-react";
import {
  redirectToSignIn,
  signOutAction,
} from "@/app/server-actions/auth/actions";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "./ui/skeleton";

interface NavbarGroupInterface {
  groupLabel: string;
  groupItems: string[];
}

const iconMap: Record<string, ReactNode> = {
  Trending: <Flame />,
  Profile: <UserRound />,
  Settings: <Settings />,
  Locations: <MapPinPlusInside />,
  Leaderboard: <Drumstick />,
  Snack: <Dessert />,
  "Popular Tags": <Tags />,
};

const contentGroup: NavbarGroupInterface = {
  groupLabel: "Content",
  groupItems: ["Snack", "Trending", "Locations"],
};

const settingGroup: NavbarGroupInterface = {
  groupLabel: "Settings",
  groupItems: ["Profile", "Settings"],
};

const communityGroup: NavbarGroupInterface = {
  groupLabel: "Community",
  groupItems: ["Leaderboard", "Popular Tags"],
};

const linkMap: Record<string, string> = {
  Snack: "/",
  Trending: "/trending",
  Profile: "/profile",
  Settings: "#",
  Locations: "/locations",
  Leaderboard: "#",
  "Popular Tags": "#",
};

const authenticatedLinks = ["Profile"];

const navbarGroups: NavbarGroupInterface[] = [
  contentGroup,
  settingGroup,
  communityGroup,
];

const NavSideBar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);

      try {
        //Might try a way to use useSelector
        const supabase = createClient();
        const user = await supabase.auth.getUser();
        setCurrentUser(user.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCurrentUser();
  }, []);

  const pathName = usePathname();

  const displayedGroups = navbarGroups.map((group) => ({
    ...group,
    groupItems: group.groupItems.filter(
      (item) => !authenticatedLinks.includes(item) || Boolean(currentUser)
    ),
  }));

  const isLinkActive = (path: string) => {
    return pathName === path || pathName.startsWith(path + "/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <Link href="/">
            <Aperture />
            <span className="font-bold text-base">WutsDis</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {displayedGroups.map((navbarGroup) => (
          <SidebarGroup key={navbarGroup.groupLabel}>
            <SidebarGroupLabel>{navbarGroup.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navbarGroup.groupItems.map((item: string) => (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton
                      asChild
                      isActive={isLinkActive(linkMap[item])}
                    >
                      <Link href={linkMap[item]}>
                        {iconMap[item]}
                        <span>{item}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoading ? (
              <Skeleton className="w-40 h-7" />
            ) : currentUser ? (
              <SidebarMenuButton
                className="bg-red-400 hover:bg-red-500 hover:text-white text-white flex-row justify-center"
                onClick={signOutAction}
              >
                <LogOut /> <span>Sign Out</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                className="bg-blue-400 hover:bg-blue-500 hover:text-white text-white flex-row justify-center"
                onClick={redirectToSignIn}
              >
                <LogIn /> <span>Sign In</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default NavSideBar;
