import {
    Code2, Database, Layers3, Palette, ShoppingBag, Sparkles,
} from "lucide-react";
import { technologies } from "./profile";

export const skills = [
    {
        number: "01",
        name: "Frontend Development",
        description: "Building responsive, accessible and engaging interfaces with modern frontend technologies.",
        tools: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Bootstrap"],
        icon: Code2,
    },
    {
        number: "02",
        name: "WordPress Development",
        description: "Creating business websites, landing pages and e-commerce stores with customizable layouts.",
        tools: ["WordPress", "Elementor", "Elementor Pro", "WooCommerce"],
        icon: Layers3,
    },
    {
        number: "03",
        name: "Shopify Development",
        description: "Setting up online stores with organized collections, customized themes and shopping features.",
        tools: ["Shopify", "Theme Customization", "Product Setup"],
        icon: ShoppingBag,
    },
    {
        number: "04",
        name: "Backend & Databases",
        description: "Exploring server-side development, database integration and data-driven applications.",
        tools: ["Python", "FastAPI", "MongoDB", "Oracle Database"],
        icon: Database,
    },
    {
        number: "05",
        name: "Graphic Design",
        description: "Creating clean visual assets and design concepts for consistent digital experiences.",
        tools: ["Graphic Design", "Visual Design", "Canva"],
        icon: Palette,
    },
    {
        number: "06",
        name: "Tools & Collaboration",
        description: "Using development tools and a practical problem-solving approach to build digital products.",
        tools: ["Git", "GitHub", "VS Code", "Problem-Solving"],
        icon: Sparkles,
    },
];

export const projects = [
    {
        number: "01",
        name: "Mashfaa",
        type: "REACT E-COMMERCE",
        category: "In Progress",
        description: "A modern modest-fashion storefront featuring product discovery, category filtering, product details, cart functionality and a responsive shopping experience.",
        stack: ["React.js", "Tailwind CSS", "MongoDB"],
        accent: "#c5ff4a",
        headline: ["Modern", "modest", "fashion."],
        icon: ShoppingBag,
        link: "https://mashfaa-site.vercel.app/",
        label: "Visit Website ",
    },
    {
        number: "02",
        name: "Lexora Intelligence",
        type: "AI LEGAL TECHNOLOGY",
        category: "AI Prototype",
        description: "An AI-powered legal case management prototype exploring document processing, searchable legal knowledge and retrieval-augmented generation.",
        stack: ["React", "Python", "FastAPI", "RAG"],
        accent: "#a9b8ff",
        headline: ["Clarity for", "complex", "legal work."],
        icon: Layers3,
        link: "",
        label: "Prototype",
    },
    {
        number: "03",
        name: "Kitchen Royals",
        type: "SHOPIFY STORE",
        category: "E-commerce",
        description: "A kitchen-products e-commerce store featuring customized theme styling, product collections and online shopping configurations.",
        stack: ["Shopify", "Theme Customization", "E-commerce"],
        accent: "#e8bd9b",
        headline: ["Made for", "everyday", "living."],
        icon: ShoppingBag,
        link: "https://kitchenroyals.com/",
        label: "Visit website",
    },
    {
        number: "04",
        name: "Zara Textile",
        type: "WORDPRESS E-COMMERCE",
        category: "E-commerce",
        description: "A home-textile online store with organized product categories, customized layouts and responsive shopping pages.",
        stack: ["WordPress", "WooCommerce", "Elementor Pro"],
        accent: "#d9c5a5",
        headline: ["Comfort", "meets", "design."],
        icon: Layers3,
        link: "https://zaratextile.com/",
        label: "Visit website",
    },
    {
        number: "05",
        name: "Kafeen Coffee",
        type: "BUSINESS WEBSITE",
        category: "Frontend",
        description: "A coffee-shop website practice project focused on responsive layouts, interactive sections and smooth navigation.",
        stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        accent: "#c9a78d",
        headline: ["A fresh", "digital", "brew."],
        icon: Code2,
        link: "",
        label: "Practice project",
    },
    {
        number: "06",
        name: "J.-Inspired Store",
        type: "E-COMMERCE CONCEPT",
        category: "Practice Project",
        description: "A fashion retail practice project focused on WooCommerce layouts, product presentation and theme customization.",
        stack: ["WordPress", "WooCommerce", "Elementor"],
        accent: "#e7e7e7",
        headline: ["Fashion", "storefront", "concept."],
        icon: ShoppingBag,
        link: "",
        label: "Practice project",
    },
];

export const education = [
    { title: "BS Information Technology", institution: "University of Education, Lahore", detail: "Undergraduate studies", status: "In progress" },
    { title: "Associate Degree Program", institution: "Riphah International College, Lahore", detail: "Computer Science", status: "Completed" },
    { title: "Intermediate", institution: "Govt. Islamia College, Civil Lines, Lahore", detail: "Intermediate in Computer Science", status: "Completed" },
    { title: "Matriculation", institution: "Govt. Muslim Model High School No. 2, Lahore", detail: "Science", status: "Completed" },
];

export const experience = [
    {
        role: "WordPress Development Instructor",
        company: "Faizan Digital Institute",
        location: "Lahore, Pakistan",
        period: "Aug 2024 – 2025",
        description: "Taught WordPress website development and guided learners through website building, page design and practical implementation.",
        points: [
            "Explained WordPress fundamentals and website structure.",
            "Introduced page building with Elementor.",
            "Supported practical website development exercises.",
        ],
    },
];

export const STATS = [
    { value: projects.length, suffix: "", label: "Projects built" },
    { value: technologies.length, suffix: "+", label: "Technologies used" },
    { value: 3, suffix: "", label: "E-commerce platforms" },
    { value: 1, suffix: "+", label: "Year teaching WordPress" },
];

export const STEPS = [
    { number: "01", title: "Understand", text: "I start with your goals, your audience and what the website needs to achieve." },
    { number: "02", title: "Design", text: "Clean layouts and a visual direction that fits your brand." },
    { number: "03", title: "Build", text: "Responsive, fast pages built with React, WordPress or Shopify." },
    { number: "04", title: "Launch", text: "Testing across devices, then a smooth launch and handover." },
];

export const VALUES = [
    ["Responsive by default", "Every layout is built to feel right on phone, tablet and desktop."],
    ["User-focused", "Clear structure and simple interactions that help visitors act."],
    ["Always learning", "Growing in React, Python, databases and AI-powered apps."],
];

// Asli feedback yahan bharein. Khali rahe to section home page par nazar nahi aata.
// Template:
// { name: "Student ya Client ka naam", role: "Student, Faizan Digital Institute", quote: "Unki asli rai yahan likhein." },
export const testimonials = [
  
    {
        name: "Abdul Barr",
        role: "Client, Kitchen Royals",
        quote: "Shoaib customized the Shopify theme for our Kitchen Royals store with great attention to detail. Our products and collections are well organized, and the store works smoothly on mobile. He was easy to work with and communicated clearly throughout.",
    },
    {
        name: "Muhammad Murtaza",
        role: "Client, ZaraTextile",
        quote: "Shoaib built our Zara Textile WordPress store with clear product categories and responsive layouts. He understood what we needed, and the store is easy for our customers to use.",
    },
];
