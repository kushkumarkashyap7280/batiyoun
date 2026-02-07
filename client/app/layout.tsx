import type { Metadata ,Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeInitializer } from "@/components/ThemeInitializer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My App',
}

// Add this new export separately
export const viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-page dark:bg-slate-950 text-default dark:text-white transition-theme`}
      >
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
