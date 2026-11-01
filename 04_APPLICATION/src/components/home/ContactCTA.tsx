"use client";

import styles from "@/styles/possibility-machine.module.css";
import { Intention } from "@/types/possibility-machine";

interface ContactCTAProps {
  activeIntention: Intention;
  onOpenContactModal: () => void;
}

export function ContactCTA({ activeIntention, onOpenContactModal }: ContactCTAProps) {
  return (
    <section className={styles.closingCtaSection} aria-label="Action finale et prise de contact">
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.heroEyebrow}>
            <span aria-hidden="true">✦</span>
            <span>Un Atelier Ouvert sur le Monde</span>
          </div>

          <h2 className={styles.ctaTitle}>
            Donnons forme à votre prochaine idée.
          </h2>

          <p className={styles.ctaDesc}>
            Que vous prépariez une opération immobilière d&apos;envergure, une collection sur-mesure ou
            la montée en compétence de votre équipe, notre atelier est prêt à dialoguer.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={onOpenContactModal}
            >
              <span>Échanger avec Paul &amp; l&apos;équipe</span>
              <span aria-hidden="true">↗</span>
            </button>

            <a
              href={`https://wa.me/237690087213?text=${encodeURIComponent(
                `Bonjour Les Ateliers de Paul, je souhaite démarrer un projet : ${activeIntention.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              <span>Discussion directe WhatsApp</span>
              <span aria-hidden="true">💬</span>
            </a>
          </div>

          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            Réponse garantie sous 24 à 48 heures ouvrées • Disponibilités pour missions en Afrique et à l&apos;international
          </div>
        </div>
      </div>
    </section>
  );
}
