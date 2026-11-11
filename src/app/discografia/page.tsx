import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import { musicLinks } from "@/lib/content";
import { featuredLiveConcert, mediaAppearances } from "@/lib/media";

export const metadata: Metadata = {
  title: "Discografia, Videoclipes e Concertos de Mr Bow",
  description: "Explore os álbuns de Mr Bow, videoclipes, concertos ao vivo e entrevistas. Ouça Mr. Romantic, Story of My Life e Strong Shangane no Spotify.",
  alternates: { canonical: "/discografia" },
  openGraph: {
    title: "Música, Videoclipes e Concertos | Mr Bow",
    description: "Discografia completa em destaque, videoclipes, concertos e entrevistas do artista moçambicano.",
    url: "https://mrbow.co.mz/discografia",
    images: [{ url: "/images/Album%201.jpeg", alt: "Discografia de Mr Bow" }],
  },
};

const albums = [
  { title: "Mr. Romantic", image: "/images/Album%201.jpeg", url: "https://open.spotify.com/album/1yVE3BEW9Zq49flWW4qQA9", number: "01" },
  { title: "Story of My Life", image: "/images/Album%202.jpg", url: "https://open.spotify.com/album/3Q8MgnqfJXtUMwsQazxaHu", number: "02" },
  { title: "Strong Shangane", image: "/images/Album%203.jpg", url: "https://open.spotify.com/album/58X9KqhtuVPTp1sJgMiSdK", number: "03" },
];

const archiveAlbums = ["O Melhor de Mim", "Sinal de Vitória", "Kota de Família", "Meu Sonho"];

const videoclipes = [
  { id: "gUj6XUuaNfw", number: "01", title: "Videoclipe oficial — Selecção 01" },
  { id: "_crVajIlmYk", number: "02", title: "Videoclipe oficial — Selecção 02" },
  { id: "1vr_ZwnxCgg", number: "03", title: "Videoclipe oficial — Selecção 03" },
];

export default function DiscografiaPage() {
  return (
    <>
      <SiteHeader/>
      <main className="artist-archive music-library">
        <div className="music-library-intro">
          <div className="section-index"><span>MR BOW / ARQUIVO MUSICAL</span><span>MÚSICA • IMAGEM • PALCO</span></div>
          <div className="music-library-intro-row">
            <h1>A OBRA<br/><em>DE MR BOW.</em></h1>
            <div>
              <p>Álbuns, videoclipes, concertos e entrevistas. Todo o universo musical de Mr Bow, reunido num único espaço.</p>
              <nav className="music-library-jump" aria-label="Navegar pela discografia">
                <a href="#albuns">ÁLBUNS ↓</a>
                <a href="#videoclipes">VIDEOCLIPES ↓</a>
                <a href="#concertos">CONCERTOS ↓</a>
                <a href="#entrevistas">ENTREVISTAS ↓</a>
              </nav>
            </div>
          </div>
        </div>

        <section className="archive-section" id="albuns">
          <div className="archive-section-heading">
            <div><span className="archive-eyebrow">01 / A MÚSICA</span><h2>ÁLBUNS <em>EM DESTAQUE.</em></h2></div>
            <p>Explore os trabalhos seleccionados e ouça cada álbum directamente no Spotify.</p>
          </div>
          <div className="archive-album-grid">
            {albums.map(album => (
              <article className="archive-album" key={album.title}>
                <a href={album.url} target="_blank" rel="noopener noreferrer" aria-label={`Ouvir o álbum ${album.title} de Mr Bow no Spotify`}>
                  <img src={album.image} alt={`Capa do álbum ${album.title} de Mr Bow`} loading="lazy"/>
                </a>
                <div className="archive-album-info">
                  <span>{album.number} / ÁLBUM</span><h3>{album.title}</h3>
                  <a href={album.url} target="_blank" rel="noopener noreferrer">OUVIR NO SPOTIFY ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-section archive-secondary" id="arquivo">
          <div className="archive-section-heading">
            <div><span className="archive-eyebrow">02 / MEMÓRIA MUSICAL</span><h2>OUTROS <em>LANÇAMENTOS.</em></h2></div>
            <p>Outros títulos associados ao percurso de Mr Bow. As ligações individuais serão incluídas depois de confirmadas.</p>
          </div>
          <ul className="archive-release-list">
            {archiveAlbums.map((title, index) => (
              <li key={title}><span>{String(index+4).padStart(2,"0")}</span><strong>{title}</strong><small>ARQUIVO MUSICAL</small></li>
            ))}
          </ul>
        </section>

        <section className="archive-section" id="videoclipes">
          <div className="archive-section-heading">
            <div><span className="archive-eyebrow">03 / AUDIOVISUAL</span><h2>VIDEOCLIPES <em>OFICIAIS.</em></h2></div>
            <p>Os videoclipes de Mr Bow, com acesso às gravações originais no YouTube.</p>
          </div>
          <div className="archive-video-grid">
            {videoclipes.map(video => (
              <article className="archive-video" key={video.id}>
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${video.title} no YouTube`}>
                  <img src={`/api/video-thumbnail/${video.id}`} alt={`Miniatura de ${video.title}`} loading="lazy"/>
                  <span className="archive-video-play" aria-hidden="true">▶</span>
                </a>
                <div className="archive-video-info">
                  <span>{video.number} / VIDEOCLIPE</span><h3>{video.title}</h3>
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">VER VIDEOCLIPE ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-section archive-secondary" id="concertos">
          <div className="archive-section-heading">
            <div><span className="archive-eyebrow">04 / AO VIVO</span><h2>O PALCO <em>É NOSSO.</em></h2></div>
            <p>Reviva a energia dos grandes concertos através de uma gravação seleccionada.</p>
          </div>
          <div className="archive-concert">
            <a href={featuredLiveConcert.url} target="_blank" rel="noopener noreferrer" aria-label="Ver concerto gravado de Mr Bow no YouTube">
              <img src="/images/Mr%20bow%20concert.jpg" alt="Mr Bow em concerto ao vivo" loading="lazy"/>
              <span className="archive-video-play" aria-hidden="true">▶</span>
            </a>
            <div>
              <span className="archive-eyebrow">CONCERTO GRAVADO</span>
              <h3>MR BOW<br/>AO VIVO.</h3>
              <p>Uma experiência musical para reviver na íntegra.</p>
              <a className="archive-hero-action" href={featuredLiveConcert.url} target="_blank" rel="noopener noreferrer">VER CONCERTO COMPLETO ↗</a>
            </div>
          </div>
        </section>

        <section className="archive-section" id="entrevistas">
          <div className="archive-section-heading">
            <div><span className="archive-eyebrow">05 / PARA ALÉM DA MÚSICA</span><h2>ENTREVISTAS <em>E CONVERSAS.</em></h2></div>
            <p>Podcasts, rádio e televisão. Conheça a voz e a história por detrás do artista.</p>
          </div>
          <div className="archive-video-grid">
            {mediaAppearances.map(appearance => (
              <article className="archive-video" key={appearance.id}>
                <a href={appearance.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${appearance.title}`}>
                  <img src={`/api/video-thumbnail/${new URL(appearance.url).searchParams.get("v")}`} alt={`Capa da entrevista ${appearance.title}`} loading="lazy"/>
                  <span className="archive-video-play" aria-hidden="true">▶</span>
                </a>
                <div className="archive-video-info">
                  <span>{appearance.outlet}</span><h3>{appearance.title}</h3>
                  <a href={appearance.url} target="_blank" rel="noopener noreferrer">VER ENTREVISTA ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-section archive-platforms" id="plataformas">
          <span className="archive-eyebrow">06 / OUVIR MAIS</span>
          <h2>MR BOW <em>NAS PLATAFORMAS.</em></h2>
          <div className="archive-platform-links">
            {musicLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
            <a href="https://www.youtube.com/@mrbowofficial/videos" target="_blank" rel="noopener noreferrer">VÍDEOS NO YOUTUBE ↗</a>
          </div>
        </section>
        <footer className="archive-footer"><span>MR BOW / MÚSICA • IDENTIDADE • LEGADO</span><a href="/">VOLTAR À PÁGINA INICIAL ↑</a></footer>
      </main>
    </>
  );
}
