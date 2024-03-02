import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { getServerSession } from "next-auth";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// const SolaimanLipiFont = localFont({
//   src: [
//     {
//       path: "./../assets/fonts/SolaimanLipi_22-02-2012.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./../assets/fonts/SolaimanLipi_Bold_10-03-12.ttf",
//       weight: "700",
//       style: "bold",
//     },
//   ],
// });

export const metadata: Metadata = {
  title: "Dynamic Krishok & Imam Muazzin Development Foundation",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers session={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
