import type { Metadata } from "next";
import Link from "next/link";
import { 
  Sparkles, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Award, 
  FileText,
  Printer,
  Sparkle
} from "lucide-react";
import { StudioCatalogView } from "@/components/studio/StudioCatalogView";
import styles from "@/styles/studio.module.css";

export const metadata: Metadata = {
  title: "ADP Studio — Catalogue Commercial 2026 & Façonnage d'Atelier | Les Ateliers de Paul",
  description: "Catalogue officiel ADP Studio 2026 : cartes de visite haut de gamme, identités de marque, supports d'édition, signalétique d'architecte, textiles corporate et plans 2D/3D.",
  openGraph: {
    title: "ADP Studio — Catalogue Commercial 2026 | Les Ateliers de Paul",
    description: "Identités visuelles haut de gamme, cartes hybrides QR code, signalétique d'atelier et commercialisation immobilière.",
    locale: "fr_CM",
  },
};

export default function ADPStudioPage() {
  return (
    <div className={styles.studioWrapper}>
      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroWatermark} aria-hidden="true">
          STUDIO
        </div>

        <div className={styles.heroContent}>
          <div className={styles.poleBadge}>
            <Sparkles size={14} />
            <span>ADP Studio • Univers 03 • Catalogue Commercial 2026</span>
          </div>

          <h1 className={styles.heroTitle}>
            Création Graphique, Image de Marque &{" "}
            <span className={styles.heroTitleGradient}>Façonnage d'Atelier</span>
          </h1>

          <p className={styles.heroSubtitle}>
            De l'élaboration de chartes de prestige à l'impression d'exception, ADP Studio concrétise l'identité 
            de votre entreprise avec des supports tactiles sur-mesure et des cartes professionnelles connectées.
          </p>

          <div className={styles.heroActions}>
            <a href="#catalogue" className={styles.btnPrimary}>
              <Layers size={16} />
              Explorer le catalogue 2026
            </a>
            <Link href="/devis" className={styles.btnSecondary}>
              <FileText size={16} />
              Demander une étude d'atelier
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>6</div>
          <div className={styles.statLabel}>Familles Métiers Spécialisées</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>22</div>
          <div className={styles.statLabel}>Produits & Références Maîtrisés</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>100%</div>
          <div className={styles.statLabel}>Contrôle PAO & Épreuves d'Atelier</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>300 DPI</div>
          <div className={styles.statLabel}>Finition Vectorielle & Haute Précision</div>
        </div>
      </div>

      {/* --- FEATURED BANNER : ADP DIGITAL CARDS --- */}
      <section className={styles.featuredDigitalCards}>
        <div className={styles.digitalCardsCard}>
          <div>
            <div className={styles.digitalCardBadge}>
              <QrCode size={13} />
              <span>Innovation Studio 2026 • Prêt pour Déploiement</span>
            </div>
            <h2 className={styles.digitalCardTitle}>
              L'hybridation physique & digitale : ADP Digital Cards
            </h2>
            <p className={styles.digitalCardText}>
              Chaque carte physique façonnée par l'atelier peut désormais intégrer un QR code pérenne 
              reliant instantanément vos interlocuteurs à une carte de visite web interactive, complète, 
              responsive et sans application requise.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/c" className={styles.btnPrimary} style={{ fontSize: "0.85rem", padding: "0.65rem 1.25rem" }}>
                <QrCode size={15} />
                Découvrir ADP Digital Cards
              </Link>
              <Link 
                href="/c/tifo-0001" 
                className={styles.btnSecondary} 
                style={{ fontSize: "0.85rem", padding: "0.65rem 1.25rem" }}
                target="_blank"
              >
                Voir la carte pilote ETS TIFO
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className={styles.digitalCardPreviewBox}>
            <div style={{ color: "#4ECA8E", fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.25rem" }}>
              Écosystème Déployé & Opérationnel
            </div>
            <div style={{ color: "#A3B1C2", fontSize: "0.78rem" }}>
              Cartes connectées multi-entreprises avec contact vCard, catalogue produits et routage direct.
            </div>
            <div className={styles.digitalCardUrlTag}>
              ateliersdepaul.com/c/[entreprise]
            </div>
          </div>
        </div>
      </section>

      {/* --- CATALOGUE INTERACTIF --- */}
      <section id="catalogue" className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.poleBadge} style={{ marginBottom: "0.75rem" }}>
            <Award size={13} />
            <span>Catalogue Officiel</span>
          </div>
          <h2 className={styles.sectionTitle}>Toutes les créations & finitions d'atelier</h2>
          <p className={styles.sectionSubtitle}>
            Sélectionnez une famille de supports, filtrez selon vos besoins et configurez vos spécifications 
            techniques pour intégration directe dans votre devis.
          </p>
        </div>

        <StudioCatalogView />
      </section>

      {/* --- ATELIER DE FAÇONNAGE & FINITIONS --- */}
      <section className={styles.workshopSection}>
        <div className={styles.workshopContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.poleBadge} style={{ marginBottom: "0.75rem" }}>
              <Sparkle size={13} />
              <span>Savoir-Faire & Matières</span>
            </div>
            <h2 className={styles.sectionTitle}>Le Façonnage d'Exception par ADP Studio</h2>
            <p className={styles.sectionSubtitle}>
              La qualité d'un support imprimé réside dans la précision de ses détails, le choix rigoureux du papier 
              et la maîtrise artisanale des techniques de finition.
            </p>
          </div>

          <div className={styles.workshopGrid}>
            <div className={styles.workshopCard}>
              <div className={styles.workshopIcon}>✨</div>
              <h3 className={styles.workshopTitle}>Dorure & Frappe à Chaud</h3>
              <p className={styles.workshopDesc}>
                Dorure or mat, brillant, cuivré ou or blanc appliquée par cliché thermique avec une pression 
                calibrée sur papiers teintés dans la masse jusqu'à 700g.
              </p>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.workshopIcon}>💎</div>
              <h3 className={styles.workshopTitle}>Vernis Sélectif & Relief 3D</h3>
              <p className={styles.workshopDesc}>
                Surélévation polymère ultra-brillante en vernis UV sélectif 3D, contrastant harmonieusement 
                avec un pelliculage soft-touch au toucher pêche velouté.
              </p>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.workshopIcon}>📜</div>
              <h3 className={styles.workshopTitle}>Papiers Texturés & Contrecollés</h3>
              <p className={styles.workshopDesc}>
                Papiers de création texturés (Gmund, Colorplan, Curious), micro-gaufrage et contrecollage 
                multicouche duplex ou triplex avec tranche colorée.
              </p>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.workshopIcon}>📐</div>
              <h3 className={styles.workshopTitle}>Signalétique Découpée & Usinée</h3>
              <p className={styles.workshopDesc}>
                Découpe numérique haute précision sur plexiglas coulé coulé teinté, lettrages en aluminium brossé 
                et totems architecturaux avec fixations invisibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION DEVIS --- */}
      <section className={styles.ctaBannerSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Vous avez un projet d'image ou d'édition sur-mesure ?</h2>
          <p className={styles.ctaText}>
            Nos spécialistes d'atelier examinent vos fichiers vectoriels, réalisent les épreuves de contrôle 
            et vous accompagnent de la conception graphique à la livraison soignée de vos supports.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/devis" className={styles.btnPrimary}>
              <FileText size={16} />
              Accéder au devis interactif
            </Link>
            <Link href="/contact?subject=studio" className={styles.btnSecondary}>
              Prendre rendez-vous avec l'atelier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
