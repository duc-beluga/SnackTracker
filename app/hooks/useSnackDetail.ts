import { useQuery } from "@tanstack/react-query";
import { fetchSnackDetail } from "@/app/server-actions/snacks/actions";
import { SnackDetail } from "@/app/interfaces/SnackInterfaces";
import { decodeId } from "@/utils/hashids";

export function useSnackDetail(snackId: string) {
  return useQuery<SnackDetail | null>({
    queryKey: ["snackDetail", snackId],
    queryFn: async () => {
      const decodedId = decodeId(snackId);
      return await fetchSnackDetail(decodedId);
    },
    enabled: !!snackId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
