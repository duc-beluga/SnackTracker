import { useQuery } from "@tanstack/react-query";
import { fetchSnackDetail } from "@/app/server-actions/snacks/actions";
import { SnackDetail } from "@/app/interfaces/SnackInterfaces";
import { decodeId } from "@/utils/hashids";
import { REACT_QUERY_STALE_TIME } from "../constants/snacks";

export function useSnackDetail(snackId: string) {
  return useQuery<SnackDetail | null>({
    queryKey: ["snackDetail", snackId],
    queryFn: async () => {
      const decodedId = decodeId(snackId);
      return await fetchSnackDetail(decodedId);
    },
    enabled: !!snackId,
    staleTime: REACT_QUERY_STALE_TIME,
  });
}
