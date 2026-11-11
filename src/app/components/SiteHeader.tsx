"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LocaleProvider";

type SiteHeaderProps = {
  home?: boolean;
  scrolled?: boolean;
  menuOpen?: boolean;
  onMenuChange?: (value: boolean) => void;
  menuRef?: React.Ref<HTMLDivElement>;
  menuButtonRef?: React.Ref<HTMLButtonElement>;
};

const discographyLinks = [
  ["Álbuns", "/discografia#albuns"],
  ["Mais Populares", "/discografia#populares"],
  ["Videoclipes", "/discografia#videoclipes"],
  ["Concertos", "/discografia#concertos"],
] as const;

export default function SiteHeader({
  home = false,
  scrolled = false,
  menuOpen,
  onMenuChange,
  menuRef,
  menuButtonRef,
}: SiteHeaderProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const open = menuOpen ?? localOpen;
  const setOpen = onMenuChange ?? setLocalOpen;
  const close = () => setOpen(false);

  const homeHref = home ? "#inicio" : "/";
  const awardsHref = home ? "#premios" : "/#premios";
  const interviewsHref = home ? "#entrevistas" : "/#entrevistas";
  const eventsHref = home ? "#agenda" : "/#agenda";
  const bookingHref = home ? "#booking" : "/#booking";

  const mobileLinks = [
    ["Início", homeHref],
    ["História", "/historia"],
    ["Discografia", "/discografia"],
    ...discographyLinks,
    ["Entrevistas", interviewsHref],
    ["Prémios", awardsHref],
    ["Agenda de espectáculos", eventsHref],
    ["Contratações", bookingHref],
  ] as const;

  return (
    <>
      <header className={`masthead ${scrolled ? "masthead-scrolled" : ""} ${open ? "masthead-menu-open" : ""} ${home ? "" : "masthead-inner-page"}`}>
        <a className="brand" href={homeHref} onClick={close} aria-label="Mr. Bow — página inicial">MR.<span>BOW</span><b>®</b></a>
        <nav className="desktop-links" aria-label="Menu principal">
          <a href={homeHref} onClick={close}>Início</a>
          <a href="/historia" onClick={close}>História</a>
          <div className="masthead-dropdown">
            <a href="/discografia" className="masthead-dropdown-main" onClick={close} aria-label="Discografia completa">Discografia <ChevronDown size={13} aria-hidden="true"/></a>
            <div className="masthead-submenu" aria-label="Explorar discografia">
              {discographyLinks.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
            </div>
          </div>
          <a href={interviewsHref} onClick={close}>Entrevistas</a>
          <a href={awardsHref} onClick={close}>Prémios</a>
          <a href={eventsHref} onClick={close}>Espectáculos</a>
        </nav>
        <LanguageSwitcher/>
        <a href={bookingHref} className="masthead-booking" onClick={close}>BOOKING <ArrowUpRight size={17}/></a>
        <button ref={menuButtonRef} className="mobile-trigger" type="button" aria-controls="mobile-site-menu" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          {open ? <X/> : <Menu/>}
        </button>
      </header>
      <div id="mobile-site-menu" ref={menuRef} className={`mobile-overlay ${open ? "shown" : ""}`} aria-hidden={!open}>
        <nav aria-label="Menu móvel">
          {mobileLinks.map(([label, href], i) => (
            <a key={href} className={discographyLinks.some(([, sectionHref]) => sectionHref === href) ? "mobile-menu-subitem" : ""} tabIndex={open ? 0 : -1} href={href} onClick={close}>
              <span>{String(i+1).padStart(2, "0")}</span>{label}<ArrowUpRight size={20}/>
            </a>
          ))}
        </nav>
        <p>MÚSICA • IDENTIDADE • LEGADO</p>
      </div>
    </>
  );
}
