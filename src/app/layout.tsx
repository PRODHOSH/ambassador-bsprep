import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ambassador",
  description: "Fearless Vision Delivered",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.className} h-full antialiased`}
      style={{ fontSize: "90%" }}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
