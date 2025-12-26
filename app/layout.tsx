import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import envConfig from "@/env.config";
import AuthProvider from "@/components/AuthProvider";

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

async function getUserInfoFromBackend() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;

  try {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/about/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const payload = await res.json();
    return payload.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfoFromBackend();

  return (
    <html lang="en">
      <body className={`${manropeSans.variable} ${interSans.variable}`}>
        <AuthProvider user={user}>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
