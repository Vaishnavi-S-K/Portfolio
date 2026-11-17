import {
  BrainCircuit,
  Check,
  Code2,
  Copy,
  Database,
  Link2,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import CircularCarousel from "./components/CircularCarousel";
import Hero from "./components/Hero";
import SplashCursor from "./components/SplashCursor";
import "./App.css";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const projects = [
  {
    number: "01",
    title: "TransitOps",
    label: "Full-stack",
    introduction:
      "TransitOps is a transport operations platform designed to streamline fleet management and coordinate transportation workflows through a centralized web application.",
    problem:
      "Managing transport operations through disconnected records and manual processes can make it difficult to coordinate vehicles, track operational activities and maintain visibility across different workflows.",
    solution:
      "Developed a centralized platform with a React-based frontend and REST APIs to support transport management workflows. Authentication and role-based access control organize access to different operations.",
    stack:
      "React.js · Node.js · Express.js · MySQL · Prisma · JWT · RBAC · REST APIs",
    image: publicAsset("images/TransitOps Smart Campus Mobility Card.png"),
    architecture:
      "React.js frontend → Node.js + Express.js REST APIs → Prisma ORM → MySQL database.",
    features:
      "Centralized transport management interface, role-based access control, REST API integration and structured database-backed workflows.",
    results: "A unified web application for coordinating transport operations.",
    url: "https://github.com/Shreyas-n-K-pro/odoo-hackathon",
  },
  {
    number: "02",
    title: "University Event Booking",
    label: "Web application",
    introduction:
      "A MERN-stack web application designed to simplify how university communities discover events, manage registrations and organize campus activities through a centralized platform.",
    problem:
      "University events are often communicated through multiple channels, making it difficult for students to discover upcoming activities and manage event registrations efficiently.",
    solution:
      "Developed a web-based event booking platform that brings event discovery and booking workflows into one place, providing a digital interface for students and event organizers.",
    stack: "MongoDB · Express.js · React.js · Node.js",
    image: publicAsset("images/University Event Booking Platform.png"),
    architecture:
      "React.js frontend → Node.js + Express.js backend → MongoDB database.",
    features:
      "Event discovery and browsing, event booking and registration workflows, centralized event information, user-friendly interface and backend integration for event data.",
    results:
      "A centralized platform for discovering university events and managing registrations.",
    url: "https://github.com/Prateek-S004/SE_project",
  },
  {
    number: "03",
    title: "Voice-Driven Zero-Shot Semantic Segmentation",
    label: "AI / computer vision",
    introduction:
      "A voice-controlled semantic segmentation pipeline that enables users to identify and segment objects in images through natural-language voice commands using vision-language models.",
    problem:
      "Conventional image segmentation interfaces often require manual interaction or predefined object labels, making natural, hands-free interaction less intuitive.",
    solution:
      "Developed a voice-driven pipeline combining speech recognition, natural-language processing and vision-language segmentation. Spoken instructions are transcribed, converted into a text query and used to generate the requested object mask.",
    stack:
      "Python · Whisper · spaCy · CLIPSeg · Vision-Language Models · Computer Vision",
    image: publicAsset("images/Voice-Driven Cat Segmentation.png"),
    architecture:
      "Voice input → Whisper speech-to-text → spaCy query extraction → CLIPSeg text-guided segmentation → segmentation output.",
    features:
      "Natural-language voice input, speech-to-text transcription, query extraction and text-guided semantic segmentation.",
    results:
      "Reported mean IoU: 0.740. IoU scores: Cat 0.852, Dog 0.813 and Person 0.764. Research presented at ICICV 2026.",
    url: "https://github.com/ShivaprasadMurashillin/Voice-Driven-Zero-Shot-Segmentation",
  },
  {
    number: "04",
    title: "Multilingual Knowledge Graph Reasoning",
    label: "Research / AI",
    introduction:
      "A Graph Neural Network-based approach for multilingual knowledge graph reasoning and question answering, enabling structured information retrieval across multiple languages.",
    problem:
      "Traditional question-answering systems can struggle to capture relationships between entities and perform structured reasoning across multilingual knowledge sources.",
    solution:
      "Developed a knowledge graph-based question-answering pipeline using Graph Convolutional Networks to learn entity representations and reason over relationships in a structured graph. The experimental dataset contains 2,533 triples and 509 entities.",
    stack:
      "Python · PyTorch · Graph Convolutional Networks · Knowledge Graphs · NLP · Multilingual QA",
    image: publicAsset("images/Multilingual Knowledge Graph Reasoning.png"),
    architecture:
      "Multilingual question input → entity and relation representation → knowledge graph construction → three-layer GCN → graph embeddings and reasoning → answer prediction.",
    features:
      "Three-layer GCN with dimensions 128 → 256 → 256 → 128, Adam optimizer, learning rate 0.01, weight decay 5 × 10⁻⁴ and batch size 64.",
    results:
      "Training converged at epoch 30 on the reported experimental setup. Presented at CRM 2026 and received a Best Paper Award.",
    url: "https://github.com/Vaishnavi-S-K/gnn-multilingual-kg-qa",
  },
];

const skillGroups = [
  {
    icon: Code2,
    title: "Build",
    skills: [
      "C++",
      "C",
      "JavaScript",
      "HTML",
      "CSS",
      "MERN Stack",
      "REST APIs",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Think",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "SQL"],
  },
  {
    icon: Database,
    title: "Foundations",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

const milestones = [
  {
    number: "01",
    category: "RESEARCH",
    year: "2026",
    title: "Best Paper Award",
    organization: "CRM 2026",
    description:
      "Recognized for research on multilingual Knowledge Graph reasoning and question answering.",
  },
  {
    number: "02",
    category: "RESEARCH",
    year: "2026",
    title: "Research presented",
    organization: "ICICV 2026",
    description: "Presented Semantic Segmentation using Voice Signals.",
  },
  {
    number: "03",
    category: "MACHINE LEARNING",
    year: "2025",
    title: "Top 5% selection",
    organization: "Amazon ML Summer School",
    description: "Selected among 3,000 of 60,000 applicants.",
  },
  {
    number: "04",
    category: "DATATHON",
    year: "2025",
    title: "93rd globally",
    organization: "WiDS Datathon 2025",
    description:
      "Global ranking earned by building predictive models and analyzing large datasets.",
  },
];

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function ProjectGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const galleryRef = useRef(null);
  const cardRefs = useRef([]);
  const panelRef = useRef(null);
  const mobileGalleryScroll = useRef(0);
  const positions = [
    { left: "5%", top: "18%", rotation: -8, scale: 1, zIndex: 2 },
    { left: "29%", top: "13%", rotation: 6, scale: 0.92, zIndex: 1 },
    { left: "51%", top: "23%", rotation: -4, scale: 1.04, zIndex: 4 },
    { left: "69%", top: "12%", rotation: 8, scale: 0.95, zIndex: 3 },
  ];

  useLayoutEffect(() => {
    const cards = cardRefs.current;
    const panel = panelRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );
    }, galleryRef);
    return () => {
      cards.forEach((card) => card && gsap.killTweensOf(card));
      if (panel) gsap.killTweensOf(panel);
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const cards = cardRefs.current;
    const panel = panelRef.current;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    if (isMobile) {
      gsap.set(cards, { clearProps: "all", opacity: 1 });
      if (panel) gsap.set(panel, { clearProps: "all" });
      return;
    }
    const selected = selectedIndex === null ? null : positions[selectedIndex];
    cards.forEach((card, index) => {
      if (!card) return;
      const base = positions[index];
      if (selectedIndex === null) {
        gsap.to(card, {
          left: base.left,
          top: base.top,
          xPercent: 0,
          yPercent: 0,
          rotation: base.rotation,
          scale: base.scale,
          opacity: 1,
          duration: 0.75,
          ease: "power3.inOut",
          zIndex: base.zIndex,
        });
      } else if (index === selectedIndex) {
        gsap.to(card, {
          left: "10%",
          top: "50%",
          xPercent: 0,
          yPercent: -50,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.inOut",
          zIndex: 10,
        });
      } else {
        gsap.to(card, {
          left: selected.left,
          top: selected.top,
          opacity: 0,
          scale: 0.8,
          duration: 0.55,
          ease: "power2.in",
          zIndex: 0,
        });
      }
    });
    if (panel) {
      gsap.to(panel, {
        opacity: selectedIndex === null ? 0 : 1,
        x: selectedIndex === null ? 30 : 0,
        duration: 0.65,
        delay: selectedIndex === null ? 0 : 0.35,
        ease: "power3.out",
      });
    }
  }, [selectedIndex]);

  const selectProject = (index) => {
    if (window.matchMedia("(max-width: 720px)").matches) {
      mobileGalleryScroll.current = window.scrollY;
    }
    setSelectedIndex(index);
  };

  const closeProject = () => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: mobileGalleryScroll.current, behavior: "auto" });
    });
  };

  const handleHover = (index, isHovering) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    setHoveredIndex(isHovering ? index : null);
    if (selectedIndex !== null || !cardRefs.current[index]) return;
    const base = positions[index];
    gsap.to(cardRefs.current[index], {
      scale: isHovering ? base.scale * 1.06 : base.scale,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      className={`project-gallery-shell${selectedIndex === null ? "" : " has-selection"}`}
      ref={galleryRef}
    >
      <div className="project-gallery-stage">
        {projects.map((project, index) => (
          <button
            className={`project-gallery-card${hoveredIndex === index ? " is-hovered" : ""}${selectedIndex === index ? " is-selected" : ""}`}
            key={project.number}
            type="button"
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            onClick={() => selectProject(index)}
            onMouseEnter={() => handleHover(index, true)}
            onMouseLeave={() => handleHover(index, false)}
            style={{
              left: positions[index].left,
              top: positions[index].top,
              "--card-rotation": `${positions[index].rotation}deg`,
              "--card-scale": positions[index].scale,
              zIndex: positions[index].zIndex,
            }}
            aria-label={`Open ${project.title} project details`}
          >
            <img src={project.image} alt={`${project.title} project preview`} />
            <span className="project-gallery-mobile-number">
              {project.number}
            </span>
            <span className="project-gallery-label">
              {project.number} · {project.label}
            </span>
            <span className="project-gallery-mobile-copy">
              <strong>{project.title}</strong>
              <small>{project.label}</small>
            </span>
            <span className="project-gallery-view">VIEW PROJECT ↗</span>
          </button>
        ))}
      </div>
      <article className="project-detail-panel" ref={panelRef}>
        {selectedIndex !== null && (
          <>
            <button
              type="button"
              className="project-back"
              onClick={closeProject}
            >
              ← BACK TO PROJECTS
            </button>
            <p className="eyebrow">{projects[selectedIndex].label}</p>
            <h3>{projects[selectedIndex].title}</h3>
            <img
              className="project-detail-artwork"
              src={projects[selectedIndex].image}
              alt={`${projects[selectedIndex].title} project artwork`}
            />
            <p className="project-detail-intro">
              {projects[selectedIndex].introduction}
            </p>
            <div className="project-detail-mobile-stack">
              <strong>Technology stack</strong>
              <p>{projects[selectedIndex].stack}</p>
            </div>
            <div className="project-detail-grid">
              <div>
                <strong>Problem</strong>
                <p>{projects[selectedIndex].problem}</p>
              </div>
              <div>
                <strong>Solution & approach</strong>
                <p>{projects[selectedIndex].solution}</p>
              </div>
              <div>
                <strong>Architecture</strong>
                <p>{projects[selectedIndex].architecture}</p>
              </div>
              <div>
                <strong>Features</strong>
                <p>{projects[selectedIndex].features}</p>
              </div>
              <div>
                <strong>Outcome</strong>
                <p>{projects[selectedIndex].results}</p>
              </div>
            </div>
            <a
              className="project-repository-link"
              href={projects[selectedIndex].url}
              target="_blank"
              rel="noreferrer"
            >
              VIEW REPOSITORY ↗
            </a>
          </>
        )}
      </article>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  useLayoutEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText("vaishnaviskaluti@gmail.com");
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  };

  return (
    <main>
      <SplashCursor
        colors={["#FF442B"]}
        rainbow={false}
        intensity={0.65}
        size={0.8}
        force={0.7}
        swirl={2}
        trail={0.75}
        quality="medium"
        clickSplash={false}
        theme="light"
        zIndex={10}
      />
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          VSK<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={menuOpen ? "site-nav is-open" : "site-nav"}
          aria-label="Primary"
        >
          {["about", "work", "skills", "journey", "contact"].map((item) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <div id="top">
        <Hero />
      </div>

      <section className="about section-shell" id="about">
        <div className="about-grid">
          <SectionHeading
            eyebrow="About"
            title={
              <img
                className="about-photo"
                src={publicAsset("images/me2.jpeg")}
                alt="Vaishnavi S Kaluti"
              />
            }
          />
          <div className="about-body">
            <p className="lead">
              I&apos;m Vaishnavi — a Computer Science and Engineering student
              building thoughtful web products and exploring multimodal AI.
            </p>
            <p>
              My work moves between full-stack development, computer vision,
              knowledge systems, and the details that make a product feel clear.
              I&apos;m currently pursuing my B.E. at KLE Technological
              University, Hubli, with a CGPA of 9.16/10 through the 6th
              semester.
            </p>
            <div className="about-meta">
              <span>Based in Karnataka, India</span>
              <span>Graduating 2027</span>
              <span>Open to meaningful problems</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Built to be <em>useful.</em>
            </>
          }
        />
        <ProjectGallery />
      </section>

      <section className="skills section-shell" id="skills">
        <SectionHeading
          eyebrow="The toolkit"
          title={
            <>
              Many tools, one <em>intention.</em>
            </>
          }
          copy="Core programming languages, frameworks, and computer science fundamentals applied across my academic research and software projects."
        />
        <div className="skill-grid">
          {skillGroups.map(({ icon: Icon, title, skills }) => (
            <article className="skill-card" key={title}>
              <Icon size={28} strokeWidth={1.5} />
              <h3>{title}</h3>
              <ul>
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="journey section-shell" id="journey">
        <div className="milestones-heading">
          <p className="eyebrow">Achievements</p>
          <h2>
            Learning in <em>Public.</em>
          </h2>
          <p>
            Publications, technical presentations, and professional
            developments.
          </p>
        </div>
        <div className="journey-grid">
          <CircularCarousel
            items={milestones}
            preset="cylinder"
            intro="rise"
            cardWidth={
              viewportWidth > 0 && viewportWidth <= 720
                ? Math.min(viewportWidth * 0.82, 340)
                : 430
            }
            aspectRatio={viewportWidth > 0 && viewportWidth <= 720 ? 1.22 : 1.05}
            gap={28}
            autoplay="drift"
            speed={7}
            momentum={0.65}
            snap
            pauseOnHover
            focusOnClick
            captions={false}
          />
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-panel">
          <p className="eyebrow">Have a good problem?</p>
          <h2>
            Let&apos;s make <em>something.</em>
          </h2>
          <p className="contact-note">
            Open to thoughtful collaborations, product ideas, and meaningful
            technical problems.
          </p>
          <div className="contact-availability">
            <span className="availability-dot" />
            Available for thoughtful collaborations
          </div>
          <div className="contact-links" aria-label="Contact links">
            <button type="button" onClick={copyEmail}>
              {emailCopied ? <Check size={18} /> : <Copy size={18} />}
              {emailCopied ? "Copied" : "Copy email"}
            </button>
            <a
              href="https://www.linkedin.com/in/vaishnavi-s-kaluti/"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 size={18} /> <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Vaishnavi-S-K"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 size={18} /> <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>VAISHNAVI S KALUTI © 2026</span>
        <span>WEB DEVELOPER · AIML</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

export default App;
