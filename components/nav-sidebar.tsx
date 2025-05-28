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
  Skeleton,
} from "@/components/ui";

import React, { ReactNode } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

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
  Settings: "/settings",
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

export function NavSideBar() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
            {currentUser === undefined ? (
              <Skeleton className="w-40 h-7" />
            ) : currentUser !== null ? (
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
}
