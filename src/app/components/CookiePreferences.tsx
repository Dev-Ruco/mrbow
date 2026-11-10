"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type ConsentChoice = "essential" | "all";
const STORAGE_KEY = "mrbow_cookie_preferences_v1";
export const CONSENT_EVENT = "mrbow:consent";

export function getConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const choice = localStorage.getItem(STORAGE_KEY);
    return choice === "essential" || choice === "all" ? choice : null;
  } catch {
    return null;
  }
}

export default function CookiePreferences() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = getConsentChoice();
    setChoice(stored);
    setMediaAllowed(stored === "all");
    setReady(true);
    const show = () => { setCustomizing(true); setOpen(true); };
    window.addEventListener("mrbow:open-cookie-settings", show);
    return () => window.removeEventListener("mrbow:open-cookie-settings", show);
  }, []);

  const save = (next: ConsentChoice) => {
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Preferência apenas nesta sessão */ }
    setChoice(next);
    setMediaAllowed(next === "all");
    setOpen(false);
    setCustomizing(false);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  };

  if (!ready) return null;

  return (
    <>
      {(choice === null || open) && (
        <div className="cookie-panel" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description">
          <div className="cookie-panel-inner">
            <div className="cookie-copy">
              <span className="cookie-eyebrow">PRIVACIDADE & PREFERÊNCIAS</span>
              <h2 id="cookie-title">A SUA EXPERIÊNCIA. A SUA ESCOLHA.</h2>
              <p id="cookie-description">Utilizamos armazenamento local para guardar a sua escolha. Com autorização, também apresentamos miniaturas de vídeos alojadas pelo YouTube, que poderá recolher dados técnicos da visita. Pode recusar sem perder acesso ao conteúdo principal.</p>
              <div className="cookie-legal-links"><Link href="/privacidade">Privacidade</Link><Link href="/cookies">Política de cookies</Link><Link href="/termos">Termos</Link></div>
              {customizing && (
                <div className="cookie-categories">
                  <div><strong>Essenciais</strong><span>Preferências de privacidade e funcionamento da página.</span><b>Sempre activos</b></div>
                  <label><span><strong>Conteúdo externo</strong><small>Miniaturas de videoclipes fornecidas pelo YouTube.</small></span><input type="checkbox" checked={mediaAllowed} onChange={e => setMediaAllowed(e.target.checked)} aria-label="Permitir miniaturas externas do YouTube"/></label>
                </div>
              )}
            </div>
            <div className="cookie-actions">
              {customizing ? (
                <button className="cookie-accept" onClick={() => save(mediaAllowed ? "all" : "essential")} type="button">GUARDAR ESCOLHAS</button>
              ) : (
                <>
                  <button className="cookie-accept" onClick={() => save("all")} type="button">ACEITAR OPCIONAIS</button>
                  <button className="cookie-reject" onClick={() => save("essential")} type="button">RECUSAR OPCIONAIS</button>
                  <button className="cookie-settings" onClick={() => setCustomizing(true)} type="button">PERSONALIZAR</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
