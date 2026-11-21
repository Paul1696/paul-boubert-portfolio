import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CONTACT_CHANNELS } from "@/data/channels";

export const metadata: Metadata = {
  title: "Contact | Les Ateliers de Paul",
  description: "Contacter Les Ateliers de Paul pour un projet, une collaboration ou une demande professionnelle.",
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main-content" className="container" style={{ flex: 1, padding: "clamp(3rem, 7vw, 7rem) 0" }}>
        <p style={{ color: "var(--accent-brass)", fontWeight: 700 }}>Échanger avec l&apos;atelier</p>
        <h1 style={{ maxWidth: 760, fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, margin: "1rem 0" }}>Parlons de votre projet.</h1>
        <p style={{ maxWidth: 700, color: "var(--text-secondary)", lineHeight: 1.8 }}>Choisissez le canal adapté à votre demande. Pour un cadrage détaillé, utilisez le parcours de devis d&apos;atelier.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "2.5rem" }}>
          {CONTACT_CHANNELS.map((channel) => (
            <a key={channel.id} href={channel.url} style={{ padding: "1.25rem", border: "1px solid var(--border-subtle)", borderRadius: "12px", textDecoration: "none" }}>
              <strong>{channel.icon} {channel.name}</strong>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>{channel.description}</p>
              <span style={{ color: "var(--accent-brass)", fontWeight: 700 }}>{channel.actionText} →</span>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
