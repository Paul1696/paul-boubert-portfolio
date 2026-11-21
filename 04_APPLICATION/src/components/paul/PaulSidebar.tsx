"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  BookOpen,
  User,
  GitBranch,
  Wrench,
  Mail,
  Sparkles,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";
import styles from "@/styles/paul-portfolio.module.css";

export type PaulTabKey =
  | "portfolio"
  | "catalogue"
  | "transversal"
  | "profil"
  | "parcours"
  | "competences"
  | "contact";

interface PaulSidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  isCatalogPage?: boolean;
}

export default function PaulSidebar({
  activeTab = "portfolio",
  onSelectTab,
  isCatalogPage = false,
}: PaulSidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    {
      key: "portfolio",
      label: "Portfolio",
      icon: Layers,
      href: "/paul",
    },
    {
      key: "catalogue",
      label: "Catalogue (37)",
      icon: BookOpen,
      href: "/paul/portfolio",
      isPageLink: true,
    },
    {
      key: "profil",
      label: "Profil",
      icon: User,
      href: "/paul#profil",
    },
    {
      key: "transversal",
      label: "Projets transversaux",
      icon: Sparkles,
      href: "/paul#transversal",
    },
    {
      key: "parcours",
      label: "Parcours",
      icon: GitBranch,
      href: "/paul#parcours",
    },
    {
      key: "competences",
      label: "Compétences",
      icon: Wrench,
      href: "/paul#competences",
    },
    {
      key: "contact",
      label: "Contact",
      icon: Mail,
      href: "/paul#contact",
    },
  ];

  const handleItemClick = (item: (typeof navItems)[0]) => {
    setMobileMenuOpen(false);
    if (item.isPageLink) return; // Navigate via Link normally
    if (onSelectTab) {
      onSelectTab(item.key);
    }
  };

  return (
    <>
      {/* Barre d'en-tête Mobile */}
      <header className={styles.mobileBar}>
        <div className={styles.mobileBrand}>
          <div className={styles.monogramBadge} style={{ width: 34, height: 34 }}>
            <span className={styles.monogramText} style={{ fontSize: "1.1rem" }}>
              PB
            </span>
          </div>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>Paul Boubert</div>
            <div style={{ fontSize: "0.65rem", color: "#7DB9DC", textTransform: "uppercase" }}>
              Portfolio Professionnel
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{mobileMenuOpen ? "Fermer" : "Menu"}</span>
        </button>
      </header>

      {/* Overlay pour fermeture mobile */}
      {mobileMenuOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation latérale collapsible */}
      <aside
        className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""} ${
          mobileMenuOpen ? styles.sidebarOpen : ""
        }`}
        aria-label="Menu principal du portfolio"
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarTopRow}>
            <Link
              href="/paul"
              className={styles.monogramWrapper}
              title="Paul Boubert • Les Ateliers de Paul"
            >
              <div className={styles.monogramBadge}>
                <span className={styles.monogramText}>PB</span>
              </div>
            </Link>

            {/* Bouton de repli pour desktop */}
            <button
              type="button"
              className={styles.collapseToggleBtn}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Agrandir le menu latéral" : "Réduire le menu latéral"}
              aria-label="Réduire ou agrandir le menu latéral"
            >
              {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          <div className={styles.sidebarIdentity}>
            <h1 className={styles.authorName}>Paul Boubert</h1>
            <span className={styles.authorRole}>Architecte de formation</span>
            <span className={styles.authorRole}>Projeteur BIM</span>
          </div>
        </div>

        {/* Liens de navigation avec icônes Lucide uniformes & trait cyan actif */}
        <nav className={styles.sidebarNav} aria-label="Sections du portfolio">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isCurrent =
              (isCatalogPage && item.key === "catalogue") ||
              (!isCatalogPage && activeTab === item.key);

            // Si on est sur une page externe (ex: /paul/projet/[slug] ou /paul/portfolio) ou si c'est un lien de page autonome
            const shouldUseLink = !onSelectTab || item.isPageLink;

            if (shouldUseLink) {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`${styles.navItem} ${isCurrent ? styles.navItemActive : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isCurrent && <div className={styles.activeIndicatorBar} />}
                  <span className={styles.navItemIcon} aria-hidden="true">
                    <IconComponent size={18} />
                  </span>
                  <span className={styles.navItemLabel}>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                className={`${styles.navItem} ${isCurrent ? styles.navItemActive : ""}`}
                onClick={() => handleItemClick(item)}
              >
                {isCurrent && <div className={styles.activeIndicatorBar} />}
                <span className={styles.navItemIcon} aria-hidden="true">
                  <IconComponent size={18} />
                </span>
                <span className={styles.navItemLabel}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Pied de barre latérale */}
        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarMetaText}>
            <span>Les Ateliers de Paul</span>
            <div style={{ color: "#475569" }}>Douala &amp; Yaoundé</div>
          </div>
          <Link href="/" className={styles.backHomeLink}>
            <ArrowRight size={13} />
            <span>Site d&apos;Atelier ADP</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
