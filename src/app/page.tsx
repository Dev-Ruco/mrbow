"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Disc3, Instagram, Menu, Play, X, Youtube } from "lucide-react";
import { musicLinks, upcomingShows } from "@/lib/content";

const concert = "/images/Mr%20bow%20hero.jpg";
const crowd = "/images/setion%203.jpg";
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
const nav=[["Início","#inicio"],["Artista","#artista"],["Música","#musica"],["Ao vivo","#ao-vivo"],["Booking","#booking"]];
export default function Home(){
 const [open,setOpen]=useState(false);
 const [progress,setProgress]=useState(0);
 const [scrolled,setScrolled]=useState(false);
 const albumsRail=useRef<HTMLDivElement>(null);
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

   <section className="artist-section artist-section-editorial" id="artista">
    <div className="artist-copy">
     <span className="eyebrow">04 / THE MAN BEHIND THE MUSIC</span>
     <Reveal><h2>A HISTÓRIA<br/>CONTINUA<span>.</span></h2></Reveal>
     <Reveal delay={100}><p className="artist-lead">Da música que marca gerações à energia que une multidões.</p><p>Mr Bow representa uma identidade musical profundamente ligada a Moçambique, à emoção e ao público. Uma trajectória construída com autenticidade e visão.</p><div className="artist-sign">MR BOW <span>— ARTISTA</span></div></Reveal>
    </div>
    <div className="artist-portrait-stage">
     <img src="/images/mr-bow-artist-cutout.webp" alt="Mr Bow com fato preto, de óculos escuros" className="artist-cutout" loading="lazy" onError={(event) => {event.currentTarget.style.visibility="hidden";}} />
    </div>
   </section>

   <section className="music-showcase" id="musica">
    <div className="music-showcase-inner">
     <div className="music-meta"><span>01 / THE MUSIC</span><span className="music-meta-right">MR BOW — DISCOGRAFIA & VÍDEOS</span></div>
     <Reveal className="music-heading"><div><span className="music-eyebrow"><Disc3 size={16}/> O SOM DE MR BOW</span><h2>OUVE.<br/><em>SENTE.</em><br/>VIVE.</h2></div><p>As canções que nos aproximam. Os vídeos que transformam cada melodia numa história.</p></Reveal>
     <div className="release-topline"><div><span className="release-small">01 — 03 / EM DESTAQUE</span><h3>ÁLBUNS <i>SELECCIONADOS</i></h3></div><div className="release-arrows"><button type="button" aria-label="Álbum anterior" onClick={()=>albumsRail.current?.scrollBy({left:-340,behavior:"smooth"})}><ChevronLeft size={22}/></button><button type="button" aria-label="Álbum seguinte" onClick={()=>albumsRail.current?.scrollBy({left:340,behavior:"smooth"})}><ChevronRight size={22}/></button></div></div>
     <div className="albums-rail" ref={albumsRail}>
      {[
       {number:"01",image:"/images/Album%201.jpeg",title:"ÁLBUM 01",note:"CAPA OFICIAL"},
       {number:"02",image:"/images/Album%202.jpg",title:"ÁLBUM 02",note:"CAPA OFICIAL"},
       {number:"03",image:"/images/Album%203.jpg",title:"ÁLBUM 03",note:"CAPA OFICIAL"}
      ].map((album,index)=><Reveal className="album-card" key={album.number} delay={index*105}>
        <a className="album-artwork" href="https://open.spotify.com/search/Mr%20Bow" target="_blank" rel="noopener noreferrer" aria-label={`Procurar ${album.title} de Mr Bow no Spotify`}>
          <img src={album.image} alt={`Capa enviada para ${album.title} de Mr Bow`} loading="lazy"/>
          <span className="album-index">{album.number} / 03</span>
          <span className="album-play"><Play fill="currentColor" size={23}/></span>
        </a>
        <div className="album-card-info"><div><span>{album.note}</span><h4>{album.title}</h4></div><a href="https://open.spotify.com/search/Mr%20Bow" target="_blank" rel="noopener noreferrer">OUVIR NO SPOTIFY <ArrowUpRight size={18}/></a></div>
       </Reveal>)}
     </div>
     <Reveal className="music-bottom-strip"><span>O UNIVERSO MUSICAL DE MR BOW</span><a href="https://open.spotify.com/search/Mr%20Bow" target="_blank" rel="noopener noreferrer">EXPLORAR NO SPOTIFY <ArrowUpRight size={18}/></a></Reveal>
    </div>
   </section>

   <section className="music-showcase music-videos-section" id="videos">
    <div className="music-showcase-inner">
     <div className="video-showcase">
      <Reveal className="videos-heading"><div><span className="release-small">PARA VER E SENTIR</span><h3>VISUAL <em>STORIES.</em></h3></div><p>Videoclipes, energia e identidade em movimento. Descobre as mais recentes histórias visuais de Mr Bow.</p></Reveal>
      <div className="videos-grid">
       <Reveal className="video-feature">
        <a className="video-cover video-cover-one" href="https://www.youtube.com/results?search_query=Mr+Bow+I%27ll+Be+Waiting+Official+Music+Video" target="_blank" rel="noopener noreferrer" aria-label="Procurar videoclip I'll Be Waiting no YouTube"><span className="video-big-play"><Play fill="currentColor" size={26}/></span><span className="video-watermark">01 / MUSIC VIDEO</span></a>
        <div className="video-detail"><span>VIDEOCLIPE EM DESTAQUE</span><a href="https://www.youtube.com/results?search_query=Mr+Bow+I%27ll+Be+Waiting+Official+Music+Video" target="_blank" rel="noopener noreferrer">I'LL BE WAITING <ArrowUpRight size={23}/></a></div>
       </Reveal>
       <Reveal className="video-feature" delay={140}>
        <a className="video-cover video-cover-two" href="https://www.youtube.com/results?search_query=Mr+Bow+Mocambique+Anima+Awilo+Longomba+Official+Music+Video" target="_blank" rel="noopener noreferrer" aria-label="Procurar videoclip Moçambique Anima no YouTube"><span className="video-big-play"><Play fill="currentColor" size={26}/></span><span className="video-watermark">02 / MUSIC VIDEO</span></a>
        <div className="video-detail"><span>VIDEOCLIPE EM DESTAQUE</span><a href="https://www.youtube.com/results?search_query=Mr+Bow+Mocambique+Anima+Awilo+Longomba+Official+Music+Video" target="_blank" rel="noopener noreferrer">MOÇAMBIQUE ANIMA <ArrowUpRight size={23}/></a></div>
       </Reveal>
      </div>
      <Reveal className="video-footer"><span>AS IMAGENS DOS VÍDEOS SÃO FOTOGRAFIAS ILUSTRATIVAS DO ARTISTA.</span><a href="https://www.youtube.com/@mrbowofficial/videos" target="_blank" rel="noopener noreferrer">VER TODOS OS VÍDEOS <ArrowUpRight size={19}/></a></Reveal>
     </div>
    </div>
   </section>

   <section className="cinema-panel" id="ao-vivo">
    <div className="cinema-image" style={{backgroundImage:`url("${crowd}")`}} aria-hidden="true"/>
    <div className="cinema-shade" aria-hidden="true"/>
    
    <Reveal className="cinema-content"><span className="cinema-mini">DOS GRANDES PALCOS AOS MOMENTOS MAIS ESPECIAIS</span><h2>O PALCO<br/><em>É NOSSO.</em></h2><p>Dos grandes concertos aos casamentos que marcam uma vida.<br/>Mr Bow transforma cada celebração num momento inesquecível.</p><a className="circle-link" href="#agenda">AGENDA DE ESPECTÁCULOS <ArrowUpRight size={20}/></a></Reveal>
    <span className="cinema-corner">MB / LIVE</span>
   </section>

   <section className="agenda section-shell" id="agenda">
    <div className="section-index"><span>03 / NEXT DATES</span><span>ENCONTRE-NOS AO VIVO</span></div>
    <Reveal><div className="agenda-head"><h2>PRÓXIMOS<br/><em>ENCONTROS.</em></h2><p>O próximo momento inesquecível pode estar mais perto do que imagina.</p></div></Reveal>
    {upcomingShows.length? <div className="dates">{upcomingShows.map(s=><div className="date-row" key={s.date+s.city}><strong>{s.date} <small>{s.month}</small></strong><span>{s.city}<small>{s.venue}</small></span>{s.ticketUrl?<a href={s.ticketUrl} target="_blank" rel="noopener noreferrer">BILHETES <ArrowUpRight size={20}/></a>:<span>EM BREVE</span>}</div>)}</div>:
    <Reveal><div className="agenda-empty"><span className="asterisk">✳</span><div><strong>NOVAS DATAS<br/>A CAMINHO.</strong><p>Consulte esta área para conhecer os próximos espectáculos oficialmente confirmados.</p></div><a href="#booking" aria-label="Solicitar espectáculo"><ArrowUpRight size={32}/></a></div></Reveal>}
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
