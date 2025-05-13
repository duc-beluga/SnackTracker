import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Upload } from "lucide-react";
import { getCurrentSession } from "@/app/server-actions/auth/actions";

const UploadButton = async () => {
  const session = await getCurrentSession();

  const href = session ? "/snacks/new" : "/sign-in";

  return (
    <Button variant="outline" asChild>
      <Link href={href}>
        Upload <Upload />
      </Link>
    </Button>
  );
};

export default UploadButton;
