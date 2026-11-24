"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/possibility-machine.module.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MotionPreferences } from "@/components/ui/MotionPreferences";
import { QuoteBadgeButton } from "@/components/quote/QuoteBadgeButton";
import { QuoteDrawer } from "@/components/quote/QuoteDrawer";
import { CartBadgeButton } from "@/components/cart/CartBadgeButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { INSTITUTIONAL_NAVIGATION } from "@/data/site-navigation";
import { UNIVERSES } from "@/data/universes";
import { ChevronDown } from "lucide-react";

interface SiteHeaderProps {
  onOpenContactModal?: () => void;
}

export function SiteHeader({ onOpenContactModal }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const isUniverseActive = UNIVERSES.some((u) => pathname === u.targetRoute);

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
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === "/" ? styles.navLinkActive : ""}`}
            >
              Accueil
            </Link>

            {/* Menu déroulant des 7 Univers */}
            <div className={styles.navDropdown}>
              <button
                type="button"
                className={`${styles.navDropdownTrigger} ${isUniverseActive ? styles.navLinkActive : ""}`}
                aria-haspopup="true"
                aria-label="Afficher les sept univers"
              >
                <span>7 Univers</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <div className={styles.navDropdownMenu} role="menu">
                {UNIVERSES.map((universe) => (
                  <Link
                    key={universe.slug}
                    href={universe.targetRoute}
                    className={styles.navDropdownItem}
                    role="menuitem"
                  >
                    <span
                      className={styles.navDropdownSymbol}
                      style={{ color: universe.accentColor }}
                      aria-hidden="true"
                    >
                      {universe.symbol}
                    </span>
                    <div className={styles.navDropdownItemText}>
                      <span className={styles.navDropdownItemName}>{universe.name}</span>
                      <span className={styles.navDropdownItemSubtitle}>{universe.subtitle}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/portfolio"
              className={`${styles.navLink} ${pathname.startsWith("/portfolio") ? styles.navLinkActive : ""}`}
            >
              Portfolio
            </Link>
            <Link
              href="/actualites"
              className={`${styles.navLink} ${pathname.startsWith("/actualites") ? styles.navLinkActive : ""}`}
            >
              Actualités
            </Link>
            <Link
              href="/c"
              className={`${styles.navLink} ${pathname.startsWith("/c") ? styles.navLinkActive : ""}`}
            >
              Cartes Pro
            </Link>
            <Link
              href="/devis"
              className={`${styles.navLink} ${pathname === "/devis" ? styles.navLinkActive : ""}`}
            >
              Devis
            </Link>
            <Link
              href="/cadre-deontologique"
              className={`${styles.navLink} ${pathname === "/cadre-deontologique" ? styles.navLinkActive : ""}`}
            >
              ONAC
            </Link>
            <Link
              href="/paul"
              className={`${styles.navLink} ${pathname.startsWith("/paul") ? styles.navLinkActive : ""}`}
            >
              Portfolio Paul
            </Link>
          </nav>

          {/* Actions & Toggles d'accessibilité */}
          <div className={styles.headerActions}>
            <ThemeToggle />
            <MotionPreferences />
            <QuoteBadgeButton />
            <CartBadgeButton />

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
          <Link href="/" className={styles.navLink} onClick={closeMobileMenu}>
            ◈ Accueil &amp; The Possibility Machine
          </Link>
          <div style={{ padding: "0.5rem 0", borderBottom: "1px solid rgba(197, 155, 83, 0.2)", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-brass)", fontWeight: 700 }}>
              Les Sept Univers ADP
            </span>
          </div>
          {INSTITUTIONAL_NAVIGATION.map((universe) => (
            <Link key={universe.slug} href={universe.href} className={styles.navLink} onClick={closeMobileMenu}>
              <span style={{ color: universe.color, marginRight: "6px" }}>{universe.order.toString().padStart(2, "0")}</span> {universe.name}
            </Link>
          ))}
          <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)", margin: "0.5rem 0" }} />
          <Link href="/portfolio" className={styles.navLink} onClick={closeMobileMenu}>
            ■ Réalisations &amp; Archives (37 projets)
          </Link>
          <Link href="/actualites" className={styles.navLink} onClick={closeMobileMenu}>
            ✎ Actualités &amp; Recherches
          </Link>
          <Link href="/c" className={styles.navLink} onClick={closeMobileMenu}>
            💳 ADP Digital Cards (Cartes Pro)
          </Link>
          <Link href="/devis" className={styles.navLink} onClick={closeMobileMenu}>
            ▤ Cadrage &amp; Devis d&apos;Atelier
          </Link>
          <Link href="/a-propos" className={styles.navLink} onClick={closeMobileMenu}>
            ★ À propos de l&apos;Atelier
          </Link>
          <Link href="/cadre-deontologique" className={styles.navLink} onClick={closeMobileMenu}>
            ⚖ Cadre Déontologique ONAC
          </Link>
          <Link href="/paul" className={styles.navLink} onClick={closeMobileMenu}>
            👤 Portfolio Personnel Paul Boubert
          </Link>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              closeMobileMenu();
              handleContactClick();
            }}
            style={{ width: "100%", justifyContent: "center", marginTop: "0.75rem" }}
          >
            Échanger directement avec l&apos;Atelier
          </button>
        </div>
      )}

      {/* Panneaux latéraux rétractables : devis & commandes */}
      <QuoteDrawer />
      <CartDrawer />
    </header>
  );
}
