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

import React, { ReactNode, useState } from "react";
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
  BookMarked,
  LucideIcon,
  CupSoda,
} from "lucide-react";
import {
  redirectToSignIn,
  signOutAction,
} from "@/app/server-actions/auth/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface NavbarGroupInterface {
  groupLabel: string;
  groupItems: string[];
}

const createIcon = (IconComponent: LucideIcon) => (isActive: boolean) => (
  <IconComponent
    className={
      isActive ? "text-blue-600 stroke-[2.5]" : "text-current stroke-2"
    }
  />
);

const iconMap: Record<string, (isActive: boolean) => ReactNode> = {
  Trending: createIcon(Flame),
  Profile: createIcon(UserRound),
  Settings: createIcon(Settings),
  Locations: createIcon(MapPinPlusInside),
  Leaderboard: createIcon(Drumstick),
  Snack: createIcon(Dessert),
  Drink: createIcon(CupSoda),
  "Popular Tags": createIcon(Tags),
  About: createIcon(BookMarked),
};

const contentGroup: NavbarGroupInterface = {
  groupLabel: "Content",
  groupItems: ["Snack", "Drink", "Trending", "Locations"],
};

const settingGroup: NavbarGroupInterface = {
  groupLabel: "Settings",
  groupItems: ["Profile", "Settings"],
};

const communityGroup: NavbarGroupInterface = {
  groupLabel: "Community",
  groupItems: ["Leaderboard", "Popular Tags", "About"],
};

const linkMap: Record<string, string> = {
  Snack: "/",
  Drink: "/under-construction",
  Trending: "/trending",
  Profile: "/profile",
  Settings: "/settings",
  Locations: "/locations",
  Leaderboard: "/leaderboard",
  "Popular Tags": "/under-construction",
  About: "/about",
};

const authenticatedLinks = ["Profile"];

const navbarGroups: NavbarGroupInterface[] = [
  contentGroup,
  settingGroup,
  communityGroup,
];

export function NavSideBar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const displayedGroups = navbarGroups.map((group) => ({
    ...group,
    groupItems: group.groupItems.filter(
      (item) => !authenticatedLinks.includes(item) || Boolean(currentUser)
    ),
  }));

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
                {navbarGroup.groupItems.map((item: string) => {
                  const isActive = activeItem === item;
                  return (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => setActiveItem(item)}
                      >
                        <Link href={linkMap[item]}>
                          {iconMap[item]?.(isActive)}
                          <span>{item}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
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
