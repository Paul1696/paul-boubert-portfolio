"use client";

import { useState } from "react";
import { UNIVERSES } from "@/data/universes";
import { INTENTIONS } from "@/data/intentions";
import { FEATURED_PROJECTS } from "@/data/projects";
import { CONTACT_CHANNELS } from "@/data/channels";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroExperience } from "@/components/home/HeroExperience";
import { IntentSelector } from "@/components/home/IntentSelector";
import { UniversePreview } from "@/components/home/UniversePreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AdpConnectSection } from "@/components/home/AdpConnectSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ContactModal } from "@/components/ui/ContactModal";
import { ContactDock } from "@/components/ui/ContactDock";

export default function Home() {
  const [activeIntentId, setActiveIntentId] = useState("intent-build");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const activeIntention =
    INTENTIONS.find((i) => i.id === activeIntentId) || INTENTIONS[0];

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* En-tête de site avec logo, navigation et toggles */}
      <SiteHeader onOpenContactModal={handleOpenContactModal} />

      <main id="main-content">
        {/* Écran d'accueil Hero immersif avec The Possibility Core */}
        <HeroExperience
          activeIntention={activeIntention}
          onOpenContactModal={handleOpenContactModal}
        />

        {/* Moteur de navigation par intentions (6 intentions + brief dynamique) */}
        <IntentSelector
          intentions={INTENTIONS}
          activeIntentId={activeIntentId}
          onSelectIntent={setActiveIntentId}
          allUniverses={UNIVERSES}
          onOpenContactModal={handleOpenContactModal}
        />

        {/* Présentation des Sept Univers ADP avec mise en surbrillance */}
        <UniversePreview
          universes={UNIVERSES}
          connectedUniverseSlugs={activeIntention.connectedUniverseSlugs}
        />

        {/* Réalisations et programmes réels issus du Legacy vérifié */}
        <FeaturedProjects
          projects={FEATURED_PROJECTS}
          onOpenContactModal={handleOpenContactModal}
        />

        {/* Hub de communication omnicanal (WhatsApp direct, réseaux, lettre d'atelier) */}
        <AdpConnectSection channels={CONTACT_CHANNELS} />

        {/* Bannière de conclusion & appel à l'action direct */}
        <ContactCTA
          activeIntention={activeIntention}
          onOpenContactModal={handleOpenContactModal}
        />
      </main>

      {/* Pied de page avec sitemap, mentions ONAC et réglages */}
      <SiteFooter
        universes={UNIVERSES}
        onOpenContactModal={handleOpenContactModal}
      />

      {/* Bouton d'action flottant direct */}
      <ContactDock onOpenModal={handleOpenContactModal} />

      {/* Dialogue modal de contact direct contextualisé */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        activeIntention={activeIntention}
      />
    </div>
  );
}
