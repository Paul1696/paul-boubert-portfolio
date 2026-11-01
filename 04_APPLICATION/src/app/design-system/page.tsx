"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Textarea,
  Select,
  Modal,
  Toast,
  ToastContainer,
  Skeleton,
  LoadingSpinner,
  EmptyState,
} from "@/components/ui";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UNIVERSES } from "@/data/universes";
import styles from "@/styles/possibility-machine.module.css";

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; type: "success" | "warning" | "error" | "info"; title: string; message: string }>
  >([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "", universe: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const addToast = (type: "success" | "warning" | "error" | "info", title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formValues.name) errors.name = "Le nom de l'interlocuteur est requis.";
    if (!formValues.email || !formValues.email.includes("@")) errors.email = "Une adresse courriel valide est requise.";
    if (!formValues.message) errors.message = "Veuillez préciser votre demande.";

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      addToast("success", "Validation réussie", "Formulaire conforme aux règles d'accessibilité WAI-ARIA.");
    } else {
      addToast("error", "Champs non conformes", "Veuillez corriger les erreurs signalées.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <SiteHeader />

      <main className="container" style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>
        {/* En-tête de la page de Design System */}
        <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border-default)", paddingBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--accent-brass)", fontSize: "1.25rem" }}>✦</span>
            <span
              style={{
                fontSize: "var(--text-xs)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--accent-bronze)",
                fontWeight: 600,
              }}
            >
              Écosystème Graphique & Technique • Étape 05
            </span>
          </div>
          <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: 700, color: "var(--text-primary)" }}>
            Design System Définitif — The Possibility Machine
          </h1>
          <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
            Bibliothèque modulaire de composants d&apos;atelier, tokens minéraux, typographies fluides et états d&apos;interaction conformes aux standards WCAG 2.1 AA.
          </p>
        </div>

        {/* SECTION 1 : TOKENS DES SEPT UNIVERS */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1.5rem" }}>
            1. Accents Chromatiques des Sept Univers ADP
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              { id: "01", name: "ADP Project", color: "var(--univ-project)", desc: "Architecture, BIM & 3D" },
              { id: "02", name: "ADP Studio", color: "var(--univ-studio)", desc: "Design & Image de marque" },
              { id: "03", name: "Rosbri Wax", color: "var(--univ-rosbri)", desc: "Haute couture & Textile" },
              { id: "04", name: "ADP Brief", color: "var(--univ-brief)", desc: "Édition technique & Mémoires" },
              { id: "05", name: "ADP Lab", color: "var(--univ-lab)", desc: "R&D & Prototypage tropical" },
              { id: "06", name: "ADP Academy", color: "var(--univ-academy)", desc: "Masterclasses & Savoirs" },
              { id: "07", name: "ADP Tools", color: "var(--univ-tools)", desc: "Logiciels & Scripts d'ingénierie" },
            ].map((u) => (
              <div
                key={u.id}
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: `1px solid var(--border-default)`,
                  borderTop: `4px solid ${u.color}`,
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600 }}>
                  UNIVERS {u.id}
                </div>
                <div style={{ fontSize: "var(--text-base)", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  {u.name}
                </div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  {u.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2 : BOUTONS & ÉTATS D'INTERACTION */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1rem" }}>
            2. Boutons & Variantes d&apos;Interaction
          </h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Prise en charge native des états : repos, hover, focus-visible au clavier, active, disabled et chargement asynchrone.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
            <Button variant="primary">Primaire Laiton</Button>
            <Button variant="secondary">Secondaire Craie</Button>
            <Button variant="tertiary">Tertiaire Minéral</Button>
            <Button variant="outline">Contour Laiton</Button>
            <Button variant="ghost">Bouton Fantôme</Button>
            <Button variant="danger">Alerte / Danger</Button>
            <Button variant="universe">Accent Univers</Button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
            <Button size="sm" variant="secondary">Taille SM (32px)</Button>
            <Button size="md" variant="secondary">Taille MD (40px)</Button>
            <Button size="lg" variant="primary">Taille LG (48px)</Button>
            <Button variant="primary" disabled>Désactivé</Button>
            <Button
              variant="primary"
              isLoading={btnLoading}
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 2000);
              }}
            >
              {btnLoading ? "Calcul en cours..." : "Simuler Chargement"}
            </Button>
          </div>
        </section>

        {/* SECTION 3 : CARTES & CONTENEURS */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1.5rem" }}>
            3. Cartes Minérales & Conteneurs
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <Card variant="mineral">
              <CardHeader>
                <Badge variant="brass">Carte Minérale</Badge>
                <CardTitle>Fond Craie d&apos;Atelier</CardTitle>
                <CardSubtitle>Surface subtile pour modules secondaires</CardSubtitle>
              </CardHeader>
              <CardContent>
                Conçue pour un rendu feutré et non éblouissant, évoquant la pierre calcaire naturelle de Bourgogne.
              </CardContent>
              <CardFooter>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Token : --bg-surface-elevated</span>
                <Button size="sm" variant="outline">Explorer</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated" interactive>
              <CardHeader>
                <Badge variant="success">Carte Interactive</Badge>
                <CardTitle>Élévation & Hover Lift</CardTitle>
                <CardSubtitle>Micro-interaction au survol</CardSubtitle>
              </CardHeader>
              <CardContent>
                Ombre portée modulaire s&apos;élevant de 3px avec mise en avant de la bordure laiton dorée.
              </CardContent>
              <CardFooter>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Élévation z-1</span>
                <Button size="sm" variant="primary">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <Badge variant="info">Verre Minéral</Badge>
                <CardTitle>Translucidité Satinée</CardTitle>
                <CardSubtitle>Effet matière et profondeur</CardSubtitle>
              </CardHeader>
              <CardContent>
                Backdrop-filter blur 14px et bordure blanche semi-transparente pour les volets flottants et modales.
              </CardContent>
              <CardFooter>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Glassmorphism</span>
                <Button size="sm" variant="secondary">Détails</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* SECTION 4 : FORMULAIRES ACCESSIBLES */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1rem" }}>
            4. Formulaires & Validation Accessible WAI-ARIA
          </h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Liaison dynamique des étiquettes et des messages d&apos;erreur via `aria-describedby` et `aria-invalid`.
          </p>

          <Card variant="mineral" style={{ maxWidth: "640px" }}>
            <form onSubmit={handleTestSubmit}>
              <Input
                label="Nom complet ou raison sociale"
                placeholder="Ex : Paul Boubert"
                required
                value={formValues.name}
                error={formErrors.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />

              <Input
                label="Adresse courriel professionnelle"
                type="email"
                placeholder="Ex : contact@ateliersdepaul.com"
                required
                value={formValues.email}
                error={formErrors.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                helperText="Vos informations restent strictement confidentielles sous accord de non-divulgation."
              />

              <Select
                label="Univers de rattachement"
                placeholder="Sélectionnez un univers..."
                options={[
                  { value: "adp-project", label: "01 — ADP Project (BIM & Modélisation)" },
                  { value: "adp-studio", label: "02 — ADP Studio (Identité & Marque)" },
                  { value: "rosbri", label: "03 — Rosbri Wax Design (Haute Couture)" },
                  { value: "adp-brief", label: "04 — ADP Brief (Dossiers Techniques)" },
                  { value: "adp-lab", label: "05 — ADP Lab (R&D Bioclimatique)" },
                  { value: "adp-academy", label: "06 — ADP Academy (Formations Pro)" },
                  { value: "adp-tools", label: "07 — ADP Tools (Scripts & Solutions)" },
                ]}
                value={formValues.universe}
                onChange={(e) => setFormValues({ ...formValues, universe: e.target.value })}
              />

              <Textarea
                label="Objet de la prestation ou du devis"
                placeholder="Décrivez brièvement les spécifications de votre projet..."
                required
                value={formValues.message}
                error={formErrors.message}
                onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
              />

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <Button type="submit" variant="primary">
                  Tester la Validation
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormValues({ name: "", email: "", message: "", universe: "" });
                    setFormErrors({});
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </form>
          </Card>
        </section>

        {/* SECTION 5 : MODALES, DIALOGUES & NOTIFICATIONS TOAST */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1rem" }}>
            5. Modales, Dialogues & Toasts
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Ouvrir la Modale Accessible
            </Button>
            <Button
              variant="secondary"
              onClick={() => addToast("success", "Opération confirmée", "Livrable sauvegardé avec succès.")}
            >
              Toast Succès
            </Button>
            <Button
              variant="secondary"
              onClick={() => addToast("warning", "Alerte de ressource", "Disque externe en surveillance.")}
            >
              Toast Alerte
            </Button>
            <Button
              variant="secondary"
              onClick={() => addToast("error", "Échec d'authentification", "Droits d'accès insuffisants.")}
            >
              Toast Erreur
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Dialogue Modulaire d'Atelier"
            description="Exemple de boîte de dialogue accessible avec capture de touche Échap et verrouillage du défilement."
          >
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Cette modale intègre un focus trap et se ferme soit via le bouton supérieur, soit par un clic sur l&apos;overlay minéral satiné, soit par la touche Échap du clavier.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Fermer
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false);
                  addToast("success", "Action validée", "La commande a été enregistrée.");
                }}
              >
                Confirmer
              </Button>
            </div>
          </Modal>
        </section>

        {/* SECTION 6 : ÉTATS DE CHARGEMENT & ÉTATS VIDES */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1.5rem" }}>
            6. États de Chargement (Skeletons, Spinners) & États Vides
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <Card variant="mineral">
              <h3 style={{ fontSize: "var(--text-base)", marginBottom: "1rem" }}>Skeleton Loader Minéral</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Skeleton height="1.5rem" width="60%" />
                <Skeleton height="1rem" width="100%" />
                <Skeleton height="1rem" width="85%" />
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <Skeleton height="2rem" width="5rem" />
                  <Skeleton height="2rem" width="5rem" />
                </div>
              </div>
            </Card>

            <Card variant="mineral" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <h3 style={{ fontSize: "var(--text-base)", marginBottom: "1rem" }}>Spinners d&apos;Atelier</h3>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
            </Card>

            <div>
              <EmptyState
                icon="✦"
                title="Aucun document archivé"
                description="Cet espace accueillera les pièces techniques du module après configuration."
                actionLabel="Initialiser le module"
                onAction={() => addToast("info", "Module en cours d'initialisation", "Liaison au catalogue démarrée.")}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Conteneur flottant des toasts */}
      <ToastContainer>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            title={t.title}
            message={t.message}
            onDismiss={(id) => setToasts((prev) => prev.filter((item) => item.id !== id))}
          />
        ))}
      </ToastContainer>

      <SiteFooter universes={UNIVERSES} />
    </div>
  );
}
