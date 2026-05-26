import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aryan-portfolio.vercel.app"),
  title: { default: "Aryan | Full-Stack Developer & Salesforce Professional", template: "%s | Aryan" },
  description: "Building scalable applications, cloud-native systems, and futuristic digital experiences.",
  keywords: ["Aryan", "Full-Stack Developer", "Java", "Salesforce", "MERN", "Spring Boot", "KIIT"],
  authors: [{ name: "Aryan" }],
  creator: "Aryan",
  openGraph: {
    type: "website", locale: "en_US", url: "/",
    siteName: "Aryan Portfolio",
    title: "Aryan | Full-Stack Developer & Salesforce Professional",
    description: "Building scalable applications, cloud-native systems, and futuristic digital experiences.",
    images: [{ url: "/assets/hero.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan | Full-Stack Developer & Salesforce Professional",
    description: "Building scalable applications, cloud-native systems, and futuristic digital experiences.",
    images: ["/assets/hero.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!self.crossOriginIsolated){self.SharedArrayBuffer=void 0}`,
          }}
        />
      </head>
      <body className="antialiased noise-overlay">{children}</body>
    </html>
  );
}
