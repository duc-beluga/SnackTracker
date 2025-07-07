import { useMemo } from "react";

const MAX_PREDICTIONS = 5;

export function useFilteredByName<T extends { name: string }>(
  items: T[] | null,
  query: string,
  defaultItem?: T
): T[] {
  return useMemo(() => {
    if (!query || !items) return [];

    const trimmedQuery = query.trim().toLowerCase();

    const matches = items
      .filter((item) => item.name.trim().toLowerCase().includes(trimmedQuery))
      .slice(0, MAX_PREDICTIONS);

    if (matches.length > 0) {
      return matches;
    }

    return defaultItem ? [defaultItem] : [];
  }, [items, query, defaultItem]);
}
