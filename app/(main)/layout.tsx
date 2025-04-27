import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import NavSideBar from "@/components/nav-sidebar";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <NavSideBar />
      <div className="w-full">
        <SidebarTrigger className="md:hidden lg:hidden xl:hidden 2xl:hidden ml-3 fixed z-50" />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
