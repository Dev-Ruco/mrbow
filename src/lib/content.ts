// Conteúdos editoriais provisórios. Substituir por dados aprovados pela equipa antes da publicação.
export const artist = {
  name: "MR BOW",
  tagline: "MÚSICA. IDENTIDADE. LEGADO.",
  introduction: "Uma voz que atravessa gerações. Uma história feita de música, emoção e ligação ao público.",
  bio: "Da sua origem em Moçambique aos grandes palcos, Mr Bow construiu um percurso marcado pela proximidade com o público e por uma identidade musical própria.",
};

export const musicLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@mrbowofficial" },
  { label: "Spotify", href: "https://open.spotify.com/artist/3fodDFLQDXX8hpG8T1tDUx" },
  { label: "Apple Music", href: "https://music.apple.com/artist/mr-bow/1534202763" },
];

// Não publicar datas ou locais de espectáculos sem confirmação.
export const upcomingShows: { date: string; month: string; city: string; venue: string; ticketUrl?: string }[] = [];

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Artista", href: "#artista" },
  { label: "Música", href: "#musica" },
  { label: "Videoclipes", href: "#videos" },
  { label: "Prémios", href: "#premios" },
  { label: "Entrevistas", href: "#entrevistas" },
  { label: "Concerto Gravado", href: "#concerto-gravado" },
  { label: "Ao Vivo", href: "#ao-vivo" },
  { label: "Agenda", href: "#agenda" },
  { label: "Contratações", href: "#booking" },
];
