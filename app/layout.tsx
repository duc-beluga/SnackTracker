import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "./store/StoreProvider";
import { ThemeProvider } from "@/components/theme-provider";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "WutsDis",
    template: "%s - WutsDis",
  },
  description: "Snap snacks. Tag spots.",
  icons: {
    icon: "/icon.ico",
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        {/* Preconnect to Supabase */}
        <link
          rel="preconnect"
          href="https://yjzinpfmkbsbtxcosviy.supabase.co"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col gap-20 items-center">
                {children}
              </div>
              <Toaster />
            </main>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
