import { SidebarProvider } from "@/components/ui/sidebar";
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
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};

export default MainLayout;
