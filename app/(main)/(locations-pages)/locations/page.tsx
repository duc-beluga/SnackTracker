import { SnackCityAndState } from "@/app/interfaces/SnackInterfaces";
import { fetchCityAndStateFrequencies } from "@/app/server-actions/locations/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

import React from "react";

const LocationsPage = async () => {
  const cityAndStateFrequency = await fetchCityAndStateFrequencies();
  console.log(cityAndStateFrequency);

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
                      <Link
                        href={`/locations/${state.toLowerCase()}-${city.toLowerCase()}`}
                      >
                        {city} ({count})
                      </Link>
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
};

export default LocationsPage;
