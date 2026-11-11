import type { Metadata } from "next";
import Link from "next/link";
import { upcomingShows } from "@/lib/content";

export const metadata: Metadata = {
 title: "Espectáculos e Contratações de Mr Bow",
 description: "Consulte os próximos espectáculos confirmados de Mr Bow e encontre informações para solicitar a contratação do artista em eventos.",
 alternates: { canonical: "/espectaculos" },
 openGraph: { title: "Espectáculos e Contratações de Mr Bow", url: "https://mrbow.co.mz/espectaculos" },
};

export default function EspectaculosPage() {
 return <main className="legal-page">
  <header className="legal-top"><Link href="/">MR<span>BOW</span>®</Link><Link href="/">← VOLTAR AO SITE</Link></header>
  <div className="legal-hero"><span>MR BOW / AO VIVO</span><h1>ESPECTÁCULOS</h1><p>Agenda e informações para contratações.</p></div>
  <article className="legal-content">
   <h2>Próximas apresentações</h2>
   {upcomingShows.length ? <ul>{upcomingShows.map(show=><li key={show.date+show.city}>{show.date} {show.month} — {show.city}, {show.venue}</li>)}</ul> : <p>De momento, não há datas de espectáculos oficialmente confirmadas para divulgação neste site. Consulte esta página para futuras actualizações.</p>}
   <h2>Contratar Mr Bow</h2>
   <p>Para pedidos de actuação em casamentos, eventos corporativos ou concertos, utilize o contacto de contratação disponibilizado na página principal. A contratação depende da confirmação da equipa responsável.</p>
   <p><Link href="/#booking">Solicitar informações sobre contratação ↗</Link></p>
   <p className="legal-back"><Link href="/">← REGRESSAR AO SITE</Link></p>
  </article>
 </main>;
}
