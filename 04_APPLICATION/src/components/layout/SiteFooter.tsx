"use client";

import Link from "next/link";
import styles from "@/styles/possibility-machine.module.css";
import { Universe } from "@/types/possibility-machine";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MotionPreferences } from "@/components/ui/MotionPreferences";

interface SiteFooterProps {
  universes: Universe[];
  onOpenContactModal?: () => void;
}

export function SiteFooter({ universes, onOpenContactModal }: SiteFooterProps) {
  const handleContactClick = () => {
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      window.location.href = "/#connect";
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Identité de marque */}
          <div className={styles.footerBrandCol}>
            <Link href="/" className={styles.brandLink}>
              <div className={styles.brandMonogram} aria-hidden="true">
                ADP
              </div>
              <div className={styles.brandText}>
                <span className={styles.brandName}>Les Ateliers de Paul</span>
                <span className={styles.brandSubtitle}>The Possibility Machine</span>
              </div>
            </Link>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: 1.6 }}>
              Écosystème interdisciplinaire réunissant architecture bioclimatique, modélisation BIM,
              design d&apos;identité de marque, haute couture Wax et recherche appliquée.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <ThemeToggle />
              <MotionPreferences />
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleContactClick}
                style={{ padding: "6px 14px", fontSize: "0.8rem" }}
              >
                Contacter l&apos;atelier
              </button>
            </div>
          </div>

          {/* Les 7 Univers */}
          <div>
            <h4 className={styles.footerColTitle}>Les Sept Univers</h4>
            <ul className={styles.footerLinksList}>
              {universes.map((univ) => (
                <li key={univ.id}>
                  <Link href={univ.targetRoute} className={styles.footerLink}>
                    <span style={{ color: univ.accentColor, marginRight: "4px" }}>{univ.symbol}</span>
                    <span>{univ.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Contact direct */}
          <div>
            <h4 className={styles.footerColTitle}>Navigation &amp; Accès Rapides</h4>
            <ul className={styles.footerLinksList}>
              <li>
                <Link href="/#intentions" className={styles.footerLink}>
                  Explorer les Intentions
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={styles.footerLink}>
                  Portfolio &amp; Archives (37 projets)
                </Link>
              </li>
              <li>
                <Link href="/paul" className={styles.footerLink}>
                  Carte Mobile Express Paul Boubert
                </Link>
              </li>
              <li>
                <Link href="/cadre-deontologique" className={styles.footerLink}>
                  Cadre Déontologique ONAC
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/237690087213?text=Bonjour%20Les%20Ateliers%20de%20Paul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                  style={{ color: "#25D366", fontWeight: 600 }}
                >
                  WhatsApp Atelier Direct ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pied légal et mentions d'ordre */}
        <div className={styles.footerBottom}>
          <div className={styles.onacNotice}>
            Exercice et interventions conformes aux règles déontologiques de l&apos;Ordre National des Architectes du Cameroun (ONAC).
            Missions réglementées de maîtrise d&apos;œuvre conduites obligatoirement avec des confrères architectes inscrits au Tableau de l&apos;Ordre.
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem" }}>
              <Link href="/cadre-deontologique" style={{ color: "var(--accent-brass)", textDecoration: "none" }}>
                Cadre Déontologique
              </Link>
              <Link href="/mentions-legales" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
                Mentions Légales
              </Link>
              <Link href="/politique-confidentialite" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
                Confidentialité
              </Link>
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              © 2026 Les Ateliers de Paul • The Possibility Machine™
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
