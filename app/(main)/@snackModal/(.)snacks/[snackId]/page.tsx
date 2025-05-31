import DialogImageLocation from "@/components/dialog-image-location";
import { DialogNewSnack } from "@/components/dialog-new-snack";
export default async function SnackModalPage({
  params,
}: {
  params: Promise<{ snackId: string }>;
}) {
  const snackId = parseInt((await params).snackId);

  if (isNaN(snackId)) {
    return <DialogNewSnack />;
  }

  return <DialogImageLocation snackId={snackId} />;
}
