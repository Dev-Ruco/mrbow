import type { Metadata } from "next";
import Link from "next/link";
import { musicLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Discografia de Mr Bow | Álbuns e Música",
  description: "Descubra a discografia de Mr Bow, incluindo Mr. Romantic, Story of My Life e Strong Shangane. Ouça os álbuns completos no Spotify.",
  alternates: { canonical: "/discografia" },
  openGraph: {
    title: "Discografia de Mr Bow — Álbuns e Música",
    description: "Os álbuns e o percurso musical de Mr Bow.",
    url: "https://mrbow.co.mz/discografia",
    images: [{ url: "/images/Album%201.jpeg", alt: "Discografia de Mr Bow" }],
  },
};

const featuredAlbums = [
  {
    title: "Mr. Romantic",
    image: "/images/Album%201.jpeg",
    url: "https://open.spotify.com/album/1yVE3BEW9Zq49flWW4qQA9",
    label: "01",
  },
  {
    title: "Story of My Life",
    image: "/images/Album%202.jpg",
    url: "https://open.spotify.com/album/3Q8MgnqfJXtUMwsQazxaHu",
    label: "02",
  },
  {
    title: "Strong Shangane",
    image: "/images/Album%203.jpg",
    url: "https://open.spotify.com/album/58X9KqhtuVPTp1sJgMiSdK",
    label: "03",
  },
];
const archiveAlbums = [
  "O Melhor de Mim",
  "Sinal de Vitória",
  "Kota de Família",
  "Meu Sonho",
];

export default function DiscografiaPage() {
  return (
    <main className="artist-archive">
      <header className="archive-nav">
        <Link className="archive-logo" href="/">MR <span>BOW.</span></Link>
        <nav aria-label="Navegação da discografia">
          <Link href="/">INÍCIO</Link>
          <Link href="/videos">VÍDEOS</Link>
          <Link href="/espectaculos">ESPECTÁCULOS</Link>
        </nav>
      </header>
      <section className="archive-hero">
        <div>
          <span className="archive-eyebrow">MR BOW / UNIVERSO MUSICAL</span>
          <h1>A MÚSICA.<br /><em>O LEGADO.</em></h1>
          <p>Uma discografia que acompanha o percurso de Mr Bow. Explora os álbuns em destaque e segue directamente para a música nas plataformas digitais.</p>
          <a className="archive-hero-action" href="#albuns">EXPLORAR ÁLBUNS ↓</a>
        </div>
        <img src="/images/Mr%20bow%20hero.jpg" alt="Mr Bow — artista moçambicano" />
      </section>
      <section className="archive-section" id="albuns">
        <div className="archive-section-heading">
          <div><span className="archive-eyebrow">01 / DISCOS EM DESTAQUE</span><h2>ÁLBUNS <em>SELECCIONADOS.</em></h2></div>
          <p>Cada álbum tem uma ligação directa para a sua edição no Spotify.</p>
        </div>
        <div className="archive-album-grid">
          {featuredAlbums.map(album => (
            <article className="archive-album" key={album.title}>
              <a href={album.url} target="_blank" rel="noopener noreferrer" aria-label={`Ouvir ${album.title} no Spotify`}>
                <img src={album.image} alt={`Capa do álbum ${album.title}, de Mr Bow`} loading="lazy" />
              </a>
              <div className="archive-album-info">
                <span>{album.label} / ÁLBUM</span>
                <h3>{album.title}</h3>
                <a href={album.url} target="_blank" rel="noopener noreferrer">OUVIR NO SPOTIFY ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="archive-section archive-secondary">
        <div className="archive-section-heading">
          <div><span className="archive-eyebrow">02 / ARQUIVO MUSICAL</span><h2>OUTROS <em>LANÇAMENTOS.</em></h2></div>
          <p>Outros títulos associados ao percurso do artista. As ligações directas para estes álbuns serão adicionadas depois de confirmadas.</p>
        </div>
        <ul className="archive-release-list">
          {archiveAlbums.map((title, index) => <li key={title}><span>{String(index + 4).padStart(2, "0")}</span><strong>{title}</strong><small>ARQUIVO MUSICAL</small></li>)}
        </ul>
      </section>
      <section className="archive-section archive-platforms">
        <span className="archive-eyebrow">03 / OUVIR ONLINE</span>
        <h2>MR BOW <em>EM TODAS AS PLATAFORMAS.</em></h2>
        <div className="archive-platform-links">{musicLinks.map(link => <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>
      </section>
      <footer className="archive-footer"><span>MR BOW / MÚSICA • IDENTIDADE • LEGADO</span><Link href="/">VOLTAR À PÁGINA INICIAL ↑</Link></footer>
    </main>
  );
}
