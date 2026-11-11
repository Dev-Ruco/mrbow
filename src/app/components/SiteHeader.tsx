"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LocaleProvider";

const navigation = [
  ["Início", "/"],
  ["Artista", "/historia"],
  ["Discografia", "/discografia"],
  ["Vídeos", "/discografia#videoclipes"],
  ["Espectáculos", "/#agenda"],
] as const;
const homeNavigation = [
  ["Início", "#inicio"],
  ["Artista", "#artista"],
  ["Discografia", "/discografia"],
  ["Vídeos", "/discografia#videoclipes"],
  ["Espectáculos", "#agenda"],
] as const;

const mobileNavigation = [
  ...navigation,
  ["Entrevistas", "/discografia#entrevistas"],
  ["Concertos", "/discografia#concertos"],
  ["Booking", "/#booking"],
] as const;

type SiteHeaderProps = {
  home?: boolean;
  scrolled?: boolean;
  menuOpen?: boolean;
  onMenuChange?: (value: boolean) => void;
  menuRef?: React.Ref<HTMLDivElement>;
  menuButtonRef?: React.Ref<HTMLButtonElement>;
};

export default function SiteHeader({
  home = false, scrolled = false, menuOpen, onMenuChange,
  menuRef, menuButtonRef,
}: SiteHeaderProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const open = menuOpen ?? localOpen;
  const setOpen = onMenuChange ?? setLocalOpen;
  const close = () => setOpen(false);
  const links = home ? homeNavigation : navigation;
  const mobileLinks = home ? [...homeNavigation, ["Entrevistas", "/discografia#entrevistas"], ["Concertos", "/discografia#concertos"], ["Booking", "#booking"]] : mobileNavigation;
  return (
    <>
      <header className={`masthead ${scrolled ? "masthead-scrolled" : ""} ${open ? "masthead-menu-open" : ""} ${home ? "" : "masthead-inner-page"}`}>
        <a className="brand" href="/" onClick={close} aria-label="Mr Bow — início">MR<span>BOW</span><b>®</b></a>
        <nav className="desktop-links" aria-label="Menu principal">
          {links.slice(0, 4).map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        </nav>
        <LanguageSwitcher/>
        <a href="/#booking" className="masthead-booking">BOOKING <ArrowUpRight size={17}/></a>
        <button ref={menuButtonRef} className="mobile-trigger" type="button" aria-controls="mobile-site-menu" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          {open ? <X/> : <Menu/>}
        </button>
      </header>
      <div id="mobile-site-menu" ref={menuRef} className={`mobile-overlay ${open ? "shown" : ""}`} aria-hidden={!open}>
        <nav aria-label="Menu móvel">
          {mobileLinks.map(([label, href], i) => <a key={href} tabIndex={open ? 0 : -1} href={href} onClick={close}><span>{String(i+1).padStart(2, "0")}</span>{label}<ArrowUpRight size={20}/></a>)}
        </nav>
        <a className="mobile-booking-cta" href="/#booking" tabIndex={open ? 0 : -1} onClick={close}>CONTRATAR MR BOW <ArrowUpRight size={22}/></a>
        <p>MÚSICA • IDENTIDADE • LEGADO</p>
      </div>
    </>
  );
}
