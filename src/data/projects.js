import {
  FaBootstrap,
  FaCss3Alt,
  FaFileExcel,
  FaHtml5,
  FaJs,
  FaPython,
  FaReact,
  FaStripe,
} from "react-icons/fa";

import {
  SiCloudflare,
  SiDjango,
  SiFlask,
  SiLeaflet,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiScikitlearn,
  SiSqlite,
  SiStreamlit,
  SiStripe,
  SiVite,
} from "react-icons/si";
import {
  TbSql,
  TbBrandPowershell,
  TbTerminal2,
  TbChartBarPopular,
} from "react-icons/tb";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { MdOutlineAutoAwesome } from "react-icons/md";

// Deployment status values:
// "live"    -> liveUrl is currently reachable, shown as the primary action
// "offline" -> a public build exists but is currently scaled down (e.g. to
//              manage hosting costs) — flip this per project as you take
//              builds up/down and the lightbox will show the right messaging
// "private" -> no public deployment exists; code/local only
//
// rank: lower numbers show first wherever projects are listed (Featured and
// the full Projects page both sort by this). Currently numbered to match
// this array's order exactly — edit a project's rank to reorder it without
// needing to move it in the array.
const rawProjects = [
  {
    id: "uk-summit-guides",
    rank: 1,
    title: "UK Summit Guides",
    category: "Full Stack",
    suite: "Adventure & Booking Platform",
    summary:
      "A full stack React and Django mountain guiding platform featuring route exploration, GPX mapping, weather integration, authentication, Stripe payments, booking management, and a responsive editorial-style frontend experience.",
    longDescription:
      "UK Summit Guides is a full stack mountain guiding platform pairing a React frontend with a Django REST API. It brings together route exploration, GPX-based mapping, live weather data, secure authentication, and Stripe-powered bookings inside a polished, editorial-style interface built for real trip planning.",
    highlights: [
      "Route exploration with interactive GPX mapping",
      "Live weather integration to support trip planning",
      "Stripe-powered booking and payment flow",
      "Authenticated accounts behind a responsive, editorial-style UI",
    ],
    stack: [
      "React",
      "Vite",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Stripe",
      "Leaflet",
    ],
    badges: [
      { label: "React", Icon: FaReact },
      { label: "Django", Icon: SiDjango },
      { label: "Python", Icon: FaPython },
      { label: "PostgreSQL", Icon: SiPostgresql },
      { label: "Stripe", Icon: FaStripe },
      { label: "Leaflet", Icon: SiLeaflet },
    ],
    featured: true,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/uk-summit-guides",
    liveUrl: "https://uk-summit-guides.vercel.app/",
    imageLabel: "UK Summit Guides",
    image: `${import.meta.env.BASE_URL}assets/images/projects/uk-summit-guides.PNG`,
    galleryExtra: [
      "Route explorer & GPX map view",
      "Booking & payment flow",
      "Weather & trip planning view",
    ],
  },
  {
    id: "summitloguk",
    rank: 2,
    title: "SummitLog UK",
    category: "Full Stack",
    suite: "Mountain Tracking Platform",
    summary:
      "A personal mountain tracking application for UK hillwalkers to log, visualise, and reflect on time spent in the mountains — covering Wainwrights, Munros, and Nuttalls with over 800 summits sourced from the DOBIH dataset.",
    longDescription:
      "SummitLog UK is a personal mountain tracking application built for UK hillwalkers who want to log, visualise and reflect on their time in the mountains. It grew from a simple idea to track Wainwright completions into a comprehensive platform covering multiple UK mountain collections — Wainwrights, Munros and Nuttalls — with over 800 summits sourced from the DOBIH (Database of British and Irish Hills) dataset. Built as a full-stack portfolio application, the focus throughout was production-quality design, real-world data and genuinely useful functionality, with a custom design system that aims for something that feels like a premium, polished product rather than a generic CRUD app.",
    highlights: [
      "Over 800 UK summits across Wainwrights, Munros and Nuttalls, sourced from the DOBIH dataset",
      "Decoupled architecture: React + Vite frontend consuming a Django REST Framework API",
      "Custom design system with animated SVG mountain cards",
      "Personal best tracking, collection completion percentages and an achievement system",
      "Interactive summit mapping powered by Leaflet",
      "Session-based authentication with CSRF protection; images stored on Cloudflare R2",
    ],
    stack: [
      "React",
      "Vite",
      "Django",
      "Django REST Framework",
      "Leaflet",
      "Cloudflare R2",
    ],
    badges: [
      { label: "React", Icon: FaReact },
      { label: "Vite", Icon: SiVite },
      { label: "Django", Icon: SiDjango },
      { label: "Python", Icon: FaPython },
      { label: "Leaflet", Icon: SiLeaflet },
      { label: "Cloudflare R2", Icon: SiCloudflare },
    ],
    featured: true,
    deploymentStatus: "private",
    githubUrl: "https://github.com/TGOSS1984/summitlog-uk",
    liveUrl: "https://summitlog-uk.vercel.app/",
    imageLabel: "SummitLog UK",
    image: `${import.meta.env.BASE_URL}assets/images/projects/summit-log-uk.PNG`,
    galleryExtra: [
      "Animated SVG mountain card design",
      "Interactive Leaflet summit map",
      "Achievement & completion tracking",
      "Personal best & stats tracking",
    ],
  },
  {
    id: "uk-mountain-tours-booking",
    rank: 6,
    title: "UK Mountain Tours Booking Website",
    category: "Full Stack",
    suite: "Mountain Tours Suite",
    summary:
      "A Django booking platform for guided mountain tours with authentication, booking flows, cancellation handling, and route-based content.",
    longDescription:
      "Part of the Mountain Tours Suite, this Django-built booking platform handles the full guided-tour lifecycle — from authenticated browsing and booking through to cancellations — alongside route-based content for every available tour.",
    highlights: [
      "End-to-end booking flow for guided tours",
      "User authentication and account management",
      "Cancellation handling built into the booking lifecycle",
      "Route-based content for each tour",
    ],
    stack: ["Django", "Python", "Bootstrap", "SQLite"],
    badges: [
      { label: "Django", Icon: SiDjango },
      { label: "Python", Icon: FaPython },
      { label: "Bootstrap", Icon: FaBootstrap },
      { label: "SQLite", Icon: SiSqlite },
    ],
    featured: false,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/uk_winter_mountain_tours_v2",
    liveUrl: "https://uk-winter-mountain-tours-v2-c6f21d80d2c8.herokuapp.com/",
    imageLabel: "Booking Platform",
    image: `${import.meta.env.BASE_URL}assets/images/projects/mountain-tours-booking.png`,
    galleryExtra: [
      "Tour booking flow",
      "Route & itinerary content",
      "Account & authentication screen",
    ],
  },
  {
    id: "winter-mountain-tours-demand-predictor",
    rank: 3,
    title: "Winter Mountain Tours Demand Predictor",
    category: "Machine Learning",
    suite: "Mountain Tours Suite",
    summary:
      "A predictive analytics app focused on forecasting mountain tour demand and supporting operational planning through machine learning workflows.",
    longDescription:
      "This companion app to the Mountain Tours Suite uses a Scikit-learn forecasting model to predict seasonal demand for guided tours. Built with Pandas for data processing and served through an interactive Streamlit interface, it's designed to support real operational planning decisions.",
    highlights: [
      "Machine learning model forecasting seasonal tour demand",
      "Pandas-driven data processing pipeline",
      "Interactive Streamlit interface for exploring forecasts",
      "Built to support real operational planning decisions",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    badges: [
      { label: "Python", Icon: FaPython },
      { label: "Pandas", Icon: SiPandas },
      { label: "Scikit-learn", Icon: SiScikitlearn },
      { label: "Streamlit", Icon: SiStreamlit },
    ],
    featured: true,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/winter-mountain-tours-demand-predictor",
    liveUrl: "https://winter-tour-predictor-ce48d589f61d.herokuapp.com/",
    imageLabel: "Forecasting App",
    image: `${import.meta.env.BASE_URL}assets/images/projects/mountain-tours-predictor.png`,
    galleryExtra: [
      "Forecast dashboard",
      "Model input & feature view",
      "Seasonal trend breakdown",
    ],
  },
  {
    id: "power-bi-mountain-tours-analytics",
    rank: 11,
    title: "Power BI Winter Mountain Tours Analytics",
    category: "BI / Dashboarding",
    suite: "Mountain Tours Suite",
    summary:
      "A business intelligence portfolio dashboard exploring tour operations, performance metrics, and insight-driven reporting using Power BI.",
    longDescription:
      "A Power BI analytics layer for the Mountain Tours Suite, turning operational and booking data into DAX-driven metrics and insight-led reporting dashboards.",
    highlights: [
      "Power BI dashboard covering tour operations and performance",
      "DAX-driven metrics with Power Query data shaping",
      "Insight-driven reporting layer for the Mountain Tours Suite",
    ],
    stack: ["Power BI", "DAX", "Power Query", "Excel"],
    badges: [
      { label: "Power BI", Icon: TbChartBarPopular },
      { label: "DAX", Icon: PiBracketsCurlyBold },
      { label: "Power Query", Icon: TbBrandPowershell },
      { label: "Excel", Icon: FaFileExcel },
    ],
    featured: false,
    deploymentStatus: "private",
    githubUrl: "https://github.com/TGOSS1984/uk-mountain-tours-analytics",
    liveUrl: "",
    imageLabel: "BI Dashboard",
    image: `${import.meta.env.BASE_URL}assets/images/projects/mountain-tours-powerbi.png`,
    galleryExtra: [
      "Operations overview dashboard",
      "Performance & KPI breakdown",
      "Booking & route insights view",
    ],
  },
  {
    id: "ashen-emporium",
    rank: 4,
    title: "Ashen Emporium",
    category: "Full Stack",
    summary:
      "A dark fantasy-inspired e-commerce build with product browsing, cart flows, checkout integration, and an image-led storefront experience.",
    longDescription:
      "Ashen Emporium is a dark fantasy-inspired e-commerce build — a Django storefront with full cart and checkout flows, Stripe payment integration, and an image-led browsing experience designed around its gothic aesthetic.",
    highlights: [
      "Dark fantasy-themed storefront with image-led browsing",
      "Cart and checkout flows backed by Stripe",
      "Django-powered catalogue and order handling",
    ],
    stack: ["Django", "Python", "Stripe", "Bootstrap"],
    badges: [
      { label: "Django", Icon: SiDjango },
      { label: "Python", Icon: FaPython },
      { label: "Stripe", Icon: SiStripe },
      { label: "Bootstrap", Icon: FaBootstrap },
    ],
    featured: true,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/ashen-emporium",
    liveUrl: "https://ashen-emporium-ecommerce-533460192970.herokuapp.com/",
    imageLabel: "E-commerce Build",
    image: `${import.meta.env.BASE_URL}assets/images/projects/ashen-emporium.png`,
    galleryExtra: [
      "Storefront & product browsing",
      "Cart & checkout flow",
      "Order & catalogue management",
    ],
  },
  {
    id: "souls-text-adventure",
    rank: 5,
    title: "Souls-Inspired Text Adventure",
    category: "Interactive",
    summary:
      "A branching text adventure game inspired by Soulslike design, featuring class selection, combat systems, story paths, and atmospheric UI.",
    longDescription:
      "A Flask-built branching text adventure drawing on Soulslike design — class selection, a turn-based combat system, and multiple story paths delivered through an atmospheric, lore-driven interface.",
    highlights: [
      "Branching narrative paths inspired by Soulslike storytelling",
      "Class selection and turn-based combat system",
      "Atmospheric, Flask-rendered UI",
    ],
    stack: ["Flask", "Python", "JavaScript", "CSS"],
    badges: [
      { label: "Flask", Icon: SiFlask },
      { label: "Python", Icon: FaPython },
      { label: "JavaScript", Icon: FaJs },
      { label: "CSS", Icon: FaCss3Alt },
    ],
    featured: false,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/text_adventure_game",
    liveUrl: "https://elden-souls-text-adventure-app-6406dec306fc.herokuapp.com/",
    imageLabel: "Interactive Game",
    image: `${import.meta.env.BASE_URL}assets/images/projects/souls-text-adventure.png`,
    galleryExtra: [
      "Class selection screen",
      "Combat encounter view",
      "Story branching path",
    ],
  },
  {
    id: "javascript-anagram-game",
    rank: 8,
    title: "JavaScript Anagram Game",
    category: "JavaScript",
    summary:
      "A browser-based word game built in JavaScript, designed to strengthen front-end logic, interactivity, and gameplay state handling.",
    longDescription:
      "A browser-based anagram word game built in vanilla JavaScript, focused on gameplay state handling, scoring logic, and interactive front-end fundamentals without any framework overhead.",
    highlights: [
      "Pure JavaScript gameplay logic and state handling",
      "Browser-based word puzzle mechanics",
      "Built to sharpen front-end interactivity fundamentals",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    badges: [
      { label: "JavaScript", Icon: FaJs },
      { label: "HTML", Icon: FaHtml5 },
      { label: "CSS", Icon: FaCss3Alt },
    ],
    featured: false,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/anagram-game",
    liveUrl: "https://tgoss1984.github.io/anagram-game/",
    imageLabel: "Browser Game",
    image: `${import.meta.env.BASE_URL}assets/images/projects/javascript-anagram-game.png`,
    galleryExtra: [
      "Gameplay screen",
      "Scoring & round summary",
      "Word puzzle mechanics view",
    ],
  },
  {
    id: "retail-analytics-portfolio",
    rank: 9,
    title: "Retail Analytics Portfolio",
    category: "Analytics",
    summary:
      "A retail analytics project using synthetic data, SQL, Python, and Power BI to explore KPIs, trends, and commercial performance.",
    longDescription:
      "A retail analytics project built around synthetic sales data, combining SQL and Python (Pandas/NumPy) processing with Power BI reporting to explore KPIs, trends, and commercial performance.",
    highlights: [
      "SQL-driven analysis of synthetic retail data",
      "Python (Pandas/NumPy) data processing pipeline",
      "Power BI reporting on KPIs and commercial trends",
    ],
    stack: ["SQL", "Pandas", "NumPy", "Power BI"],
    badges: [
      { label: "SQL", Icon: TbSql },
      { label: "Pandas", Icon: SiPandas },
      { label: "NumPy", Icon: SiNumpy },
      { label: "Power BI", Icon: TbChartBarPopular },
    ],
    featured: false,
    deploymentStatus: "private",
    githubUrl: "https://github.com/TGOSS1984/retail-analytics-portfolio",
    liveUrl: "",
    imageLabel: "Analytics Project",
    image: `${import.meta.env.BASE_URL}assets/images/projects/retail-analytics.png`,
    galleryExtra: [
      "KPI overview dashboard",
      "Trend & performance breakdown",
      "SQL query & data pipeline view",
    ],
  },
  {
    id: "magic-eye-project",
    rank: 10,
    title: "Magic Eye Project",
    category: "Experimental",
    summary:
      "An experimental visual project exploring illusion, image generation, or interactive creativity as part of broader technical exploration.",
    longDescription:
      "An experimental Python project exploring image generation and visual illusion, wrapped in an interactive Streamlit app for hands-on creative experimentation.",
    highlights: [
      "Generates stereogram-style 'magic eye' illusions",
      "Python-based image generation pipeline",
      "Interactive Streamlit front-end for creative experimentation",
    ],
    stack: ["Python", "Imaging", "Creative Coding"],
    badges: [
      { label: "Python", Icon: FaPython },
      { label: "Imaging", Icon: MdOutlineAutoAwesome },
      { label: "Creative Coding", Icon: PiBracketsCurlyBold },
    ],
    featured: false,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/magic-eye-project",
    liveUrl: "https://magic-eye-project.streamlit.app/",
    imageLabel: "Experimental Build",
    image: `${import.meta.env.BASE_URL}assets/images/projects/magic-eye.png`,
    galleryExtra: [
      "Generated illusion output",
      "Interactive controls",
      "Streamlit app interface",
    ],
  },
  {
    id: "souls-dungeon-crawler-cli",
    rank: 7,
    title: "Souls-Inspired Dungeon Crawler (CLI)",
    category: "Python / CLI",
    summary:
      "A command-line dungeon crawler inspired by Soulslike mechanics, featuring class-based combat, branching encounters, and structured game logic built using object-oriented programming.",
    longDescription:
      "A command-line dungeon crawler built with object-oriented Python, bringing Soulslike class-based combat and branching encounter design to a structured CLI experience.",
    highlights: [
      "Object-oriented Python architecture",
      "Class-based combat and branching encounters",
      "Soulslike mechanics distilled into a CLI experience",
    ],
    stack: ["Python", "OOP", "Game Logic", "CLI"],
    badges: [
      { label: "Python", Icon: FaPython },
      { label: "OOP", Icon: PiBracketsCurlyBold },
      { label: "Game Logic", Icon: MdOutlineAutoAwesome },
      { label: "CLI", Icon: TbTerminal2 },
    ],
    featured: false,
    deploymentStatus: "live",
    githubUrl: "https://github.com/TGOSS1984/dungeon_crawler",
    liveUrl: "https://crypt-of-shadows-python-game-fccd0cae9fda.herokuapp.com/",
    imageLabel: "CLI Game",
    image: `${import.meta.env.BASE_URL}assets/images/projects/cli-game.png`,
    galleryExtra: [
      "Combat encounter log",
      "Character & class screen",
      "Object-oriented game state log",
    ],
  },
];

const projects = rawProjects.map(({ galleryExtra, ...project }) => ({
  ...project,
  gallery: [
    ...(project.image
      ? [
          {
            type: "image",
            src: project.image,
            alt: `${project.title} preview`,
            caption: "Overview",
          },
        ]
      : []),
    ...(galleryExtra || []).map((caption) => ({ type: "placeholder", caption })),
  ],
}));

export default projects;