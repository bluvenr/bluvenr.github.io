import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/context/i18n-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "https://github.com/bluvenr.png",
  },
  title: {
    default: "bluvenr — Developer & Open Source Enthusiast",
    template: "%s | bluvenr",
  },
  description:
    "Personal homepage of bluvenr. Building developer tools with Rust, Go & TypeScript. Creator of TokenOwl, HookRun and VirAPI.",
  keywords: [
    "bluvenr",
    "developer tools",
    "Rust",
    "Go",
    "TypeScript",
    "open source",
    "TokenOwl",
    "HookRun",
    "VirAPI",
    "full-stack developer",
    "Shenzhen",
  ],
  authors: [{ name: "bluvenr", url: "https://github.com/bluvenr" }],
  creator: "bluvenr",
  metadataBase: new URL("https://bluvenr.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "bluvenr — Developer & Open Source Enthusiast",
    description:
      "Building developer tools with Rust, Go & TypeScript. Creator of TokenOwl, HookRun and VirAPI.",
    url: "https://bluvenr.github.io",
    siteName: "bluvenr",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "bluvenr",
    description: "Developer & Open Source Enthusiast",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
        <Script
          id="baidu-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?6f1156cfb852da98a090132b2829f22a";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
