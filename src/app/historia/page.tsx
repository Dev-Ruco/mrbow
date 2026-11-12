import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
 title: "Biografia e História de Mr. Bow — Salvador Pedro Maiaze",
 description: "Conheça a história de Mr. Bow, Salvador Pedro Maiaze: das origens em Manjacaze, Gaza, ao percurso na música moçambicana e aos grandes palcos.",
 alternates: { canonical: "/historia" },
 openGraph: {
  type: "article",
  url: "https://mrbow.co.mz/historia",
  title: "A História de Mr. Bow — Salvador Pedro Maiaze",
  description: "Das origens em Manjacaze ao percurso de Mr. Bow na música moçambicana.",
  images: [{ url: "/images/Mr%20bow%20previwm.jpg", alt: "Mr. Bow — site oficial" }],
 },
};

const paragraphs=[
 "Antes de se tornar Mr. Bow, Salvador Pedro Maiaze era um jovem de Manjacaze, na província de Gaza, com uma paixão pela música e a determinação de construir o seu próprio caminho.",
 "Deixou a terra natal à procura de oportunidades e, em Maputo, conciliou diferentes trabalhos com o sonho de viver da música. Chegou a vender produtos no mercado para financiar as suas primeiras gravações, num percurso marcado por desafios, sacrifícios e decisões que moldaram a sua trajectória.",
 "Com o tempo, encontrou na sua identidade cultural uma das maiores forças da sua expressão artística, transformando as raízes moçambicanas numa assinatura musical reconhecida dentro e fora do País.",
 "Hoje, para além do artista, existe um homem cuja história também se constrói na família, no empreendedorismo e na vontade de abrir caminhos para outros.",
];

export default function Historia(){
 return <><SiteHeader/><main className="history-page">
  <section className="history-content">
   <div className="history-photo"><Image src="/images/Elegant%20Tuxedo%20Portrait%20Cutout.png" alt="Mr. Bow com fato preto e óculos escuros" width={900} height={1200} sizes="(max-width: 760px) 90vw, 48vw" priority/></div>
   <article className="history-text">
    <span className="eyebrow">THE MAN BEHIND THE MUSIC</span>
    <h1>DO SALVADOR<br/>AO <em>KING BOW.</em></h1>
    {paragraphs.map(p=><p key={p}>{p}</p>)}
    <p className="history-last">Do jovem Salvador ao King Bow, há uma história que vai muito além da música.</p>
    <Link className="history-return" href="/#musica">EXPLORAR A MÚSICA ↗</Link>
   </article>
  </section>
 </main></>
}
