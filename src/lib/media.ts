/**
 * Arquivo de entrevistas e participações de Mr. Bow.
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
export const mediaAppearances:MediaAppearance[]=[
 {id:"entrevista-01",category:"entrevista",title:"Mr. Bow no Tu Pra Tu Podcast",outlet:"TU PRA TU PODCAST",url:"https://www.youtube.com/watch?v=EhSY5XMXBtY",image:"https://img.youtube.com/vi/EhSY5XMXBtY/hqdefault.jpg"},
 {id:"entrevista-02",category:"entrevista",title:"Mr. Bow no MozPod",outlet:"MOZPOD",url:"https://www.youtube.com/watch?v=5GIftBftgCM",image:"https://img.youtube.com/vi/5GIftBftgCM/hqdefault.jpg"},
 {id:"entrevista-03",category:"entrevista",title:"Mr. Bow na Rise FM — África do Sul",outlet:"RISE FM · ÁFRICA DO SUL",url:"https://www.youtube.com/watch?v=CGON2RCINUo",image:"https://img.youtube.com/vi/CGON2RCINUo/hqdefault.jpg"},
 {id:"entrevista-04",category:"entrevista",title:"Mr. Bow no Makagui Cast",outlet:"MAKAGUI CAST",url:"https://www.youtube.com/watch?v=anTM78xBGgs",image:"https://img.youtube.com/vi/anTM78xBGgs/hqdefault.jpg"},
 {id:"entrevista-05",category:"entrevista",title:"Mr. Bow — Entrevista no TeleDiário da STV",outlet:"STV · TELEDIÁRIO",url:"https://www.youtube.com/watch?v=0H0WLhuoAPo",image:"https://img.youtube.com/vi/0H0WLhuoAPo/hqdefault.jpg"}
];
export const featuredLiveConcert={
 id:"concerto-gravado-01",
 title:"MR. BOW AO VIVO",
 subtitle:"Uma experiência de concerto para reviver.",
 outlet:"YouTube",
 url:"https://www.youtube.com/watch?v=g60bxgViQHE",
 image:"https://img.youtube.com/vi/g60bxgViQHE/maxresdefault.jpg",
 fallbackImage:"https://img.youtube.com/vi/g60bxgViQHE/hqdefault.jpg",
 localImage:"/images/Mr%20bow%20concert.jpg"
};
