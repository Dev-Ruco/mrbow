#!/usr/bin/env node
/**
 * Verificação de integridade editorial do site Mr Bow.
 * Executar: npm run check:content
 * Sem dependências externas e sem acesso à rede.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const page=read("src/app/page.tsx");
const media=read("src/lib/media.ts");
const errors=[];
const check=(passed,reason)=>{if(!passed)errors.push(reason);};
const sections=["inicio","artista","musica","videos","premios","entrevistas","concerto-gravado","ao-vivo","agenda","booking"];
for(const id of sections)check(page.includes(`id="${id}"`),`Secção em falta: #${id}`);

const interviewIds=["EhSY5XMXBtY","5GIftBftgCM","CGON2RCINUo","anTM78xBGgs","0H0WLhuoAPo"];
const videoIds=["gUj6XUuaNfw","_crVajIlmYk","1vr_ZwnxCgg"];
for(const id of interviewIds)check(media.includes(id),`Entrevista em falta: ${id}`);
for(const id of videoIds)check(page.includes(id),`Videoclipe em falta: ${id}`);
check(media.includes("g60bxgViQHE"),"Concerto gravado sem ligação ao vídeo");
check(fs.existsSync(path.join(root,"src/app/api/video-thumbnail/[id]/route.ts")),"Rota interna de miniaturas não encontrada");
check(page.includes('src={`/api/video-thumbnail/${video.id}`}'),"As capas dos videoclipes não utilizam as miniaturas correspondentes");
check(page.includes('src={`/api/video-thumbnail/${appearance.url.split("v=")[1]}`}'),"As capas das entrevistas não utilizam as miniaturas correspondentes");
check(!page.includes("allowExternalMedia?"),"As miniaturas não devem depender dos cookies opcionais");
check(page.includes('"/images/Mr%20bow%20concert.jpg"'),"Capa do concerto incorrecta");
check(page.includes("const targetVolume=.35;"),"Volume musical diferente de 35%");
check(page.includes("const fadeDuration=2000;"),"Duração dos fades diferente de 2 segundos");
check(!/<audio[^>]*\sloop(?:\s|=|\/|>)/i.test(page),"A música não deve estar em loop");

const seen=new Set();
for(const file of ["src/app/page.tsx","src/lib/media.ts"]){
 const source=read(file);
 for(const [, ,url] of source.matchAll(/(["'`])(\/images\/[^"'`\s}]+)\1/g)){
  const relative=decodeURIComponent(url.slice(1));
  if(seen.has(relative))continue;
  seen.add(relative);
  check(fs.existsSync(path.join(root,"public",relative)),`Imagem/áudio inexistente (${file}): ${url}`);
 }
}
for(const route of ["historia","privacidade","cookies","termos"]){
 check(fs.existsSync(path.join(root,"src","app",route,"page.tsx")),`Página inexistente: /${route}`);
}
const allAnchors=new Set([...page.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const [,anchor] of page.matchAll(/(?:href[:=]\s*["']|href=\{["'])(#[a-z0-9-]+)["']/gi)){
 check(allAnchors.has(anchor.slice(1)),`Ligação interna sem destino: ${anchor}`);
}

if(errors.length){
 console.error(`ERRO: ${errors.length} problema(s) encontrados:`);
 for(const error of errors)console.error(" - "+error);
 process.exitCode=1;
}else{
 console.log(`OK: ${sections.length} secções, ${interviewIds.length} entrevistas, ${videoIds.length} videoclipes, concerto e recursos locais.`);
 console.log("Nota: esta verificação não substitui npm run build nem testes no browser.");
}
