import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-label",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "House of Leonard — Style Without Compromise",
  description:
    "Refined eccentricity for the man who knows his own mind — and dresses accordingly. Coming soon.",
  openGraph: {
    title: "House of Leonard",
    description: "Style Without Compromise. Something exceptional is coming.",
    url: "https://houseofleonard.com",
    siteName: "House of Leonard",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${jost.variable} ${plusJakarta.variable} bg-surface text-on-surface font-body antialiased`}
      >
        {children}
        <Analytics />
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=VmM2iG"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
