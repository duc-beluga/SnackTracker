import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { NavSideBar } from "@/components/nav-sidebar";
import { UploadButton } from "@/components/upload-button";

export const MainLayout = ({
  children,
  snackModal,
}: Readonly<{
  children: React.ReactNode;
  snackModal: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <NavSideBar />
      <div className="w-full">
        <div className="md:hidden flex justify-between fixed z-50 w-full p-2 bg-background">
          <SidebarTrigger className="ml-3" />
          <div className="flex items-center pl-12 font-bold">WutsDis</div>
          <UploadButton />
        </div>
        {/* 52 is header scroll height */}
        <div className="mt-[52px] md:mt-0">{children}</div>
        {snackModal}
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
