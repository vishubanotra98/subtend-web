import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/Store/StoreProvider";
import AppProvider from "@/components/Provider/AppProvider";
import { ThemeProvider } from "@/components/Provider/theme/ThemeProvider";
import { Poppins } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
        className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} min-h-screen bg-background text-primary antialiased`}
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
