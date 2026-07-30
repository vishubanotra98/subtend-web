import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/Store/StoreProvider";
import AppProvider from "@/components/Provider/AppProvider";
import { ThemeProvider } from "@/components/Provider/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subtend",
  description: "Subtend is a team collaboration app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <StoreProvider>
            <AppProvider>{children}</AppProvider>
          </StoreProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
