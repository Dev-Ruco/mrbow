"use client";

import { ArrowLeft, ArrowUpRight, Download, Smartphone } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { useLocale } from "../components/LocaleProvider";

const appLinks = [
  { label: "Android", href: process.env.NEXT_PUBLIC_MRBOW_APP_ANDROID_URL },
  { label: "iOS", href: process.env.NEXT_PUBLIC_MRBOW_APP_IOS_URL },
  { label: "Web App", href: process.env.NEXT_PUBLIC_MRBOW_APP_WEB_URL },
].filter((item): item is {label:string;href:string} => Boolean(item.href && /^https:\/\//.test(item.href)));

const copy = {
  pt: {
    eyebrow:"MR. BOW / APLICAÇÃO OFICIAL",
    title:"A APP DE MR. BOW",
    description:"Acompanhe a música, os conteúdos e as novidades de Mr. Bow num só lugar.",
    available:"Escolha onde pretende abrir ou instalar a aplicação.",
    pending:"A aplicação está em preparação. As ligações de instalação serão disponibilizadas nesta página após o lançamento oficial.",
    back:"VOLTAR AO SITE",
  },
  en: {
    eyebrow:"MR. BOW / OFFICIAL APP",
    title:"THE MR. BOW APP",
    description:"Discover Mr. Bow’s music, content and latest updates in one place.",
    available:"Choose where you would like to open or install the app.",
    pending:"The app is in development. Official installation links will appear here once it launches.",
    back:"BACK TO WEBSITE",
  },
  ts: {
    eyebrow:"MR. BOW / APP YA XIMFUMO",
    title:"APP YA MR. BOW",
    description:"Landzelela tinsimu, mahungu ni swilo leswintshwa swa Mr. Bow endhawini yin’we.",
    available:"Hlawula laha u lavaka ku pfula kumbe ku nghenisa app kona.",
    pending:"App ya ha lunghisiwa. Tilinki ta ximfumo to yi nghenisa ti ta kumeka laha loko yi humesiwa.",
    back:"TLHELELA EKA WEBUSAYITI",
  },
};

export default function AppDownloadPage() {
  const {locale} = useLocale();
  const t = copy[locale];
  return (
    <>
      <SiteHeader />
      <main className="app-download-page">
        <section className="app-download-panel" aria-labelledby="app-download-title">
          <span className="app-download-eyebrow"><Smartphone size={17} aria-hidden="true" />{t.eyebrow}</span>
          <h1 id="app-download-title">{t.title}</h1>
          <p className="app-download-lead">{t.description}</p>
          {appLinks.length ? (
            <>
              <p className="app-download-note">{t.available}</p>
              <div className="app-download-actions">
                {appLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"><Download size={18} aria-hidden="true" /> {link.label} <ArrowUpRight size={17} aria-hidden="true" /></a>)}
              </div>
            </>
          ) : <p className="app-download-note" role="status">{t.pending}</p>}
          <a className="app-download-back" href="/"><ArrowLeft size={18} aria-hidden="true" />{t.back}</a>
        </section>
      </main>
    </>
  );
}
