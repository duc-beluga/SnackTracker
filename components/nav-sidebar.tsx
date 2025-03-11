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

import { Search, Settings, TrendingUp, UserRound } from "lucide-react";

interface NavbarGroupInterface {
  groupLabel: string;
  groupItems: string[];
}

const iconMap: Record<string, ReactNode> = {
  Trending: <TrendingUp />,
  Search: <Search />,
  Profile: <UserRound />,
  Settings: <Settings />,
};

const contentGroup: NavbarGroupInterface = {
  groupLabel: "Content",
  groupItems: ["Trending", "Search"],
};

const settingGroup: NavbarGroupInterface = {
  groupLabel: "Settings",
  groupItems: ["Profile", "Settings"],
};

const navbarGroups: NavbarGroupInterface[] = [settingGroup, contentGroup];

const NavSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex-row justify-center p-3 font-bold text-xl">
        SnackTrack
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
                      <Link href="#">
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
            <SidebarMenuButton>Sign Out</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavSideBar;
