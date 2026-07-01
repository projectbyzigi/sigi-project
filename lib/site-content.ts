/* ------------------------------------------------------------------ */
/*  lib/site-content.ts                                                */
/*  Single source of truth for all German copy and structured data.    */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Start", href: "#start" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Projekte", href: "#projekte" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const HERO = {
  eyebrow: "Bauunternehmen · Mallorca",
  headline: "Ihre Traumvilla.\nAus einer Hand gebaut.",
  subline: "Von der Planung bis zur schlüsselfertigen Übergabe.",
  primaryCta: { label: "Projekt besprechen", href: "#kontakt" },
  secondaryCta: { label: "Leistungen ansehen", href: "#leistungen" },
  scrollPrompt: "Scrollen, um den Aufbau zu entdecken",
};

/* ------------------------------------------------------------------ */
/*  Scrollytelling scenes.                                             */
/*  `range` = [start, end] in 0–1 scroll progress and MUST stay in     */
/*  sync with the phase boundaries in lib/sequence.ts.                  */
/* ------------------------------------------------------------------ */
export interface Scene {
  id: string;
  index: string; // display number e.g. "01"
  range: [number, number];
  title: string;
  headline: string;
  text?: string;
  bullets?: string[];
  cta?: { label: string; href: string };
  align?: "left" | "center";
}

export const SCENES: Scene[] = [
  {
    id: "villa",
    index: "01",
    range: [0.0, 0.12],
    title: "Schlüsselfertige Villa",
    headline: "Schlüsselfertige Villen auf Mallorca.",
    text: "Wir begleiten Ihr Projekt von der ersten Idee bis zur fertigen Übergabe.",
    align: "left",
  },
  {
    id: "interiors",
    index: "02",
    range: [0.12, 0.24],
    title: "Innenarchitektur, Küchen & Möbel",
    headline: "Maßgeschneiderte Räume für modernes Wohnen.",
    bullets: [
      "Innenarchitektur",
      "Küchenbau",
      "Möbelbau",
      "Einbauschränke",
      "Individuelle Lösungen",
    ],
    align: "left",
  },
  {
    id: "finishes",
    index: "03",
    range: [0.24, 0.36],
    title: "Premium Innenausbau",
    headline: "Perfektion bis ins Detail.",
    bullets: [
      "Großformatige Fliesen",
      "Naturstein",
      "Parkettböden",
      "Badezimmer",
      "Premium-Oberflächen",
    ],
    align: "left",
  },
  {
    id: "technical",
    index: "04",
    range: [0.36, 0.48],
    title: "Technischer Innenausbau",
    headline: "Qualität hinter den Wänden.",
    bullets: [
      "Elektroinstallation",
      "Sanitärinstallation",
      "Klima- und Haustechnik",
      "Trockenbau",
      "Deckenarbeiten",
    ],
    align: "left",
  },
  {
    id: "shell",
    index: "05",
    range: [0.48, 0.6],
    title: "Gebäudehülle",
    headline: "Schutz, Effizienz und Architektur.",
    bullets: ["Fassaden", "Fenster", "Türen", "Dächer", "Wärmedämmung"],
    align: "left",
  },
  {
    id: "raw",
    index: "06",
    range: [0.6, 0.72],
    title: "Rohbau",
    headline: "Die tragende Struktur Ihres Projekts.",
    bullets: [
      "Betonarbeiten",
      "Mauerwerksarbeiten",
      "Tragwerke",
      "Rohbaukonstruktionen",
    ],
    align: "left",
  },
  {
    id: "foundations",
    index: "07",
    range: [0.72, 0.82],
    title: "Erdarbeiten & Fundamente",
    headline: "Hier beginnt jedes Bauprojekt.",
    bullets: [
      "Erdarbeiten",
      "Aushub",
      "Fundamente",
      "Bodenplatten",
      "Baugrundvorbereitung",
    ],
    align: "left",
  },
  {
    id: "architecture",
    index: "08",
    range: [0.82, 0.95],
    title: "Planung & Architektur",
    headline: "Jedes erfolgreiche Projekt beginnt mit einer Idee.",
    bullets: [
      "Architektur",
      "Planung",
      "Projektentwicklung",
      "3D-Visualisierung",
      "Bauanträge",
    ],
    align: "center",
  },
  {
    id: "all-in-one",
    index: "09",
    range: [0.95, 1.0],
    title: "Alles aus einer Hand",
    headline: "Von der ersten Skizze bis zur schlüsselfertigen Villa.",
    text: "Planung. Architektur. Möbel. Küchen. Innenausbau. Fassade. Rohbau. Fundamente. Alles aus einer Hand.",
    cta: { label: "Projekt besprechen", href: "#kontakt" },
    align: "center",
  },
];

/* ------------------------------------------------------------------ */
/*  Services overview                                                  */
/* ------------------------------------------------------------------ */
export interface Service {
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    title: "Schlüsselfertige Villen",
    description: "Komplette Realisierung von der Idee bis zur Übergabe.",
  },
  {
    title: "Planung & Architektur",
    description: "Architektur, Projektentwicklung und Bauanträge.",
  },
  {
    title: "Innenarchitektur",
    description: "Durchdachte Raumkonzepte für modernes Wohnen.",
  },
  {
    title: "Küchenbau",
    description: "Maßgefertigte Küchen, präzise eingebaut.",
  },
  {
    title: "Möbelbau",
    description: "Einbauschränke und Möbel nach Maß.",
  },
  {
    title: "Premium Innenausbau",
    description: "Naturstein, großformatige Fliesen und Parkett.",
  },
  {
    title: "Technischer Innenausbau",
    description: "Elektro, Sanitär, Klima- und Haustechnik.",
  },
  {
    title: "Fassaden & Gebäudehülle",
    description: "Fassaden, Fenster, Türen, Dächer und Dämmung.",
  },
  {
    title: "Rohbau",
    description: "Beton-, Mauerwerks- und Tragwerksarbeiten.",
  },
  {
    title: "Erdarbeiten & Fundamente",
    description: "Aushub, Fundamente und Baugrundvorbereitung.",
  },
  {
    title: "Renovierung & Sanierung",
    description:
      "Komplette Renovierungen, Umbauten und Sanierungen von Häusern, Villen, Wohnungen und Fincas auf Mallorca.",
  },
  {
    title: "Pools & Außenanlagen",
    description:
      "Poolbau, Poolrenovierung, Terrassen, Natursteinmauern, Gartenbereiche und Außenanlagen.",
  },
];

/* ------------------------------------------------------------------ */
/*  Projects gallery — only real SIGI photos from /public/projects.    */
/*  More images can simply be appended to this array later.            */
/* ------------------------------------------------------------------ */
export type ProjectCategory =
  | "Innenausbau"
  | "Naturstein"
  | "Küchen"
  | "Bäder"
  | "Rohbau"
  | "Renovierung"
  | "Pools"
  | "Außenbereiche";

export interface Project {
  src: string;
  alt: string;
  category: ProjectCategory;
  /** layout hint for the masonry grid */
  span?: "tall" | "wide" | "normal";
}

export const PROJECT_CATEGORIES: ("Alle" | ProjectCategory)[] = [
  "Alle",
  "Innenausbau",
  "Naturstein",
  "Küchen",
  "Bäder",
  "Rohbau",
  "Renovierung",
  "Pools",
  "Außenbereiche",
];

export const PROJECTS: Project[] = [
  // New high-quality photos (2026) — featured first in their categories.
  // Clean ASCII paths under /public/projects (no spaces/umlauts/brackets) for robust serving.
  { src: "/projects/kuche-1.png", alt: "Maßgefertigte Küche von SIGI auf Mallorca", category: "Küchen", span: "tall" },
  { src: "/projects/kuche-2.png", alt: "Moderne Einbauküche mit hochwertigen Oberflächen", category: "Küchen" },
  { src: "/projects/kuche-3.png", alt: "Küchendetail mit Naturstein und Holz", category: "Küchen" },
  { src: "/projects/sigi-4.jpg", alt: "Maßgefertigte Küche mit hochwertigen Oberflächen", category: "Küchen" },
  { src: "/projects/sigi-5.jpg", alt: "Renovierungsprojekt auf Mallorca", category: "Renovierung", span: "wide" },
  { src: "/projects/renovierung-2.png", alt: "Sanierung und Umbau eines Wohnraums", category: "Renovierung" },
  { src: "/projects/renovierung-3.png", alt: "Renovierte Räume mit neuem Innenausbau", category: "Renovierung", span: "tall" },
  { src: "/projects/pool-8.png", alt: "Hochwertige Poolanlage mit Außenbereich", category: "Pools", span: "wide" },
  { src: "/projects/pool-9.png", alt: "Pool- und Wasserbereich einer Villa auf Mallorca", category: "Pools" },
  { src: "/projects/sigi-6.jpg", alt: "Poolanlage einer Villa auf Mallorca", category: "Außenbereiche" },
  { src: "/projects/sigi-7.jpg", alt: "Außenbereich mit Naturstein auf Mallorca", category: "Außenbereiche" },
  { src: "/projects/rohbau-2.png", alt: "Rohbau einer Villa auf Mallorca", category: "Rohbau", span: "tall" },
  { src: "/projects/sigi-3.jpg", alt: "Rohbauarbeiten auf Mallorca", category: "Rohbau" },
  { src: "/projects/pool-1.jpg", alt: "Poolbereich einer Villa auf Mallorca", category: "Pools", span: "wide" },
  { src: "/projects/tiles-1.jpg", alt: "Großformatige Fliesenarbeiten", category: "Naturstein" },
  { src: "/projects/sigi-1.jpg", alt: "Natursteinarbeiten auf Mallorca", category: "Naturstein" },
  { src: "/projects/interior-2.jpg", alt: "Maßgefertigter Innenausbau in Holz", category: "Innenausbau" },
  { src: "/projects/tiles-2.jpg", alt: "Naturstein- und Fliesendetails", category: "Naturstein", span: "tall" },
  { src: "/projects/rohbau-1.jpg", alt: "Rohbau mit Fundamenten und Schalung", category: "Rohbau", span: "wide" },
  { src: "/projects/facade-2.jpg", alt: "Fassadendetail mit Naturstein", category: "Außenbereiche" },
  { src: "/projects/facade-1.jpg", alt: "Natursteinfassade einer Villa", category: "Außenbereiche" },
  { src: "/projects/interior-3.jpg", alt: "Innenausbau mit Holzdekoration", category: "Innenausbau" },
  { src: "/projects/tiles-3.jpg", alt: "Badezimmer mit großformatigen Fliesen", category: "Bäder", span: "tall" },
  { src: "/projects/interior-1.jpg", alt: "Badezimmer mit Innenausbau in Holz", category: "Bäder" },
  { src: "/projects/pool-2.jpg", alt: "Außenbereich mit Pool", category: "Pools" },
  { src: "/projects/facade-3.jpg", alt: "Gebäudehülle und Fassade", category: "Außenbereiche" },
  { src: "/projects/interior-4.jpg", alt: "Wohnraum mit Holzakzenten", category: "Innenausbau", span: "wide" },
  { src: "/projects/tiles-4.jpg", alt: "Natursteinoberflächen im Detail", category: "Bäder" },
  { src: "/projects/pool-3.jpg", alt: "Terrasse und Poolanlage", category: "Pools" },
  { src: "/projects/interior-5.jpg", alt: "Maßmöbel und Innenausbau", category: "Küchen" },
  { src: "/projects/facade-4.jpg", alt: "Fassade einer Mallorca-Villa", category: "Außenbereiche", span: "tall" },
  { src: "/projects/tiles-5.jpg", alt: "Premium-Fliesen im Bad", category: "Bäder" },
  { src: "/projects/pool-4.jpg", alt: "Poolbereich mit Natursteinmauer", category: "Pools" },
  { src: "/projects/interior-6.jpg", alt: "Innenausbau Detailaufnahme", category: "Innenausbau" },
  { src: "/projects/pool-5.jpg", alt: "Gartenanlage mit Pool", category: "Pools", span: "wide" },
  { src: "/projects/facade-5.jpg", alt: "Fassade und Außenwände", category: "Außenbereiche" },
  { src: "/projects/pool-6.jpg", alt: "Außenanlage einer Villa", category: "Pools" },
  { src: "/projects/pool-7.jpg", alt: "Pool und Terrassenbereich", category: "Pools" },
];

/* ------------------------------------------------------------------ */
/*  Real estate / Immobilien block (between Leistungen and Projekte)   */
/* ------------------------------------------------------------------ */
export const REAL_ESTATE = {
  eyebrow: "Immobilien",
  title: "Immobilien mit Baupotenzial",
  body: [
    "Neben Bau- und Renovierungsprojekten unterstützen wir Kunden auch beim Kauf oder Verkauf ausgewählter Immobilien auf Mallorca. Durch unsere Erfahrung als Bauunternehmen können wir Zustand, Umbaupotenzial, Kosten und Machbarkeit realistisch einschätzen.",
    "Ob Villa, Finca, Grundstück oder Renovierungsobjekt – wir begleiten Sie diskret und persönlich.",
  ],
  cta: { label: "Immobilienanfrage senden", href: "#kontakt" },
};

/* ------------------------------------------------------------------ */
/*  Process / Ablauf                                                   */
/* ------------------------------------------------------------------ */
export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const PROCESS: ProcessStep[] = [
  { index: "01", title: "Erstgespräch", description: "Wir hören zu, verstehen Ihre Vision und prüfen die Machbarkeit." },
  { index: "02", title: "Planung & Konzept", description: "Architektur, Raumkonzept und 3D-Visualisierung Ihres Projekts." },
  { index: "03", title: "Angebot & Projektstruktur", description: "Transparente Kalkulation und ein klarer Projektablauf." },
  { index: "04", title: "Ausführung", description: "Rohbau, Innenausbau und Technik — koordiniert aus einer Hand." },
  { index: "05", title: "Qualitätskontrolle", description: "Laufende Kontrolle aller Gewerke bis ins Detail." },
  { index: "06", title: "Übergabe", description: "Schlüsselfertige Übergabe Ihrer fertigen Villa." },
];

/* ------------------------------------------------------------------ */
/*  About / Über uns                                                   */
/* ------------------------------------------------------------------ */
export const ABOUT = {
  eyebrow: "Über uns",
  headline: "Ihr deutschsprachiges Bauunternehmen auf Mallorca.",
  body: "SIGI ist Ihr deutschsprachiges Bauunternehmen auf Mallorca für hochwertige Bauprojekte, Villen, Innenausbau und individuelle Lösungen.",
  bodyExtra:
    "Seit über 30 Jahren realisiert SIGI Bau- und Renovierungsprojekte auf Mallorca – deutschsprachig geführt, mit erfahrenem Team vor Ort.",
  image: "/brand/team-photo.png",
  imageAlt: "Das Team von SIGI Bauunternehmen auf Mallorca",
  stats: [
    { value: "100%", label: "Aus einer Hand" },
    { value: "DE / ES", label: "Deutschsprachig" },
    { value: "Mallorca", label: "Vor Ort" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Contact + Impressum (from the original SIGI material)              */
/* ------------------------------------------------------------------ */
export const CONTACT = {
  company: "SIGI-Bauunternehmen",
  owner: "Zbigniew Demczuk",
  address: {
    line1: "Calle Olivera 17",
    line2: "Bloque C Bajo B",
    line3: "07181 Magaluf",
    line4: "Mallorca, Spain",
  },
  nif: "X3242211-Q",
  phoneDisplay: "+34 617 693 880",
  phoneHref: "+34617693880",
  email: "sigibau6@gmail.com",
  website: "sigi-project.com",
  websiteHref: "https://sigi-project.com",
};

export const FOOTER = {
  tagline: "Von der ersten Skizze bis zur schlüsselfertigen Villa.",
};
