import type { Metadata } from "next";

import "../src/styles.css";
import "../src/components/CardSwap.css";

export const metadata: Metadata = {
  title: "Vibe Coding: The Right Way — AI Product Workshop, Chennai",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
