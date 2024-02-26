import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchContextProvider } from "@/contexts/searchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vacations",
  description: "Find your dream vacation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={inter.className}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
