import DialogImageLocation from "@/components/dialog-image-location";
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

  return <DialogImageLocation snackId={snackId} />;
}
