import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ambassador.bsprep.in'),
  title: {
    default: "BSPrep Ambassador Program",
    template: "%s | BSPrep Ambassador",
  },
  description: "Join the official BSPrep Student Ambassador Program. Empower data science students, host campus workshops, and earn exclusive rewards like .XYZ domains and custom swag.",
  keywords: ["BSPrep", "Student Ambassador", "Data Science", "IIT Madras", "Referral Program", "Campus Ambassador", "Tech Internship"],
  authors: [{ name: "BSPrep Founding Team" }],
  openGraph: {
    title: "BSPrep Ambassador Program",
    description: "Join the movement to empower data science students everywhere. Build your network and earn premium rewards.",
    url: "https://ambassador.bsprep.in",
    siteName: "BSPrep",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "BSPrep Student Ambassador Program",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BSPrep Student Ambassador Program",
    description: "Join the movement to empower data science students everywhere. Earn points, swag, and career boosts.",
    images: ["/open-graph.png"],
    creator: "@bsprep",
  },
  icons: {
    icon: "/bsprep.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.className} h-full antialiased`}
      style={{ fontSize: "90%" }}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
