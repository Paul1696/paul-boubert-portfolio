"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Scissors,
  Check,
  CheckCircle2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Maximize2,
} from "lucide-react";
import { cartStore } from "@/data/cart-store";
import { quoteStore } from "@/data/quote-store";

interface RosbriProduct {
  id: string;
  slug: string;
  title: string;
  category: "homme" | "femme" | "maison" | "accessoires";
  categoryLabel: string;
  tagline: string;
  description: string;
  basePriceXAF: number;
  coverImage: string;
  waxMotifs: { id: string; label: string; colorCode: string }[];
  sizes: string[];
  materials: string[];
  details: string[];
}

const ROSBRI_PRODUCTS: RosbriProduct[] = [
  {
    id: "rosbri-veste-heritage",
    slug: "veste-executive-wax-gabardine",
    title: "Veste Exécutive Semi-Doublée Wax & Gabardine",
    category: "homme",
    categoryLabel: "Haute Confection & Vestiaire",
    tagline: "L'élégance architecturale appliquée au costume contemporain",
    description:
      "Veste tailleur structurée associant une gabardine de coton haut de gamme et des empiècements de Wax hollandais authentique sur le col, les poches passepoilées et la doublure intérieure respirante.",
    basePriceXAF: 75000,
    coverImage: "/images/placeholders/project-placeholder.jpg",
    waxMotifs: [
      { id: "bogolan-noir", label: "Bogolan Contemporain Noir & Ocre", colorCode: "#2A231C" },
      { id: "kente-royal", label: "Kente Royal Doré & Ambre", colorCode: "#C59B53" },
      { id: "indigo-ebene", label: "Fleur de Mariage Indigo & Ébène", colorCode: "#1B2A4A" },
    ],
    sizes: ["S (38)", "M (40)", "L (42)", "XL (44)", "XXL (46)", "Sur mesure d'Atelier (+10 000 FCFA)"],
    materials: ["Gabardine de coton 280g & Wax 100% coton hollandais", "Doublure satinée respirante"],
    details: [
      "Coupe ajustée cintrée avec fentes d'aisance latérales",
      "Boutons en corne véritable cousus main",
      "Poche poitrine passepoilée pour pochette assortie offerte",
    ],
  },
  {
    id: "rosbri-chemise-officier",
    slug: "chemise-popeline-inserts-wax",
    title: "Chemise Popeline Fine & Inserts Wax Graphique",
    category: "homme",
    categoryLabel: "Vestiaire Exécutif",
    tagline: "Sobriété et touches d'art textile au quotidien",
    description:
      "Chemise blanche ou bleu ciel en popeline de coton égyptien d'une douceur exceptionnelle, rehaussée de liserés de wax minutieusement coupés au fil sur la patte de boutonnage cachée et les poignets d'atelier.",
    basePriceXAF: 35000,
    coverImage: "/images/placeholders/project-placeholder.jpg",
    waxMotifs: [
      { id: "kente-dore", label: "Kente Graphique Ambre", colorCode: "#C59B53" },
      { id: "disque-vinyle", label: "Disque Vinyle Solaire", colorCode: "#D97706" },
      { id: "bogolan-terre", label: "Bogolan Terre Cuite", colorCode: "#8C4A32" },
    ],
    sizes: ["S (38)", "M (40)", "L (42)", "XL (44)", "XXL (46)"],
    materials: ["100% Coton Popeline 130g double retors", "Inserts Wax premium"],
    details: [
      "Col officier montant à tenue impeccable",
      "Gorge cachée avec boutons de nacre naturelle",
      "Finitions coutures anglaises indéchirables",
    ],
  },
  {
    id: "rosbri-coussins-art",
    slug: "duo-coussins-art-wax-lin",
    title: "Duo de Coussins d'Art Piqués Main Wax & Lin Brut",
    category: "maison",
    categoryLabel: "Maison & Scénographie",
    tagline: "Pièces maîtresses de design textile pour salon et lounge",
    description:
      "Paire de coussins carrés 45x45 cm associant un lin lourd couleur sable et un panneau central de wax aux motifs géométriques puissants. Rembourrage haute résilience anti-affaissement.",
    basePriceXAF: 28000,
    coverImage: "/images/placeholders/project-placeholder.jpg",
    waxMotifs: [
      { id: "bogolan-noir", label: "Bogolan Noir & Sable", colorCode: "#2A231C" },
      { id: "fleur-ebene", label: "Fleur de Mariage Ébène & Or", colorCode: "#C59B53" },
      { id: "disque-indigo", label: "Disque Vinyle Indigo", colorCode: "#1E3A8A" },
    ],
    sizes: ["Format Carré 45x45 cm", "Format Rectangulaire 30x50 cm"],
    materials: ["Lin brut naturel 320g & Wax hollandais véritable", "Garnissage fibre siliconée"],
    details: [
      "Fermeture à glissière invisible pour déhoussage aisé",
      "Passepoil contrasté en velours de coton",
      "Livrés garnis sous emballage protecteur",
    ],
  },
  {
    id: "rosbri-pochette-laptop",
    slug: "housse-ordinateur-wax-cuir",
    title: "Housse d'Ordinateur Matelassée Wax & Cuir Véritable",
    category: "accessoires",
    categoryLabel: "Accessoires & Maroquinerie",
    tagline: "Protection nomade haut de gamme pour esprits créatifs",
    description:
      "Étui zippé rembourré de mousse antichoc 8mm, habillé d'une toile Wax traitée déperlante et renforcé d'une poignée de maintien en cuir pleine fleur tanné localement.",
    basePriceXAF: 24000,
    coverImage: "/images/placeholders/project-placeholder.jpg",
    waxMotifs: [
      { id: "kente-royal", label: "Kente Royal Ambre & Or", colorCode: "#C59B53" },
      { id: "bogolan-ocre", label: "Bogolan Géométrique Ocre", colorCode: "#B45309" },
    ],
    sizes: ["13 - 14 pouces", "15 - 16 pouces"],
    materials: ["Wax traité anti-taches & Cuir pleine fleur", "Mousse antichoc haute densité"],
    details: [
      "Fermeture métallique YKK robuste",
      "Poche extérieure zippée pour chargeur et câbles",
      "Doublure velours ultra-douce anti-rayures",
    ],
  },
];

export function RosbriCatalogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProduct, setActiveProduct] = useState<RosbriProduct | null>(null);

  // Sélections pour le produit actif
  const [selectedMotif, setSelectedMotif] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [orderQty, setOrderQty] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // quoteStore used directly

  const filteredProducts =
    selectedCategory === "all"
      ? ROSBRI_PRODUCTS
      : ROSBRI_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleOpenConfigurator = (p: RosbriProduct) => {
    setActiveProduct(p);
    setSelectedMotif(p.waxMotifs[0].id);
    setSelectedSize(p.sizes[0]);
    setOrderQty(1);
    setAddedSuccess(false);
  };

  const handleAddToCart = () => {
    if (!activeProduct) return;

    const motifObj = activeProduct.waxMotifs.find((m) => m.id === selectedMotif) || activeProduct.waxMotifs[0];
    const isCustomSize = selectedSize.includes("Sur mesure");
    const unitPrice = activeProduct.basePriceXAF + (isCustomSize ? 10000 : 0);
    const totalPrice = unitPrice * orderQty;

    cartStore.addItem({
      productId: activeProduct.id,
      productSlug: activeProduct.slug,
      productName: activeProduct.title,
      familyId: "textile_rosbri",
      universeName: "Rosbri Wax Design",
      coverImage: activeProduct.coverImage,
      selectedOptions: {
        motif_wax: motifObj.label,
        taille: selectedSize,
      },
      selectedOptionLabels: {
        "Motif Wax d'Atelier": motifObj.label,
        "Taille / Confection": selectedSize,
      },
      quantity: orderQty,
      needsDesignService: false,
      isCustomQuote: false,
      unitPriceXAF: unitPrice,
      totalPriceXAF: totalPrice,
      pricingNotice: "Tarif atelier Rosbri 2026",
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setActiveProduct(null);
      cartStore.openDrawer();
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* MANIFESTE DE MARQUE ROSBRI */}
      <div
        style={{
          padding: "clamp(2rem, 5vw, 3.5rem)",
          backgroundColor: "#161B22",
          border: "1px solid rgba(197, 155, 83, 0.3)",
          borderRadius: "var(--radius-lg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(197, 155, 83, 0.15) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div style={{ maxWidth: "760px", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "rgba(197, 155, 83, 0.15)",
              color: "#C59B53",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}
          >
            <span>7E UNIVERS • MAISON DE CRÉATION TEXTILE</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              margin: "0 0 1rem",
            }}
          >
            L&apos;Élégance Architecturale du Wax Contemporain
          </h2>

          <p style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            <strong>Rosbri Wax Design</strong> est le laboratoire textile des Ateliers de Paul. Nous réinterprétons les étoffes de tradition (Wax hollandais authentique, Bogolan, Kente) avec la précision de coupe, la rigueur structurelle et le sens des volumes propres à l&apos;architecture. Chaque création est confectionnée à la main au Cameroun en séries limitées.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.85rem", color: "#A3B1C2" }}>
            <span>✓ Wax 100% Coton Hollandais Supérieur</span>
            <span>✓ Coutures d&apos;Atelier Renforcées</span>
            <span>✓ Confection sur mesure disponible</span>
          </div>
        </div>
      </div>

      {/* FILTRES PAR FAMILLE */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C59B53" }}>
              Collection Capsule 2026
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--text-primary)", margin: "0.25rem 0 0" }}>
              Pièces d&apos;Édition &amp; Confection
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "Toute la collection" },
              { id: "homme", label: "Vestiaire" },
              { id: "maison", label: "Maison & Décoration" },
              { id: "accessoires", label: "Maroquinerie" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedCategory(f.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: selectedCategory === f.id ? 700 : 500,
                  backgroundColor: selectedCategory === f.id ? "#C59B53" : "var(--bg-surface)",
                  color: selectedCategory === f.id ? "#11161F" : "var(--text-secondary)",
                  border: selectedCategory === f.id ? "1px solid #C59B53" : "1px solid var(--border-default)",
                  cursor: "pointer",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE DES PRODUITS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    height: "220px",
                    backgroundColor: "var(--bg-secondary)",
                    backgroundImage: `url(${p.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      padding: "3px 10px",
                      backgroundColor: "rgba(17, 22, 31, 0.85)",
                      backdropFilter: "blur(4px)",
                      borderRadius: "4px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#C59B53",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.categoryLabel}
                  </span>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.4rem" }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#C59B53", fontStyle: "italic", marginBottom: "0.75rem" }}>
                    « {p.tagline} »
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
                    {p.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                    {p.waxMotifs.map((m) => (
                      <span
                        key={m.id}
                        style={{
                          fontSize: "0.72rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        ✦ {m.label}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#C59B53", marginBottom: "0.5rem" }}>
                    {p.basePriceXAF.toLocaleString("fr-FR")} FCFA
                  </div>
                </div>
              </div>

              <div style={{ padding: "0 1.5rem 1.5rem" }}>
                <button
                  type="button"
                  onClick={() => handleOpenConfigurator(p)}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.8rem 1.25rem",
                    backgroundColor: "#C59B53",
                    color: "#11161F",
                    fontWeight: 700,
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  <Scissors size={16} />
                  <span>Choisir la taille &amp; le motif</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CONFIGURATEUR TEXTILE ROSBRI */}
      {activeProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              maxWidth: "560px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "2rem",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "#C59B53", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }}>
              Atelier de Confection Rosbri
            </div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 1rem" }}>
              {activeProduct.title}
            </h3>

            {/* Sélecteur de motif Wax */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                1. Choisissez votre motif Wax authentique :
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {activeProduct.waxMotifs.map((motif) => {
                  const isChecked = selectedMotif === motif.id;
                  return (
                    <button
                      key={motif.id}
                      type="button"
                      onClick={() => setSelectedMotif(motif.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        backgroundColor: isChecked ? "rgba(197, 155, 83, 0.12)" : "var(--bg-secondary)",
                        border: isChecked ? "2px solid #C59B53" : "1px solid var(--border-default)",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        textAlign: "left",
                        color: isChecked ? "#FFFFFF" : "var(--text-secondary)",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: motif.colorCode,
                          border: "1px solid rgba(255,255,255,0.4)",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "0.88rem", fontWeight: isChecked ? 700 : 500 }}>
                        {motif.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sélecteur de taille */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                2. Taille ou option sur mesure :
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                }}
              >
                {activeProduct.sizes.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantité & Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>
                  Quantité :
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={orderQty}
                  onChange={(e) => setOrderQty(Math.max(1, Number(e.target.value)))}
                  style={{
                    width: "70px",
                    padding: "4px 8px",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "4px",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                  }}
                />
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total confection :</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#C59B53" }}>
                  {(
                    (activeProduct.basePriceXAF + (selectedSize.includes("Sur mesure") ? 10000 : 0)) * orderQty
                  ).toLocaleString("fr-FR")}{" "}
                  FCFA
                </div>
              </div>
            </div>

            {addedSuccess && (
              <div style={{ padding: "0.75rem", backgroundColor: "rgba(78, 202, 142, 0.15)", border: "1px solid #4ECA8E", borderRadius: "6px", color: "#4ECA8E", fontSize: "0.85rem", textAlign: "center", marginBottom: "1rem" }}>
                ✓ Article ajouté au panier universel d&apos;Atelier !
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                style={{
                  padding: "0.6rem 1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#C59B53",
                  color: "#11161F",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ShoppingBag size={16} />
                <span>Ajouter à mon Panier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
