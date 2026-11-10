/**
 * Arquivo de entrevistas e participações de Mr Bow.
 * Os cinco vídeos foram fornecidos para esta secção; nomes de programas,
 * categorias e datas aguardam confirmação editorial.
 */
export type MediaCategory = "podcast" | "televisao" | "imprensa" | "entrevista";
export type MediaAppearance = {
 id:string;
 category:MediaCategory;
 title:string;
 outlet:string;
 date?:string;
 url:string;
 image?:string;
};
const interviewIds=["EhSY5XMXBtY","5GIftBftgCM","CGON2RCINUo","anTM78xBGgs","0H0WLhuoAPo"];
export const mediaAppearances:MediaAppearance[]=interviewIds.map((videoId,index)=>({
 id:`entrevista-${String(index+1).padStart(2,"0")}`,
 category:"entrevista",
 title:`Entrevista em vídeo ${String(index+1).padStart(2,"0")}`,
 outlet:"YouTube",
 url:`https://www.youtube.com/watch?v=${videoId}`,
 image:`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}));
export const featuredLiveConcert={
 id:"concerto-gravado-01",
 title:"MR BOW AO VIVO",
 subtitle:"Uma experiência de concerto para reviver.",
 outlet:"YouTube",
 url:"https://www.youtube.com/watch?v=g60bxgViQHE",
 image:"https://img.youtube.com/vi/g60bxgViQHE/maxresdefault.jpg",
 fallbackImage:"https://img.youtube.com/vi/g60bxgViQHE/hqdefault.jpg",
 localImage:"/images/Mr%20bow%20concert.jpg"
};
