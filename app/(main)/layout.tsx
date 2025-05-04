import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import NavSideBar from "@/components/nav-sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload } from "lucide-react";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <NavSideBar />
      <div className="w-full">
        <div className="md:hidden flex justify-between fixed z-50 w-full p-2">
          <SidebarTrigger className="ml-3" />
          <Button variant="outline" asChild>
            <Link href="snacks/new">
              Upload <Upload />
            </Link>
          </Button>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
