"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Login from "@/app/(auth-pages)/sign-in/page";

export default function SignInModalPage() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogTitle />
      <DialogContent>
        <Login />
      </DialogContent>
    </Dialog>
  );
}
