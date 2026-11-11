import type { Metadata } from "next";
import Link from "next/link";
import { featuredLiveConcert, mediaAppearances } from "@/lib/media";

export const metadata: Metadata = {
 title: "Vídeos, Concertos e Entrevistas de Mr Bow",
 description: "Assista a vídeos, entrevistas e concertos de Mr Bow, cantor e artista moçambicano, com ligações para o YouTube.",
 alternates: { canonical: "/videos" },
 openGraph: { title: "Vídeos e Entrevistas de Mr Bow", url: "https://mrbow.co.mz/videos" },
};

export default function VideosPage() {
 return <main className="legal-page">
  <header className="legal-top"><Link href="/">MR<span>BOW</span>®</Link><Link href="/">← VOLTAR AO SITE</Link></header>
  <div className="legal-hero"><span>MR BOW / AUDIOVISUAL</span><h1>VÍDEOS E ENTREVISTAS</h1><p>Concertos, conversas e momentos do percurso do artista.</p></div>
  <article className="legal-content">
   <h2>Concerto gravado</h2>
   <p><a href={featuredLiveConcert.url} target="_blank" rel="noopener noreferrer">{featuredLiveConcert.title} — assistir no YouTube ↗</a></p>
   <h2>Entrevistas e participações</h2>
   <ul>{mediaAppearances.map(video=><li key={video.id}><a href={video.url} target="_blank" rel="noopener noreferrer">{video.title} ↗</a></li>)}</ul>
   <h2>Canal oficial</h2>
   <p><a href="https://www.youtube.com/@mrbowofficial" target="_blank" rel="noopener noreferrer">Ver videoclipes e outros vídeos no canal oficial de Mr Bow ↗</a></p>
   <p className="legal-back"><Link href="/">← REGRESSAR AO SITE</Link></p>
  </article>
 </main>;
}
