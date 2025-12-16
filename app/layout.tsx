import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manropeSans.variable} ${interSans.variable}`}>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
