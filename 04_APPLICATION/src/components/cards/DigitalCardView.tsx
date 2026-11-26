"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DigitalCardData, CardProductItem } from "@/types/digital-card";
import styles from "@/styles/digital-card.module.css";
import {
  Phone,
  MessageSquare,
  Share2,
  MapPin,
  Download,
  QrCode,
  Check,
  ArrowUpRight,
  Eye,
  X,
} from "lucide-react";

interface DigitalCardViewProps {
  card: DigitalCardData;
}

/**
 * Illustration vectorielle technique sobre et honnête par spécialité
 * (utilisée exclusivement lorsqu'aucune photographie authentique client n'est renseignée).
 */
function SpecialtyTechnicalPlaceholder({ product }: { product: CardProductItem }) {
  const key = `${product.id} ${product.name} ${product.category}`.toLowerCase();

  if (key.includes("polo")) {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
        <path
          d="M32 20L40 16H56L64 20L80 30L73 44L64 39V78H32V39L23 44L16 30L32 20Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M40 16L48 27L56 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M48 27V38" stroke="#F5B700" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="55" cy="36" r="2.5" fill="#D62828" />
      </svg>
    );
  }

  if (key.includes("tshirt") || key.includes("t-shirt")) {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
        <path
          d="M33 18C38 22 58 22 63 18L80 28L73 43L63 38V78H33V38L23 43L16 28L33 18Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <rect x="41" y="34" width="14" height="10" rx="2" stroke="#F5B700" strokeWidth="2" />
      </svg>
    );
  }

  if (key.includes("pull") || key.includes("sweat")) {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
        <path
          d="M34 20C39 15 57 15 62 20L78 30L72 74H63V40L61 78H35L33 40V74H24L18 30L34 20Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M39 58H57L54 68H42L39 58Z" stroke="#F5B700" strokeWidth="1.8" />
      </svg>
    );
  }

  if (key.includes("echarpe") || key.includes("écharpe")) {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
        <path
          d="M26 26C26 19 70 19 70 28C70 37 28 37 28 46H56V76H40V46"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M56 38V70H68V34" stroke="#F5B700" strokeWidth="2" strokeLinejoin="round" />
        <path d="M42 76V82M48 76V82M54 76V82" stroke="#D62828" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("casquette") || key.includes("headwear")) {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
        <path
          d="M22 54C22 35 35 24 51 24C66 24 76 35 76 54H22Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M22 54H84C84 61 72 64 58 62L22 54Z"
          stroke="#F5B700"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="22" r="2.5" fill="#D62828" />
      </svg>
    );
  }

  if (key.includes("jogging") || key.includes("sport")) {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
        <path
          d="M32 18H64L68 78H53L48 44L43 78H28L32 18Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M32 25H64" stroke="#F5B700" strokeWidth="2" />
        <path d="M34 32L31 72M62 32L65 72" stroke="#D62828" strokeWidth="1.6" strokeDasharray="3 3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" fill="none" className={styles.placeholderSvg} aria-hidden="true">
      <rect x="20" y="22" width="56" height="52" rx="6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M20 36H76" stroke="#F5B700" strokeWidth="2" />
      <path d="M32 50H64M32 60H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProductImageWithState({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <>
      {!loaded && <div className={styles.photoSkeleton} aria-hidden="true" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`${styles.specialtyPhoto} ${loaded ? styles.specialtyPhotoLoaded : ""}`}
      />
    </>
  );
}

export default function DigitalCardView({ card }: DigitalCardViewProps) {
  const [copied, setCopied] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CardProductItem | null>(null);
  const [activeGalleryUrl, setActiveGalleryUrl] = useState<string | null>(null);
  const [qrFallback, setQrFallback] = useState(false);

  const safeContactName = card.contactName || "Contact";
  const safeCompanyName = card.companyName || "Entreprise";
  const primaryPhone = card.primaryPhone || (card as any).phone || "";
  const rawWhatsapp = card.whatsappPhone || (card as any).whatsapp || primaryPhone;
  const whatsappDigits = rawWhatsapp.replace(/[^\d]/g, "");
  const phonesList =
    Array.isArray(card.phones) && card.phones.length > 0
      ? card.phones
      : primaryPhone
      ? [primaryPhone]
      : [];
  const safeAddress = card.address || "";
  const safeCity = card.city || "Douala";
  const safeCountry = card.country || "Cameroun";
  const safeGoogleMaps =
    card.googleMapsUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(`${safeAddress} ${safeCity} ${safeCountry}`)}`;

  const hasOfficialLogo = Boolean(card.branding?.logoUrl && !card.branding?.isTemporaryLogo);
  const monogram =
    (card.companyName
      ? card.companyName
          .replace(/^ETS\s+/i, "ETS ")
          .split(/\s+/)
          .slice(0, 2)
          .map((w: string) => w[0]?.toUpperCase() || "")
          .join("")
      : "ADP") || "ADP";

  const primaryColor = card.branding?.primaryColor || "#0D5C3A";
  const accentYellow = card.branding?.accentYellow || "#F5B700";
  const accentRed = card.branding?.accentRed || "#D62828";

  const permanentUrl = `https://ateliersdepaul.com/c/${card.publicId}`;
  const vcfUrl = `/c/${card.publicId}/vcf`;
  const localQrSvgEndpoint = `/api/cards/${card.publicId}/qr?format=svg&download=1`;
  const localQrPngEndpoint = `/api/cards/${card.publicId}/qr?format=png&download=1`;
  const primaryQrSrc = qrFallback
    ? `/api/cards/${card.publicId}/qr?format=svg`
    : `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(
        permanentUrl
      )}&margin=2&format=png`;

  const defaultWhatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
        `Bonjour ${safeContactName}, je consulte la vitrine numérique ${safeCompanyName} et souhaite échanger au sujet d'une commande.`
      )}`
    : "";

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProduct]);

  const openProductModal = (prod: CardProductItem) => {
    setSelectedProduct(prod);
    const firstUrl = prod.image || prod.gallery?.[0]?.url || null;
    setActiveGalleryUrl(firstUrl);
  };

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
        // Repli presse-papiers si annulation du partage natif
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(permanentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const customVars = {
    "--card-primary": primaryColor,
    "--card-yellow": accentYellow,
    "--card-red": accentRed,
  } as React.CSSProperties;

  return (
    <div className={styles.cardViewport} style={customVars}>
      <main
        className={styles.cardContainer}
        role="region"
        aria-label={`Vitrine professionnelle de ${safeCompanyName} — ${safeContactName}`}
      >
        {/* ==============================================================
            1. BANDEAU SUPÉRIEUR DE MARQUE
            ============================================================== */}
        <header className={styles.cardBanner}>
          <div className={styles.tricolorRibbon} aria-hidden="true">
            <span className={styles.ribbonGreen} />
            <span className={styles.ribbonYellow} />
            <span className={styles.ribbonRed} />
          </div>
          <div className={styles.cardBannerPattern} aria-hidden="true" />
          <div className={styles.cardBannerGlow} aria-hidden="true" />

          <div className={styles.bannerInner}>
            <div className={styles.brandMarkCol}>
              <div
                className={styles.companyLogoBox}
                title={
                  hasOfficialLogo
                    ? `Logo officiel ${safeCompanyName}`
                    : `Monogramme provisoire ${safeCompanyName} (en attente du logo officiel)`
                }
              >
                {hasOfficialLogo && card.branding?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.branding.logoUrl}
                    alt={card.branding.logoAlt || `Logo ${safeCompanyName}`}
                    className={styles.authenticLogoImg}
                  />
                ) : (
                  <>
                    <span className={styles.logoMonogram}>{monogram}</span>
                    <span className={styles.logoMonogramRule} aria-hidden="true" />
                  </>
                )}
              </div>
              {!hasOfficialLogo && (
                <span className={styles.provisionalMarkNote}>Monogramme provisoire</span>
              )}
            </div>

            <div className={styles.bannerTitleCol}>
              <div className={styles.activityKicker}>
                <span className={styles.kickerDot} aria-hidden="true" />
                <span>{card.activity}</span>
              </div>
              <h1 className={styles.companyName}>{safeCompanyName}</h1>
              {card.slogan && <p className={styles.sloganText}>« {card.slogan} »</p>}
            </div>

            <div className={styles.bannerMetaCol}>
              {card.metadata?.verifiedCertificationLabel && (
                <span className={styles.bannerLocationPill}>
                  {card.metadata.verifiedCertificationLabel}
                </span>
              )}
              <span className={styles.bannerLocationPill}>
                <MapPin size={14} aria-hidden="true" />
                <span>
                  {safeAddress ? `${safeAddress}, ` : ""}
                  {safeCity}
                </span>
              </span>
              {card.products && card.products.length > 0 && (
                <a href="#catalogue-specialites" className={styles.bannerCatalogAnchor}>
                  Découvrir les {card.products.length} spécialités ↓
                </a>
              )}
            </div>
          </div>
        </header>

        {/* ==============================================================
            2. IDENTITÉ DU RESPONSABLE & BARRE D'ACTIONS COMMERCIALES
               Ordre Mobile strict : Nom/Fonction -> WhatsApp principal ->
               Enregistrer le contact -> Appeler & Itinéraire
            ============================================================== */}
        <section className={styles.executiveBar} aria-label="Interlocuteur et actions directes">
          <div className={styles.executiveIdentity}>
            <span className={styles.contactRoleTag}>
              <span className={styles.roleAccentBar} aria-hidden="true" />
              <span>{card.contactRole}</span>
            </span>
            <h2 className={styles.contactName}>{safeContactName}</h2>
            <div className={styles.executiveQuickMeta}>
              {primaryPhone && (
                <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className={styles.metaInlineLink}>
                  {primaryPhone}
                </a>
              )}
              <span>
                {safeAddress ? `${safeAddress} · ` : ""}
                {safeCity}, {safeCountry}
              </span>
            </div>
          </div>

          <div className={styles.actionsCluster} role="group" aria-label="Actions principales">
            {defaultWhatsappHref && (
              <a
                href={defaultWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryWhatsappCta}
                aria-label={`Échanger sur WhatsApp avec ${safeContactName}`}
              >
                <span className={styles.whatsappLiveDot} aria-hidden="true" />
                <MessageSquare size={18} aria-hidden="true" />
                <span>Échanger sur WhatsApp</span>
              </a>
            )}

            <a
              href={vcfUrl}
              download={`${safeContactName.replace(/\s+/g, "_")}.vcf`}
              className={styles.saveVcardCta}
              aria-label="Enregistrer le contact dans le carnet d'adresses (vCard)"
            >
              <Download size={17} aria-hidden="true" />
              <span>Enregistrer le contact</span>
            </a>

            <div className={styles.secondaryActionsRow}>
              {primaryPhone && (
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                  className={styles.secondaryActionBtn}
                  aria-label={`Appeler le ${primaryPhone}`}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>Appeler</span>
                </a>
              )}

              <a
                href={safeGoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryActionBtn}
                aria-label="Ouvrir l'itinéraire Google Maps"
              >
                <MapPin size={16} aria-hidden="true" />
                <span>Itinéraire</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className={`${styles.secondaryActionBtn} ${styles.desktopShareBtn}`}
                aria-label="Partager cette fiche professionnelle"
              >
                {copied ? <Check size={16} color={primaryColor} /> : <Share2 size={16} />}
                <span>{copied ? "Lien copié" : "Partager"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==============================================================
            3. CORPS ÉDITORIAL : PRÉSENTATION & GALERIE (GAUCHE) /
               COORDONNÉES, LOCALISATION & QR PERMANENT (DROITE)
            ============================================================== */}
        <div className={styles.editorialWorkspace}>
          <div className={styles.mainEditorialColumn}>
            {/* Présentation courte de l'entreprise & points forts éventuels */}
            {(card.description || (card.highlights && card.highlights.length > 0)) && (
              <section className={styles.editorialSection} aria-labelledby="about-heading">
                <div className={styles.sectionEyebrowRow}>
                  <div className={styles.sectionEyebrowLeft}>
                    <span className={styles.sectionIndexMark} aria-hidden="true" />
                    <h3 id="about-heading" className={styles.sectionTitle}>
                      Présentation &amp; Savoir-Faire
                    </h3>
                  </div>
                </div>

                {card.description && <p className={styles.aboutLead}>{card.description}</p>}

                {card.highlights && card.highlights.length > 0 && (
                  <div className={styles.highlightsStrip}>
                    {card.highlights.map((hl) => (
                      <div key={hl.id} className={styles.highlightItem}>
                        <h4 className={styles.highlightTitle}>{hl.title}</h4>
                        <p className={styles.highlightDesc}>{hl.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Galerie commerciale illustrée des spécialités */}
            {card.products && card.products.length > 0 && (
              <section
                id="catalogue-specialites"
                className={styles.editorialSection}
                aria-labelledby="products-heading"
              >
                <div className={styles.sectionEyebrowRow}>
                  <div className={styles.sectionEyebrowLeft}>
                    <span className={styles.sectionIndexMark} aria-hidden="true" />
                    <h3 id="products-heading" className={styles.sectionTitle}>
                      Spécialités &amp; Gamme Commerciale
                    </h3>
                  </div>
                  <span className={styles.sectionCountBadge}>
                    {card.products.length}{" "}
                    {card.products.length > 1 ? "catégories disponibles" : "catégorie disponible"}
                  </span>
                </div>

                <div className={styles.productsShowcaseGrid}>
                  {card.products.map((prod) => {
                    const coverImage = prod.image || prod.gallery?.[0]?.url;
                    const galleryCount = (prod.gallery?.length || 0) + (prod.image ? 1 : 0);
                    const productWaHref = whatsappDigits
                      ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                          `Bonjour ${safeContactName}, je souhaite obtenir un devis chez ${safeCompanyName} concernant la spécialité « ${prod.name} » (${prod.category}).`
                        )}`
                      : "";

                    return (
                      <article key={prod.id} className={styles.specialtyCard}>
                        <div className={styles.specialtyVisualStage}>
                          <span className={styles.categoryFloatingPill}>{prod.category}</span>

                          {coverImage ? (
                            <>
                              <ProductImageWithState
                                src={coverImage}
                                alt={prod.imageAlt || `${prod.name} — ${safeCompanyName}`}
                              />
                              {galleryCount > 1 && (
                                <span className={styles.galleryCountPill}>
                                  {galleryCount} photos
                                </span>
                              )}
                            </>
                          ) : (
                            <div className={styles.placeholderIllustrationWrap}>
                              <SpecialtyTechnicalPlaceholder product={prod} />
                              <span className={styles.placeholderHonestBadge}>
                                Placeholder · Visuel client à intégrer
                              </span>
                            </div>
                          )}
                        </div>

                        <div className={styles.specialtyContent}>
                          <h4 className={styles.specialtyTitle}>{prod.name}</h4>
                          {prod.description && (
                            <p className={styles.specialtyDesc}>{prod.description}</p>
                          )}
                          {prod.specs && <p className={styles.specialtySpecs}>{prod.specs}</p>}

                          <div className={styles.specialtyFooter}>
                            <button
                              type="button"
                              onClick={() => openProductModal(prod)}
                              className={styles.openGalleryBtn}
                            >
                              <Eye size={14} aria-hidden="true" />
                              <span>Détails &amp; galerie</span>
                            </button>

                            {productWaHref && (
                              <a
                                href={productWaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.directOrderLink}
                              >
                                <span>Devis direct</span>
                                <ArrowUpRight size={13} aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* --------------------------------------------------------
              COLONNE LATÉRALE : COORDONNÉES, LOCALISATION, QR & PARTAGE
              -------------------------------------------------------- */}
          <aside className={styles.sideAnchorColumn} aria-label="Coordonnées, localisation et QR code">
            <section className={styles.editorialSection} aria-labelledby="coordinates-heading">
              <div className={styles.sectionEyebrowRow}>
                <div className={styles.sectionEyebrowLeft}>
                  <span className={styles.sectionIndexMark} aria-hidden="true" />
                  <h3 id="coordinates-heading" className={styles.sectionTitle}>
                    Coordonnées &amp; Localisation
                  </h3>
                </div>
              </div>

              <div className={styles.contactDetailsBlock}>
                {phonesList.length > 0 && (
                  <div className={styles.phoneLinesStack}>
                    {phonesList.map((phone, idx) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className={styles.phoneLineItem}
                      >
                        <span className={styles.phoneNumberText}>{phone}</span>
                        <span className={styles.phoneRoleTag}>
                          {idx === 0 ? "Principal / WhatsApp" : `Ligne ${idx + 1}`}
                        </span>
                      </a>
                    ))}
                    {card.email && (
                      <a href={`mailto:${card.email}`} className={styles.phoneLineItem}>
                        <span className={styles.phoneNumberText}>{card.email}</span>
                        <span className={styles.phoneRoleTag}>Courriel</span>
                      </a>
                    )}
                  </div>
                )}

                <div className={styles.locationPanel}>
                  <p className={styles.locationAddress}>
                    <strong>{safeAddress || safeCity}</strong>
                    <span className={styles.locationCitySub}>
                      {safeCity}, {safeCountry}
                    </span>
                  </p>

                  <a
                    href={safeGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapsRouteBtn}
                  >
                    <MapPin size={15} aria-hidden="true" />
                    <span>Ouvrir sur Google Maps</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            {/* QR Code Permanent, Partage & vCard */}
            <section className={styles.editorialSection} aria-labelledby="qr-heading">
              <div className={styles.sectionEyebrowRow}>
                <div className={styles.sectionEyebrowLeft}>
                  <span className={styles.sectionIndexMark} aria-hidden="true" />
                  <h3 id="qr-heading" className={styles.sectionTitle}>
                    QR Code Permanent &amp; Partage
                  </h3>
                </div>
                <QrCode size={15} color={primaryColor} aria-hidden="true" />
              </div>

              <div className={styles.qrShowcaseCard}>
                <div className={styles.qrFrame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={primaryQrSrc}
                    alt={`QR code permanent vers ${permanentUrl}`}
                    width={148}
                    height={148}
                    onError={() => setQrFallback(true)}
                    className={styles.qrImg}
                  />
                </div>

                <span className={styles.permanentUrlPill}>{permanentUrl}</span>

                <p className={styles.qrCaption}>
                  Adresse permanente garantie : ce QR code reste valide même lorsque les coordonnées ou la galerie sont mises à jour.
                </p>

                <div className={styles.qrUtilityActions}>
                  <button
                    type="button"
                    onClick={handleShare}
                    className={styles.utilityShareFullBtn}
                  >
                    {copied ? <Check size={16} color={primaryColor} /> : <Share2 size={16} />}
                    <span>{copied ? "Lien copié dans le presse-papiers !" : "Partager ou copier le lien"}</span>
                  </button>

                  <a
                    href={localQrSvgEndpoint}
                    download={`QR_${safeCompanyName.replace(/\s+/g, "_")}_${card.publicId}.svg`}
                    className={styles.qrExportBtn}
                  >
                    <Download size={13} aria-hidden="true" />
                    <span>QR SVG (BAT)</span>
                  </a>

                  <a
                    href={localQrPngEndpoint}
                    download={`QR_${safeCompanyName.replace(/\s+/g, "_")}_${card.publicId}.png`}
                    className={styles.qrExportBtn}
                  >
                    <Download size={13} aria-hidden="true" />
                    <span>QR PNG (HD)</span>
                  </a>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* ==============================================================
            4. PIED DE PAGE & SIGNATURE ADP STUDIO
            ============================================================== */}
        <footer className={styles.cardFooter}>
          <p className={styles.poweredText}>
            Vitrine numérique conçue par{" "}
            <Link href="/" className={styles.poweredLink}>
              Les Ateliers de Paul
            </Link>{" "}
            ·{" "}
            <Link href="/adp-studio" className={styles.poweredLink}>
              ADP Studio
            </Link>
          </p>
          <span className={styles.immutableRefTag}>URL permanente : /c/{card.publicId}</span>
        </footer>
      </main>

      {/* ==============================================================
          5. MODALE DE GALERIE DÉTAILLÉE PAR SPÉCIALITÉ
          ============================================================== */}
      {selectedProduct && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="specialty-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProduct(null);
          }}
        >
          <div className={styles.modalDialog}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.contactRoleTag}>{selectedProduct.category}</span>
                <h3
                  id="specialty-modal-title"
                  style={{
                    margin: "0.2rem 0 0",
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: "1.35rem",
                    color: "#0D1F17",
                  }}
                >
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className={styles.modalCloseBtn}
                aria-label="Fermer la fenêtre de détail"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalVisualHero}>
                {activeGalleryUrl ? (
                  <ProductImageWithState
                    src={activeGalleryUrl}
                    alt={`${selectedProduct.name} — ${safeCompanyName}`}
                  />
                ) : (
                  <div className={styles.placeholderIllustrationWrap}>
                    <SpecialtyTechnicalPlaceholder product={selectedProduct} />
                    <span className={styles.placeholderHonestBadge}>
                      Placeholder identifié · Aucun visuel client renseigné
                    </span>
                  </div>
                )}
              </div>

              {/* Miniatures si plusieurs photos authentiques ont été ajoutées depuis ADP Control */}
              {(() => {
                const allPhotos = [
                  ...(selectedProduct.image
                    ? [{ id: "cover", url: selectedProduct.image, caption: "Visuel principal" }]
                    : []),
                  ...(selectedProduct.gallery || []),
                ];
                if (allPhotos.length <= 1) return null;
                return (
                  <div className={styles.modalThumbsRow}>
                    {allPhotos.map((ph) => (
                      <button
                        key={ph.id}
                        type="button"
                        onClick={() => setActiveGalleryUrl(ph.url)}
                        className={`${styles.modalThumbBtn} ${
                          activeGalleryUrl === ph.url ? styles.modalThumbBtnActive : ""
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ph.url}
                          alt={ph.caption || selectedProduct.name}
                          className={styles.modalThumbImg}
                        />
                      </button>
                    ))}
                  </div>
                );
              })()}

              {!activeGalleryUrl && (
                <p className={styles.modalPlaceholderNotice}>
                  <strong>Emplacement réservé aux réalisations authentiques :</strong> aucune fausse photographie n&apos;est affichée. Les photographies autorisées de {safeCompanyName} peuvent être rattachées à cette spécialité depuis <strong>ADP Control</strong>.
                </p>
              )}

              {selectedProduct.description && (
                <p style={{ margin: 0, fontSize: "0.94rem", lineHeight: 1.65, color: "#1D3328" }}>
                  {selectedProduct.description}
                </p>
              )}

              {selectedProduct.specs && (
                <div
                  style={{
                    padding: "0.75rem 0.95rem",
                    borderRadius: "10px",
                    backgroundColor: "#FAFBF9",
                    border: "1px solid rgba(13, 92, 58, 0.14)",
                    fontSize: "0.82rem",
                    color: "#233B2E",
                  }}
                >
                  <strong>Spécifications :</strong> {selectedProduct.specs}
                </div>
              )}

              {whatsappDigits && (
                <a
                  href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                    `Bonjour ${safeContactName}, je souhaite commander ou obtenir un chiffrage chez ${safeCompanyName} pour la spécialité « ${selectedProduct.name} ».`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryWhatsappCta}
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  <span>Demander un devis WhatsApp pour « {selectedProduct.name} »</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
