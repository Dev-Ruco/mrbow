import type { Metadata } from "next";
import Link from "next/link";
import { featuredLiveConcert, mediaAppearances } from "@/lib/media";

export const metadata: Metadata = {
 title: "Videoclipes, Concertos e Entrevistas de Mr Bow",
 description: "Veja os videoclipes oficiais, concertos e entrevistas de Mr Bow, artista moçambicano, organizados numa página audiovisual.",
 alternates: { canonical: "/videos" },
 openGraph: {
  title: "Videoclipes, Concertos e Entrevistas | Mr Bow",
  url: "https://mrbow.co.mz/videos",
  description: "Explore os videoclipes, actuações e entrevistas de Mr Bow.",
  images: [{ url: "/images/Mr%20bow%20concert.jpg", alt: "Mr Bow em concerto" }],
 },
};

const musicVideos = [
  { id: "gUj6XUuaNfw", label: "01", title: "Videoclipe oficial — Selecção 01" },
  { id: "_crVajIlmYk", label: "02", title: "Videoclipe oficial — Selecção 02" },
  { id: "1vr_ZwnxCgg", label: "03", title: "Videoclipe oficial — Selecção 03" },
];

export default function VideosPage() {
 return (
  <main className="artist-archive">
   <header className="archive-nav"><Link className="archive-logo" href="/">MR <span>BOW.</span></Link><nav aria-label="Navegação audiovisual"><Link href="/">INÍCIO</Link><Link href="/discografia">DISCOGRAFIA</Link><Link href="/espectaculos">ESPECTÁCULOS</Link></nav></header>
   <section className="archive-hero">
    <div><span className="archive-eyebrow">MR BOW / CINEMA & SOM</span><h1>O SOM.<br/><em>A IMAGEM.</em></h1><p>Videoclipes, actuações ao vivo e conversas que mostram as diferentes dimensões do percurso artístico de Mr Bow.</p><a className="archive-hero-action" href="#videoclipes">EXPLORAR VÍDEOS ↓</a></div>
    <img src="/images/Mr%20bow%20concert.jpg" alt="Mr Bow em concerto" />
   </section>
   <section className="archive-section" id="videoclipes">
    <div className="archive-section-heading"><div><span className="archive-eyebrow">01 / MUSIC VIDEOS</span><h2>VIDEOCLIPES <em>OFICIAIS.</em></h2></div><p>Explore uma selecção de videoclipes e abra cada vídeo no YouTube.</p></div>
    <div className="archive-video-grid">
     {musicVideos.map(video=><article className="archive-video" key={video.id}>
      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${video.title} no YouTube`}>
       <img src={`/api/video-thumbnail/${video.id}`} loading="lazy" alt={`Miniatura de ${video.title}`}/>
       <span className="archive-video-play">▶</span>
      </a>
      <div className="archive-video-info"><span>{video.label} / VIDEOCLIPE</span><h3>{video.title}</h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">VER NO YOUTUBE ↗</a></div>
     </article>)}
    </div>
   </section>
   <section className="archive-section archive-secondary" id="concerto">
    <div className="archive-section-heading"><div><span className="archive-eyebrow">02 / AO VIVO</span><h2>O PALCO <em>É NOSSO.</em></h2></div><p>Reviva a energia de um espectáculo de Mr Bow.</p></div>
    <div className="archive-concert">
      <a href={featuredLiveConcert.url} target="_blank" rel="noopener noreferrer"><img src="/images/Mr%20bow%20concert.jpg" loading="lazy" alt="Mr Bow em concerto — gravação disponível no YouTube"/><span className="archive-video-play">▶</span></a>
      <div><span className="archive-eyebrow">CONCERTO GRAVADO</span><h3>MR BOW<br/>AO VIVO.</h3><p>Um espectáculo para reviver na íntegra.</p><a className="archive-hero-action" href={featuredLiveConcert.url} target="_blank" rel="noopener noreferrer">VER CONCERTO COMPLETO ↗</a></div>
    </div>
   </section>
   <section className="archive-section" id="entrevistas">
    <div className="archive-section-heading"><div><span className="archive-eyebrow">03 / MEDIA</span><h2>ENTREVISTAS <em>E CONVERSAS.</em></h2></div><p>Participações em podcasts, televisão e rádio, com acesso directo às gravações.</p></div>
    <div className="archive-video-grid">
      {mediaAppearances.map(appearance=><article className="archive-video" key={appearance.id}>
       <a href={appearance.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${appearance.title}`}>
        <img src={`/api/video-thumbnail/${new URL(appearance.url).searchParams.get("v")}`} alt={`Miniatura da entrevista ${appearance.title}`} loading="lazy"/><span className="archive-video-play">▶</span>
       </a>
       <div className="archive-video-info"><span>{appearance.outlet}</span><h3>{appearance.title}</h3><a href={appearance.url} target="_blank" rel="noopener noreferrer">ASSISTIR À ENTREVISTA ↗</a></div>
      </article>)}
    </div>
   </section>
   <section className="archive-section archive-platforms"><span className="archive-eyebrow">04 / CANAL OFICIAL</span><h2>MAIS HISTÓRIAS <em>NO YOUTUBE.</em></h2><div className="archive-platform-links"><a href="https://www.youtube.com/@mrbowofficial/videos" target="_blank" rel="noopener noreferrer">VER CANAL OFICIAL ↗</a><Link href="/discografia">EXPLORAR DISCOGRAFIA ↗</Link></div></section>
   <footer className="archive-footer"><span>MR BOW / MÚSICA • IDENTIDADE • LEGADO</span><Link href="/">VOLTAR À PÁGINA INICIAL ↑</Link></footer>
  </main>
 );
}
