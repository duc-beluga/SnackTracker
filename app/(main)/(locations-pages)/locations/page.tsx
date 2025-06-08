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
import { ChevronsUpDown, Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import SnackReels from "@/components/snack-reels";
import { Location } from "@/app/interfaces/SnackInterfaces";
import { STATE_NAMES } from "@/utils/locationCommon";
import Link from "next/link";

const usStatesOnly = Object.keys(STATE_NAMES);

export default function LocationsPage() {
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex justify-between w-full mx-auto px-4 sm:px-6 lg:px-6 py-4">
          <div className="w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* State Selector */}
            <Popover open={stateOpen} onOpenChange={setStateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={stateOpen}
                  className="w-full sm:w-[200px] justify-between border-2 hover:border-blue-300 focus:border-blue-500"
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

            {/* City Selector */}
            {selectedStateCode && (
              <Popover open={cityOpen} onOpenChange={setCityOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityOpen}
                    className="w-full sm:w-[250px] justify-between border-2 hover:border-blue-300 focus:border-blue-500"
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
            )}

            {(selectedStateCode || selectedCity) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedStateCode("");
                  setSelectedCity("");
                  setAvailableCities([]);
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* Location display */}
            {selectedStateCode && selectedCity && (
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 whitespace-nowrap">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedCity}, {STATE_NAMES[selectedStateCode]}
                </span>
              </div>
            )}

            {/* Distribution link */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/locations/distribution">View Distribution</Link>
            </Button>
          </div>
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
