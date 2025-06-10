import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui";

const features = [
  {
    title: "Discover Locally",
    description:
      "Find snacks around you by city and state. WutsDis connects you to treats just down the block.",
    image: "/illustrations/location-search.svg",
  },
  {
    title: "Share Globally",
    description:
      "Post and tag your favorite snacks. Inspire others and grow the global snack map.",
    image: "/illustrations/location-share.svg",
  },
  {
    title: "Explore & Enjoy",
    description:
      "Browse a world of snacks and let curiosity guide you. WutsDis is made for joyful, tasty discovery.",
    image: "/illustrations/drinking.svg",
  },
];

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">About WutsDis</h1>
      <div className="flex flex-col justify-center items-center gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="max-w-md p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white text-center flex flex-col items-center"
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={180}
              height={180}
              className="mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-10 text-center">
        Built for snack lovers, by snack lovers. From street bites to viral
        munchies—explore it all on WutsDis.
      </p>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Designed & built by{" "}
        <a
          href="https://github.com/duc-beluga"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          Duc Nguyen
        </a>
      </p>
    </div>
  );
}
