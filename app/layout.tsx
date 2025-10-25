import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Malayalam Times | National & Kerala News Headlines",
  description:
    "Follow breaking news, in-depth analysis, and subscriber exclusives from Kerala, India, and around the world.",
  keywords: "news, India news, Kerala news, breaking news, world news, sports, business, technology, health, entertainment",
  authors: [{ name: "The Malayalam Times" }],
  openGraph: {
    title: "The Malayalam Times | National & Kerala News Headlines",
    description: "Follow breaking news, in-depth analysis, and subscriber exclusives from Kerala, India, and around the world.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malayalam Times | National & Kerala News Headlines",
    description: "Follow breaking news, in-depth analysis, and subscriber exclusives from Kerala, India, and around the world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-50 text-neutral-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
