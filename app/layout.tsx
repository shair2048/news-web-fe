import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { getUserInfoFromBackend } from "@/services/auth.service";
import { Toaster } from "@/components/ui/sonner";
import "@liveblocks/react-ui/styles.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfoFromBackend();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manropeSans.variable} ${interSans.variable}`}>
        <AuthProvider user={user}>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
