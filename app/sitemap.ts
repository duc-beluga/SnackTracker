import type { MetadataRoute } from "next";
import { fetchSnackIds } from "./server-actions/snacks/actions";
import { encodeId } from "@/utils/hashids";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snackIds = await fetchSnackIds();
  const encodedSnackIds = snackIds?.map((snackId) => encodeId(snackId));

  const defaultUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const snackEntries: MetadataRoute.Sitemap =
    encodedSnackIds?.map((id) => ({
      url: `${defaultUrl}/snacks/${id}`,
      lastModified: new Date(), // required
      changeFrequency: "weekly", // required
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: defaultUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${defaultUrl}/snacks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${defaultUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${defaultUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${defaultUrl}/settings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${defaultUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...snackEntries,
  ];
}
