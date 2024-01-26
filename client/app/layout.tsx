import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteBlob } from "@/components/blobs/site-blob";
import { Toaster } from "@/components/ui/toaster";
import { SiteFooter } from "@/components/shared/site-footer";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VidWord",
  description: "Youtube video summarizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {/* <SiteNavbar /> */}
          <SiteBlob />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
