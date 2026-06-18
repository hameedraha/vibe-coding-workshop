import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";

import "../src/styles.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe Coding: The Right Way - AI Product Workshop, Chennai",
  description:
    "A 4-hour hands-on workshop in Chennai with Hameed, Leo and Hari. Go from idea to product to customer using modern AI tools and proven startup thinking.",
  openGraph: {
    title: "Vibe Coding: The Right Way",
    description:
      "Build the right thing. Build it the right way. Take it to the right people. A 4-hour AI product workshop in Chennai.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${interTight.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
