import fs from "fs";
import path from "path";

const targetPath = path.join("src", "app", "globals.css");
let content = fs.readFileSync(targetPath, "utf8");

const additions = `
/* ==========================================================================
   ACCESSIBILITÉ & PERFORMANCES (WCAG 2.1 AA & CORE WEB VITALS)
   ========================================================================== */

/* Lien d'évitement clavier direct */
.skip-to-content {
  position: absolute;
  top: -120px;
  left: 1.5rem;
  z-index: 10000;
  background-color: var(--accent-brass, #C29B38);
  color: #1A1917;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm, 6px);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  transition: top 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.skip-to-content:focus {
  top: 1.5rem;
  outline: 3px solid #1A1917;
  outline-offset: 3px;
}

/* Gestion prefers-reduced-motion native OS */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

/* Gestion du toggle interactif d'accessibilité MotionPreferences */
[data-reduced-motion="true"] *,
[data-reduced-motion="true"] *::before,
[data-reduced-motion="true"] *::after {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
  scroll-behavior: auto !important;
}

/* Focus visible renforcé pour tous les éléments interactifs */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--accent-brass, #C29B38);
  outline-offset: 2px;
}
`;

if (!content.includes("skip-to-content")) {
  content += additions;
  fs.writeFileSync(targetPath, content, "utf8");
  console.log("globals.css enriched with accessibility & performance styles!");
} else {
  console.log("globals.css already contains accessibility additions.");
}
