"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Instagram, Menu, Music2, Play, X, Youtube } from "lucide-react";
import { artist, musicLinks, navigation, upcomingShows } from "@/lib/content";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <a href="#inicio" className="wordmark" aria-label="Mr Bow — início">MR<span>BOW</span><i>.</i></a>
        <nav aria-label="Navegação principal" className={menuOpen ? "site-nav open" : "site-nav"}>
          {navigation.map((item) => <a key={item.href} onClick={() => setMenuOpen(false)} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-booking" href="#contratacoes">BOOKING <ArrowUpRight size={16}/></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-image" role="img" aria-label="Luzes de palco em concerto — imagem provisória"/>
          <div className="hero-shade"/>
          <div className="hero-content container">
            <div className="hero-kicker"><span className="pulse"/> O UNIVERSO OFICIAL DE MR BOW</div>
            <h1>MR<br/><span>BOW</span><sup>®</sup></h1>
            <div className="hero-bottom">
              <div><span className="eyebrow hero-tagline">{artist.tagline}</span><p>O som de uma geração.<br/>A emoção de cada palco.</p></div>
              <div className="hero-actions"><a className="btn btn-light" href="#musica">EXPLORAR MÚSICA <ArrowUpRight size={17}/></a><a className="btn btn-outline" href="#agenda">VER AGENDA <ArrowRight size={17}/></a></div>
            </div>
          </div>
          <a className="scroll-prompt" href="#musica">DESCOBRIR <ArrowDownRight size={20}/></a>
          <div className="hero-number">01 / 05</div>
        </section>

        <section id="musica" className="music-section section-pad">
          <div className="container">
            <div className="section-top"><SectionHeading eyebrow="01 / THE SOUND" title="A MÚSICA" description="Canções que ficam. Histórias que se sentem."/><a className="text-link" href={musicLinks[0].href} target="_blank" rel="noopener noreferrer">OUVIR NO YOUTUBE <ArrowUpRight size={17}/></a></div>
            <div className="music-feature">
              <div className="music-art"><div className="vinyl-outline"/><Music2 size={70} strokeWidth={0.8}/><span>MR BOW<br/>THE MUSIC</span></div>
              <div className="music-copy"><span className="eyebrow">DISCOGRAFIA / EXPERIÊNCIA MUSICAL</span><h3>UMA VOZ.<br/><em>INÚMERAS</em><br/>HISTÓRIAS.</h3><p>Explore a música de Mr Bow nas principais plataformas digitais. Os lançamentos e as capas oficiais serão integrados nesta área.</p><div className="platform-links">{musicLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={15}/></a>)}</div></div>
            </div>
          </div>
        </section>

        <section id="agenda" className="shows-section section-pad">
          <div className="container"><div className="section-top"><SectionHeading eyebrow="02 / LIVE EXPERIENCE" title="NO PALCO" description="O próximo encontro começa aqui."/></div>
            {upcomingShows.length ? <div className="show-list">{upcomingShows.map(show => <div className="show-row" key={show.date + show.city}><div className="show-date">{show.date}<small>{show.month}</small></div><div className="show-location"><strong>{show.city}</strong><span>{show.venue}</span></div>{show.ticketUrl ? <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">BILHETES <ArrowUpRight size={16}/></a> : <span>EM BREVE</span>}</div>)}</div> :
            <div className="agenda-empty"><div className="agenda-symbol">✳</div><div><span className="eyebrow">AGENDA OFICIAL</span><h3>NOVAS DATAS<br/>EM BREVE.</h3><p>Os próximos espectáculos serão anunciados aqui, depois de confirmados pela equipa.</p></div><a href="#contratacoes" className="text-link">SOLICITAR ESPECTÁCULO <ArrowUpRight size={18}/></a></div>}
          </div>
        </section>

        <section id="biografia" className="about-section">
          <div className="about-visual"><div className="about-visual-overlay"><span>THE ARTIST</span><strong>MB.</strong></div></div>
          <div className="about-content"><span className="eyebrow">03 / BEHIND THE MUSIC</span><h2>MAIS DO<br/>QUE <em>MÚSICA.</em></h2><p className="about-lead">{artist.introduction}</p><p>{artist.bio}</p><a href="#media" className="btn btn-dark">CONHECER O UNIVERSO <ArrowUpRight size={18}/></a><span className="about-signature">Mr Bow</span></div>
        </section>

        <section id="media" className="media-section section-pad"><div className="container"><div className="section-top"><SectionHeading eyebrow="04 / THE MOMENTS" title="EM IMAGENS" description="A energia. As pessoas. Os momentos que ficam."/></div>
          <div className="media-grid">
            <a className="media-tile media-tile-main" href={musicLinks[0].href} target="_blank" rel="noopener noreferrer"><span className="media-photo media-photo-one"/><span className="media-cover"><span className="media-category">VÍDEOS & ACTUAÇÕES</span><strong>A MAGIA<br/>DO PALCO</strong><span className="round-icon"><Play fill="currentColor" size={19}/></span></span></a>
            <a className="media-tile" href={musicLinks[0].href} target="_blank" rel="noopener noreferrer"><span className="media-photo media-photo-two"/><span className="media-cover"><span className="media-category">MOMENTOS</span><strong>ALÉM<br/>DA MÚSICA</strong><span className="round-icon"><ArrowUpRight size={20}/></span></span></a>
          </div><p className="media-note">Galeria ilustrativa. As fotografias oficiais do artista substituirão estas imagens de referência.</p></div></section>

        <section id="contratacoes" className="booking-section"><div className="container booking-inner"><span className="eyebrow">05 / BOOKINGS & MANAGEMENT</span><h2>VAMOS CRIAR<br/><em>UM MOMENTO</em><br/>INESQUECÍVEL.</h2><p>Concertos, festivais e eventos privados. Envie uma proposta à equipa de gestão de Mr Bow.</p><a className="btn btn-light" href="mailto:booking@mrbow.co.mz?subject=Pedido%20de%20contrata%C3%A7%C3%A3o%20-%20Mr%20Bow">SOLICITAR CONTRATAÇÃO <ArrowUpRight size={19}/></a><small>Contacto provisório: confirmar endereço oficial antes da publicação.</small></div><span className="booking-decor">BOW</span></section>
      </main>

      <footer className="footer"><div className="container footer-top"><a href="#inicio" className="wordmark">MR<span>BOW</span><i>.</i></a><span>MÚSICA. IDENTIDADE. LEGADO.</span><div className="footer-social"><a href={musicLinks[0].href} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><Youtube size={20}/></a><a href="https://www.instagram.com/" aria-label="Instagram — endereço a confirmar" target="_blank" rel="noopener noreferrer"><Instagram size={20}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} MR BOW. TODOS OS DIREITOS RESERVADOS.</span><span>MOÇAMBIQUE · PARA O MUNDO</span></div></footer>
    </>
  );
}
