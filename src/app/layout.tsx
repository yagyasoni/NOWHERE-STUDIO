import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { brand, siteCredit } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: { default: `${brand.name} | Home`, template: `${brand.name} | %s` },
  description: brand.description,
  authors: siteCredit.siteBy.map((c) => ({ name: c.name })),
  creator: siteCredit.siteBy.map((c) => c.name).join(" & "),
  openGraph: {
    title: `${brand.name} | Home`,
    description: brand.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>
          <Nav />
          <main className="relative">{children}</main>
          <Loader />
        </SmoothScroll>
      </body>
    </html>
  );
}
