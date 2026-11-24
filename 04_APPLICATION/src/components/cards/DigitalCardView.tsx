"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DigitalCardData } from "@/types/digital-card";
import styles from "@/styles/digital-card.module.css";
import {
  Phone,
  MessageSquare,
  Share2,
  MapPin,
  Download,
  QrCode,
  Check,
  Package,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
} from "lucide-react";

interface DigitalCardViewProps {
  card: DigitalCardData;
}

export default function DigitalCardView({ card }: DigitalCardViewProps) {
  const [copied, setCopied] = useState(false);

  const safeContactName = card.contactName || "Contact";
  const safeCompanyName = card.companyName || "Entreprise";
  const primaryPhone = card.primaryPhone || (card as any).phone || "";
  const whatsappPhone = card.whatsappPhone || (card as any).whatsapp || primaryPhone.replace(/\s+/g, "").replace(/^\+/, "");
  const phonesList = Array.isArray(card.phones) && card.phones.length > 0 ? card.phones : (primaryPhone ? [primaryPhone] : []);
  const safeAddress = card.address || "";
  const safeCity = card.city || "Douala";
  const safeCountry = card.country || "Cameroun";
  const safeGoogleMaps = card.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${safeAddress} ${safeCity} ${safeCountry}`)}`;
  const monogram = (card.companyName ? card.companyName.split(/\s+/).slice(0, 2).map((w: string) => w[0]?.toUpperCase() || "").join("") : "ADP") || "ADP";

  const permanentUrl = `https://ateliersdepaul.com/c/${card.publicId}`;
  const vcfUrl = `/c/${card.publicId}/vcf`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(
    permanentUrl
  )}&margin=2&format=png`;
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    permanentUrl
  )}&margin=3&format=svg`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${safeCompanyName} — ${safeContactName}`,
          text: `${safeCompanyName} (${card.activity || "Activité"}) • ${safeContactName} (${card.contactRole || "Responsable"})`,
          url: permanentUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if share cancelled
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(permanentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={styles.cardViewport}>
      <main
        className={styles.cardContainer}
        role="region"
        aria-label={`Carte de visite de ${safeContactName}`}
      >
        {/* ==============================================================
            1. BANNIÈRE ET IDENTITÉ DE MARQUE
            ============================================================== */}
        <header className={styles.cardBanner}>
          {/* Liseré tricolore identitaire */}
          <div className={styles.tricolorRibbon} aria-hidden="true">
            <span className={styles.ribbonGreen} />
            <span className={styles.ribbonYellow} />
            <span className={styles.ribbonRed} />
          </div>

          <div className={styles.cardBannerPattern} aria-hidden="true" />

          {/* Logo / Monogramme Corporate */}
          <div className={styles.brandBadgeRow}>
            <div className={styles.companyLogoBox} title={`Logo officiel ${safeCompanyName}`}>
              <span className={styles.logoMonogram}>{monogram}</span>
              <span className={styles.logoSubtext}>PRO</span>
            </div>
          </div>

          <div>
            <h1 className={styles.companyName}>{safeCompanyName}</h1>
            <span className={styles.activityBadge}>{card.activity}</span>
            {card.slogan && <p className={styles.sloganText}>« {card.slogan} »</p>}
          </div>

          <div className={styles.bannerRightBadge}>
            <span style={{ fontSize: "0.72rem", color: "#F5B700", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Profil Certifié
            </span>
            <span style={{ fontSize: "0.68rem", color: "#D1EADB" }}>
              Réf : {card.publicId.toUpperCase()}
            </span>
          </div>
        </header>

        {/* ==============================================================
            2. CORPS MULTI-COLONNES RESPONSIVE
            ============================================================== */}
        <div className={styles.cardBody}>
          <div className={styles.responsiveGrid}>
            {/* --------------------------------------------------------
                COLONNE GAUCHE : Contact & Actions d'Accès
                -------------------------------------------------------- */}
            <div className={styles.leftColumn}>
              {/* Identité du contact (AUCUN VISAGE) */}
              <div className={styles.contactBlock}>
                <span className={styles.contactRole}>{card.contactRole}</span>
                <h2 className={styles.contactName}>{safeContactName}</h2>
              </div>

              {/* Bouton d'action principal : Enregistrer le contact (VCF) */}
              <a
                href={vcfUrl}
                download={`${safeContactName.replace(/\s+/g, "_")}.vcf`}
                className={styles.saveContactBtn}
                aria-label="Enregistrer le contact dans le carnet d'adresses"
              >
                <Download size={19} />
                <span>Enregistrer le contact</span>
              </a>

              {/* Grille d'actions rapides : Appel, WhatsApp, Partage */}
              <div className={styles.quickActionsGrid} role="group" aria-label="Actions rapides">
                {primaryPhone && (
                  <a
                    href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                    className={styles.actionPillBtn}
                    aria-label={`Appeler le ${primaryPhone}`}
                  >
                    <Phone size={18} />
                    <span>Appeler</span>
                  </a>
                )}

                {whatsappPhone && (
                  <a
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                      `Bonjour M. ${safeContactName}, je consulte votre carte numérique ${safeCompanyName} et souhaite échanger avec vous.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionPillBtn} ${styles.whatsappBtn}`}
                    aria-label="Contacter sur WhatsApp"
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className={styles.actionPillBtn}
                  aria-label="Partager cette carte"
                >
                  {copied ? <Check size={18} color="#0D5C3A" /> : <Share2 size={18} />}
                  <span>{copied ? "Lien copié !" : "Partager"}</span>
                </button>
              </div>

              {/* Coordonnées & Téléphones */}
              {phonesList.length > 0 && (
                <section className={styles.sectionCard} aria-labelledby="phones-heading">
                  <div className={styles.sectionHeader}>
                    <Phone size={16} color="#0D5C3A" />
                    <h3 id="phones-heading" className={styles.sectionTitle}>
                      Lignes directes
                    </h3>
                  </div>

                  <div className={styles.phoneList}>
                    {phonesList.map((phone, idx) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className={styles.phoneRow}
                      >
                        <span>{phone}</span>
                        <span className={styles.phoneLabel}>
                          {idx === 0 ? "Principal / WhatsApp" : "Ligne atelier"}
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Localisation & Google Maps */}
              <section className={styles.sectionCard} aria-labelledby="location-heading">
                <div className={styles.sectionHeader}>
                  <MapPin size={16} color="#0D5C3A" />
                  <h3 id="location-heading" className={styles.sectionTitle}>
                    Atelier &amp; Localisation
                  </h3>
                </div>

                <p className={styles.locationText}>
                  <strong>{safeAddress}</strong>
                  <br />
                  {safeCity}, {safeCountry}
                </p>

                <a
                  href={safeGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapsBtn}
                >
                  <MapPin size={15} />
                  <span>Ouvrir sur Google Maps</span>
                  <ArrowUpRight size={14} />
                </a>
              </section>

              {/* QR Code permanent & Prêt pour impression BAT */}
              <section className={styles.qrCodeSection} aria-labelledby="qr-heading">
                <div className={styles.sectionHeader} style={{ justifyContent: "center" }}>
                  <QrCode size={16} color="#0D5C3A" />
                  <h3 id="qr-heading" className={styles.sectionTitle}>
                    QR Code Permanent
                  </h3>
                </div>

                <div className={styles.qrCodeFrame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrImageUrl}
                    alt={`QR code permanent menant vers ${permanentUrl}`}
                    width={160}
                    height={160}
                    style={{ display: "block" }}
                  />
                </div>

                <div>
                  <span className={styles.qrCodeUrlBadge}>{permanentUrl}</span>
                </div>

                <p style={{ margin: "0.5rem 0 0", fontSize: "0.72rem", color: "#486354" }}>
                  Ce QR code encode exclusivement l&apos;URL permanente garantie. Il reste valide sans interruption même en cas de mise à jour future des coordonnées.
                </p>

                <div className={styles.qrActions}>
                  <a
                    href={qrSvgUrl}
                    download={`QR_Code_${safeCompanyName.replace(/\s+/g, "_")}_${card.publicId}.svg`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.qrDownloadBtn}
                  >
                    <Download size={13} />
                    <span>Export SVG (BAT)</span>
                  </a>

                  <a
                    href={qrImageUrl}
                    download={`QR_Code_${safeCompanyName.replace(/\s+/g, "_")}_${card.publicId}.png`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.qrDownloadBtn}
                  >
                    <Download size={13} />
                    <span>Export PNG (HD)</span>
                  </a>
                </div>
              </section>
            </div>

            {/* --------------------------------------------------------
                COLONNE DROITE : Entreprise, Produits & Savoir-Faire
                -------------------------------------------------------- */}
            <div className={styles.rightColumn}>
              {/* Présentation de l'entreprise */}
              {card.description && (
                <section className={styles.sectionCard} aria-labelledby="about-heading">
                  <div className={styles.sectionHeader}>
                    <Layers size={16} color="#0D5C3A" />
                    <h3 id="about-heading" className={styles.sectionTitle}>
                      À propos de {card.companyName}
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "#233B2E", lineHeight: 1.65 }}>
                    {card.description}
                  </p>
                </section>
              )}

              {/* Produits & Gamme Textile */}
              {card.products && card.products.length > 0 && (
                <section className={styles.sectionCard} aria-labelledby="products-heading">
                  <div className={styles.sectionHeader}>
                    <Package size={16} color="#0D5C3A" />
                    <h3 id="products-heading" className={styles.sectionTitle}>
                      Gamme &amp; Réalisations Confectionnées
                    </h3>
                  </div>

                  <div className={styles.productsGrid}>
                    {card.products.map((prod) => (
                      <div key={prod.id} className={styles.productCard}>
                        <span className={styles.productTag}>{prod.category}</span>
                        <h4 className={styles.productName}>{prod.name}</h4>
                        {prod.description && <p className={styles.productDesc}>{prod.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Engagements & Spécificités d'Atelier */}
              <section className={styles.commitmentsCard}>
                <div className={styles.sectionHeader}>
                  <Award size={16} color="#0D5C3A" />
                  <h3 className={styles.sectionTitle}>
                    Engagements d&apos;Atelier &amp; Qualité
                  </h3>
                </div>

                <div className={styles.commitmentItem}>
                  <ShieldCheck size={16} color="#0D5C3A" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Sérigraphie &amp; Broderie Haute Précision :</strong> encres professionnelles résistantes aux lavages intensifs et fils de broderie indélébiles.
                  </div>
                </div>

                <div className={styles.commitmentItem}>
                  <Sparkles size={16} color="#0D5C3A" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Matières Premières Sélectionnées :</strong> cotons peignés 180g à 220g, mailles piquées robustes et toiles denses pour uniformes de chantier et tenues d&apos;accueil.
                  </div>
                </div>

                <div className={styles.commitmentItem}>
                  <Truck size={16} color="#0D5C3A" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Livraison &amp; Suivi de Commande :</strong> prise en charge de lots pour PME, institutions, clubs et événements à Douala et expédition dans tout le Cameroun.
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* ==============================================================
            3. PIED DE PAGE & SIGNATURE ADP STUDIO
            ============================================================== */}
        <footer className={styles.cardFooter}>
          <p className={styles.poweredText}>
            Carte numérique professionnelle propulsée par{" "}
            <Link href="/" className={styles.poweredLink}>
              Les Ateliers de Paul
            </Link>{" "}
            ·{" "}
            <Link href="/adp-studio" className={styles.poweredLink}>
              ADP Studio
            </Link>{" "}
            · Identifiant immuable : <code>{card.publicId}</code>
          </p>
        </footer>
      </main>
    </div>
  );
}
