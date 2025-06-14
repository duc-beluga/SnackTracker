import { useEffect, useState } from "react";
import { fetchSnackDetail } from "@/app/server-actions/snacks/actions";
import { SnackDetail } from "@/app/interfaces/SnackInterfaces";

export function useSnackDetail(snackId: string) {
  const [snack, setSnack] = useState<SnackDetail | null | undefined>();

  useEffect(() => {
    async function fetch() {
      const data = await fetchSnackDetail(snackId);
      setSnack(data);
    }
    fetch();
  }, [snackId]);

  return snack;
}
