/**
 * Participações de Mr Bow em podcasts, televisão e imprensa.
 * Acrescente entradas reais com as respectivas ligações verificadas.
 * Não são mostrados cartões fictícios enquanto a lista estiver vazia.
 *
 * Exemplo:
 * {
 *   id: "entrevista-001",
 *   category: "podcast",
 *   title: "Título da entrevista",
 *   outlet: "Nome do programa",
 *   date: "2026",
 *   url: "https://...",
 *   image: "/images/nome-da-capa.jpg"
 * }
 */
export type MediaCategory = "podcast" | "televisao" | "imprensa";
export type MediaAppearance = {
  id: string;
  category: MediaCategory;
  title: string;
  outlet: string;
  date?: string;
  url: string;
  image?: string;
};
export const mediaAppearances: MediaAppearance[] = [];
