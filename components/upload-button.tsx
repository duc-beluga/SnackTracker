"use client";

import React from "react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Upload } from "lucide-react";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export function UploadButton() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Button variant="outline" asChild>
      <Link href={user ? "/snacks/new" : "/sign-in"}>
        Upload <Upload />
      </Link>
    </Button>
  );
}
