import React from "react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Upload } from "lucide-react";
import { getCurrentUser } from "@/app/server-actions/auth/actions";

export async function UploadButton() {
  const user = await getCurrentUser();

  const href = user ? "/snacks/new" : "/sign-in";

  return (
    <Button variant="outline" asChild>
      <Link href={href}>
        Upload <Upload />
      </Link>
    </Button>
  );
}
