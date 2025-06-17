import { useMemo } from "react";
import { SnackName } from "../interfaces/SnackInterfaces";

const MAX_PREDICTIONS = 5;
const ADD_NEW_SNACK_ITEM = { name: "Add new snack?", snack_id: 0 } as const;

export function useFilteredSnackNames(
  snackNames: SnackName[] | null,
  query: string,
  isAddSnack: boolean
): SnackName[] {
  return useMemo(() => {
    if (!query || !snackNames || isAddSnack) return [];

    const trimmedQuery = normalizeString(query);

    const matches = filterSnacks(snackNames, trimmedQuery);

    return matches.length === 0 ? [ADD_NEW_SNACK_ITEM] : matches;
  }, [snackNames, query, isAddSnack]);
}

const filterSnacks = (snacks: SnackName[], searchTerm: string): SnackName[] => {
  if (!searchTerm) return [];

  const normalizedTerm = normalizeString(searchTerm);

  return snacks
    .filter((snack) => normalizeString(snack.name).includes(normalizedTerm))
    .slice(0, MAX_PREDICTIONS);
};

const normalizeString = (str: string): string => str.trim().toLowerCase();
