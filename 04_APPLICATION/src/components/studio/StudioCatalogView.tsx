"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  STUDIO_FAMILIES,
  STUDIO_PRODUCTS,
  STUDIO_SUBCATEGORIES,
} from "@/data/studio-catalog";
import { StudioFamilyId, StudioProduct } from "@/types/studio-catalog";
import { quoteStore } from "@/data/quote-store";
import { cartStore } from "@/data/cart-store";
import { calculateProductPricing } from "@/lib/pricing-engine";
import styles from "@/styles/studio.module.css";
import { Search, ArrowRight, Check, Sparkles, SlidersHorizontal, Plus, ExternalLink } from "lucide-react";

export function StudioCatalogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<StudioFamilyId | "all">("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<"popular" | "name" | "recent">("popular");
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Sub-categories corresponding to currently selected family
  const currentSubCategories = useMemo(() => {
    if (selectedFamily === "all") return [];
    return STUDIO_SUBCATEGORIES.filter((sub) => sub.familyId === selectedFamily);
  }, [selectedFamily]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return STUDIO_PRODUCTS.filter((product) => {
      // Family match
      if (selectedFamily !== "all" && product.familyId !== selectedFamily) {
        return false;
      }
      // Subcategory match
      if (selectedSubCategory !== "all" && product.subCategoryId !== selectedSubCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSub = product.subtitle.toLowerCase().includes(query);
        const matchDesc = product.shortDescription.toLowerCase().includes(query);
        const matchMaterials = product.materials.some((m) => m.toLowerCase().includes(query));
        const matchFinishes = product.finishes.some((f) => f.toLowerCase().includes(query));
        if (!matchName && !matchSub && !matchDesc && !matchMaterials && !matchFinishes) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "recent") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });
  }, [selectedFamily, selectedSubCategory, searchQuery, sortBy]);

  const handleAddDirectToQuote = (product: StudioProduct) => {
    // Calcul tarifaire par défaut
    const defaultQty = product.quantities?.[0] || 1;
    const pricing = calculateProductPricing({
      productId: product.id,
      quantity: defaultQty,
      selectedOptionChoices: {},
      needsDesignService: false,
    });

    // Ajout au panier multi-produits
    cartStore.addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      familyId: product.familyId,
      universeName: "ADP Studio",
      coverImage: product.media.coverImage,
      selectedOptions: {},
      selectedOptionLabels: { Configuration: "Standard d'atelier" },
      quantity: defaultQty,
      needsDesignService: false,
      isCustomQuote: pricing.isCustomQuote,
      unitPriceXAF: pricing.effectiveUnitPriceXAF,
      totalPriceXAF: pricing.totalXAF,
      pricingNotice: pricing.pricingNotice,
    });

    // Synchronisation devis historique
    quoteStore.addItem(product.id, undefined, `Produit: ${product.name} (Catalogue Studio 2026)`);
    setAddedItemNotice(product.name);
    cartStore.openDrawer();
    setTimeout(() => setAddedItemNotice(null), 3000);
  };

  const handleFamilyChange = (famId: StudioFamilyId | "all") => {
    setSelectedFamily(famId);
    setSelectedSubCategory("all");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedFamily("all");
    setSelectedSubCategory("all");
    setSortBy("popular");
  };

  return (
    <section className={styles.catalogSection} id="catalogue-interactif">
      <div className={styles.sectionHeader}>
        <div className={styles.poleBadge}>Catalogue Commercial 2026</div>
        <h2 className={styles.sectionTitle}>
          Explorer nos <span className={styles.heroTitleGradient}>Prestations &amp; Produits</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Identités visuelles, supports d&apos;édition, cartes d&apos;affaires physiques ou connectées et signalétique architecturale. Chaque commande fait l&apos;objet d&apos;un cadrage d&apos;atelier sur-mesure.
        </p>
      </div>

      {/* Barre de notification temporaire ajout au devis */}
      {addedItemNotice && (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto 1.5rem",
            padding: "0.75rem 1.25rem",
            backgroundColor: "rgba(13, 92, 58, 0.3)",
            border: "1px solid #0D5C3A",
            borderRadius: "6px",
            color: "#4ECA8E",
            fontSize: "0.85rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Check size={16} />
          <span>« {addedItemNotice} » ajouté à votre sélection de devis !</span>
        </div>
      )}

      {/* Barre de contrôle : Recherche et Tri */}
      <div className={styles.controlsBar}>
        <div className={styles.searchAndSortRow}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Rechercher un produit, matière (coton, laiton, vergé...), finition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Recherche dans le catalogue"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <SlidersHorizontal size={16} color="#8E9AA8" />
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Trier les produits"
            >
              <option value="popular">Trier par : Popularité &amp; Vedettes</option>
              <option value="name">Trier par : Nom alphabétique</option>
              <option value="recent">Trier par : Nouveautés d&apos;Atelier</option>
            </select>
          </div>
        </div>

        {/* Onglets des Familles Commerciales */}
        <div className={styles.familyTabs} role="tablist" aria-label="Familles de produits">
          <button
            type="button"
            className={`${styles.familyTabBtn} ${selectedFamily === "all" ? styles.familyTabBtnActive : ""}`}
            onClick={() => handleFamilyChange("all")}
          >
            <span>Tous les produits ({STUDIO_PRODUCTS.length})</span>
          </button>
          {STUDIO_FAMILIES.map((fam) => {
            const count = STUDIO_PRODUCTS.filter((p) => p.familyId === fam.id).length;
            const isActive = selectedFamily === fam.id;
            return (
              <button
                key={fam.id}
                type="button"
                className={`${styles.familyTabBtn} ${isActive ? styles.familyTabBtnActive : ""}`}
                onClick={() => handleFamilyChange(fam.id)}
              >
                <span>{fam.icon}</span>
                <span>{fam.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Sous-catégories si une famille est sélectionnée */}
        {currentSubCategories.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", padding: "0.5rem 0" }}>
            <button
              type="button"
              onClick={() => setSelectedSubCategory("all")}
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: selectedSubCategory === "all" ? 700 : 500,
                backgroundColor: selectedSubCategory === "all" ? "#C59B53" : "#11161F",
                color: selectedSubCategory === "all" ? "#11161F" : "#8E9AA8",
                border: "1px solid #222C38",
                cursor: "pointer",
              }}
            >
              Toutes sous-catégories
            </button>
            {currentSubCategories.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubCategory(sub.id)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: selectedSubCategory === sub.id ? 700 : 500,
                  backgroundColor: selectedSubCategory === sub.id ? "#C59B53" : "#11161F",
                  color: selectedSubCategory === sub.id ? "#11161F" : "#8E9AA8",
                  border: "1px solid #222C38",
                  cursor: "pointer",
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grille des Produits */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            backgroundColor: "#161D26",
            border: "1px solid #222C38",
            borderRadius: "10px",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.5rem" }}>
            Aucun produit ne correspond à votre recherche
          </h3>
          <p style={{ color: "#8E9AA8", fontSize: "0.85rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
            Essayez d&apos;autres mots-clés ou réinitialisez les filtres pour parcourir l&apos;ensemble du catalogue ADP Studio.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className={styles.btnSecondary}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => {
            const family = STUDIO_FAMILIES.find((f) => f.id === product.familyId);
            return (
              <article key={product.id} className={styles.productCard}>
                {/* En-tête de carte avec visuel et badges */}
                <div className={styles.productCardHeader}>
                  <div className={styles.productBadgeStack}>
                    {product.isPopular && <span className={styles.popularBadge}>Vedette</span>}
                    {product.isNew && <span className={styles.newBadge}>Nouveau</span>}
                    {product.digitalCardBridge && (
                      <span
                        style={{
                          backgroundColor: "#0D5C3A",
                          color: "#4ECA8E",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Sparkles size={11} />
                        QR Connecté
                      </span>
                    )}
                  </div>

                  <div style={{ textAlign: "center", padding: "1rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.3rem" }}>{family?.icon || "◈"}</div>
                    <div style={{ fontSize: "0.75rem", color: "#8E9AA8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Atelier d&apos;Édition
                    </div>
                  </div>
                </div>

                {/* Corps de la carte produit */}
                <div className={styles.productCardBody}>
                  <div className={styles.productCategoryLabel}>{family?.name}</div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productSubtitle}>{product.subtitle}</p>

                  <ul className={styles.productHighlights}>
                    {product.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className={styles.highlightItem}>
                        <span className={styles.highlightDot}>•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Matières & Finitions clés */}
                  <div style={{ fontSize: "0.74rem", color: "#8E9AA8", marginBottom: "1rem", lineHeight: 1.4 }}>
                    <strong style={{ color: "#C59B53" }}>Matières :</strong> {product.materials.slice(0, 2).join(", ")}
                  </div>

                  {/* Pied de carte avec actions */}
                  <div className={styles.productCardFooter}>
                    <div className={styles.pricingNotice}>{product.pricingNotice}</div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => handleAddDirectToQuote(product)}
                        title="Ajouter directement à ma sélection de devis"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#222C38",
                          border: "1px solid #334050",
                          color: "#C59B53",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        <Plus size={16} />
                      </button>
                      <Link
                        href={`/adp-studio/produit/${product.slug}`}
                        className={styles.viewProductBtn}
                      >
                        <span>Configurer</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
