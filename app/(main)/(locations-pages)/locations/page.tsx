"use client";

import React, { useState, useEffect } from "react";
import { City } from "country-state-city";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check, MapPin, BarChart3, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SnackReels from "@/components/snack-reels";
import { Location } from "@/app/interfaces/SnackInterfaces";
import { STATE_NAMES } from "@/utils/locationCommon";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const usStatesOnly = Object.keys(STATE_NAMES);

export default function LocationsPage() {
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    setHasMounted(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedStateCode) {
      const cities = City.getCitiesOfState("US", selectedStateCode);
      setAvailableCities(cities.map((c) => c.name));
    } else {
      setAvailableCities([]);
    }
  }, [selectedStateCode]);

  const handleStateSelect = (stateCode: string) => {
    setSelectedStateCode(stateCode === selectedStateCode ? "" : stateCode);
    setSelectedCity("");
    setStateOpen(false);
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName === selectedCity ? "" : cityName);
    setCityOpen(false);
  };

  const clearFilters = () => {
    setSelectedStateCode("");
    setSelectedCity("");
    setAvailableCities([]);
  };

  if (!hasMounted)
    return (
      <div className="w-full flex justify-center pt-20">
        <Spinner />
      </div>
    );
  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 py-4">
          {typeof window !== "undefined" && isMobile ? (
            <div className="space-y-4">
              {selectedStateCode && selectedCity && (
                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 text-sm text-blue-800">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">
                      {selectedCity}, {STATE_NAMES[selectedStateCode]}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Popover open={stateOpen} onOpenChange={setStateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={stateOpen}
                      className="justify-between border-2 hover:border-blue-300 focus:border-blue-500 text-xs"
                    >
                      <span className="truncate">
                        {selectedStateCode
                          ? STATE_NAMES[selectedStateCode]
                          : "State"}
                      </span>
                      <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[180px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search states..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {usStatesOnly.map((stateCode) => (
                            <CommandItem
                              key={stateCode}
                              value={STATE_NAMES[stateCode]}
                              onSelect={() => handleStateSelect(stateCode)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedStateCode === stateCode
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {STATE_NAMES[stateCode]}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityOpen}
                      disabled={!selectedStateCode}
                      className="justify-between border-2 hover:border-blue-300 focus:border-blue-500 text-xs disabled:opacity-50"
                    >
                      <span className="truncate">{selectedCity || "City"}</span>
                      <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[180px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search cities..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {availableCities.map((city) => (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={() => handleCitySelect(city)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCity === city
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {city}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-3 mt-2">
                {(selectedStateCode || selectedCity) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex-1 text-gray-600 hover:text-gray-800 border-gray-300 h-[38px]"
                  >
                    Clear Filters
                  </Button>
                )}
                <Link
                  href="/locations/distribution"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Distribution</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-4 items-center">
                <Popover open={stateOpen} onOpenChange={setStateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={stateOpen}
                      className="w-[200px] justify-between border-2 hover:border-blue-300 focus:border-blue-500"
                    >
                      {STATE_NAMES[selectedStateCode] || "Select state..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search states..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {usStatesOnly.map((stateCode) => (
                            <CommandItem
                              key={stateCode}
                              value={STATE_NAMES[stateCode]}
                              onSelect={() => handleStateSelect(stateCode)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedStateCode === stateCode
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {STATE_NAMES[stateCode]}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityOpen}
                      disabled={!selectedStateCode}
                      className="w-[250px] justify-between border-2 hover:border-blue-300 focus:border-blue-500"
                    >
                      {selectedCity || "Select city..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search cities..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {availableCities.map((city) => (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={() => handleCitySelect(city)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCity === city
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {city}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {(selectedStateCode || selectedCity) && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {selectedStateCode && selectedCity && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 whitespace-nowrap">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {selectedCity}, {STATE_NAMES[selectedStateCode]}
                    </span>
                  </div>
                )}
                <Link
                  href="/locations/distribution"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium  text-white bg-blue-600 border border-blue-600 rounded-md shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 whitespace-nowrap"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>View Distribution</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <SnackReels
          location={Location.Location}
          city={selectedCity}
          state={selectedStateCode}
        />
      </div>
    </div>
  );
}
