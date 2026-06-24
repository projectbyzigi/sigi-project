import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "SIGI",
  description: "Etwas Neues entsteht.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
