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
} from "@/components/ui/sidebar";

import React, { ReactNode } from "react";
import Link from "next/link";

import { Plus, Search, Settings, TrendingUp, UserRound } from "lucide-react";
import { signOutAction } from "@/app/server-actions/auth/actions";

interface NavbarGroupInterface {
  groupLabel: string;
  groupItems: string[];
}

const iconMap: Record<string, ReactNode> = {
  Trending: <TrendingUp />,
  Search: <Search />,
  Profile: <UserRound />,
  Settings: <Settings />,
  NewSnack: <Plus />,
};

const contentGroup: NavbarGroupInterface = {
  groupLabel: "Content",
  groupItems: ["Trending", "Search", "NewSnack"],
};

const settingGroup: NavbarGroupInterface = {
  groupLabel: "Settings",
  groupItems: ["Profile", "Settings"],
};

const linkMap: Record<string, string> = {
  Trending: "#",
  Search: "#",
  Profile: "#",
  Settings: "#",
  NewSnack: "/snacks/new",
};

const navbarGroups: NavbarGroupInterface[] = [settingGroup, contentGroup];

const NavSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex-row justify-center p-3 font-bold text-xl">
        <Link href="/">SnackTrack</Link>
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
                        <span className="mx-4">{item}</span>
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
            <SidebarMenuButton onClick={signOutAction}>
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavSideBar;
