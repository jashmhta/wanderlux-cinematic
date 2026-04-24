import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Wanderlux — Private journeys, composed like a film.",
  description:
    "A small travel studio designing private journeys across 42 countries. Cinematic routes, zero logistics, obsessive attention to texture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Avoid FOUC: apply theme before paint
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('wanderlux-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t?t==='dark':m;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative min-h-full bg-[var(--bg)] text-[var(--ink)]">
        <ThemeProvider>
          <Loader />
          <SmoothScroll>
            <Grain />
            <Cursor />
            <ScrollProgress />
            <Nav />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
