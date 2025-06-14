import DialogSnackDetail from "@/components/dialog-snack-detail";
import { DialogNewSnack } from "@/components/dialog-new-snack";
export default async function SnackModalPage({
  params,
}: {
  params: Promise<{ snackId: string }>;
}) {
  const snackId = (await params).snackId;

  if (snackId === "new") {
    return <DialogNewSnack />;
  }

  return <DialogSnackDetail snackId={snackId} />;
}
