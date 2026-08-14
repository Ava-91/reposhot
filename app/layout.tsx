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
  title: {
    default: "RepoShot — Beautiful GitHub repository screenshots",
    template: "%s | RepoShot",
  },
  description:
    "Turn any public GitHub repository into a beautiful, customizable screenshot you can share in your README, portfolio, or social media.",
  applicationName: "RepoShot",
  keywords: ["GitHub", "repository screenshots", "RepoShot", "developer tools", "open source"],
  authors: [{ name: "Ava-91", url: "https://github.com/Ava-91" }],
  creator: "Ava-91",
  metadataBase: new URL("https://reposhot.app"),
  openGraph: {
    type: "website",
    title: "RepoShot — Beautiful GitHub repository screenshots",
    description:
      "Turn any public GitHub repository into a beautiful, customizable screenshot.",
    siteName: "RepoShot",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "RepoShot — Beautiful GitHub repository screenshots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoShot — Beautiful GitHub repository screenshots",
    description:
      "Turn any public GitHub repository into a beautiful, customizable screenshot.",
    images: ["/opengraph-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
