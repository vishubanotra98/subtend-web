import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/Store/StoreProvider";
import AppProvider from "@/components/Provider/AppProvider";
import { ThemeProvider } from "@/components/Provider/theme/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} min-h-screen bg-background text-primary antialiased`}
      >
        <ThemeProvider>
          <StoreProvider>
            <AppProvider>{children}</AppProvider>
          </StoreProvider>
        </ThemeProvider>

        <Toaster
          position="bottom-left"
          gutter={10}
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
