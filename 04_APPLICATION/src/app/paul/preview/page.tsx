import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ALL_PROJECTS } from "@/data/all-projects";
import styles from "./preview.module.css";

export const metadata: Metadata = {
  title: "Aperçu — Portfolio Paul Boubert",
  description: "Prototype éditorial du portfolio personnel de Paul Boubert.",
};

const previewProjects = [
  { slug: "studio-epure", image: "/assets/projects/018_studio/hero.jpg", eyebrow: "Conception · BIM", title: "Studio Épure", text: "Une étude de conception et de coordination technique à Douala." },
  { slug: "agence-bancaire-regionale", image: "/assets/projects/bicec_bafoussam/bicec_1.jpg", eyebrow: "Contribution · Structure partenaire", title: "Agence Bancaire Régionale", text: "Référence présentée avec attribution à la structure responsable et au rôle exercé." },
  { slug: "residence-neo-classique", image: "/assets/projects/residence_h/preview.png", eyebrow: "Résidentiel · Visualisation", title: "Résidence Néo-Classique", text: "Exploration spatiale et production d'images pour un projet résidentiel." },
  { slug: "atelier-modulaire", image: "/assets/projects/workbox/workbox_1.jpg", eyebrow: "Tertiaire · Coordination", title: "Atelier Modulaire", text: "Sélection en cours de qualification éditoriale avant publication définitive." },
];

export default function PaulPortfolioPreviewPage() {
  const knownProjects = previewProjects.map((item) => ({ ...item, data: ALL_PROJECTS.find((project) => project.slug === item.slug) }));

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <Link href="/paul/preview" className={styles.wordmark}>Paul Boubert<span>Portfolio personnel</span></Link>
        <nav aria-label="Navigation personnelle" className={styles.links}>
          <a href="#projets">Projets</a><a href="#parcours">Parcours</a><a href="#expertise">Expertise</a><a href="#contact">Contact</a>
        </nav>
        <Link href="/" className={styles.back}>ADP ↗</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Portfolio professionnel / 2026</p>
            <h1>Paul Boubert</h1>
            <p className={styles.heroRole}>Assistant architecte · Projeteur BIM · Coordination de projet</p>
            <p className={styles.lead}>De la conception architecturale à la coordination technique, une approche qui associe précision, créativité et technologies numériques.</p>
            <div className={styles.heroActions}><a href="#projets" className={styles.primary}>Explorer mes projets <span>↗</span></a><a href="#parcours" className={styles.secondary}>Découvrir mon parcours</a></div>
            <div className={styles.heroStats}><div><strong>6+</strong><span>Années d&apos;expérience</span></div><div><strong>BIM</strong><span>Modélisation &amp; coordination</span></div><div><strong>EXE</strong><span>Production technique</span></div></div>
          </div>
          <div className={styles.heroImage}><div className={styles.heroGif} role="img" aria-label="Animation architecturale d'une résidence contemporaine" /></div>
          <a className={styles.scrollCue} href="#parcours"><span>Découvrir</span><b>⌄</b></a>
        </section>

        <section className={styles.intro} id="parcours">
          <p className={styles.sectionLabel}>01 / Positionnement</p>
          <div><h2>Un regard à la croisée de l&apos;espace, de la donnée et de la matière.</h2><p>Ce prototype met l&apos;accent sur la contribution réelle de Paul : conception, production technique, coordination BIM, visualisation et recherche d&apos;outils numériques. Les références restent soumises à qualification éditoriale avant publication finale.</p></div>
        </section>

        <section className={styles.projects} id="projets">
          <div className={styles.sectionHead}><div><p className={styles.sectionLabel}>02 / Sélection</p><h2>Projets en regard.</h2></div><p className={styles.note}>Une sélection courte, pensée comme un récit professionnel — sans compteur ni catalogue automatique.</p></div>
          <div className={styles.grid}>
            {knownProjects.map((project, index) => <article key={project.slug} className={`${styles.card} ${index === 0 ? styles.cardLarge : ""}`}>
              <div className={styles.cardImage}><Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
              <div className={styles.cardBody}><p className={styles.eyebrow}>{project.eyebrow}</p><h3>{project.title}</h3><p>{project.text}</p><span className={styles.cardMeta}>{project.data?.year ?? "À vérifier"} · {project.data?.location ?? "Crédits à compléter"}</span></div>
            </article>)}
          </div>
        </section>

        <section className={styles.expertise} id="expertise"><p className={styles.sectionLabel}>03 / Expertise</p><div className={styles.expertiseGrid}><h2>De l&apos;intention au détail constructif.</h2><div className={styles.expertiseList}><p><strong>Conception</strong><span>Études spatiales, architecture et design d&apos;espace.</span></p><p><strong>Production</strong><span>Documentation technique, modélisation et coordination BIM.</span></p><p><strong>Numérique</strong><span>Outils de production, visualisation et expérimentation front-end.</span></p></div></div></section>

        <section className={styles.contact} id="contact"><p className={styles.sectionLabel}>04 / Contact</p><h2>Échanger autour d&apos;un projet.</h2><a className={styles.primary} href="mailto:paul@ateliersdepaul.com">paul@ateliersdepaul.com <span>↗</span></a></section>
      </main>
      <footer className={styles.footer}><span>Paul Boubert · Portfolio personnel</span><Link href="/paul">Voir l&apos;expérience actuelle →</Link></footer>
    </div>
  );
}
