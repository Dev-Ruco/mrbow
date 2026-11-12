import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Italiana } from "next/font/google";
import "./globals.css";
import CookiePreferences from "./components/CookiePreferences";
import { LocaleProvider } from "./components/LocaleProvider";

// Fontes servidas pelo próprio Next.js: sem pedidos ao Google Fonts no navegador.
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-barlow-condensed",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});
const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-italiana",
});

const siteUrl = "https://mrbow.co.mz";
const description =
  "Site oficial de Mr. Bow, artista moçambicano. Conheça a sua história, música, videoclipes, espectáculos, entrevistas e contactos para contratação.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mr. Bow | Site Oficial — Música, Biografia e Espectáculos",
    template: "%s | Mr. Bow",
  },
  description,
  applicationName: "Mr. Bow — Site Oficial",
  icons: {
    icon: [{ url: "/images/Mr%20bow%20icon.jpg", type: "image/jpeg" }],
    shortcut: "/images/Mr%20bow%20icon.jpg",
    apple: "/images/Mr%20bow%20icon.jpg",
  },
  keywords: [
    "Mr. Bow",
    "Mr. Bow Moçambique",
    "Mr. Bow músico",
    "Mr. Bow biografia",
    "Mr. Bow músicas",
    "Mr. Bow espectáculos",
    "Mr. Bow contratação",
    "Salvador Pedro Maiaze",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    siteName: "Mr. Bow",
    url: siteUrl,
    title: "Mr. Bow | Site Oficial — Música, Biografia e Espectáculos",
    description,
    images: [
      {
        url: "/images/Mr%20bow%20previwm.jpg",
        alt: "Mr. Bow — imagem oficial de apresentação do artista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Bow | Site Oficial",
    description,
    images: ["/images/Mr%20bow%20previwm.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#artist`,
      name: "Mr. Bow",
      alternateName: "King Bow",
      birthName: "Salvador Pedro Maiaze",
      jobTitle: "Cantor e músico",
      description: "Artista musical moçambicano, natural de Manjacaze, Gaza.",
      url: siteUrl,
      image: `${siteUrl}/images/Mr%20bow%20hero.jpg`,
      mainEntityOfPage: siteUrl,
      sameAs: [
        "https://www.youtube.com/@mrbowofficial",
        "https://www.instagram.com/mrbowofficial/",
        "https://open.spotify.com/artist/3fodDFLQDXX8hpG8T1tDUx",
        "https://music.apple.com/artist/mr-bow/1534202763",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Mr. Bow — Site Oficial",
      description,
      inLanguage: "pt-MZ",
      about: { "@id": `${siteUrl}/#artist` },
      publisher: { "@id": `${siteUrl}/#artist` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-MZ" className={`${barlowCondensed.variable} ${dmSans.variable} ${italiana.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <LocaleProvider>
          {children}
          <CookiePreferences />
        </LocaleProvider>
      </body>
    </html>
  );
}
