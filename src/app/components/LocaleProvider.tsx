"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import type { Locale } from "./translations";
import { extraTranslations } from "./extraTranslations";

const LOCALE_KEY = "mrbow_language_v1";
const LocaleContext = createContext<{locale:Locale;setLocale:(value:Locale)=>void}>({locale:"pt",setLocale:()=>{}});
const baseText = new WeakMap<Text,{original:string;last:string}>();
const baseAttrs = new WeakMap<Element,Map<string,{original:string;last:string}>>();
const ignoreTags = new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","CODE","OPTION"]);
const translatableAttributes = ["aria-label","title","alt","placeholder"];
const dict = {
 en:{...translations.en,...extraTranslations.en},
 ts:{...translations.ts,...extraTranslations.ts}
};

function browserLocale():Locale {
 try {
  const stored=localStorage.getItem(LOCALE_KEY);
  if(stored==="pt"||stored==="en"||stored==="ts")return stored;
 } catch { /* Sem acesso a armazenamento local */ }
 const languages = navigator.languages?.length?navigator.languages:[navigator.language||"pt"];
 // Respeita a primeira preferência linguística, incluindo subvariantes en-US, pt-MZ e ts-ZA.
 const primary=languages[0]?.toLowerCase().split("-")[0];
 return primary==="en"?"en":primary==="ts"?"ts":"pt";
}

function translate(source:string,locale:Locale):string {
 if(locale==="pt")return source;
 const table=dict[locale];
 const key=source.trim();
 if(!key)return source;
 let translated=table[key];
 if(!translated){
  const video=key.match(/^VER VIDEOCLIPE (\d+)$/);
  if(video) translated=(locale==="en"?"WATCH MUSIC VIDEO ":"VONA VHIDIYO YA RISIMU ")+video[1];
 }
 if(!translated){
  const search=key.match(/^Ver videoclip (\d+) de Mr Bow no YouTube$/);
  if(search) translated=(locale==="en"?"Watch Mr Bow music video ":"Vona vhidi yo ya Mr Bow ")+search[1]+(locale==="en"?" on YouTube":" eka YouTube");
 }
 if(!translated){
  const slide=key.match(/^Mostrar (slide|destaque) (\d+)(.*)$/i);
  if(slide)translated=(locale==="en"?"Show slide ":"Komba silayidi ")+slide[2]+slide[3];
 }
 if(!translated)return source;
 const match=source.match(/^(\s*)(.*?)(\s*)$/s);
 return match?match[1]+translated+match[3]:translated;
}

function translateTextNode(node:Text,locale:Locale){
 if(node.parentElement&&ignoreTags.has(node.parentElement.tagName))return;
 if(node.parentElement?.closest("[data-no-translate]"))return;
 const value=node.nodeValue??"";
 let base=baseText.get(node);
 if(!base){base={original:value,last:value};baseText.set(node,base);}
 else if(value!==base.last){base.original=value;base.last=value;}
 const next=translate(base.original,locale);
 if(value!==next){base.last=next;node.nodeValue=next;}
}

function translateAttributes(element:Element,locale:Locale){
 if(element.closest("[data-no-translate]"))return;
 let stored=baseAttrs.get(element);
 if(!stored){stored=new Map();baseAttrs.set(element,stored);}
 for(const attr of translatableAttributes){
  const value=element.getAttribute(attr);
  if(value===null)continue;
  let base=stored.get(attr);
  if(!base){base={original:value,last:value};stored.set(attr,base);}
  else if(value!==base.last){base.original=value;base.last=value;}
  const next=translate(base.original,locale);
  if(next!==value){base.last=next;element.setAttribute(attr,next);}
 }
}

function translateTree(root:Node,locale:Locale){
 if(root.nodeType===Node.TEXT_NODE){translateTextNode(root as Text,locale);return;}
 if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
 if(root.nodeType===Node.ELEMENT_NODE)translateAttributes(root as Element,locale);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
 let current:Node|null;
 while((current=walker.nextNode())){
  if(current.nodeType===Node.TEXT_NODE)translateTextNode(current as Text,locale);
  else translateAttributes(current as Element,locale);
 }
}

function translateMetadata(locale:Locale){
 const route=window.location.pathname;
 const titles:Record<string,Record<Locale,string>>={
  "/":{pt:"Mr Bow | Site Oficial",en:"Mr Bow | Official Website",ts:"Mr Bow | Webusayiti ya Ximfumo"},
  "/historia":{pt:"A História de Mr Bow",en:"The Story of Mr Bow",ts:"Matimu ya Mr Bow"},
  "/privacidade":{pt:"Política de Privacidade | Mr Bow",en:"Privacy Policy | Mr Bow",ts:"Pholisi ya Xihundla | Mr Bow"},
  "/cookies":{pt:"Política de Cookies | Mr Bow",en:"Cookie Policy | Mr Bow",ts:"Pholisi ya Tikuki | Mr Bow"},
  "/termos":{pt:"Termos de Utilização | Mr Bow",en:"Terms of Use | Mr Bow",ts:"Milawu ya Matirhiselo | Mr Bow"}
 };
 document.title=(titles[route]??titles["/"])[locale];
 const description=document.querySelector<HTMLMetaElement>('meta[name="description"]');
 if(description){
  const value=locale==="en"?"The official world of Mr Bow. Music, videos, live shows, his story and bookings.":locale==="ts"?"Misava ya ximfumo ya Mr Bow. Tinsimu, tivhidiyo, minkombiso, matimu ni ku hira.":"O universo oficial de Mr Bow. Música, vídeos, espectáculos, história e contratações.";
  description.setAttribute("content",value);
 }
}

export function LocaleProvider({children}:{children:ReactNode}){
 const [locale,setLocaleState]=useState<Locale>("pt");
 const setLocale=useCallback((value:Locale)=>{
  setLocaleState(value);
  try{localStorage.setItem(LOCALE_KEY,value);}catch{/* Local storage opcional */}
 },[]);
 useEffect(()=>{
  setLocaleState(browserLocale());
  const onLanguageChange=()=>{
   try{if(localStorage.getItem(LOCALE_KEY))return;}catch{/* Sem armazenamento */}
   setLocaleState(browserLocale());
  };
  window.addEventListener("languagechange",onLanguageChange);
  return()=>window.removeEventListener("languagechange",onLanguageChange);
 },[]);
 useEffect(()=>{
  document.documentElement.lang=locale==="pt"?"pt-MZ":locale==="ts"?"ts":"en";
  translateMetadata(locale);
  translateTree(document.body,locale);
  let scheduled=false;
  const observer=new MutationObserver(()=>{
   if(scheduled)return;
   scheduled=true;
   queueMicrotask(()=>{
    scheduled=false;
    translateTree(document.body,locale);
    translateMetadata(locale);
   });
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:translatableAttributes});
  return()=>observer.disconnect();
 },[locale]);
 return <LocaleContext.Provider value={{locale,setLocale}}>{children}</LocaleContext.Provider>;
}

export function LanguageSwitcher(){
 const {locale,setLocale}=useContext(LocaleContext);
 return <div className="site-language-switcher" role="group" aria-label="Idioma do site / Website language / Ririmi ra webusayiti">
  {([{code:"pt",name:"Português"},{code:"en",name:"English"},{code:"ts",name:"Xitsonga"}] as const).map(({code,name})=>
   <button type="button" key={code} lang={code} title={name} aria-label={name} aria-pressed={locale===code} className={locale===code?"is-active":""} onClick={()=>setLocale(code)}>{code==="ts"?"TS":code.toUpperCase()}</button>
  )}
 </div>;
}
