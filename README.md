# ❤️ Nosso Primeiro Ano

Site comemorativo de 1 ano de namoro — uma experiência interativa, cinematográfica e romântica.
Feito com **React + TypeScript + Tailwind CSS + Framer Motion + Lucide Icons**.

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
- 🖼️ galeria de fotos (`gallery`)
- 🎥 vídeos — YouTube ou arquivo local (`videos`)
- 🎵 músicas com links de Spotify/YouTube (`songs`)
- 💌 cartinhas (`letters`)
- 💗 motivos pelos quais te amo (`reasons`)
- 📅 calendário de datas especiais (`calendar`)
- 🗺️ pins do mapa (`map`)
- ⏳ cápsula do tempo (`capsules`)
- ✨ sonhos e bucket list (`dreams`, `bucketList`)
- ❓ quiz do casal (`quiz`)
- 💍 carta final (`finalLetter`)
- 🎮 mini game "Você me ama?" (`game`)

### Trocar as fotos pelas suas

As fotos usam imagens de exemplo (picsum.photos). Para usar as suas:

1. Coloque seus arquivos na pasta `public/` (ex.: `public/fotos/beijo.jpg`)
2. No `site.ts`, aponte o caminho: `image: "/fotos/beijo.jpg"`

### Música ambiente (opcional)

1. Coloque um `.mp3` em `public/` (ex.: `public/musica.mp3`)
2. No `site.ts`, em `intro`, descomente e ajuste: `ambientMusic: "/musica.mp3"`

A música só começa após o usuário interagir (clicar em "Começar nossa história").

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
├── config/site.ts          ← TUDO que é editável
├── context/ThemeContext.tsx ← troca de tema + persistência
├── hooks/useCountdown.ts    ← contador em tempo real
├── lib/utils.ts             ← utilitários
├── components/
│   ├── chrome/              ← navbar, loading, progresso, tema, voltar-ao-topo
│   ├── effects/             ← fundo de estrelas, chuva de corações
│   ├── ui/                  ← Section, Reveal, FloatingQuote (reutilizáveis)
│   ├── sections/            ← todas as seções do site
│   └── game/                ← mini game (personagens pixel art + cenário)
├── App.tsx                  ← monta a página
└── main.tsx                 ← ponto de entrada
```

Feito com muito carinho ❤️
