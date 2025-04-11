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

import React, { ReactNode } from "react";
import Link from "next/link";

import {
  PackagePlus,
  ScanSearch,
  Settings,
  Flame,
  UserRound,
  LogOut,
  Home,
  MapPinPlusInside,
  Drumstick,
  Telescope,
  Tags,
} from "lucide-react";
import { signOutAction } from "@/app/server-actions/auth/actions";

interface NavbarGroupInterface {
  groupLabel: string;
  groupItems: string[];
}

const iconMap: Record<string, ReactNode> = {
  Trending: <Flame />,
  Search: <ScanSearch />,
  Profile: <UserRound />,
  Settings: <Settings />,
  New: <PackagePlus />,
  Location: <MapPinPlusInside />,
  Leaderboard: <Drumstick />,
  Discover: <Telescope />,
  "Popular Tags": <Tags />,
};

const contentGroup: NavbarGroupInterface = {
  groupLabel: "Content",
  groupItems: ["Trending", "Search", "New", "Location", "Discover"],
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
  Trending: "#",
  Search: "#",
  Profile: "#",
  Settings: "#",
  New: "/snacks/new",
  Location: "#",
  Leaderboard: "#",
  Discover: "#",
  "Popular Tags": "#",
};

const navbarGroups: NavbarGroupInterface[] = [
  settingGroup,
  contentGroup,
  communityGroup,
];

const NavSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <Link href="/">
            <Home />
            <span className="font-bold text-base">SnackTrack</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {navbarGroups.map((navbarGroup) => (
          <SidebarGroup key={navbarGroup.groupLabel}>
            <SidebarGroupLabel>{navbarGroup.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navbarGroup.groupItems.map((item: string) => (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton asChild>
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
            <SidebarMenuButton
              className="bg-red-400 text-white"
              onClick={signOutAction}
            >
              <LogOut /> <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default NavSideBar;
