"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/possibility-machine.module.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MotionPreferences } from "@/components/ui/MotionPreferences";
import { QuoteBadgeButton } from "@/components/quote/QuoteBadgeButton";
import { QuoteDrawer } from "@/components/quote/QuoteDrawer";
import { INSTITUTIONAL_NAVIGATION } from "@/data/site-navigation";

interface SiteHeaderProps {
  onOpenContactModal?: () => void;
}

export function SiteHeader({ onOpenContactModal }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContactClick = () => {
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      window.location.href = "/#connect";
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          {/* Logo et identité de marque */}
          <Link href="/" className={styles.brandLink}>
            <div className={styles.brandMonogram} aria-hidden="true">
              ADP
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>Les Ateliers de Paul</span>
              <span className={styles.brandSubtitle}>The Possibility Machine</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className={styles.navDesktop} aria-label="Navigation principale">
            <Link href="/#intentions" className={styles.navLink}>
              Intentions
            </Link>
            <Link href="/#univers" className={styles.navLink}>7 Univers</Link>
            <Link href="/portfolio" className={styles.navLink}>
              Portfolio
            </Link>
            <Link href="/actualites" className={styles.navLink}>
              Actualités
            </Link>
            <Link href="/devis" className={styles.navLink}>
              Devis d&apos;Atelier
            </Link>
            <Link href="/cadre-deontologique" className={styles.navLink}>
              Déontologie ONAC
            </Link>
            <Link href="/paul" className={styles.navLink}>
              Portfolio Paul
            </Link>
          </nav>

          {/* Actions & Toggles d'accessibilité */}
          <div className={styles.headerActions}>
            <ThemeToggle />
            <MotionPreferences />
            <QuoteBadgeButton />

            <button
              type="button"
              className={styles.headerCtaBtn}
              onClick={handleContactClick}
            >
              <span>Contacter l&apos;atelier</span>
              <span aria-hidden="true">→</span>
            </button>

            {/* Bouton burger mobile */}
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
            >
              <span>{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tiroir de navigation mobile */}
      {mobileMenuOpen && (
        <div className={styles.mobileNavDrawer} role="region" aria-label="Menu mobile">
          <Link href="/#intentions" className={styles.navLink} onClick={closeMobileMenu}>
            ◈ Intentions de projet
          </Link>
          <Link href="/#univers" className={styles.navLink} onClick={closeMobileMenu}>▲ Les Sept Univers</Link>
          {INSTITUTIONAL_NAVIGATION.map((universe) => (
            <Link key={universe.slug} href={universe.href} className={styles.navLink} onClick={closeMobileMenu}>
              {universe.order.toString().padStart(2, "0")} {universe.name}
            </Link>
          ))}
          <Link href="/portfolio" className={styles.navLink} onClick={closeMobileMenu}>
            ■ Portfolio &amp; Archives (37)
          </Link>
          <Link href="/actualites" className={styles.navLink} onClick={closeMobileMenu}>
            ✎ Actualités &amp; Recherches
          </Link>
          <Link href="/devis" className={styles.navLink} onClick={closeMobileMenu}>
            ▤ Cadrage &amp; Devis d&apos;Atelier
          </Link>
          <Link href="/cadre-deontologique" className={styles.navLink} onClick={closeMobileMenu}>
            ⚖ Cadre Déontologique ONAC
          </Link>
          <Link href="/paul" className={styles.navLink} onClick={closeMobileMenu}>
            ★ Portfolio Paul Boubert
          </Link>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              closeMobileMenu();
              handleContactClick();
            }}
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            Échanger directement avec l&apos;Atelier
          </button>
        </div>
      )}

      {/* Panneau latéral rétractable du devis */}
      <QuoteDrawer />
    </header>
  );
}
