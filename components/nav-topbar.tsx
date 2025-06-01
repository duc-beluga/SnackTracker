import { getCurrentUser } from "@/app/server-actions/auth/actions";
import React from "react";
import { Button, Input, SidebarTrigger } from "./ui";
import { Search, Upload } from "lucide-react";
import Link from "next/link";

export default async function NavTopBar() {
  const user = await getCurrentUser();
  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search snacks..."
                className="pl-10 pr-4 py-2 sm:py-2.5 w-full bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 focus:bg-white dark:focus:bg-slate-800 transition-colors duration-200 rounded-lg sm:rounded-xl shadow-sm text-base" // text-base prevents zoom on iOS
              />
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 font-medium"
            asChild
          >
            <Link
              href={user ? "/snacks/new" : "/sign-in"}
              className="flex items-center gap-1 sm:gap-2"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Add Snack</span>
              <span className="sm:hidden text-sm">Post</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
