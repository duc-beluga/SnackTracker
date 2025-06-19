import { useEffect, useState } from "react";
import { Location, SnackDisplay } from "../interfaces/SnackInterfaces";
import {
  getSnacks,
  fetchLikedSnacks,
  fetchUploadedSnacks,
  fetchTrendingSnacks,
  fetchSearchSnacks,
  fetchSnackByLocation,
  fetchSnackDetailByIds,
} from "../server-actions/snacks/actions";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { encodeId } from "@/utils/hashids";
import { SNACK_PER_LOAD } from "../constants/snacks";

// Helper function to create query key
function createSnackQueryKey(
  location: Location,
  timeRange?: "7days" | "1month" | "all",
  searchString?: string,
  state?: string,
  city?: string
) {
  return [
    "snacks",
    location,
    timeRange,
    searchString?.trim(),
    state,
    city,
  ].filter(Boolean);
}

// Helper function to fetch snacks based on location and parameters
async function fetchSnacksByLocation(
  location: Location,
  startRange: number,
  endRange: number,
  timeRange?: "7days" | "1month" | "all",
  searchString?: string,
  state?: string,
  city?: string
): Promise<SnackDisplay[]> {
  let snacksData: SnackDisplay[] | null;

  if (location === Location.Home) {
    snacksData = await fetch(
      `/api/snacks?startRange=${startRange}&endRange=${endRange}`
    ).then((res) => res.json());
  } else if (location === Location.Liked) {
    snacksData = await fetchLikedSnacks(startRange, endRange);
  } else if (location === Location.Uploaded) {
    snacksData = await fetchUploadedSnacks(startRange, endRange);
  } else if (location === Location.Trending) {
    snacksData = await fetchTrendingSnacks(
      startRange,
      endRange,
      timeRange ?? "all"
    );
  } else if (location === Location.Search) {
    const query = searchString?.trim() ?? "";
    snacksData = !query
      ? await fetch(
          `/api/snacks?startRange=${startRange}&endRange=${endRange}`
        ).then((res) => res.json())
      : await fetchSearchSnacks(startRange, endRange, query);
  } else if (location === Location.Location) {
    if (!state) {
      snacksData = [];
    } else {
      snacksData = await fetchSnackByLocation(
        startRange,
        endRange,
        city ?? "",
        state
      );
    }
  } else {
    snacksData = [];
  }

  return snacksData ?? [];
}

export function useSnackReels(
  location: Location,
  timeRange?: "7days" | "1month" | "all",
  searchString?: string,
  state?: string,
  city?: string
) {
  //#region { State }

  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);

  //#endregion

  //#region { Dependencies }

  const router = useRouter();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  //#endregion

  //#region { TanStack Query }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: createSnackQueryKey(
      location,
      timeRange,
      searchString,
      state,
      city
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const startRange = pageParam * SNACK_PER_LOAD;
      const endRange = startRange + SNACK_PER_LOAD - 1;

      return fetchSnacksByLocation(
        location,
        startRange,
        endRange,
        timeRange,
        searchString,
        state,
        city
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than SNACK_PER_LOAD, we've reached the end
      if (lastPage.length < SNACK_PER_LOAD) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  //#endregion

  //#region { Computed Values }

  // Flatten all pages into a single array
  const snacks = data?.pages.flat() ?? [];

  // Check if we have no data at all
  const hasNone = status === "success" && snacks.length === 0;

  // Loading state for initial fetch
  const loading = status === "pending";

  //#endregion

  //#region { Effects }

  // Fetch more data when scrolling into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Prefetch snack details when new data comes in
  useEffect(() => {
    if (data?.pages) {
      // Only prefetch the latest page (newly fetched data)
      const latestPage = data.pages[data.pages.length - 1];
      if (latestPage && latestPage.length > 0) {
        prefetchSnackDetails(latestPage);
      }
    }
  }, [data?.pages.length]);

  //#endregion

  //#region { Event Handlers }

  function onSnackClick(snackId: number) {
    router.push(`?snackId=${snackId}`, { scroll: false });
    if (snackId && snacks) {
      const foundSnack = snacks.find((snack) => snack.snack_id === snackId);
      if (foundSnack) {
        setSelectedSnack(foundSnack);
      }
    }
  }

  function prefetchSnackDetails(snacks: SnackDisplay[]) {
    if (snacks.length === 0) return;

    const snackIds = snacks.map((snack) => snack.snack_id);

    // Bulk fetch and populate individual cache entries
    queryClient.prefetchQuery({
      queryKey: ["snackDetailsBulk", snackIds.sort().join(",")],
      queryFn: async () => {
        const bulkData = await fetchSnackDetailByIds(snackIds);

        // Populate individual cache entries from bulk data
        if (Array.isArray(bulkData)) {
          bulkData.forEach((snackDetail) => {
            const encodedId = encodeId(snackDetail.snack_id);
            queryClient.setQueryData(["snackDetail", encodedId], snackDetail);
          });
        }
        console.log(bulkData);
        return bulkData;
      },
      staleTime: 5 * 60 * 1000,
    });
  }
  //#endregion

  return {
    snacks,
    onSnackClick,
    selectedSnack,
    ref,
    hasMore: loading || hasNextPage,
    hasNone,
    loading: loading || isFetching,
    error,
  };
}
