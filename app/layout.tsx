import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GlobalCursor } from '@/components/global-cursor';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Developer Portfolio Boilerplate',
  description: 'Modern developer portfolio showcasing projects, skills, and writing.',
  openGraph: {
    title: 'Developer Portfolio Boilerplate',
    description: 'Modern developer portfolio showcasing projects, skills, and writing.',
    type: 'website',
  },
  metadataBase: new URL('https://example.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground selection:bg-fuchsia-500/70 selection:text-white`}>        
        <ThemeProvider>
          <GlobalCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
