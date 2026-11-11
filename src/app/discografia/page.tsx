import type { Metadata } from "next";
import Link from "next/link";
import { musicLinks } from "@/lib/content";

export const metadata: Metadata = {
 title: "Discografia e Álbuns de Mr Bow",
 description: "Explore a discografia de Mr Bow: Strong Shangane, Story of My Life, Mr. Romantic e outros álbuns do artista moçambicano.",
 alternates: { canonical: "/discografia" },
 openGraph: { title: "Discografia de Mr Bow", url: "https://mrbow.co.mz/discografia", description: "Álbuns e música do artista moçambicano Mr Bow." },
};

const albums = [
 { title: "Strong Shangane", year: "2025" },
 { title: "Story of My Life", year: "2020" },
 { title: "Mr. Romantic", year: "2017" },
 { title: "O Melhor de Mim", year: "2013" },
 { title: "Sinal de Vitória", year: "2012" },
 { title: "Kota de Família", year: "2010" },
 { title: "Meu Sonho", year: "2007" },
];

export default function DiscografiaPage() {
 return <main className="legal-page">
  <header className="legal-top"><Link href="/">MR<span>BOW</span>®</Link><Link href="/">← VOLTAR AO SITE</Link></header>
  <div className="legal-hero"><span>MR BOW / MÚSICA</span><h1>DISCOGRAFIA</h1><p>Os álbuns e os capítulos musicais de Mr Bow.</p></div>
  <article className="legal-content">
   <h2>Álbuns</h2>
   <p>Conheça alguns dos lançamentos que marcaram o percurso de Mr Bow. As datas referem-se aos anos associados aos álbuns nas fontes discográficas disponíveis.</p>
   <ul>{albums.map(album=><li key={album.title}><strong>{album.title}</strong> — {album.year}</li>)}</ul>
   <h2>Ouvir Mr Bow</h2>
   <p>Acompanhe a música de Mr Bow nas plataformas digitais:</p>
   <ul>{musicLinks.map(item=><li key={item.label}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗</a></li>)}</ul>
   <p className="legal-back"><Link href="/">← REGRESSAR AO SITE</Link></p>
  </article>
 </main>;
}
