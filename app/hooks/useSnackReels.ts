import { useEffect, useState } from "react";
import {
  Location,
  SnackDisplay,
  TrendingType,
} from "../interfaces/SnackInterfaces";
import {
  getSnacks,
  getLikedSnacks,
  getUploadedSnacks,
  getTrendingSnacks,
  fetchSearchSnacks,
  fetchSnackByLocation,
  fetchSnackDetailByIds,
  getDrinks,
} from "../server-actions/snacks/actions";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { encodeId } from "@/utils/hashids";
import {
  REACT_QUERY_GC_TIME,
  REACT_QUERY_STALE_TIME,
  SNACK_PER_LOAD,
} from "../constants/snacks";
import { SearchParams } from "../interfaces/PropsInterface";

// Helper function to create query key
function createSnackQueryKey(
  location: Location,
  timeRange?: TrendingType,
  searchString?: SearchParams,
  state?: string,
  city?: string
) {
  return [
    location,
    timeRange,
    {
      query: searchString?.query ?? "",
      category: searchString?.category ?? "",
    },
    state,
    city,
  ].filter(Boolean);
}

// Helper function to fetch snacks based on location and parameters
async function fetchSnacksByLocation(
  location: Location,
  startRange: number,
  endRange: number,
  timeRange?: TrendingType,
  searchString?: SearchParams,
  state?: string,
  city?: string
): Promise<SnackDisplay[]> {
  let snacksData: SnackDisplay[] | null;

  if (location === Location.Home) {
    snacksData = await fetch(
      `/api/snacks?startRange=${startRange}&endRange=${endRange}`
    ).then((res) => res.json());
  } else if (location === Location.Drink) {
    snacksData = await getDrinks(startRange, endRange);
  } else if (location === Location.Liked) {
    snacksData = await getLikedSnacks(startRange, endRange);
  } else if (location === Location.Uploaded) {
    snacksData = await getUploadedSnacks(startRange, endRange);
  } else if (location === Location.Trending) {
    snacksData = await getTrendingSnacks(
      startRange,
      endRange,
      timeRange ?? TrendingType.AllTime
    );
  } else if (location === Location.Search) {
    const query = searchString?.query.trim() ?? "";
    const category = searchString?.category.trim() ?? "";

    snacksData = !query
      ? await fetch(
          `/api/snacks?startRange=${startRange}&endRange=${endRange}`
        ).then((res) => res.json())
      : await fetchSearchSnacks(startRange, endRange, query, category);
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
  timeRange?: TrendingType,
  searchString?: SearchParams,
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
    staleTime: REACT_QUERY_STALE_TIME,
    gcTime: REACT_QUERY_GC_TIME,
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
        return bulkData;
      },
      staleTime: REACT_QUERY_STALE_TIME,
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
