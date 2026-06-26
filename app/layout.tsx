import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SIGI Bauunternehmen — Schlüsselfertige Villen auf Mallorca",
  description:
    "SIGI ist Ihr deutschsprachiges Bauunternehmen auf Mallorca. Von der Planung und Architektur bis zur schlüsselfertigen Villa — alles aus einer Hand.",
  metadataBase: new URL("https://sigi-project.com"),
  openGraph: {
    title: "SIGI Bauunternehmen — Schlüsselfertige Villen auf Mallorca",
    description:
      "Von der ersten Skizze bis zur schlüsselfertigen Villa. Alles aus einer Hand.",
    url: "https://sigi-project.com",
    siteName: "SIGI Bauunternehmen",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
