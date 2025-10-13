import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { NavSideBar } from "@/components/nav-sidebar";
import { UploadButton } from "@/components/upload-button";
import NavTopBar from "@/components/nav-topbar";

export const MainLayout = ({
  children,
  snackModal,
  signInModal,
}: Readonly<{
  children: React.ReactNode;
  snackModal: React.ReactNode;
  signInModal: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <NavSideBar />

      <div className="w-full min-h-screen">
        <NavTopBar />
        <div>{children}</div>
        {snackModal}
        {signInModal}
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
