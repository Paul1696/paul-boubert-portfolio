"use client";

import { useState } from "react";
import styles from "@/styles/possibility-machine.module.css";
import { ContactChannel } from "@/types/possibility-machine";

interface AdpConnectSectionProps {
  channels: ContactChannel[];
}

export function AdpConnectSection({ channels }: AdpConnectSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <section id="connect" className={styles.connectSection} aria-label="Canaux de contact et réseaux">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>ADP Connect</span>
          <h2 className={styles.sectionTitle}>Échanger avec l&apos;Atelier</h2>
          <p className={styles.sectionSubtitle}>
            Discutez en direct de vos projets, suivez nos publications techniques ou rejoignez
            la lettre d&apos;information pour recevoir nos carnets de recherche.
          </p>
        </div>

        <div className={styles.connectGrid}>
          {/* Canaux de contact direct */}
          <div className={styles.channelsGrid}>
            {channels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target={channel.isExternal ? "_blank" : undefined}
                rel={channel.isExternal ? "noopener noreferrer" : undefined}
                className={styles.channelCard}
              >
                <div>
                  <div className={styles.channelCardTop}>
                    <span className={styles.channelIcon} aria-hidden="true">
                      {channel.icon}
                    </span>
                    {channel.badge && (
                      <span className={styles.channelBadge}>{channel.badge}</span>
                    )}
                  </div>

                  <h3 className={styles.channelName}>{channel.name}</h3>
                  <p className={styles.channelDesc}>{channel.description}</p>
                </div>

                <div className={styles.channelAction}>
                  <span>{channel.actionText}</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>

          {/* Lettre d'information d'atelier */}
          <div className={styles.newsletterCard}>
            <div>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--accent-brass)",
                  marginBottom: "0.5rem",
                }}
              >
                ✦ Correspondance Régulière
              </div>
              <h3 className={styles.newsletterTitle}>La Lettre des Ateliers</h3>
              <p className={styles.newsletterDesc}>
                Un envoi mensuel soigné : retour d&apos;expérience sur les chantiers BIM en Afrique centrale,
                nouvelles pièces textiles Rosbri et ressources logicielles en accès libre.
              </p>
            </div>

            {subscribed ? (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--status-info-bg)",
                  border: "1px solid var(--status-info)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                }}
              >
                ℹ <strong>Maquette d&apos;interface (Étape 03C-BIS) :</strong> L&apos;adresse a été validée localement.
                Le service d&apos;envoi et la base de données seront connectés lors de l&apos;Étape 05 (Payload CMS).
                Pour nous contacter dès à présent, utilisez directement le bouton <strong>WhatsApp Atelier</strong> ou écrivez à <strong>contact@ateliersdepaul.com</strong>.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <label htmlFor="newsletter-email" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Votre adresse e-mail professionnelle :
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="nom@entreprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterBtn}>
                  S&apos;inscrire à la lettre d&apos;atelier
                </button>
              </form>
            )}

            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Respect absolu de vos données personnelles • Zéro spam • Désinscription en un clic.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
