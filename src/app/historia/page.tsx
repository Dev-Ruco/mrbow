import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
 title:"A História de Mr Bow",
 description:"Das origens em Manjacaze ao percurso artístico de Mr Bow. Conheça a história de Salvador Pedro Maiaze.",
};

const paragraphs=[
 "Antes de se tornar Mr. Bow, Salvador Pedro Maiaze era um jovem de Manjacaze, na província de Gaza, com uma paixão pela música e a determinação de construir o seu próprio caminho.",
 "Deixou a terra natal à procura de oportunidades e, em Maputo, conciliou diferentes trabalhos com o sonho de viver da música. Chegou a vender produtos no mercado para financiar as suas primeiras gravações, num percurso marcado por desafios, sacrifícios e decisões que moldaram a sua trajectória.",
 "Com o tempo, encontrou na sua identidade cultural uma das maiores forças da sua expressão artística, transformando as raízes moçambicanas numa assinatura musical reconhecida dentro e fora do País.",
 "Hoje, para além do artista, existe um homem cuja história também se constrói na família, no empreendedorismo e na vontade de abrir caminhos para outros.",
];

export default function Historia(){
 return <main className="history-page">
  <header className="history-nav"><Link href="/#artista">← VOLTAR À LANDING PAGE</Link><Link className="history-brand" href="/">MR BOW.</Link></header>
  <section className="history-content">
   <div className="history-photo"><img src="/images/Elegant%20Tuxedo%20Portrait%20Cutout.png" alt="Mr Bow com fato preto e óculos escuros"/></div>
   <article className="history-text">
    <span className="eyebrow">THE MAN BEHIND THE MUSIC</span>
    <h1>DO SALVADOR<br/>AO <em>KING BOW.</em></h1>
    {paragraphs.map(p=><p key={p}>{p}</p>)}
    <p className="history-last">Do jovem Salvador ao King Bow, há uma história que vai muito além da música.</p>
    <Link className="history-return" href="/#musica">EXPLORAR A MÚSICA ↗</Link>
   </article>
  </section>
 </main>
}
