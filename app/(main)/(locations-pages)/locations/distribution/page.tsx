import { SnackCityAndState } from "@/app/interfaces/SnackInterfaces";
import { fetchCityAndStateFrequencies } from "@/app/server-actions/locations/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { Metadata } from "next";
import Link from "next/link";

import React from "react";

export const metadata: Metadata = {
  title: "Locations",
};

export default async function LocationsPage() {
  const cityAndStateFrequency = await fetchCityAndStateFrequencies();

  function groupByStates(snackCitiesAndStates: SnackCityAndState[] | null) {
    const stateMapLocationAndCount: Record<string, [string, number][]> = {};

    snackCitiesAndStates?.forEach(({ state, city, location_count }) => {
      if (!(state in stateMapLocationAndCount)) {
        stateMapLocationAndCount[state] = [[city, location_count]];
      } else {
        stateMapLocationAndCount[state].push([city, location_count]);
      }
    });

    return stateMapLocationAndCount;
  }

  const stateMapLocationAndCount = groupByStates(cityAndStateFrequency);

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <Accordion type="single" collapsible className="w-1/2">
          {Object.entries(stateMapLocationAndCount).map(([state, cities]) => (
            <AccordionItem value={state + cities} key={state + cities}>
              <AccordionTrigger>{state}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {cities.map(([city, count]) => (
                    <li key={city} className="py-1">
                      {/* TODO: Make this a link so it navigate back to the filter page with the selected state, city*/}
                      {city} ({count})
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
