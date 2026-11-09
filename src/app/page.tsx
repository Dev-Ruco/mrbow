"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, Play, X, Youtube } from "lucide-react";
import { musicLinks, upcomingShows } from "@/lib/content";

const concert = "/images/Mr%20bow%20hero.jpg";
const crowd = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1500&q=85";
const lights = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85";

function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const element=ref.current;
    if(!element)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){element.classList.add("is-visible");return;}
    const observer=new IntersectionObserver(([entry])=>{element.classList.toggle("is-visible",entry.isIntersecting);},{threshold:0.12,rootMargin:"0px 0px -6% 0px"});
    observer.observe(element);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}
const nav=[["Início","#inicio"],["Música","#musica"],["Ao vivo","#ao-vivo"],["Artista","#artista"],["Booking","#booking"]];
export default function Home(){
 const [open,setOpen]=useState(false);
 const [progress,setProgress]=useState(0);
 const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{
  let raf=0;
  const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max*100:0);setScrolled(window.scrollY>24);});};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
 },[]);
 useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";};},[open]);
 return <>
  <div className="reading-progress" style={{width:`${progress}%`}}/>
  <header className={`masthead ${scrolled?"masthead-scrolled":""} ${open?"masthead-menu-open":""}`}>
   <a className="brand" href="#inicio" onClick={()=>setOpen(false)} aria-label="Mr Bow — início">MR<span>BOW</span><b>®</b></a>
   <nav className="desktop-links" aria-label="Menu principal">{nav.slice(0,4).map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
   <a href="#booking" className="masthead-booking">BOOKING <ArrowUpRight size={17}/></a>
   <button className="mobile-trigger" type="button" aria-expanded={open} aria-label={open?"Fechar menu":"Abrir menu"} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
  </header>
  <div className={`mobile-overlay ${open?"shown":""}`} aria-hidden={!open}><nav aria-label="Menu móvel">{nav.map(([label,href],i)=><a key={href} href={href} onClick={()=>setOpen(false)}><span>0{i+1}</span>{label}<ArrowUpRight size={23}/></a>)}</nav><p>MÚSICA • IDENTIDADE • LEGADO</p></div>
  <main>
   <section className="hero" id="inicio">
    <div className="hero-photo" style={{backgroundImage:`url("${concert}")`}} aria-hidden="true"/>
    <div className="hero-grain" aria-hidden="true"/>
    <div className="hero-title-wrap hero-title-only">
     <h1 className="hero-title"><span className="hero-first">MR</span><span className="hero-second">BOW<span className="hero-period">.</span></span></h1>
    </div>
   </section>

   <section className="manifesto section-shell" id="musica">
    <div className="section-index"><span>01 / THE MUSIC</span><span>O UNIVERSO SONORO</span></div>
    <Reveal className="manifesto-heading"><h2>NÃO É SÓ<br/><em>MÚSICA.</em><br/>É O QUE<br/><span>FICA.</span></h2></Reveal>
    <div className="manifesto-bottom"><Reveal><p>Há canções que se ouvem. E há canções que se vivem. Descubra o universo musical de Mr Bow, onde cada melodia conta uma história.</p></Reveal><Reveal delay={120}><div className="listen-group"><span>OUÇA NAS PLATAFORMAS</span>{musicLinks.map((l)=><a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<ArrowUpRight size={19}/></a>)}</div></Reveal></div>
    <div className="manifesto-stamp" aria-hidden="true">SOUND<br/>/ 01</div>
   </section>

   <section className="cinema-panel" id="ao-vivo">
    <div className="cinema-image" style={{backgroundImage:`url("${crowd}")`}} aria-hidden="true"/>
    <div className="cinema-shade" aria-hidden="true"/>
    <div className="cinema-top"><span>02 / LIVE EXPERIENCE</span><span>THE STAGE IS HOME</span></div>
    <Reveal className="cinema-content"><span className="cinema-mini">ENERGIA QUE SE SENTE</span><h2>O PALCO<br/><em>É NOSSO.</em></h2><p>Milhares de vozes. Uma só emoção.<br/>Viva a intensidade de cada espectáculo.</p><a className="circle-link" href="#agenda">AGENDA DE ESPECTÁCULOS <ArrowUpRight size={20}/></a></Reveal>
    <span className="cinema-corner">MB / LIVE</span>
   </section>

   <section className="agenda section-shell" id="agenda">
    <div className="section-index"><span>03 / NEXT DATES</span><span>ENCONTRE-NOS AO VIVO</span></div>
    <Reveal><div className="agenda-head"><h2>PRÓXIMOS<br/><em>ENCONTROS.</em></h2><p>O próximo momento inesquecível pode estar mais perto do que imagina.</p></div></Reveal>
    {upcomingShows.length? <div className="dates">{upcomingShows.map(s=><div className="date-row" key={s.date+s.city}><strong>{s.date} <small>{s.month}</small></strong><span>{s.city}<small>{s.venue}</small></span>{s.ticketUrl?<a href={s.ticketUrl} target="_blank" rel="noopener noreferrer">BILHETES <ArrowUpRight size={20}/></a>:<span>EM BREVE</span>}</div>)}</div>:
    <Reveal><div className="agenda-empty"><span className="asterisk">✳</span><div><strong>NOVAS DATAS<br/>A CAMINHO.</strong><p>Consulte esta área para conhecer os próximos espectáculos oficialmente confirmados.</p></div><a href="#booking" aria-label="Solicitar espectáculo"><ArrowUpRight size={32}/></a></div></Reveal>}
   </section>

   <section className="artist-section" id="artista">
    <div className="artist-photo" style={{backgroundImage:`url("${lights}")`}} aria-label="Imagem ilustrativa de concerto" role="img"><span>THE ARTIST / 04</span></div>
    <div className="artist-copy"><span className="eyebrow">04 / THE MAN BEHIND THE MUSIC</span><Reveal><h2>A HISTÓRIA<br/>CONTINUA<span>.</span></h2></Reveal><Reveal delay={100}><p className="artist-lead">Da música que marca gerações à energia que une multidões.</p><p>Mr Bow representa uma identidade musical profundamente ligada a Moçambique, à emoção e ao público. Uma trajectória construída com autenticidade e visão.</p><div className="artist-sign">MR BOW <span>— ARTISTA</span></div></Reveal></div>
   </section>

   <section className="booking section-shell" id="booking">
    <div className="section-index"><span>05 / BOOKINGS</span><span>LET'S MAKE IT HAPPEN</span></div>
    <Reveal><span className="booking-label">O PRÓXIMO GRANDE MOMENTO COMEÇA AQUI.</span><h2>FAÇAMOS<br/><em>HISTÓRIA</em><span> JUNTOS.</span></h2><a className="booking-link" href="mailto:booking@mrbow.co.mz?subject=Pedido%20de%20contrata%C3%A7%C3%A3o%20-%20Mr%20Bow">SOLICITAR CONTRATAÇÃO <span><ArrowUpRight size={29}/></span></a></Reveal>
    <p className="booking-disclaimer">O endereço de contratação é provisório e será confirmado pela equipa antes da publicação definitiva.</p>
   </section>
  </main>
  <footer className="footer"><div className="footer-upper"><a className="brand" href="#inicio">MR<span>BOW</span><b>®</b></a><div className="footer-networks"><a href={musicLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube/></a><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram — ligação provisória"><Instagram/></a></div></div><div className="footer-lower"><span>© {new Date().getFullYear()} MR BOW. TODOS OS DIREITOS RESERVADOS.</span><span>MADE IN MOZAMBIQUE. FELT EVERYWHERE.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
 </>;
}
