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
    <div className="artist-portrait-stage artist-archive-stage">
     <div className="artist-evolution-photos">
      <figure className="artist-archive-frame">
       <img src="/images/Mr%20bow%20old%20pinrure.jpg" alt="Mr Bow nos primeiros anos da sua carreira" className="artist-archive-photo" loading="lazy" />
       <figcaption>MR BOW <span>— OS PRIMEIROS ANOS</span></figcaption>
      </figure>
      <figure className="artist-now-frame">
       <div className="artist-now-portrait"><img src="/images/Mr%20bow%2003.jpg" alt="Fotografia mais recente de Mr Bow" loading="lazy" /></div>
       <figcaption>MR BOW <span>— HOJE</span></figcaption>
      </figure>
     </div>
    </div>
    <div className="artist-copy">
     <span className="eyebrow">04 / THE MAN BEHIND THE MUSIC</span>
     <Reveal><h2>UMA HISTÓRIA<br/>ALÉM DOS<br/>PALCOS<span>.</span></h2></Reveal>
     <Reveal delay={100}>
      <div className="artist-biography">
       <p>Antes de se tornar Mr. Bow, Salvador Pedro Maiaze era um jovem de Manjacaze, na província de Gaza, com uma paixão pela música e a determinação de construir o seu próprio caminho.</p>
       <p>Deixou a terra natal à procura de oportunidades e, em Maputo, conciliou diferentes trabalhos com o sonho de viver da música. Chegou a vender produtos no mercado para financiar as suas primeiras gravações, num percurso marcado por desafios, sacrifícios e decisões que moldaram a sua trajectória.</p>
       <p>Com o tempo, encontrou na sua identidade cultural uma das maiores forças da sua expressão artística, transformando as raízes moçambicanas numa assinatura musical reconhecida dentro e fora do País.</p>
       <p>Hoje, para além do artista, existe um homem cuja história também se constrói na família, no empreendedorismo e na vontade de abrir caminhos para outros.</p>
       <p className="artist-conclusion">Do jovem Salvador ao King Bow, há uma história que vai muito além da música.</p>
       <a className="artist-story-button" href="/historia">CONHECER A HISTÓRIA COMPLETA <ArrowUpRight size={19}/></a>
      </div>
     </Reveal>
    </div>
   </section>

   <section className="music-showcase" id="musica">
    <div className="music-showcase-inner">
     <div className="music-meta"><span>01 / THE MUSIC</span><span className="music-meta-right">MR BOW — DISCOGRAFIA & VÍDEOS</span></div>
     <div className="music-hero-composition">
      <Reveal className="music-heading"><div><span className="music-eyebrow"><Disc3 size={16}/> O SOM DE MR BOW</span><h2>OUVE.<br/><em>SENTE.</em><br/>VIVE.</h2></div><p>As canções que nos aproximam. A emoção que se transforma em memória colectiva.</p></Reveal>
      <div className="music-mosaic" aria-label="Galeria de fotografias dos espectáculos de Mr Bow">
       {[
        {image:"/images/01%20%3A%20PU%CC%81BLICO%20EM%20E%CC%82XTASE.jpeg",label:"01 / PÚBLICO EM ÊXTASE",name:"Público a vibrar",className:"music-mosaic-crowd"},
        {image:"/images/02%20%3A%20EM%20PALCO.jpeg",label:"02 / EM PALCO",name:"Actuação ao vivo",className:"music-mosaic-stage"},
        {image:"/images/03%20%3A%20A%20ENERGIA.jpeg",label:"03 / A ENERGIA",name:"Fãs a celebrar",className:"music-mosaic-fans"},
        {image:"/images/04%20_%20ATMOSFERA_Easy-Resize.com.jpg",label:"04 / ATMOSFERA",name:"Ambiente de espectáculo",className:"music-mosaic-atmosphere"}
       ].map((photo,i)=><Reveal key={photo.label} className={`music-mosaic-cell ${photo.className}`} delay={i*95}>
        <img src={photo.image} alt={photo.name+" nos espectáculos de Mr Bow"} loading="lazy" />
        <span className="music-mosaic-label">{photo.label}</span>
       </Reveal>)}
      </div>
     </div>
     <div className="release-topline"><div><span className="release-small">DISCOGRAFIA / MR BOW</span><h3>DISCOGRAFIA <i>DE MR BOW</i></h3></div><div className="release-arrows"><button type="button" aria-label="Álbum anterior" onClick={()=>albumsRail.current?.scrollBy({left:-340,behavior:"smooth"})}><ChevronLeft size={22}/></button><button type="button" aria-label="Álbum seguinte" onClick={()=>albumsRail.current?.scrollBy({left:340,behavior:"smooth"})}><ChevronRight size={22}/></button></div></div>
     <div className="albums-rail" ref={albumsRail}>
      {[
       {number:"01",image:"/images/Album%201.jpeg",title:"MR ROMANTIC",note:"CAPA OFICIAL"},
       {number:"02",image:"/images/Album%202.jpg",title:"STORY OF MY LIFE",note:"CAPA OFICIAL"},
       {number:"03",image:"/images/Album%203.jpg",title:"STRONG SHANGANE",note:"CAPA OFICIAL"}
      ].map((album,index)=><Reveal className="album-card" key={album.number} delay={index*105}>
        <a className="album-artwork" href="https://open.spotify.com/search/Mr%20Bow" target="_blank" rel="noopener noreferrer" aria-label={`Procurar ${album.title} de Mr Bow no Spotify`}>
          <img src={album.image} alt={`Capa enviada para ${album.title} de Mr Bow`} loading="lazy"/>
          <span className="album-index">{album.number}</span>
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
      <div className="videos-grid videos-grid-three">
       {[
        {id:"gUj6XUuaNfw",number:"01",kind:"VIDEOCLIPE PRINCIPAL"},
        {id:"_crVajIlmYk",number:"02",kind:"VIDEOCLIPE OFICIAL"},
        {id:"1vr_ZwnxCgg",number:"03",kind:"VIDEOCLIPE OFICIAL"}
       ].map((video,index)=><Reveal className={`video-feature video-feature-${video.number}`} key={video.id} delay={index*100}>
        <a className="video-cover video-cover-direct" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Ver videoclip ${video.number} de Mr Bow no YouTube`}>
         <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={`Miniatura oficial do videoclip ${video.number} de Mr Bow`} loading="lazy" />
         <span className="video-big-play"><Play fill="currentColor" size={26}/></span>
         <span className="video-watermark">{video.number} / MUSIC VIDEO</span>
        </a>
        <div className="video-detail"><span>{video.kind}</span><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">VER VIDEOCLIPE {video.number} <ArrowUpRight size={23}/></a></div>
       </Reveal>)}
      </div>
      <Reveal className="video-footer"><span>TRÊS VIDEOCLIPES DE MR BOW · VER NO YOUTUBE.</span><a href="https://www.youtube.com/@mrbowofficial/videos" target="_blank" rel="noopener noreferrer">VER TODOS OS VÍDEOS <ArrowUpRight size={19}/></a></Reveal>
     </div>
    </div>
   </section>

   <section className="awards-section" id="premios">
    <div className="awards-inner">
     <div className="awards-eyebrow"><span>PRÉMIOS & DISTINÇÕES</span><span>AWARDS & RECOGNITION</span></div>
     <Reveal className="awards-heading"><div><span className="awards-kicker">O RECONHECIMENTO DE UMA TRAJECTÓRIA</span><h2>UMA CARREIRA.<br/><em>UM LEGADO.</em></h2></div><p>Canções que conquistaram o público e distinções que marcaram diferentes momentos da carreira de Mr Bow.</p></Reveal>
     <div className="awards-feature">
      <Reveal className="awards-stat"><strong>05<span>×</span></strong><p>Prémios de música popular<br/>no Ngoma Moçambique</p><small>2011 — 2016</small></Reveal>
      <div className="awards-timeline">
       {[
        {year:"2011",award:"NGOMA MOÇAMBIQUE",category:"Música Popular",song:"Nita ti Dlhaya"},
        {year:"2013",award:"NGOMA MOÇAMBIQUE",category:"Música Popular",song:"Male Ya Matchangana"},
        {year:"2014",award:"NGOMA MOÇAMBIQUE",category:"Música Popular",song:"Massnguitane"},
        {year:"2015",award:"NGOMA MOÇAMBIQUE",category:"Música Popular",song:"Number One"},
        {year:"2016",award:"NGOMA MOÇAMBIQUE",category:"Música Popular",song:"Nitafa na wena"},
       ].map((award,i)=><Reveal className="awards-row" key={award.year} delay={i*50}>
        <span className="awards-year">{award.year}</span>
        <div><small>{award.award}</small><strong>{award.category}</strong><span>{award.song}</span></div>
        <span className="awards-cross" aria-hidden="true">✳</span>
       </Reveal>)}
      </div>
     </div>
     <Reveal className="awards-additional"><span>MOZAMBIQUE MUSIC AWARDS / 2015</span><div><strong>Melhor Artista Masculino</strong><strong>Música Mais Popular</strong></div><a href="https://www.mmo.co.mz/veja-a-lista-dos-vencedores-do-mma-2015/" target="_blank" rel="noopener noreferrer">VER DISTINÇÕES <ArrowUpRight size={18}/></a></Reveal>
     <p className="awards-source">Fonte: Rádio Moçambique — vencedores oficiais do Ngoma; resultados dos Mozambique Music Awards 2015.</p>
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

   <section className="booking section-shell booking-photo" id="booking">
    <div className="booking-photo-backdrop" aria-hidden="true"/>
    <div className="booking-content">
     <div className="section-index"><span>05 / BOOKINGS</span><span>LET'S MAKE IT HAPPEN</span></div>
     <Reveal>
      <span className="booking-label">O PRÓXIMO GRANDE MOMENTO COMEÇA AQUI.</span>
      <h2>FAÇAMOS<br/><em>HISTÓRIA</em><span> JUNTOS.</span></h2>
      <a className="booking-link booking-whatsapp" href="https://wa.me/258843000002?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20para%20contratar%20o%20Mr%20Bow%20para%20um%20evento." target="_blank" rel="noopener noreferrer" aria-label="Solicitar contratação de Mr Bow por WhatsApp">
       CONTRATAR VIA WHATSAPP <span><ArrowUpRight size={29}/></span>
      </a>
     </Reveal>
     <p className="booking-disclaimer">Contacto público da equipa de contratações. Confirmação pendente.</p>
    </div>
   </section>
  </main>
  <footer className="footer"><div className="footer-upper"><a className="brand" href="#inicio">MR<span>BOW</span><b>®</b></a><div className="footer-networks"><a href={musicLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube/></a><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram — ligação provisória"><Instagram/></a></div></div><div className="footer-lower"><span>© {new Date().getFullYear()} MR BOW. TODOS OS DIREITOS RESERVADOS.</span><span>MADE IN MOZAMBIQUE. FELT EVERYWHERE.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
 </>;
}
