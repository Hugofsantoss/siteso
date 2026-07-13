import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { siteConfig, contactInfo } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: siteConfig.legalName,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/brand/logo.png`,
  image: `${siteConfig.url}/images/hero/douro-fachada.jpg`,
  description: siteConfig.description,
  telephone: `+${contactInfo.phoneRaw}`,
  email: contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address.street,
    addressLocality: contactInfo.address.city,
    addressRegion: contactInfo.address.state,
    postalCode: contactInfo.address.zip,
    addressCountry: "BR",
  },
  areaServed: "Belo Horizonte, MG",
  sameAs: [siteConfig.instagram],
};

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero/douro-fachada.jpg",
        width: 2400,
        height: 1600,
        alt: "Fachada do Edifício D'Ouro, empreendimento da Sólido Construções Prediais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/hero/douro-fachada.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-graphite-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
