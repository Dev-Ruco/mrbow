# Mr Bow — Site Oficial

Primeira versão da página inicial, com identidade visual cinematográfica e internacional.

## Tecnologia
- Next.js App Router, React, TypeScript e CSS responsivo
- Lucide React para ícones
- Estrutura de conteúdos em `src/lib/content.ts` para futura ligação ao CMS e à Bawito Music

## Executar
```bash
npm install
npm run dev
```
Abrir http://localhost:3000.

## Estrutura
- `src/app/layout.tsx` — metadados e layout global
- `src/app/page.tsx` — hero, música, agenda, biografia, media, contratações
- `src/app/globals.css` — sistema visual e responsividade
- `src/lib/content.ts` — conteúdos editáveis e dados provisórios

## Antes de publicar
1. Substituir todas as fotografias ilustrativas (Unsplash) por fotografias oficiais licenciadas de Mr Bow.
2. Confirmar o e-mail de booking e as ligações exactas das redes sociais e plataformas de música.
3. Validar a biografia e acrescentar discografia oficial, agenda confirmada e galerias.
4. Integrar pedidos de contratação com serviço de backend seguro; **não expor a Bawito Music nem os dados financeiros no frontend**.
5. Configurar o domínio e confirmar `metadataBase`.
6. Testar `npm run build` no ambiente de instalação.

## Próximas fases
CMS e autenticação; agenda gerida por eventos autorizados da Bawito; discografia; notícias; galerias; formulário de propostas com validação e protecção anti-spam; páginas bilingues e SEO estruturado.

**Nota:** Nesta fase, a navegação é por secções na página inicial. Os conteúdos de demonstração não devem ser tratados como dados oficiais do artista.
