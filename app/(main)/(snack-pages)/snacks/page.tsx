import { Location } from "@/app/interfaces/SnackInterfaces";
import { getCurrentSession } from "@/app/server-actions/auth/actions";
import SnackReels from "@/components/snack-reels";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Snacks",
};

const SnackPage = async () => {
  const session = await getCurrentSession();

  const href = session ? "/snacks/new" : "/sign-in";

  return (
    <div className="flex flex-col gap-3 my-2">
      <div className="flex justify-start pt-4 md:px-4">
        <Button variant="outline" className="hidden md:inline-flex" asChild>
          <Link href={href}>
            Upload <Upload />
          </Link>
        </Button>
      </div>
      <SnackReels location={Location.Home} />
    </div>
  );
};

export default SnackPage;
