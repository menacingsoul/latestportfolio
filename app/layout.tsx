import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Adarsh.",
  description: "Adarsh's personal website that showcases his projects and achievements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
