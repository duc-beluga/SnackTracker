import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import NavSideBar from "@/components/nav-sidebar";

export const SnackLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <div>
        <SidebarTrigger />
        <NavSideBar />
        <div className="ml-56">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default SnackLayout;
