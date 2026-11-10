"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Disc3, Instagram, Menu, Mic2, Newspaper, Pause, Play, Tv2, Volume2, X, Youtube } from "lucide-react";
import { musicLinks, upcomingShows } from "@/lib/content";
import { mediaAppearances, featuredLiveConcert } from "@/lib/media";
import { getConsentChoice, CONSENT_EVENT } from "./components/CookiePreferences";
import { LanguageSwitcher, useLocale } from "./components/LocaleProvider";

const concert = "/images/Mr%20bow%20hero.jpg";
const heroSlides = [
 {image:"/images/Mr%20bow%20hero.jpg",eyebrow:"MR BOW / THE ARTIST",line:"MÚSICA. IDENTIDADE. LEGADO.",description:"Uma voz que transforma cada palco numa experiência.",href:"#musica",cta:"DESCOBRIR A MÚSICA"},
 {image:"/images/Golden%20Wedding%20Serenade_Easy-Resize.com.jpg",eyebrow:"MR BOW / THE MOMENTS",line:"MOMENTOS PARA SEMPRE.",description:"A emoção da música nos dias que ficam para sempre.",href:"#booking",cta:"CONTRATAR PARA UM EVENTO"}
] as const;
const crowd = "/images/setion%203.jpg";
const liveSlides = [
 {image:"/images/setion%203.jpg",eyebrow:"DOS GRANDES PALCOS ÀS MULTIDÕES",headline:"O PALCO",accent:"É NOSSO.",description:"A energia dos grandes concertos. A música que aproxima milhares de pessoas e transforma cada espectáculo numa memória inesquecível.",cta:"VER PRÓXIMOS ESPECTÁCULOS",href:"#agenda",position:"center center"},
 {image:"/images/Golden%20Wedding%20Serenade_Easy-Resize.com.jpg",eyebrow:"O AMOR TAMBÉM TEM BANDA SONORA",headline:"MOMENTOS",accent:"PARA SEMPRE.",description:"Há momentos que merecem ser vividos com emoção. Mr Bow dá voz aos casamentos e às celebrações que ficam para sempre.",cta:"CONTRATAR PARA CASAMENTO",href:"#booking",position:"center center"}
] as const;
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
const nav=[["Início","#inicio"],["Artista","#artista"],["Música","#musica"],["Media","#entrevistas"],["Concerto","#concerto-gravado"],["Ao vivo","#ao-vivo"],["Booking","#booking"]];
const mobileNav=[["Início","#inicio"],["A História","#artista"],["Música","#musica"],["Videoclipes","#videos"],["Prémios","#premios"],["Entrevistas","#entrevistas"],["Concerto","#concerto-gravado"],["Ao Vivo","#ao-vivo"],["Agenda","#agenda"]];
export default function Home(){
 const {locale}=useLocale();
 const bookingMessage=locale==="en"
  ?"Hello, I would like information about booking Mr Bow for an event."
  :locale==="ts"
   ?"Avuxeni, ndzi lava vuxokoxoko bya ku hira Mr Bow eka nkhuvo."
   :"Olá, gostaria de solicitar informações para contratar o Mr Bow para um evento.";

 const [open,setOpen]=useState(false);
 const [progress,setProgress]=useState(0);
 const [scrolled,setScrolled]=useState(false);
 const [allowExternalMedia,setAllowExternalMedia]=useState(false);
 useEffect(()=>{
  const sync=()=>setAllowExternalMedia(getConsentChoice()==="all");
  sync();
  window.addEventListener(CONSENT_EVENT,sync);
  return()=>window.removeEventListener(CONSENT_EVENT,sync);
 },[]);
 const audioRef=useRef<HTMLAudioElement>(null);
 const fadeTimerRef=useRef<number|null>(null);
 const audioOptedOut=useRef(false);
 const [audioPlaying,setAudioPlaying]=useState(false);
 const [audioReady,setAudioReady]=useState(false);
 const [audioInviteDismissed,setAudioInviteDismissed]=useState(false);
 const targetVolume=.60;
 const clearAudioFade=()=>{
  if(fadeTimerRef.current!==null){window.clearInterval(fadeTimerRef.current);fadeTimerRef.current=null;}
 };
 const fadeAudio=(target:number,duration:number,after?:()=>void)=>{
  const audio=audioRef.current;
  if(!audio)return;
  clearAudioFade();
  const start=performance.now();
  const from=audio.volume;
  fadeTimerRef.current=window.setInterval(()=>{
   const fraction=Math.min(1,(performance.now()-start)/duration);
   const eased=fraction*fraction*(3-2*fraction);
   audio.volume=Math.max(0,Math.min(1,from+(target-from)*eased));
   if(fraction>=1){clearAudioFade();after?.();}
  },50);
 };
 const playSiteAudio=async()=>{
  const audio=audioRef.current;
  if(!audio)return;
  audioOptedOut.current=false;
  try{
   if(audio.paused){audio.volume=0;await audio.play();}
   fadeAudio(targetVolume,1800);
   setAudioInviteDismissed(true);
  }catch{/* Os browsers podem exigir um clique explícito no controlo. */}
 };
 const toggleSiteAudio=()=>{
  const audio=audioRef.current;
  if(!audio)return;
  setAudioInviteDismissed(true);
  if(!audio.paused){
   audioOptedOut.current=true;
   fadeAudio(0,900,()=>audio.pause());
  }else{void playSiteAudio();}
 };
 useEffect(()=>{
  const audio=audioRef.current;
  if(!audio)return;
  audio.volume=0;
  const onPlay=()=>{setAudioPlaying(true);setAudioInviteDismissed(true);};
  const onPause=()=>setAudioPlaying(false);
  const onCanPlay=()=>setAudioReady(true);
  const onTimeUpdate=()=>{
   if(!Number.isFinite(audio.duration)||audio.duration<=0||audio.paused)return;
   const remaining=audio.duration-audio.currentTime;
   if(remaining<2.3&&audio.volume>.1&&fadeTimerRef.current===null){
    fadeAudio(0,1900);
   }
   if(audio.currentTime<.5&&audio.volume<.1&&fadeTimerRef.current===null){
    fadeAudio(targetVolume,1500);
   }
  };
  audio.addEventListener("play",onPlay);
  audio.addEventListener("pause",onPause);
  audio.addEventListener("canplay",onCanPlay);
  audio.addEventListener("timeupdate",onTimeUpdate);
  // Tenta iniciar o áudio, respeitando a política de reprodução do navegador.
  audio.play().then(()=>fadeAudio(targetVolume,1800)).catch(()=>{});
  const enableOnGesture=(event:Event)=>{
   if(audioOptedOut.current||!audio.paused)return;
   const target=event.target;
   if(target instanceof Element&&target.closest(".site-audio-toggle"))return;
   void playSiteAudio();
  };
  document.addEventListener("pointerdown",enableOnGesture);
  document.addEventListener("keydown",enableOnGesture);
  return()=>{
   clearAudioFade();
   document.removeEventListener("pointerdown",enableOnGesture);
   document.removeEventListener("keydown",enableOnGesture);
   audio.removeEventListener("play",onPlay);
   audio.removeEventListener("pause",onPause);
   audio.removeEventListener("canplay",onCanPlay);
   audio.removeEventListener("timeupdate",onTimeUpdate);
  };
 },[]);
 const albumsRail=useRef<HTMLDivElement>(null);
 const mobileMenuRef=useRef<HTMLDivElement>(null);
 const mobileMenuButtonRef=useRef<HTMLButtonElement>(null);
 const heroTouchStart=useRef<number|null>(null);
 const liveTouchStart=useRef<number|null>(null);
 const handleSwipe=(start:{current:number|null},endX:number,onSwipe:(direction:number)=>void)=>{
  if(start.current===null)return;
  const difference=endX-start.current;
  start.current=null;
  if(Math.abs(difference)>=55)onSwipe(difference<0?1:-1);
 };
 const [heroSlide,setHeroSlide]=useState(0);
 const [heroPaused,setHeroPaused]=useState(false);
 const [heroVisible,setHeroVisible]=useState(true);
 const [heroProgress,setHeroProgress]=useState(0);
 const heroElapsed=useRef(0);
 const heroPanelRef=useRef<HTMLElement>(null);
 const heroDuration=7000; // duração do slide de artista
 const changeHeroSlide=(index:number)=>{
  setHeroSlide((index+heroSlides.length)%heroSlides.length);
  heroElapsed.current=0;
  setHeroProgress(0);
 };
 useEffect(()=>{
  const element=heroPanelRef.current;
  if(!element)return;
  const observer=new IntersectionObserver(([entry])=>setHeroVisible(entry.isIntersecting),{threshold:.16});
  observer.observe(element);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(!heroVisible||heroPaused||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let previous=performance.now();
  const timer=window.setInterval(()=>{
   const now=performance.now();
   const duration=heroSlide===1&&window.matchMedia("(max-width: 760px)").matches?11000:heroDuration;
   heroElapsed.current+=Math.min(now-previous,250);
   previous=now;
   if(heroElapsed.current>=duration){
    heroElapsed.current=0;
    setHeroSlide(i=>(i+1)%heroSlides.length);
   }
   setHeroProgress(Math.min(100,heroElapsed.current/duration*100));
  },70);
  return()=>window.clearInterval(timer);
 },[heroVisible,heroPaused,heroSlide]);
 const [liveSlide,setLiveSlide]=useState(0);
 const [livePaused,setLivePaused]=useState(false);
 const [liveProgress,setLiveProgress]=useState(0);
 const liveElapsed=useRef(0);
 const livePanelRef=useRef<HTMLElement>(null);
 const [liveVisible,setLiveVisible]=useState(false);
 const liveDuration=7000;
 const changeLiveSlide=(index:number)=>{
  setLiveSlide((index+liveSlides.length)%liveSlides.length);
  liveElapsed.current=0;
  setLiveProgress(0);
 };
 useEffect(()=>{
  const panel=livePanelRef.current;
  if(!panel)return;
  const observer=new IntersectionObserver(([entry])=>setLiveVisible(entry.isIntersecting),{threshold:.2});
  observer.observe(panel);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(!liveVisible||livePaused||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let previous=performance.now();
  const timer=window.setInterval(()=>{
   const now=performance.now();
   liveElapsed.current+=Math.min(now-previous,250);
   previous=now;
   if(liveElapsed.current>=liveDuration){
    liveElapsed.current%=liveDuration;
    setLiveSlide(i=>(i+1)%liveSlides.length);
   }
   setLiveProgress(Math.min(100,liveElapsed.current/liveDuration*100));
  },60);
  return()=>window.clearInterval(timer);
 },[liveVisible,livePaused]);
 useEffect(()=>{
  let raf=0;
  const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max*100:0);setScrolled(window.scrollY>24);});};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
 },[]);
 useEffect(()=>{
  document.body.style.overflow=open?"hidden":"";
  if(!open)return()=>{document.body.style.overflow="";};
  const menu=mobileMenuRef.current;
  const focusable=()=>Array.from(menu?.querySelectorAll<HTMLAnchorElement>('a[href]')??[]);
  const first=focusable()[0];
  first?.focus();
  const onKeyDown=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){setOpen(false);mobileMenuButtonRef.current?.focus();return;}
   if(event.key!=="Tab")return;
   const links=focusable();
   if(!links.length)return;
   const previous=links[0],last=links[links.length-1];
   if(event.shiftKey&&document.activeElement===previous){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();previous.focus();}
  };
  document.addEventListener("keydown",onKeyDown);
  return()=>{document.body.style.overflow="";document.removeEventListener("keydown",onKeyDown);};
 },[open]);
 return <>
  <audio ref={audioRef} src="/images/Mr.%20Bow%20-%20Xisuti%20Xamina.mp3" preload="auto" loop aria-label="Mr Bow — Xisuti Xamina"/>
  {!audioPlaying&&!audioInviteDismissed&&!scrolled&&<div className="audio-invite" aria-hidden="true"><span>ACTIVA A EMOÇÃO.</span><strong>OUVE MR BOW!</strong><span className="audio-invite-arrow">↘</span></div>}
  <button type="button" className={`site-audio-toggle ${audioPlaying?"is-playing":""}`} onClick={toggleSiteAudio} aria-label={audioPlaying?"Pausar música ambiente":"Reproduzir música ambiente"} aria-pressed={audioPlaying} title={audioPlaying?"Pausar música":"Ouvir Mr Bow"}>
   <span className="site-audio-icon">{audioPlaying?<Pause size={18} fill="currentColor"/>:<Volume2 size={19}/>}</span>
   <span className="site-audio-info"><strong>MR BOW</strong><small>{audioPlaying?"A TOCAR · XISUTI XAMINA":audioReady?"ACTIVAR MÚSICA":"OUVIR MÚSICA"}</small></span>
  </button>
  <div className="reading-progress" style={{width:`${progress}%`}}/>
  <header className={`masthead ${scrolled?"masthead-scrolled":""} ${open?"masthead-menu-open":""}`}>
   <a className="brand" href="#inicio" onClick={()=>setOpen(false)} aria-label="Mr Bow — início">MR<span>BOW</span><b>®</b></a>
   <nav className="desktop-links" aria-label="Menu principal">{nav.slice(0,4).map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
   <LanguageSwitcher/>
   <a href="#booking" className="masthead-booking">BOOKING <ArrowUpRight size={17}/></a>
   <button ref={mobileMenuButtonRef} className="mobile-trigger" type="button" aria-controls="mobile-site-menu" aria-expanded={open} aria-label={open?"Fechar menu":"Abrir menu"} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
  </header>
  <div id="mobile-site-menu" ref={mobileMenuRef} className={`mobile-overlay ${open?"shown":""}`} aria-hidden={!open}>
   <nav aria-label="Menu móvel">{mobileNav.map(([label,href],i)=><a key={href} tabIndex={open?0:-1} href={href} onClick={()=>setOpen(false)}><span>{String(i+1).padStart(2,"0")}</span>{label}<ArrowUpRight size={20}/></a>)}</nav>
   <a className="mobile-booking-cta" href="#booking" tabIndex={open?0:-1} onClick={()=>setOpen(false)}>CONTRATAR MR BOW <ArrowUpRight size={22}/></a>
   <p>MÚSICA • IDENTIDADE • LEGADO</p>
  </div>
  <main>
   <section className={`hero hero-cinematic-slider ${heroPaused||!heroVisible?"is-paused":""}`} id="inicio" ref={heroPanelRef} onMouseEnter={()=>setHeroPaused(true)} onMouseLeave={()=>setHeroPaused(false)} onFocusCapture={()=>setHeroPaused(true)} onBlurCapture={()=>setHeroPaused(false)} onTouchStart={e=>{heroTouchStart.current=e.touches[0]?.clientX??null;}} onTouchEnd={e=>handleSwipe(heroTouchStart,e.changedTouches[0]?.clientX??0,direction=>changeHeroSlide(heroSlide+direction))} onTouchCancel={()=>{heroTouchStart.current=null;}} aria-label="Destaques de Mr Bow">
    {heroSlides.map((slide,index)=><div key={slide.image} className={`hero-slide-photo ${heroSlide===index?"is-active":""}`} style={{backgroundImage:`url("${slide.image}")`}} aria-hidden="true"/>)}
    <div className="hero-grain" aria-hidden="true"/>
    <div className="hero-title-wrap hero-title-only">
     <h1 className="hero-title"><span className="hero-first">MR</span><span className="hero-second">BOW<span className="hero-period">.</span></span></h1>
    </div>
    <div key={heroSlide} className="hero-slide-story" aria-live="polite">
     <span className="hero-story-eyebrow">{heroSlides[heroSlide].eyebrow}</span>
     <strong>{heroSlides[heroSlide].line}</strong>
     <p>{heroSlides[heroSlide].description}</p>
     <a href={heroSlides[heroSlide].href}>{heroSlides[heroSlide].cta} <ArrowUpRight size={18}/></a>
    </div>
    <div className="hero-slider-controls" aria-label="Navegação dos destaques">
     {heroSlides.map((slide,index)=><button key={slide.image} type="button" className={`hero-slider-dot ${index===heroSlide?"is-active":""}`} aria-label={`Mostrar destaque ${index+1}`} aria-pressed={index===heroSlide} onClick={()=>changeHeroSlide(index)}><span className="hero-slider-track"><span className="hero-slider-fill" style={{width:index===heroSlide?`${heroProgress}%`:"0%"}}/></span></button>)}
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
     <div className="albums-rail" ref={albumsRail} aria-label="Discografia de Mr Bow — deslize para ver mais álbuns">
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
     <span className="albums-mobile-hint" aria-hidden="true">DESLIZE PARA EXPLORAR OS ÁLBUNS <ArrowRight size={16}/></span>
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
         <img src={allowExternalMedia?`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`:"/images/setion%203.jpg"} alt={allowExternalMedia?`Miniatura do videoclip ${video.number} de Mr Bow`:`Imagem ilustrativa local para o videoclip ${video.number}`} loading="lazy" />
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

   <section className="media-section" id="entrevistas" aria-labelledby="media-heading">
    <div className="media-section-inner">
     <div className="media-topline"><span>MR BOW / NA IMPRENSA</span><span>CONVERSAS • TELEVISÃO • NOTÍCIAS</span></div>
     <Reveal className="media-heading">
      <div><span className="media-kicker">PARA ALÉM DA MÚSICA</span><h2 id="media-heading">A VOZ.<br/><em>AS HISTÓRIAS.</em></h2></div>
      <p>Entrevistas, conversas e momentos na comunicação social. Conhece as ideias, as experiências e o percurso de Mr Bow através de podcasts, televisão e notícias.</p>
     </Reveal>
     <div className="media-feature-label"><span>ENTREVISTAS EM DESTAQUE</span><span>05 / YOUTUBE</span></div>
     <div className="media-featured-grid">
      {mediaAppearances.filter(appearance=>appearance.category==="entrevista").map((appearance,index)=><Reveal className={`media-featured-card ${index===0?"media-featured-lead":""}`} key={appearance.id} delay={Math.min(index*65,250)}>
       <a href={appearance.url} className="media-featured-link" target="_blank" rel="noopener noreferrer" aria-label={`Ver entrevista ${index+1} de Mr Bow no YouTube`}>
        <div className="media-featured-image">
         <img src={allowExternalMedia?appearance.image:"/images/setion%203.jpg"} loading="lazy" alt={allowExternalMedia?`Miniatura da entrevista ${index+1} de Mr Bow`:`Imagem ilustrativa de entrevista ${index+1}`}/>
         <span className="media-featured-play"><Play size={25} fill="currentColor" aria-hidden="true"/></span>
         <span className="media-featured-number">{String(index+1).padStart(2,"0")} / 05</span>
        </div>
        <div className="media-featured-info"><span>ENTREVISTA / YOUTUBE</span><h3>{locale==="en"?`MR BOW · INTERVIEW ${String(index+1).padStart(2,"0")}`:locale==="ts"?`MR BOW · MBURISANO ${String(index+1).padStart(2,"0")}`:`MR BOW · ENTREVISTA ${String(index+1).padStart(2,"0")}`}</h3><span className="media-featured-action">VER ENTREVISTA <ArrowUpRight size={17}/></span></div>
       </a>
      </Reveal>)}
     </div>
     <div className="media-category-grid">
      {([
       {id:"podcast" as const,number:"01",icon:Mic2,category:"PODCASTS",headline:"CONVERSAS QUE MARCAM.",description:"Entrevistas e conversas aprofundadas em podcasts."},
       {id:"televisao" as const,number:"02",icon:Tv2,category:"TELEVISÃO",headline:"FRENTE ÀS CÂMARAS.",description:"Participações em programas de televisão e entrevistas em vídeo."},
       {id:"imprensa" as const,number:"03",icon:Newspaper,category:"IMPRENSA & NOTÍCIAS",headline:"MR BOW NAS NOTÍCIAS.",description:"Reportagens, entrevistas escritas e destaques nos órgãos de comunicação social."}
      ]).map((category,index)=>{
       const articles=mediaAppearances.filter(appearance=>appearance.category===category.id&&/^https?:\/\//.test(appearance.url));
       const Icon=category.icon;
       return <Reveal className={`media-category media-category-${category.id}`} key={category.id} delay={index*110}>
        <div className="media-category-top"><span>{category.number} / {category.category}</span><Icon size={25} strokeWidth={1.4} aria-hidden="true"/></div>
        <h3>{category.headline}</h3>
        <p>{category.description}</p>
        {articles.length>0?<div className="media-items">
         {articles.map(article=><a className="media-item" key={article.id} href={article.url} target="_blank" rel="noopener noreferrer">
          {article.image&&<img src={article.image} alt="" loading="lazy" />}
          <span className="media-item-text"><small>{article.outlet}{article.date?` · ${article.date}`:""}</small><strong>{article.title}</strong><span>VER ENTREVISTA <ArrowUpRight size={15}/></span></span>
         </a>)}
        </div>:<div className="media-placeholder"><span className="media-placeholder-line" aria-hidden="true"/><span>EM ACTUALIZAÇÃO</span><small>Novas entrevistas em breve.</small></div>}
       </Reveal>;
      })}
     </div>
     <div className="media-endnote"><span>MR BOW. PARA ALÉM DO PALCO.</span><span>ENTREVISTAS & MEDIA</span></div>
    </div>
   </section>

   <section className="concert-recorded" id="concerto-gravado" aria-labelledby="concert-recorded-title">
    <div className="concert-recorded-inner">
     <div className="concert-recorded-topline"><span>MR BOW / AO VIVO</span><span>CONCERTO GRAVADO</span></div>
     <Reveal className="concert-recorded-heading">
      <span>PALCO. ENERGIA. EMOÇÃO.</span>
      <h2 id="concert-recorded-title">A EXPERIÊNCIA<br/><em>AO VIVO.</em></h2>
      <p>Revive a energia de um concerto de Mr Bow. Um espectáculo gravado, disponível para assistir na íntegra.</p>
     </Reveal>
     <Reveal className="concert-recorded-visual">
      <a href={featuredLiveConcert.url} target="_blank" rel="noopener noreferrer" className="concert-recorded-link" aria-label="Assistir ao concerto gravado de Mr Bow no YouTube">
       <img
        src="/images/Mr%20bow%20concert.jpg"
        alt="Mr Bow em concerto ao vivo — capa do vídeo"
        loading="lazy"
       />
       <span className="concert-recorded-scrim"/>
       <span className="concert-recorded-play"><Play size={34} fill="currentColor" aria-hidden="true"/></span>
       <span className="concert-recorded-caption">
        <span>GRAVAÇÃO AO VIVO · YOUTUBE</span>
        <strong>MR BOW<br/>LIVE IN CONCERT</strong>
        <span className="concert-recorded-watch">VER CONCERTO COMPLETO <ArrowUpRight size={20}/></span>
       </span>
      </a>
     </Reveal>
     <div className="concert-recorded-foot"><span>UMA EXPERIÊNCIA PARA REVIVER.</span><span>THE SOUND OF MR BOW.</span></div>
    </div>
   </section>

   <section className={`cinema-panel cinema-slider ${livePaused||!liveVisible?"is-paused":""}`} id="ao-vivo" ref={livePanelRef} aria-label="Concertos e celebrações com Mr Bow" onMouseEnter={()=>setLivePaused(true)} onMouseLeave={()=>setLivePaused(false)} onFocusCapture={()=>setLivePaused(true)} onBlurCapture={()=>setLivePaused(false)} onTouchStart={e=>{liveTouchStart.current=e.touches[0]?.clientX??null;}} onTouchEnd={e=>handleSwipe(liveTouchStart,e.changedTouches[0]?.clientX??0,direction=>changeLiveSlide(liveSlide+direction))} onTouchCancel={()=>{liveTouchStart.current=null;}}>
    {liveSlides.map((slide,index)=><div key={slide.image} className={`cinema-slide-image ${index===liveSlide?"is-active":""}`} style={{backgroundImage:`url("${slide.image}")`,backgroundPosition:slide.position}} aria-hidden="true"/>)}
    <div className="cinema-shade cinema-slide-shade" aria-hidden="true"/>
    <div key={liveSlide} className="cinema-content cinema-slide-content" aria-live="polite">
     <span className="cinema-mini">{liveSlides[liveSlide].eyebrow}</span>
     <h2>{liveSlides[liveSlide].headline}<br/><em>{liveSlides[liveSlide].accent}</em></h2>
     <p>{liveSlides[liveSlide].description}</p>
     <a className="circle-link" href={liveSlides[liveSlide].href}>{liveSlides[liveSlide].cta} <ArrowUpRight size={20}/></a>
    </div>
    <div className="cinema-slider-controls" aria-label="Controlos dos slides">
     <button type="button" className="cinema-slider-arrow" aria-label="Slide anterior" onClick={()=>changeLiveSlide(liveSlide-1)}><ChevronLeft size={20}/></button>
     {liveSlides.map((slide,index)=><button key={slide.image} type="button" className={`cinema-slider-dot ${index===liveSlide?"is-active":""}`} aria-label={`Mostrar slide ${index+1}: ${slide.headline}`} aria-pressed={index===liveSlide} onClick={()=>changeLiveSlide(index)}><span className="cinema-slider-track"><span className="cinema-slider-fill" style={{width:index===liveSlide?`${liveProgress}%`:"0%"}}/></span></button>)}
     <button type="button" className="cinema-slider-arrow" aria-label="Próximo slide" onClick={()=>changeLiveSlide(liveSlide+1)}><ChevronRight size={20}/></button>
    </div>
    <span className="cinema-corner">{String(liveSlide+1).padStart(2,"0")} / {String(liveSlides.length).padStart(2,"0")} — MB / LIVE</span>
   </section>

   <section className="agenda section-shell" id="agenda">
    <div className="section-index"><span>03 / NEXT DATES</span><span>ENCONTRE-NOS AO VIVO</span></div>
    <Reveal><div className="agenda-head"><h2>PRÓXIMOS<br/><em>ENCONTROS.</em></h2><p>O próximo momento inesquecível pode estar mais perto do que imagina.</p></div></Reveal>
    {upcomingShows.length? <div className="dates">{upcomingShows.map(s=><div className="date-row" key={s.date+s.city}><strong>{s.date} <small>{s.month}</small></strong><span>{s.city}<small>{s.venue}</small></span>{s.ticketUrl?<a href={s.ticketUrl} target="_blank" rel="noopener noreferrer">BILHETES <ArrowUpRight size={20}/></a>:<span>EM BREVE</span>}</div>)}</div>:
    <Reveal><div className="agenda-empty"><span className="asterisk">✳</span><div><strong>NOVAS DATAS<br/>A CAMINHO.</strong><p>Consulte esta área para conhecer os próximos espectáculos oficialmente confirmados.</p></div><a className="agenda-booking-cta" href="#booking" aria-label="Solicitar contratação para um espectáculo">PEDIR CONTRATAÇÃO <ArrowUpRight size={25}/></a></div></Reveal>}
   </section>

   <section className="booking section-shell booking-photo" id="booking">
    <div className="booking-photo-backdrop" aria-hidden="true"/>
    <div className="booking-content">
     <div className="section-index"><span>05 / BOOKINGS</span><span>LET'S MAKE IT HAPPEN</span></div>
     <Reveal>
      <span className="booking-label">O PRÓXIMO GRANDE MOMENTO COMEÇA AQUI.</span>
      <h2>FAÇAMOS<br/><em>HISTÓRIA</em><span> JUNTOS.</span></h2>
      <a className="booking-link booking-whatsapp" href={`https://wa.me/258843000002?text=${encodeURIComponent(bookingMessage)}`} target="_blank" rel="noopener noreferrer" aria-label="Solicitar contratação de Mr Bow por WhatsApp">
       CONTRATAR VIA WHATSAPP <span><ArrowUpRight size={29}/></span>
      </a>
     </Reveal>
     <p className="booking-disclaimer">Contacto público da equipa de contratações. Confirmação pendente.</p>
    </div>
   </section>
  </main>
  <footer className="footer"><div className="footer-upper"><a className="brand" href="#inicio">MR<span>BOW</span><b>®</b></a><div className="footer-networks"><a href={musicLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube/></a><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram — ligação provisória"><Instagram/></a></div></div><div className="footer-lower"><span>© {new Date().getFullYear()} MR BOW. TODOS OS DIREITOS RESERVADOS.</span><span>MADE IN MOZAMBIQUE. FELT EVERYWHERE.</span><nav className="footer-legal-nav" aria-label="Informações legais"><a href="/privacidade">PRIVACIDADE</a><a href="/cookies">COOKIES</a><a href="/termos">TERMOS</a><button type="button" onClick={()=>window.dispatchEvent(new Event("mrbow:open-cookie-settings"))}>PREFERÊNCIAS DE COOKIES</button></nav><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
 </>;
}
