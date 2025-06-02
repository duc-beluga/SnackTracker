"use client";

import React, { useRef } from "react";
import { Input } from "./ui";
import { useRouter } from "next/navigation";

export default function InputSnack() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" ||
      e.key === "Go" ||
      e.key === "Search" ||
      e.key === "Done"
    ) {
      e.preventDefault();
      const query = inputRef.current?.value || "";
      if (query.trim()) {
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <Input
      ref={inputRef}
      onKeyDown={handleSearch}
      type="search"
      placeholder="Search snacks..."
      className="pl-10 pr-4 py-2 sm:py-2.5 w-full bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 focus:bg-white dark:focus:bg-slate-800 transition-colors duration-200 rounded-lg sm:rounded-xl shadow-sm text-base" // text-base prevents zoom on iOS
    />
  );
}
