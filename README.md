# ❤️ Nosso Primeiro Ano

Site comemorativo de 1 ano de namoro, uma experiência interativa, cinematográfica e romântica.
Feito com **React + TypeScript + Tailwind CSS + Framer Motion + Lucide Icons**.

Publicado em: **https://r0ssik.github.io/love/**

---

## 🚀 Como rodar

```bash
npm install      # instala as dependências
npm run dev      # inicia em modo desenvolvimento (http://localhost:5173)
npm run build    # gera a versão de produção na pasta dist/
npm run preview  # visualiza a versão de produção
```

---

## ✏️ Como editar (o mais importante!)

**TODO o conteúdo do site fica em um único arquivo:**

```
src/config/site.ts
```

Lá você troca, sem mexer em nenhum componente:

- 👤 nomes e data de início (`couple`)
- 🎬 introdução (frases, foto principal, música ambiente opcional)
- 💬 frases românticas espalhadas (`quotes`)
- 🕰️ timeline / linha do tempo (`timeline`)
- 🖼️ galeria de fotos com abas (`galleryTabs`)
- 🎥 vídeos, YouTube ou arquivo local (`videos`)
- 🎵 músicas com player embutido e links de Spotify/YouTube (`songs`)
- 💌 cartinhas (`letters`)
- 💗 motivos pelos quais te amo (`reasons`)
- 📅 calendário de datas especiais (`calendar`)
- 🗺️ pins do mapa (`map`)
- ⏳ cápsula do tempo (`capsules`)
- ✨ sonhos e bucket list (`dreams`, `bucketList`)
- ❓ quiz do casal (`quiz`)
- 💍 carta final (`finalLetter`)
- 🎮 mini game "Você me ama?" (`game`)

### Fotos, vídeos e músicas

Todos os arquivos de mídia ficam em `public/fotos/` e são referenciados no `site.ts` pelo caminho
`fotos/nome-do-arquivo.ext`. Para adicionar ou trocar um item:

1. Coloque o arquivo em `public/fotos/` (aceita `.jpg`/`.jpeg`, `.mp4`, `.mp3`)
2. No `site.ts`, aponte o campo correspondente para `fotos/nome-do-arquivo.ext`

> **Importante:** o caminho NÃO deve começar com `/`. Como o site é publicado numa subpasta
> (`/love/`) no GitHub Pages, um caminho começando com `/` aponta para a raiz do domínio e a
> imagem quebra em produção (mesmo funcionando local). Sempre use caminhos relativos, sem a
> barra inicial.

### Galeria com abas

A seção `galleryTabs` é uma lista de abas (ex.: "Nós no Instagram", "Nós como realmente somos"),
cada uma com sua própria lista de fotos. A legenda (`caption`) é opcional; se omitida, a foto
aparece sem texto sobreposto.

### Vídeos locais

Vídeos com `type: "local"` não precisam de miniatura (`thumbnail`): se ela for omitida, o próprio
primeiro frame do vídeo vira a capa do card automaticamente.

### Músicas com player embutido

Cada música pode ter um campo `audio` apontando para um `.mp3` local, o que habilita um botão de
play direto no card (com barra de progresso). Um controle de volume flutuante aparece no canto da
tela enquanto alguma faixa estiver tocando. Os botões de Spotify e YouTube continuam disponíveis
independentemente do áudio local.

### Mapa em formato de coração

Os pins do `map` são posicionados para desenhar o contorno de um coração, e a ordem da lista
define o caminho da linha tracejada que os conecta. Ao adicionar ou remover um pin, as posições
`x`/`y` de todos os outros precisam ser recalculadas para manter o formato, não é só soltar um
pin em qualquer canto do mapa.

### Cápsula do tempo

Cada cápsula só pode ser aberta depois da `openDate`. Enquanto a mensagem (`message`) não for
escrita, o texto "Ainda será escrito." aparece no lugar.

### Música ambiente da introdução (opcional)

1. Coloque um `.mp3` em `public/fotos/`
2. No `site.ts`, em `intro`, descomente e ajuste: `ambientMusic: "fotos/nome-do-arquivo.mp3"`

Essa música só começa após o usuário interagir (clicar em "Começar nossa história" ou "pular
introdução").

---

## 🎨 Temas

- **Tema principal:** vermelho escuro / preto / branco
- **Tema alternativo:** branco / lilás / rosa claro

Alterne pelo botão de sol/lua na barra do topo. A preferência é **salva automaticamente**.

As cores ficam em `src/index.css` (variáveis CSS em `:root[data-theme=...]`).

---

## 🥚 Easter eggs

- ✨ Clique na **estrela** no topo → chuva de corações
- ❤ Clique no **coração** do rodapé → chuva de corações
- ⌨️ Digite **`amor`** em qualquer lugar → chuva de corações
- 🎮 O botão **"Não"** do mini game foge de você 😜

---

## 📁 Estrutura

```
src/
├── config/site.ts           ← TUDO que é editável
├── context/ThemeContext.tsx ← troca de tema + persistência
├── hooks/useCountdown.ts    ← contador em tempo real
├── lib/utils.ts             ← utilitários
├── components/
│   ├── chrome/               ← navbar, loading, progresso, tema, voltar-ao-topo
│   ├── effects/               ← fundo de estrelas, chuva de corações
│   ├── ui/                    ← Section, Reveal, FloatingQuote (reutilizáveis)
│   ├── sections/               ← todas as seções do site
│   └── game/                  ← mini game (personagens pixel art + cenário)
├── App.tsx                   ← monta a página
└── main.tsx                  ← ponto de entrada

public/fotos/                 ← todas as fotos, vídeos e músicas
.github/workflows/deploy.yml  ← publica automaticamente no GitHub Pages
```

---

## 🌐 Publicação (GitHub Pages)

Todo push na branch `main` dispara o workflow `.github/workflows/deploy.yml`, que builda o site e
publica em **https://r0ssik.github.io/love/**. Para isso funcionar, o repositório precisa ter em
**Settings → Pages → Build and deployment → Source** a opção **"GitHub Actions"** selecionada.

O `base` do Vite (em `vite.config.ts`) está fixado em `/love/` para bater com a URL do GitHub
Pages. Se o repositório for renomeado, esse valor precisa ser atualizado junto.

Feito com muito carinho ❤️
