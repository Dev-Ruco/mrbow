import type { Metadata } from "next";
import "./globals.css";
import CookiePreferences from "./components/CookiePreferences";
import { LocaleProvider } from "./components/LocaleProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://mrbow.co.mz"),
  title: { default: "Mr Bow | Site Oficial", template: "%s | Mr Bow" },
  description: "O universo oficial de Mr Bow. Música, vídeos, espectáculos, história e contratações.",
  openGraph: { type: "website", locale: "pt_MZ", siteName: "Mr Bow", title: "Mr Bow | Site Oficial", description: "Música. Identidade. Legado." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-MZ"><body><LocaleProvider>{children}<CookiePreferences/></LocaleProvider></body></html>;
}
