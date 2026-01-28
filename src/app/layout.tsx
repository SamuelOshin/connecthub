import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConnectHub Professional Landing Page",
  description: "Find Your Perfect Match Today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${plusJakarta.variable} font-display antialiased bg-white dark:bg-background-dark text-[#101418]`}>
        {children}
      </body>
    </html>
  );
}
