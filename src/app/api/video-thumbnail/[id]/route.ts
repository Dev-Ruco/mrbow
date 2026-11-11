import { NextResponse } from "next/server";

/**
 * As miniaturas do YouTube são obtidas pelo servidor, não pelo navegador do
 * visitante. Deste modo os cartões mostram as capas correspondentes aos vídeos
 * mesmo quando os cookies opcionais são recusados.
 *
 * Permite apenas os vídeos que já constam do arquivo do site.
 */
const ALLOWED_VIDEO_IDS = new Set([
 "gUj6XUuaNfw",
 "_crVajIlmYk",
 "1vr_ZwnxCgg",
 "EhSY5XMXBtY",
 "5GIftBftgCM",
 "CGON2RCINUo",
 "anTM78xBGgs",
 "0H0WLhuoAPo",
]);

export async function GET(
 _request:Request,
 {params}:{params:Promise<{id:string}>}
){
 const {id}=await params;
 if(!ALLOWED_VIDEO_IDS.has(id)){
  return NextResponse.json({error:"Vídeo não disponível"},{status:404});
 }

 try{
  const url=`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const upstream=await fetch(url,{
   next:{revalidate:86400},
   signal:AbortSignal.timeout(10000),
  });
  if(!upstream.ok)throw new Error(`YouTube thumbnail status ${upstream.status}`);
  const contentType=upstream.headers.get("content-type")??"";
  if(!contentType.startsWith("image/"))throw new Error("Resposta não é uma imagem");
  const body=await upstream.arrayBuffer();
  return new NextResponse(body,{
   status:200,
   headers:{
    "Content-Type":contentType,
    "Cache-Control":"public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    "X-Content-Type-Options":"nosniff",
   },
  });
 }catch(error){
  console.error("Não foi possível obter a miniatura do vídeo:",id,error);
  return NextResponse.json({error:"Miniatura temporariamente indisponível"},{status:502});
 }
}
