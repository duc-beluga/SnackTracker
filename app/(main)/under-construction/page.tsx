import React from "react";
import Image from "next/image";

export default function UnderConstructionPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center bg-background text-foreground pt-36">
      <Image
        src="/illustrations/under-construction.svg"
        alt="Under Construction"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-3xl font-bold mb-2">
        This page is under construction
      </h1>
      <p className="text-muted-foreground max-w-md">
        We’re working hard to bring this feature to life. Check back soon!
      </p>
    </div>
  );
}
