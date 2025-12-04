import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar-sv";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
