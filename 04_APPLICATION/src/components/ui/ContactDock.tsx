"use client";

import styles from "@/styles/possibility-machine.module.css";

interface ContactDockProps {
  onOpenModal: () => void;
}

export function ContactDock({ onOpenModal }: ContactDockProps) {
  return (
    <button
      type="button"
      className={styles.contactDock}
      onClick={onOpenModal}
      aria-label="Ouvrir la fenêtre d'échange direct avec l'atelier"
    >
      <span>✦</span>
      <span>Contacter l&apos;Atelier</span>
    </button>
  );
}
