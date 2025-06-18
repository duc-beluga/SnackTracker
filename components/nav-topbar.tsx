import React from "react";
import { Button, SidebarTrigger } from "./ui";
import { Search, Upload } from "lucide-react";
import Link from "next/link";
import InputSnack from "./input-snack";

export default async function NavTopBar() {
  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <InputSnack />
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 font-medium"
            asChild
          >
            <Link
              href="/snacks/new"
              className="flex items-center gap-1 sm:gap-2"
              scroll={false}
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
