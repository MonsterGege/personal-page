import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "George Schumy — Backend Engineer & SRE",
  description:
    "Backend Engineer with four years of experience building scalable microservices, data pipelines, and cloud-native infrastructure using Golang, Python, and GCP.",
  metadataBase: new URL("https://schum.web.id"),
  openGraph: {
    title: "George Schumy — Backend Engineer & SRE",
    description:
      "Backend Engineer with four years of experience building scalable microservices, data pipelines, and cloud-native infrastructure using Golang, Python, and GCP.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-base text-fg">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
