import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/profile"],
      },
    ],
    sitemap: `${defaultUrl}/sitemap.xml`,
  };
}
