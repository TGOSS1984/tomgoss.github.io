import {
  FaBootstrap,
  FaCss3Alt,
  FaFileExcel,
  FaHtml5,
  FaJs,
  FaPython,
} from "react-icons/fa";
import {
  SiDjango,
  SiFlask,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiSqlite,
  SiStreamlit,
  SiStripe,
} from "react-icons/si";
import {
  TbSql,
  TbBrandPowershell,
  TbTerminal2,
  TbChartBarPopular,
} from "react-icons/tb";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { MdOutlineAutoAwesome } from "react-icons/md";

const projects = [
  {
    id: "uk-mountain-tours-booking",
    title: "UK Mountain Tours Booking Website",
    category: "Full Stack",
    suite: "Mountain Tours Suite",
    summary:
      "A Django booking platform for guided mountain tours with authentication, booking flows, cancellation handling, and route-based content.",
    stack: ["Django", "Python", "Bootstrap", "SQLite"],
    badges: [
      { label: "Django", Icon: SiDjango },
      { label: "Python", Icon: FaPython },
      { label: "Bootstrap", Icon: FaBootstrap },
      { label: "SQLite", Icon: SiSqlite },
    ],
    featured: true,
    githubUrl: "https://github.com/TGOSS1984/uk_winter_mountain_tours_v2",
    liveUrl: "https://uk-winter-mountain-tours-v2-c6f21d80d2c8.herokuapp.com/",
    imageLabel: "Booking Platform",
    image: `${import.meta.env.BASE_URL}assets/images/projects/mountain-tours-booking.png`,
  },
  {
    id: "winter-mountain-tours-demand-predictor",
    title: "Winter Mountain Tours Demand Predictor",
    category: "Machine Learning",
    suite: "Mountain Tours Suite",
    summary:
      "A predictive analytics app focused on forecasting mountain tour demand and supporting operational planning through machine learning workflows.",
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    badges: [
      { label: "Python", Icon: FaPython },
      { label: "Pandas", Icon: SiPandas },
      { label: "Scikit-learn", Icon: SiScikitlearn },
      { label: "Streamlit", Icon: SiStreamlit },
    ],
    featured: true,
    githubUrl: "https://github.com/TGOSS1984/winter-mountain-tours-demand-predictor",
    liveUrl: "https://winter-tour-predictor-ce48d589f61d.herokuapp.com/",
    imageLabel: "Forecasting App",
    image: `${import.meta.env.BASE_URL}assets/images/projects/mountain-tours-predictor.png`,
  },
  {
    id: "power-bi-mountain-tours-analytics",
    title: "Power BI Winter Mountain Tours Analytics",
    category: "BI / Dashboarding",
    suite: "Mountain Tours Suite",
    summary:
      "A business intelligence portfolio dashboard exploring tour operations, performance metrics, and insight-driven reporting using Power BI.",
    stack: ["Power BI", "DAX", "Power Query", "Excel"],
    badges: [
      { label: "Power BI", Icon: TbChartBarPopular },
      { label: "DAX", Icon: PiBracketsCurlyBold },
      { label: "Power Query", Icon: TbBrandPowershell },
      { label: "Excel", Icon: FaFileExcel },
    ],
    featured: true,
    githubUrl: "https://github.com/TGOSS1984/uk-mountain-tours-analytics",
    liveUrl: "",
    imageLabel: "BI Dashboard",
    image: `${import.meta.env.BASE_URL}assets/images/projects/mountain-tours-powerbi.png`,
  },
  {
    id: "ashen-emporium",
    title: "Ashen Emporium",
    category: "Full Stack",
    summary:
      "A dark fantasy-inspired e-commerce build with product browsing, cart flows, checkout integration, and an image-led storefront experience.",
    stack: ["Django", "Python", "Stripe", "Bootstrap"],
    badges: [
      { label: "Django", Icon: SiDjango },
      { label: "Python", Icon: FaPython },
      { label: "Stripe", Icon: SiStripe },
      { label: "Bootstrap", Icon: FaBootstrap },
    ],
    featured: true,
    githubUrl: "https://github.com/TGOSS1984/ashen-emporium",
    liveUrl: "https://ashen-emporium-ecommerce-533460192970.herokuapp.com/",
    imageLabel: "E-commerce Build",
    image: `${import.meta.env.BASE_URL}assets/images/projects/ashen-emporium.png`,
  },
  {
    id: "souls-text-adventure",
    title: "Souls-Inspired Text Adventure",
    category: "Interactive",
    summary:
      "A branching text adventure game inspired by Soulslike design, featuring class selection, combat systems, story paths, and atmospheric UI.",
    stack: ["Flask", "Python", "JavaScript", "CSS"],
    badges: [
      { label: "Flask", Icon: SiFlask },
      { label: "Python", Icon: FaPython },
      { label: "JavaScript", Icon: FaJs },
      { label: "CSS", Icon: FaCss3Alt },
    ],
    featured: false,
    githubUrl: "https://github.com/TGOSS1984/text_adventure_game",
    liveUrl: "https://elden-souls-text-adventure-app-6406dec306fc.herokuapp.com/",
    imageLabel: "Interactive Game",
    image: `${import.meta.env.BASE_URL}assets/images/projects/souls-text-adventure.png`,
  },
  {
    id: "javascript-anagram-game",
    title: "JavaScript Anagram Game",
    category: "JavaScript",
    summary:
      "A browser-based word game built in JavaScript, designed to strengthen front-end logic, interactivity, and gameplay state handling.",
    stack: ["JavaScript", "HTML", "CSS"],
    badges: [
      { label: "JavaScript", Icon: FaJs },
      { label: "HTML", Icon: FaHtml5 },
      { label: "CSS", Icon: FaCss3Alt },
    ],
    featured: false,
    githubUrl: "https://github.com/TGOSS1984/anagram-game",
    liveUrl: "https://tgoss1984.github.io/anagram-game/",
    imageLabel: "Browser Game",
    image: `${import.meta.env.BASE_URL}assets/images/projects/javascript-anagram-game.png`,
  },
  {
    id: "retail-analytics-portfolio",
    title: "Retail Analytics Portfolio",
    category: "Analytics",
    summary:
      "A retail analytics project using synthetic data, SQL, Python, and Power BI to explore KPIs, trends, and commercial performance.",
    stack: ["SQL", "Pandas", "NumPy", "Power BI"],
    badges: [
      { label: "SQL", Icon: TbSql },
      { label: "Pandas", Icon: SiPandas },
      { label: "NumPy", Icon: SiNumpy },
      { label: "Power BI", Icon: TbChartBarPopular },
    ],
    featured: false,
    githubUrl: "https://github.com/TGOSS1984/retail-analytics-portfolio",
    liveUrl: "",
    imageLabel: "Analytics Project",
    image: `${import.meta.env.BASE_URL}assets/images/projects/retail-analytics.png`,
  },
  {
    id: "magic-eye-project",
    title: "Magic Eye Project",
    category: "Experimental",
    summary:
      "An experimental visual project exploring illusion, image generation, or interactive creativity as part of broader technical exploration.",
    stack: ["Python", "Imaging", "Creative Coding"],
    badges: [
      { label: "Python", Icon: FaPython },
      { label: "Imaging", Icon: MdOutlineAutoAwesome },
      { label: "Creative Coding", Icon: PiBracketsCurlyBold },
    ],
    featured: false,
    githubUrl: "https://github.com/TGOSS1984/magic-eye-project",
    liveUrl: "https://magic-eye-project.streamlit.app/",
    imageLabel: "Experimental Build",
    image: `${import.meta.env.BASE_URL}assets/images/projects/magic-eye.png`,
  },
  {
    id: "souls-dungeon-crawler-cli",
    title: "Souls-Inspired Dungeon Crawler (CLI)",
    category: "Python",
    summary:
      "A command-line dungeon crawler inspired by Soulslike mechanics, featuring class-based combat, branching encounters, and structured game logic built using object-oriented programming.",
    stack: ["Python", "OOP", "Game Logic", "CLI"],
    badges: [
      { label: "Python", Icon: FaPython },
      { label: "OOP", Icon: PiBracketsCurlyBold },
      { label: "Game Logic", Icon: MdOutlineAutoAwesome },
      { label: "CLI", Icon: TbTerminal2 },
    ],
    featured: true,
    githubUrl: "https://github.com/TGOSS1984/dungeon_crawler",
    liveUrl: "https://crypt-of-shadows-python-game-fccd0cae9fda.herokuapp.com/",
    imageLabel: "CLI Game",
    image: `${import.meta.env.BASE_URL}assets/images/projects/cli-game.png
  },
];

export default projects;