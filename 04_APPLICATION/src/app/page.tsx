"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Universe {
  id: string;
  name: string;
  materials: string;
  description: string;
  accent: string;
}

const UNIVERSES: Universe[] = [
  {
    id: "01",
    name: "Agencement & Rénovation Intérieure",
    materials: "Noyer noble, laiton brossé & enduit à la chaux",
    description: "Transformation sur-mesure d'espaces de vie et professionnels avec un soin artisanal minutieux.",
    accent: "#C59B53",
  },
  {
    id: "02",
    name: "Bâtiment & Structure",
    materials: "Pierre calcaire de Bourgogne, acier brut & béton poli",
    description: "Maçonnerie d'art, gros œuvre architectural, extensions durables et réhabilitation structurelle.",
    accent: "#8A6731",
  },
  {
    id: "03",
    name: "Ingénierie & R&D",
    materials: "Titane brossé, polymères techniques & verre structurel",
    description: "Conception bioclimatique, simulation thermique, modélisation BIM avancée et automatisation d'atelier.",
    accent: "#316BB5",
  },
  {
    id: "04",
    name: "Design & Objets",
    materials: "Bronze d'art patiné, cuir pleine fleur & bois cintré",
    description: "Lignes exclusives d'objets, luminaires sculpturaux et quincaillerie architecturale contemporaine.",
    accent: "#C27803",
  },
  {
    id: "05",
    name: "Scénographie & Éphémère",
    materials: "Textiles tramés, réflecteurs métalliques & structures modulaires",
    description: "Pavillons d'exposition, installations narratives immersives et scénographies événementielles singulières.",
    accent: "#6B4E22",
  },
  {
    id: "06",
    name: "Mobilier d'Art & Édition",
    materials: "Chêne brûlé yakisugi, marbre veiné & bronze de fonderie",
    description: "Pièces uniques numérotées, tables d'exception et mobilier haute facture édité en série limitée.",
    accent: "#A98547",
  },
  {
    id: "07",
    name: "Conseil & AMO",
    materials: "Papier vélin de croquis, carnet de détails & graphite pur",
    description: "Assistance à maîtrise d'ouvrage, direction artistique globale et conseil stratégique patrimonial.",
    accent: "#2E7D52",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Vérifier si un thème est enregistré ou respecter la préférence
    const savedTheme = localStorage.getItem("adp-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("adp-theme", nextTheme);
  };

  return (
    <main className={styles.main}>
      <div className={styles.backgroundPattern} aria-hidden="true" />

      {/* Barre de navigation / En-tête */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.brand}>
            <div className={styles.brandLogo} aria-hidden="true">
              ADP
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Ateliers de Paul</span>
              <span className={styles.brandSubtitle}>Plateforme d&apos;ingénierie &amp; d&apos;artisanat d&apos;art</span>
            </div>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.badgeDev}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span>Dev Local • Étape 03B</span>
            </div>

            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Basculer vers le thème ${theme === "light" ? "sombre" : "clair"}`}
            >
              {theme === "light" ? "🌙 Mode Nuit Atelier" : "☀️ Thème Minéral Clair"}
            </button>
          </div>
        </div>
      </header>

      {/* Section Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>
            Initialisation Technique Contrôlée — Socle Monolithe Modulaire
          </span>

          <h1 className={styles.heroTitle}>
            ADP WEB EXPERIENCE
          </h1>

          <p className={styles.heroLead}>
            Environnement de développement local sécurisé. L&apos;architecture cible réunit
            Next.js 15, React 19, TypeScript 5, Payload CMS 3 et PostgreSQL dans un monolithe modulaire unifié.
          </p>

          <p className={styles.heroTagline}>
            « Une idée. Mille possibilités. » — The Possibility Machine
          </p>

          {/* Grille de contrôle de santé technique */}
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <div className={styles.statusCardHeader}>
                <span className={styles.statusLabel}>Architecture Cible</span>
                <span className={styles.statusPill}>Validé</span>
              </div>
              <div className={styles.statusValue}>Next.js 15.4 (App Router)</div>
              <div className={styles.statusDesc}>
                Monolithe modulaire avec séparation stricte src/, routes d&apos;API unifiées et rendu hybride SSR/ISR.
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusCardHeader}>
                <span className={styles.statusLabel}>Système de Types</span>
                <span className={styles.statusPill}>Vérifié</span>
              </div>
              <div className={styles.statusValue}>TypeScript 5.9.3</div>
              <div className={styles.statusDesc}>
                Contrôle strict des types, compilation zéro avertissement, interfaces de données et schémas normalisés.
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusCardHeader}>
                <span className={styles.statusLabel}>Identité Visuelle</span>
                <span className={styles.statusPill}>Actif</span>
              </div>
              <div className={styles.statusValue}>Thème Minéral Clair</div>
              <div className={styles.statusDesc}>
                Palette pierre &amp; ivoire par défaut, accents laiton &amp; bronze, tokens CSS complets et mode sombre optionnel.
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusCardHeader}>
                <span className={styles.statusLabel}>Gestion de Contenu</span>
                <span className={styles.statusPill}>Préparé</span>
              </div>
              <div className={styles.statusValue}>Payload CMS (Postgres)</div>
              <div className={styles.statusDesc}>
                Configuration prête pour collections (Univers, Projets, Devis, Médias). Base locale non connectée.
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusCardHeader}>
                <span className={styles.statusLabel}>Protection Legacy</span>
                <span className={styles.statusPill}>Sanctuarisé</span>
              </div>
              <div className={styles.statusValue}>01_LEGACY/ Intact</div>
              <div className={styles.statusDesc}>
                Aucune modification des archives ni du prototype HTML. Dépôt Git local indépendant initialisé.
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusCardHeader}>
                <span className={styles.statusLabel}>Accessibilité (A11y)</span>
                <span className={styles.statusPill}>Conforme</span>
              </div>
              <div className={styles.statusValue}>Contraste &amp; Motion</div>
              <div className={styles.statusDesc}>
                Respect automatique de prefers-reduced-motion, curseurs natifs restaurés, ratios de contraste WCAG AA+.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des 7 Univers ADP */}
      <section className={styles.universSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Architecture Métier</span>
            <h2 className={styles.sectionTitle}>Les Sept Univers Ateliers de Paul</h2>
            <p className={styles.sectionDesc}>
              Chaque univers dispose de sa propre signature matérielle, de son vocabulaire d&apos;ingénierie et de sa collection CMS dédiée.
            </p>
          </div>

          <div className={styles.universGrid}>
            {UNIVERSES.map((u) => (
              <div
                key={u.id}
                className={styles.universCard}
                style={{ "--card-accent": u.accent } as React.CSSProperties}
              >
                <div className={styles.universIndex}>UNIVERS {u.id}</div>
                <h3 className={styles.universName}>{u.name}</h3>
                <div className={styles.universMaterial}>{u.materials}</div>
                <p className={styles.universText}>{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pied de page technique */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div>
            <strong>ADP WEB EXPERIENCE</strong> — Environnement Local de Développement (Étape 03B)
          </div>
          <div className={styles.footerMeta}>
            <span>Répertoire : <code>04_APPLICATION/</code></span>
            <span className={styles.footerDot} aria-hidden="true" />
            <span>Serveur : <code>localhost:3000</code></span>
            <span className={styles.footerDot} aria-hidden="true" />
            <span>Domaine de production préservé : <code>ateliersdepaul.com</code></span>
          </div>
        </div>
      </footer>
    </main>
  );
}
