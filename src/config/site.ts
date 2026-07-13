/* =============================================================================
 *  ARQUIVO DE CONFIGURAÇÃO ÚNICO
 * -----------------------------------------------------------------------------
 *  TUDO que aparece no site é editável aqui. Troque fotos, textos, datas,
 *  músicas, cartas, sonhos, etc. sem precisar mexer em nenhum componente.
 *
 *  Dica: para trocar as fotos, basta colocar seus arquivos na pasta /public
 *  e apontar o caminho (ex: "/fotos/nossa-foto.jpg") ou usar uma URL.
 * ========================================================================== */

// ---------------------------------------------------------------------------
// TIPOS (te ajudam com autocomplete e evitam erros de digitação)
// ---------------------------------------------------------------------------
export interface Couple {
  personName: string; // seu nome
  partnerName: string; // nome dela
  startDate: string; // ISO: "2025-07-16T00:00:00"
  hashtag: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  image: string;
  /** Enquadramento da foto no recorte (padrão: "center"). */
  imagePosition?: "top" | "center" | "bottom";
}

export interface GalleryPhoto {
  src: string;
  /** Legenda opcional — se omitida, a foto aparece sem texto sobreposto. */
  caption?: string;
}

export interface GalleryTab {
  id: string;
  label: string;
  photos: GalleryPhoto[];
}

export interface VideoItem {
  title: string;
  description: string;
  /** Se omitida em vídeos locais, o primeiro frame do vídeo vira a capa automaticamente. */
  thumbnail?: string;
  /** URL do YouTube (embed automático) ou caminho de arquivo local .mp4 */
  url: string;
  type: "youtube" | "local";
}

export interface SongItem {
  title: string;
  artist: string;
  description: string;
  cover: string;
  spotify: string;
  youtube: string;
  /** Caminho de um arquivo de áudio local em /public, opcional (habilita o play direto no card). */
  audio?: string;
}

export interface LetterItem {
  label: string; // texto no envelope
  title: string;
  body: string;
}

export interface ReasonItem {
  icon: string; // nome de um ícone lucide (ver mapa em ReasonsSection)
  title: string;
  text: string;
}

export interface CalendarEvent {
  date: string; // ISO "2025-07-16"
  title: string;
  memory: string;
}

export interface MapPin {
  label: string;
  place: string;
  description: string;
  /** posição em % dentro do mapa estilizado (0-100) */
  x: number;
  y: number;
}

export interface CapsuleItem {
  openLabel: string; // "Abrir em 2 anos"
  openDate: string; // ISO da data em que "libera"
  message: string;
}

export interface DreamItem {
  text: string;
  done: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface SiteConfig {
  couple: Couple;
  intro: {
    starLines: string[];
    mainPhoto: string;
    ctaLabel: string;
    ambientMusic?: string; // caminho de um mp3 opcional em /public
  };
  quotes: string[]; // frases românticas espalhadas pelo site
  timeline: TimelineItem[];
  galleryTabs: GalleryTab[];
  videos: VideoItem[];
  songs: SongItem[];
  letters: LetterItem[];
  reasons: ReasonItem[];
  calendar: CalendarEvent[];
  map: MapPin[];
  capsules: CapsuleItem[];
  dreams: DreamItem[];
  bucketList: DreamItem[];
  quiz: QuizQuestion[];
  finalLetter: {
    greeting: string;
    paragraphs: string[];
    signature: string;
  };
  game: {
    introLine: string;
    question: string;
    yesLabel: string;
    noLabel: string;
    noTeases: string[]; // frases quando tenta clicar no "Não"
    successLines: string[]; // mensagens finais da historinha
    backLabel: string;
  };
  footer: {
    message: string;
  };
}

// ---------------------------------------------------------------------------
// CONFIGURAÇÃO (edite à vontade 💗)
// ---------------------------------------------------------------------------
export const config: SiteConfig = {
  couple: {
    personName: "Rossik",
    partnerName: "Letícia",
    startDate: "2025-07-16T00:00:00",
    hashtag: "", // deixe vazio para não exibir
  },

  intro: {
    starLines: [
      "Existe um dia em que tudo mudou...",
      "Um dia em que o mundo ficou mais bonito...",
      "O dia em que a nossa história começou.",
    ],
    mainPhoto: "/fotos/1.jpeg",
    ctaLabel: "Começar nossa história",
    // ambientMusic: "/musica-ambiente.mp3", // opcional
  },

  quotes: [
    "Te escolher todos os dias é a coisa mais fácil que eu já fiz.",
    "Você é minha maior certeza, meu maior acerto.",
    "Meu lugar favorito no mundo é do seu lado.",
    "Você é a melhor parte de todos os meus dias.",
    "Eu não acredito mais em coincidências desde que te encontrei.",
  ],

  timeline: [
    {
      date: "Primeira conversa",
      title: "O primeiro 'oi'",
      description:
        "Lembro de ver o seu perfil e te achar linda logo de cara. Depois, nos stories, descobri que você também era inteligente, e foi aí que soube que precisava puxar assunto.",
      image: "/fotos/2.jpeg",
      imagePosition: "top",
    },
    {
      date: "Primeiro encontro",
      title: "Nosso primeiro encontro",
      description:
        "Na primeira vez que te vi, já soube o que queria: você era a mulher mais linda que os meus olhos já tinham visto. Aquele café acabou sendo o melhor que eu já tomei na vida.",
      image: "/fotos/3.jpeg",
    },
    {
      date: "Primeiro beijo",
      title: "Aquele beijo",
      description:
        "Na hora, eu virei o rosto e me arrependi na mesma hora. Passei a noite inteira esperando o dia seguinte para consertar aquilo, e foi assim que nasceu o meu maior acerto.",
      image: "/fotos/4.jpeg",
    },
    {
      date: "Primeira viagem",
      title: "Nossa primeira aventura",
      description:
        "Passamos o Natal juntos em uma chácara em Bragança Paulista, onde tive o prazer de conhecer sua família de perto. Foi a nossa primeira viagem, e o começo de fazer parte da sua história também.",
      image: "/fotos/5.jpeg",
    },
    {
      date: "Primeiro aniversário",
      title: "1 ano de nós",
      description:
        "E 365 dias depois, a única certeza que tenho é essa: hoje eu te amo mais do que ontem, e menos do que amanhã.",
      image: "/fotos/6.jpeg",
    },
  ],

  // Galeria com abas. A ordem das fotos é propositalmente embaralhada
  // (não segue a numeração dos arquivos).
  galleryTabs: [
    {
      id: "instagram",
      label: "Nós no Instagram",
      photos: [
        { src: "/fotos/57.jpeg" },
        { src: "/fotos/3.jpeg" },
        { src: "/fotos/9.jpeg", caption: "Um dia perfeito" },
        { src: "/fotos/71.jpeg" },
        { src: "/fotos/5.jpeg" },
        { src: "/fotos/52.jpeg" },
        { src: "/fotos/8.jpeg", caption: "Só nós dois" },
        { src: "/fotos/74.jpeg" },
        { src: "/fotos/58.jpeg" },
        { src: "/fotos/10.jpeg", caption: "Momentos que guardo pra sempre" },
        { src: "/fotos/51.jpeg" },
        { src: "/fotos/6.jpeg" },
        { src: "/fotos/73.jpeg" },
        { src: "/fotos/2.jpeg" },
        { src: "/fotos/55.jpeg" },
        { src: "/fotos/7.jpeg", caption: "Nosso sorriso favorito ❤️" },
        { src: "/fotos/70.jpeg" },
        { src: "/fotos/4.jpeg" },
        { src: "/fotos/59.jpeg" },
        { src: "/fotos/72.jpeg" },
        { src: "/fotos/53.jpeg" },
        { src: "/fotos/56.jpeg" },
        { src: "/fotos/54.jpeg" },
      ],
    },
    {
      id: "real",
      label: "Nós como realmente somos",
      photos: [
        { src: "/fotos/107.jpeg" },
        { src: "/fotos/101.jpeg" },
        { src: "/fotos/113.jpeg" },
        { src: "/fotos/104.jpeg" },
        { src: "/fotos/110.jpeg" },
        { src: "/fotos/100.jpeg" },
        { src: "/fotos/108.jpeg" },
        { src: "/fotos/114.jpeg" },
        { src: "/fotos/102.jpeg" },
        { src: "/fotos/111.jpeg" },
        { src: "/fotos/105.jpeg" },
        { src: "/fotos/109.jpeg" },
        { src: "/fotos/103.jpeg" },
        { src: "/fotos/112.jpeg" },
        { src: "/fotos/106.jpeg" },
      ],
    },
  ],

  videos: [
    {
      title: "Um vídeo nosso que eu gosto",
      description: "Nós juntos <3",
      url: "/fotos/video1.mp4",
      type: "local",
    },
    {
      title: "Um passeio engraçado",
      description: "Prova de que a gente é o casal mais bobo do mundo.",
      url: "/fotos/video2.mp4",
      type: "local",
    },
  ],

  songs: [
    {
      title: "They Don't Know About Us",
      artist: "One Direction",
      description: "Te dedico esta.",
      cover: "/fotos/music1.jpeg",
      spotify: "https://open.spotify.com/search/They%20Don%27t%20Know%20About%20Us%20One%20Direction",
      youtube: "https://www.youtube.com/results?search_query=They+Don%27t+Know+About+Us+One+Direction",
      audio: "/fotos/1.mp3",
    },
    {
      title: "Married Life",
      artist: "Trilha sonora de Up: Altas Aventuras",
      description: "Sempre que escuto, lembro de você.",
      cover: "/fotos/music2.jpeg",
      spotify: "https://open.spotify.com/search/Married%20Life%20Up",
      youtube: "https://www.youtube.com/results?search_query=Married+Life+Up+Pixar",
      audio: "/fotos/2.mp3",
    },
    {
      title: "Aliança",
      artist: "Tribalistas",
      description: "Sem motivo, só porque a vida com você é assim.",
      cover: "/fotos/music3.jpeg",
      spotify: "https://open.spotify.com/search/Alian%C3%A7a%20Tribalistas",
      youtube: "https://www.youtube.com/results?search_query=Alian%C3%A7a+Tribalistas",
      audio: "/fotos/3.mp3",
    },
  ],

  letters: [
    {
      label: "Para você ler quando sentir saudade",
      title: "Quando bater a saudade",
      body: "Respire. Feche os olhos. Eu estou aqui, e se ainda não cheguei, estou dando o meu máximo para chegar até você. Você é amada além de tudo o que se pode expressar em palavras. Leia isso sempre que precisar. ❤️",
    },
    {
      label: "Para os dias difíceis",
      title: "Nos dias cinzas",
      body: "Nem todo dia é ensolarado, e tudo bem. Nós somos time nos dias bons e nos difíceis. Segura na minha mão que a gente supera qualquer desafio.",
    },
    {
      label: "Só porque sim",
      title: "Um lembrete",
      body: "Você é incrível. Do jeitinho que é. Esse envelope existe só pra te lembrar disso num dia qualquer. Eu te amo.",
    },
  ],

  reasons: [
    { icon: "smile", title: "Seu sorriso", text: "Ilumina qualquer ambiente e o meu dia inteiro." },
    { icon: "hand", title: "Seu abraço", text: "O lugar mais seguro e aconchegante do mundo." },
    { icon: "bird", title: "Seu bico", text: "O maior e mais fofo bico do mundo." },
    { icon: "heart", title: "Seu carinho", text: "Delicado, sincero e do tamanho do universo." },
    { icon: "sparkles", title: "Nossa conexão", text: "A gente se entende só no olhar." },
    { icon: "users", title: "Nossa parceria", text: "Somos um time imbatível em tudo." },
  ],

  calendar: [
    { date: "2025-02-26", title: "O dia que te chamei para conversar", memory: "O dia em que reuni coragem e te chamei para conversar." },
    { date: "2025-03-11", title: "Primeira vez pessoalmente", memory: "A primeira vez que nos vimos pessoalmente, e a primeira vez que te dei flores e uma pulseira." },
    { date: "2025-07-16", title: "O pedido de namoro", memory: "O dia em que te pedi em namoro, e você me disse sim." },
    { date: "2025-12-24", title: "Primeira viagem", memory: "Passamos o Natal juntos em uma chácara em Bragança Paulista, onde conheci sua família de perto." },
    { date: "2026-07-07", title: "Primeira festa junina", memory: "Nossa primeira festa junina juntos." },
  ],

  // Os pins seguem, em ordem, o contorno de um coração — a linha tracejada
  // que os liga desenha o formato ao passar de um lugar para o próximo.
  map: [
    { label: "Primeiro encontro", place: "Café Pérola Mineira", description: "Onde nos vimos pessoalmente pela primeira vez.", x: 50, y: 34.4 },
    { label: "Nosso lanche", place: "McDonald's", description: "Quando você falar que quer só um docinho...", x: 51.9, y: 27.4 },
    { label: "Nosso point", place: "Shopping Hortolândia", description: "Um dos nossos points para passear.", x: 60.8, y: 20 },
    { label: "Nosso point", place: "Shopping Dom Pedro", description: "Onde a gente também gosta de dar uma volta.", x: 71, y: 28.1 },
    { label: "Nosso point", place: "Shopping Iguatemi", description: "Mais um lugar nosso de passeio.", x: 71, y: 45.3 },
    { label: "Ao ar livre", place: "Taquaral", description: "Um passeio ao ar livre que a gente ama.", x: 60.8, y: 61.1 },
    { label: "Nosso lanche", place: "Grelha Burger", description: "Onde comemos um dos nossos hambúrgueres favoritos.", x: 51.9, y: 74.1 },
    { label: "Sempre com a gente", place: "Civic", description: "Nosso parceiro para ir para todos estes lugares.", x: 50, y: 80 },
    { label: "Nossa rotina", place: "UNASP-HT", description: "Um lugar que faz parte da nossa rotina.", x: 48.2, y: 74.1 },
    { label: "Nosso lar", place: "Minha casa", description: "Onde tudo fica ainda mais gostoso, porque você está por perto.", x: 39.2, y: 61.1 },
    { label: "Nosso lar", place: "Sua casa", description: "Meu segundo lar, porque você está lá.", x: 29, y: 45.3 },
    { label: "Nosso cantinho", place: "Venda do Seu Joaquim", description: "Aquele lugarzinho que também é nosso.", x: 29, y: 28.1 },
    { label: "Nosso programa", place: "Cinemas", description: "Onde assistimos filme grudadinhos.", x: 39.2, y: 20 },
    { label: "Nosso lugar", place: "Nova Pampa", description: "Mais um lugar especial da nossa história.", x: 48.2, y: 27.4 },
  ],

  // Mensagens ainda não escritas de propósito, serão preenchidas mais perto da data de abertura.
  capsules: [
    { openLabel: "Abrir em 2 anos", openDate: "2027-07-16", message: "Ainda será escrito." },
    { openLabel: "Abrir em 5 anos", openDate: "2030-07-16", message: "Ainda será escrito." },
    { openLabel: "Abrir em 10 anos", openDate: "2035-07-16", message: "Ainda será escrito." },
  ],

  dreams: [
    { text: "Nos casar e viver essa história para sempre.", done: false },
    { text: "Viajar o mundo ao seu lado.", done: false },
    { text: "Conhecer Japão, Seattle e Hogwarts juntos.", done: false },
    { text: "Criar o Levi e seu irmão, nossa futura família.", done: false },
    { text: "Conquistar nosso apartamento ou casa.", done: false },
    { text: "Construir o seu consultório de psicologia.", done: false },
    { text: "Ter o nosso quarto gamer.", done: false },
  ],

  bucketList: [
    { text: "Te levar para uma cachoeira", done: false },
    { text: "Ir a um show juntos (quando o Sleep Token vier, eu te levo)", done: false },
    { text: "Fazer você assistir One Piece inteiro, desde o episódio 0", done: false },
  ],

  quiz: [
    {
      question: "Onde foi nosso primeiro encontro?",
      options: ["No cinema", "Naquele café", "No parque", "Na casa de um amigo"],
      answerIndex: 1,
    },
    {
      question: "Qual é a nossa comida favorita para comer juntos?",
      options: ["Pizza", "Frango Frito", "Sushi", "Hambúrguer"],
      answerIndex: 1,
    },
    {
      question: "Qual apelido eu mais te chamo?",
      options: ["Amor", "Vida", "Nenê", "Bico"],
      answerIndex: 3,
    },
    {
      question: "Para onde fomos na nossa primeira viagem?",
      options: ["Bragança Paulista", "Campos do Jordão", "Ubatuba", "Holambra"],
      answerIndex: 0,
    },
  ],

  finalLetter: {
    greeting: "Meu amor,",
    paragraphs: [
      "Há um ano a minha vida ganhou uma cor nova. Você chegou devagar e, sem eu perceber, virou o meu lugar preferido no mundo.",
      "Obrigado por cada risada, cada abraço apertado, cada 'bom dia' e cada 'boa noite'. Por me escolher nos dias fáceis e principalmente nos difíceis.",
      "Que este seja só o primeiro de muitos anos. Eu quero envelhecer contando as suas manias e colecionando os nossos 'primeiros' de novo e de novo.",
    ],
    signature: "Com todo o meu amor, para sempre.",
  },

  game: {
    introLine: "Tenho uma perguntinha muito importante...",
    question: "Você me ama? ❤️",
    yesLabel: "Sim",
    noLabel: "Não",
    noTeases: [
      "Tem certeza?",
      "Essa opção parece estar quebrada.",
      "Quase conseguiu!",
      "Não vale essa resposta.",
      "Você sabe qual é a certa. 😌",
      "Ok, agora ele foge de vez.",
    ],
    successLines: ["Eu sabia ❤️", "Eu também te amo infinitamente."],
    backLabel: "Voltar",
  },

  footer: {
    message: "Feito com muito amor, só para você.",
  },
};

export default config;
