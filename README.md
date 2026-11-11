# Mr Bow — Website Oficial

Projecto Next.js com uma landing page cinematográfica, responsiva e trilingue (português, inglês e Xitsonga), alojável num servidor próprio. O ramo **main** é a referência de código do projecto. Não existe dependência de Vercel para executar o site.

## Requisitos

- Node.js 20 ou superior
- npm
- Acesso à rede para instalar dependências na primeira execução

## Instalação e arranque no servidor

```bash
git clone https://github.com/Dev-Ruco/mrbow.git
cd mrbow
npm install
npm run check:content
npm run build
npm run start
```

O comando `npm run start` inicia o Next.js na porta 3000 por omissão. Para usar outra porta, por exemplo `PORT=3001 npm run start`. Deve configurar um proxy inverso (Nginx, Caddy ou equivalente), HTTPS e um gestor de processos que reinicie o serviço quando necessário.

Para desenvolvimento local: `npm run dev`.

**Actualização de código no servidor:**

```bash
git pull origin main
npm install
npm run check:content
npm run build
# Reiniciar o serviço Next.js com o gestor de processos configurado no servidor.
```

Não é necessário efectuar qualquer operação no Vercel. O deploy do servidor é independente da actualização do GitHub: o código só muda no servidor quando o mecanismo de deploy ou o administrador executar a actualização.

## Estrutura e funcionalidades

| Localização | Conteúdo |
| --- | --- |
| `src/app/page.tsx` | Hero, biografia, música, discografia, videoclipes, prémios, entrevistas, concerto gravado, espectáculos, agenda e contratações |
| `src/app/historia/page.tsx` | Biografia alargada |
| `src/lib/media.ts` | Cinco participações em podcasts/TV e ligação do concerto gravado |
| `src/lib/content.ts` | Ligações de música, agenda e navegação editorial |
| `src/app/components/LocaleProvider.tsx` | Idioma automático do navegador e selector PT/EN/TS |
| `src/app/components/translations.ts` | Traduções de interface |
| `src/app/components/extraTranslations.ts` | Traduções biográficas, jurídicas e de consentimento |
| `src/app/components/CookiePreferences.tsx` | Preferências de conteúdos externos |
| `src/app/privacidade`, `cookies`, `termos` | Páginas jurídicas |
| `public/images` | Fotografias, álbuns e faixa de áudio |
| `scripts/check-site.mjs` | Verificação editorial de recursos e secções |

### Entrevistas e videoclipes

O arquivo de entrevistas em `src/lib/media.ts` inclui os vídeos fornecidos para: Tu Pra Tu Podcast, MozPod, Rise FM South Africa, Makagui Cast e TeleDiário da STV. O concerto gravado tem ligação própria e usa a fotografia **Mr bow concert.jpg** como pré-visualização.

A secção de videoclipes tem três ligações individuais para o YouTube em `src/app/page.tsx`. As miniaturas remotas aparecem apenas quando o visitante autoriza conteúdo externo; caso contrário são utilizadas imagens locais de substituição. As ligações aos vídeos mantêm-se activas independentemente da escolha.

### Música de abertura

A música **Mr. Bow - Xisuti Xamina.mp3** toca apenas mediante interacção no Hero, com volume máximo de 35%, entrada e saída de 2 segundos, sem repetição automática. A música silencia ao sair do Hero e só volta a tocar mediante um novo clique.

### Idiomas

O site detecta o idioma preferido do navegador e permite seleccionar português, inglês ou Xitsonga. A escolha fica guardada no dispositivo. As versões em Xitsonga, principalmente as páginas jurídicas, requerem revisão final por um falante fluente.

### Conteúdos ainda sujeitos a confirmação

- Confirmar os contactos oficiais de booking e os seus links antes de apresentar o site como fonte contractual definitiva.
- Confirmar a identificação jurídica da entidade responsável pelas políticas do website.
- Validar títulos, datas e conteúdo editorial de entrevistas a partir das fontes originais.
- Acrescentar à agenda apenas datas oficialmente confirmadas.
- Verificar direitos de utilização das imagens, vídeos e música.

## Verificação de integridade

`npm run check:content` verifica referências internas a secções, a presença de 5 entrevistas e 3 videoclipes, a ligação do concerto, a capa, a música e os recursos locais.

`npm run build` continua a ser o teste de compilação obrigatório. A verificação editorial não substitui testes de navegação num navegador real.

## Notas de exploração

- O projecto usa Next.js 15, React 19, TypeScript e CSS próprio.
- Os ficheiros MP3 e as fotografias ficam no directório público do repositório.
- O website não inclui nesta versão um CMS nem uma base de dados de contratações; as ligações de WhatsApp abrem a aplicação externa.
- Não guardar chaves de API, tokens ou credenciais no GitHub. Usar variáveis de ambiente apenas no servidor, quando necessárias.
