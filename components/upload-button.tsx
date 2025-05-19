import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Upload } from "lucide-react";
import { getCurrentUser } from "@/app/server-actions/auth/actions";

const UploadButton = async () => {
  const user = await getCurrentUser();

  const href = user ? "/snacks/new" : "/sign-in";

  return (
    <Button variant="outline" asChild>
      <Link href={href}>
        Upload <Upload />
      </Link>
    </Button>
  );
};

export default UploadButton;
