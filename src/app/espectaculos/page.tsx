import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import { upcomingShows } from "@/lib/content";

export const metadata: Metadata = {
 title: "Espectáculos e Contratações de Mr Bow",
 description: "Agenda de espectáculos confirmados de Mr Bow e informações para solicitar a contratação do artista em casamentos, concertos e eventos corporativos.",
 alternates: { canonical: "/espectaculos" },
 openGraph: {
  title: "Espectáculos e Contratações — Mr Bow",
  description: "Agenda oficial e pedidos de contratação de Mr Bow.",
  url: "https://mrbow.co.mz/espectaculos",
  images: [{ url: "/images/Booking.jpg", alt: "Mr Bow — espectáculos e contratações" }],
 },
};

export default function EspectaculosPage() {
 return (
  <><SiteHeader/><main className="artist-archive music-library">
   <div className="music-library-intro">
    <div className="section-index"><span>MR BOW / AO VIVO</span><span>AGENDA & CONTRATAÇÕES</span></div>
    <div className="music-library-intro-row"><h1>ESPECTÁCULOS<br/><em>E EVENTOS.</em></h1><div><p>Agenda de apresentações e informações para contratar Mr Bow. Apenas datas confirmadas são publicadas.</p><nav className="music-library-jump" aria-label="Secções da página"><a href="#agenda-oficial">AGENDA ↓</a><a href="#contratacao">BOOKING ↓</a></nav></div></div>
   </div>
   <section className="archive-section" id="agenda-oficial">
    <div className="archive-section-heading"><div><span className="archive-eyebrow">01 / AGENDA</span><h2>PRÓXIMOS <em>ESPECTÁCULOS.</em></h2></div><p>Apenas datas e locais confirmados oficialmente são apresentados nesta página.</p></div>
    {upcomingShows.length ? <ul className="archive-release-list">{upcomingShows.map(show=><li key={show.date+show.city}><span>{show.date} {show.month}</span><strong>{show.city} — {show.venue}</strong>{show.ticketUrl ? <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">BILHETES ↗</a> : <small>A CONFIRMAR</small>}</li>)}</ul> : <div className="archive-empty-state"><h3>NOVAS DATAS<br/>A CAMINHO.</h3><p>De momento, não existem datas oficialmente confirmadas para divulgação. Consulte esta página para futuras actualizações.</p></div>}
   </section>
   <section className="archive-section archive-secondary" id="contratacao">
    <div className="archive-section-heading"><div><span className="archive-eyebrow">02 / CONTRATAÇÕES</span><h2>FAÇAMOS <em>HISTÓRIA.</em></h2></div><p>Concertos, casamentos, eventos corporativos e outras celebrações.</p></div>
    <p className="archive-booking-description">Para solicitar uma actuação, utilize o contacto de contratação apresentado na página inicial. A disponibilidade e as condições são confirmadas pela equipa responsável.</p>
    <Link href="/#booking" className="archive-hero-action">SOLICITAR CONTRATAÇÃO ↗</Link>
   </section>
   <footer className="archive-footer"><span>MR BOW / MÚSICA • IDENTIDADE • LEGADO</span><Link href="/">VOLTAR À PÁGINA INICIAL ↑</Link></footer>
  </main></>
 );
}
