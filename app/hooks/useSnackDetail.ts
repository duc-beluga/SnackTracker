import { useEffect, useState } from "react";
import { fetchSnackDetail } from "@/app/server-actions/snacks/actions";
import { SnackDetail } from "@/app/interfaces/SnackInterfaces";
import { decodeId } from "@/utils/hashids";

export function useSnackDetail(snackId: string) {
  const [snack, setSnack] = useState<SnackDetail | null | undefined>();

  useEffect(() => {
    async function fetch() {
      const decodedSnackId = decodeId(snackId);
      const data = await fetchSnackDetail(decodedSnackId);
      setSnack(data);
    }
    fetch();
  }, [snackId]);

  return snack;
}
