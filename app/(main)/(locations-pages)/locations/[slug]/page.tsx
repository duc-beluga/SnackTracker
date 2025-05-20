"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function CityState() {
  const { slug } = useParams();
  const city = slug?.toString().split("-")[1];
  const state = slug?.toString().split("-")[0];
  return (
    <div>
      {city} - {state}
    </div>
  );
}
