// Conteúdos editoriais provisórios. Substituir por dados aprovados pela equipa antes da publicação.
export const artist = {
  name: "MR BOW",
  tagline: "MÚSICA. IDENTIDADE. LEGADO.",
  introduction: "Uma voz que atravessa gerações. Uma história feita de música, emoção e ligação ao público.",
  bio: "Da sua origem em Moçambique aos grandes palcos, Mr Bow construiu um percurso marcado pela proximidade com o público e por uma identidade musical própria.",
};

export const musicLinks = [
  { label: "YouTube", href: "https://www.youtube.com/results?search_query=Mr+Bow+oficial" },
  { label: "Spotify", href: "https://open.spotify.com/search/Mr%20Bow" },
  { label: "Apple Music", href: "https://music.apple.com/search?term=Mr%20Bow" },
];

// Não publicar datas ou locais de espectáculos sem confirmação.
export const upcomingShows: { date: string; month: string; city: string; venue: string; ticketUrl?: string }[] = [];

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Música", href: "#musica" },
  { label: "Agenda", href: "#agenda" },
  { label: "Biografia", href: "#biografia" },
  { label: "Media", href: "#media" },
  { label: "Contratações", href: "#contratacoes" },
];
