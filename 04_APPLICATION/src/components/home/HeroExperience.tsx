"use client";

import styles from "@/styles/possibility-machine.module.css";
import { Intention } from "@/types/possibility-machine";
import { PossibilityCore } from "./PossibilityCore";

interface HeroExperienceProps {
  activeIntention: Intention;
  onOpenContactModal: () => void;
}

export function HeroExperience({ activeIntention, onOpenContactModal }: HeroExperienceProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Accueil immersif The Possibility Machine">
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Colonne narrative éditoriale */}
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span aria-hidden="true">✦</span>
              <span>Les Ateliers de Paul • Écosystème Créatif</span>
            </div>

            <h1 className={styles.heroTitle}>
              The Possibility Machine
              <span className={styles.signature}>Une idée. Mille possibilités.</span>
            </h1>

            <p className={styles.heroLead}>
              Plateforme vivante de création où convergent architecture bioclimatique,
              modélisation BIM internationale, haute couture Wax et ingénierie logicielle.
              Sélectionnez une intention pour révéler les chemins de réalisation de votre projet.
            </p>

            <div className={styles.heroActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => scrollToSection("intentions")}
              >
                <span>Explorer par intention</span>
                <span aria-hidden="true">↓</span>
              </button>

              <button
                type="button"
                className={styles.btnSecondary}
                onClick={onOpenContactModal}
              >
                <span>Échanger avec l&apos;atelier</span>
                <span aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => scrollToSection("creations")}
              >
                <span>Réalisations vérifiées</span>
              </button>
            </div>

            <div className={styles.heroCredentials}>
              <div className={styles.credentialItem}>
                <span className={styles.credentialDot} />
                <span>Cadre Déontologique ONAC</span>
              </div>
              <div className={styles.credentialItem}>
                <span className={styles.credentialDot} />
                <span>Modélisation BIM & Climat Tropical</span>
              </div>
              <div className={styles.credentialItem}>
                <span className={styles.credentialDot} />
                <span>7 Univers interconnectés</span>
              </div>
            </div>
          </div>

          {/* Colonne visuelle : Noyau interactif */}
          <div>
            <PossibilityCore
              activeIntention={activeIntention}
              onCoreClick={onOpenContactModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
