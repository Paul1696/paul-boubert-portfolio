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
} from "lucide-react";

interface DigitalCardViewProps {
  card: DigitalCardData;
}

export default function DigitalCardView({ card }: DigitalCardViewProps) {
  const [copied, setCopied] = useState(false);
  const [showQrDetails, setShowQrDetails] = useState(false);

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
          title: `${card.companyName} — ${card.contactName}`,
          text: `${card.companyName} (${card.activity}) • ${card.contactName} (${card.contactRole})`,
          url: permanentUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if share cancelled/unsupported
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
      <main className={styles.cardContainer} role="region" aria-label={`Carte de visite de ${card.contactName}`}>
        {/* ==============================================================
            1. BANNIÈRE ET IDENTITÉ DE MARQUE ETS TIFO
            ============================================================== */}
        <header className={styles.cardBanner}>
          <div className={styles.cardBannerPattern} aria-hidden="true" />

          {/* Logo / Monogramme Corporate */}
          <div className={styles.brandBadgeRow}>
            <div className={styles.companyLogoBox} title="Logo ETS TIFO">
              <span className={styles.logoMonogram}>TIFO</span>
              <span className={styles.logoSubtext}>PRO</span>
            </div>
          </div>

          <h1 className={styles.companyName}>{card.companyName}</h1>
          <span className={styles.activityBadge}>{card.activity}</span>

          {card.slogan && <p className={styles.sloganText}>« {card.slogan} »</p>}
        </header>

        {/* ==============================================================
            2. CORPS DE LA CARTE
            ============================================================== */}
        <div className={styles.cardBody}>
          {/* Identité du contact (AUCUN VISAGE — Conforme aux consignes) */}
          <div className={styles.contactBlock}>
            <span className={styles.contactRole}>{card.contactRole}</span>
            <h2 className={styles.contactName}>{card.contactName}</h2>
          </div>

          {/* Bouton d'action principal : Enregistrer le contact (VCF universel) */}
          <a
            href={vcfUrl}
            download={`${card.contactName.replace(/\s+/g, "_")}.vcf`}
            className={styles.saveContactBtn}
            aria-label="Enregistrer le contact dans le carnet d'adresses"
          >
            <Download size={19} />
            <span>Enregistrer le contact</span>
          </a>

          {/* Grille d'actions rapides : Appel, WhatsApp, Partage */}
          <div className={styles.quickActionsGrid} role="group" aria-label="Actions rapides">
            {/* Bouton Appeler */}
            <a
              href={`tel:${card.primaryPhone.replace(/\s+/g, "")}`}
              className={styles.actionPillBtn}
              aria-label={`Appeler le ${card.primaryPhone}`}
            >
              <Phone size={18} />
              <span>Appeler</span>
            </a>

            {/* Bouton WhatsApp */}
            <a
              href={`https://wa.me/${card.whatsappPhone}?text=${encodeURIComponent(
                `Bonjour M. ${card.contactName}, je consulte votre carte numérique ETS TIFO et souhaite échanger avec vous.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionPillBtn} ${styles.whatsappBtn}`}
              aria-label="Contacter sur WhatsApp"
            >
              <MessageSquare size={18} />
              <span>WhatsApp</span>
            </a>

            {/* Bouton Partager */}
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
          <section className={styles.sectionCard} aria-labelledby="phones-heading">
            <div className={styles.sectionHeader}>
              <Phone size={16} color="#0D5C3A" />
              <h3 id="phones-heading" className={styles.sectionTitle}>
                Lignes directes
              </h3>
            </div>

            <div className={styles.phoneList}>
              {card.phones.map((phone, idx) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className={styles.phoneRow}
                >
                  <span>{phone}</span>
                  <span className={styles.phoneLabel}>
                    {idx === 0 ? "Principal / WhatsApp" : "Secondaire"}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Localisation Carrefour Arno & Google Maps */}
          <section className={styles.sectionCard} aria-labelledby="location-heading">
            <div className={styles.sectionHeader}>
              <MapPin size={16} color="#0D5C3A" />
              <h3 id="location-heading" className={styles.sectionTitle}>
                Localisation
              </h3>
            </div>

            <p className={styles.locationText}>
              <strong>{card.address}</strong>
              <br />
              {card.city}, {card.country}
            </p>

            <a
              href={card.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsBtn}
            >
              <MapPin size={15} />
              <span>Nous localiser sur Google Maps</span>
              <ArrowUpRight size={14} />
            </a>
          </section>

          {/* Présentation de l'entreprise */}
          {card.description && (
            <section className={styles.sectionCard} aria-labelledby="about-heading">
              <div className={styles.sectionHeader}>
                <Layers size={16} color="#0D5C3A" />
                <h3 id="about-heading" className={styles.sectionTitle}>
                  À propos d&apos;ETS TIFO
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#32483d", lineHeight: 1.55 }}>
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
                  Produits &amp; Réalisations
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

          {/* QR Code permanent & Prêt pour impression BAT */}
          <section className={styles.qrCodeSection} aria-labelledby="qr-heading">
            <div className={styles.sectionHeader} style={{ justifyContent: "center" }}>
              <QrCode size={16} color="#0D5C3A" />
              <h3 id="qr-heading" className={styles.sectionTitle}>
                QR Code Définitif d&apos;Impression
              </h3>
            </div>

            <div className={styles.qrCodeFrame}>
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
              Ce QR code encode l&apos;URL permanente garantie. Il reste valide sans interruption même en cas de mise à jour des coordonnées.
            </p>

            <div className={styles.qrActions}>
              <a
                href={qrSvgUrl}
                download={`QR_Code_ETS_TIFO_${card.publicId}.svg`}
                target="_blank"
                rel="noreferrer"
                className={styles.qrDownloadBtn}
              >
                <Download size={13} />
                <span>Export SVG (Vectoriel BAT)</span>
              </a>

              <a
                href={qrImageUrl}
                download={`QR_Code_ETS_TIFO_${card.publicId}.png`}
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

        {/* ==============================================================
            3. PIED DE PAGE & SIGNATURE ADP STUDIO
            ============================================================== */}
        <footer className={styles.cardFooter}>
          <p className={styles.poweredText}>
            Carte numérique propulsée par{" "}
            <Link href="/" className={styles.poweredLink}>
              Les Ateliers de Paul
            </Link>{" "}
            · ADP Studio
          </p>
        </footer>
      </main>
    </div>
  );
}
