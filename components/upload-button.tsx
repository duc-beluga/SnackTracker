"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Upload } from "lucide-react";
import { getCurrentUser } from "@/app/server-actions/auth/actions";

export function UploadButton() {
  const [uploadLink, setUploadLink] = useState<string>("");

  useEffect(() => {
    async function setDestinationLink() {
      const currentUser = await getCurrentUser();
      const destination = currentUser ? "/snacks/new" : "/sign-in";
      setUploadLink(destination);
    }

    setDestinationLink();
  }, []);

  return (
    <Button variant="outline" asChild>
      <Link href={uploadLink}>
        Upload <Upload />
      </Link>
    </Button>
  );
}
