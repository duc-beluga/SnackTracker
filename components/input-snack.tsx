"use client";

import React, { useRef, useState } from "react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function InputSnack() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !e ||
      e.key === "Enter" ||
      e.key === "Go" ||
      e.key === "Search" ||
      e.key === "Done"
    ) {
      e?.preventDefault();
      const query = inputRef.current?.value || "";
      if (query.trim()) {
        router.push(
          `/search?query=${encodeURIComponent(query.trim())}&category=${selectedCategory}`
        );
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Dropdown at the beginning */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-20 h-7 border-0 bg-transparent shadow-none px-2 py-1 text-xs focus:ring-0 focus:ring-offset-0 font-bold text-blue-400">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="center" sideOffset={4} className="z-50">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="drinks">Drinks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search icon */}
      <button
        onClick={() => handleSearch()}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors !cursor-pointer"
      >
        <Search className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 w-4 h-4 transition-colors" />
      </button>

      {/* Main input */}
      <Input
        ref={inputRef}
        onKeyDown={handleSearch}
        // type="search"
        placeholder="Search snacks, drinks, brands..."
        className="pl-24 pr-10 py-2 sm:py-2.5 w-full bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 focus:bg-white dark:focus:bg-slate-800 transition-colors duration-200 rounded-lg sm:rounded-xl shadow-sm text-base"
      />
    </div>
  );
}
