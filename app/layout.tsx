import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/layout/layout-content";
import { getSiteConfig } from '@/lib/config'
import { getServices, getRegions, getPages } from '@/lib/content';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
  preload: false,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  
  return {
    metadataBase: new URL(`https://${config.site.domain}`),
    title: {
      default: config.site.name,
      template: `%s | ${config.site.name}`,
    },
    description: config.seo.metaDescription,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      siteName: config.site.name,
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@cayirovawebtasarim',
      creator: '@cayirovawebtasarim',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const config = await getSiteConfig()
  const services = await getServices()
  const regions = await getRegions()
  const pages = await getPages()

  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#171717" />
        
        {/* Google Search Console Verification */}
        {config.searchConsole?.verificationCode && (
          <meta name="google-site-verification" content={config.searchConsole.verificationCode} />
        )}
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics - 10 saniye sonra yükle */}
        {(gaId || config.analytics?.googleAnalytics) && (
          <Script id="google-analytics-delayed" strategy="lazyOnload">
            {`
              setTimeout(function() {
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=${config.analytics?.googleAnalytics || gaId}';
                document.head.appendChild(script);
                
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.analytics?.googleAnalytics || gaId}');
              }, 10000);
            `}
          </Script>
        )}
        
        <LayoutContent config={config} services={services} regions={regions} pages={pages}>
          {children}
        </LayoutContent>
      </body>
    </html>
  )
}
