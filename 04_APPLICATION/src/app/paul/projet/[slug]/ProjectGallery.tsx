"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./case-study.module.css";

interface GalleryItem { url: string; alt: string; }

export default function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const current = items[active];
  useEffect(() => { if (!open) return; const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); if (event.key === "ArrowRight") setActive((value) => (value + 1) % items.length); if (event.key === "ArrowLeft") setActive((value) => (value - 1 + items.length) % items.length); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [open, items.length]);
  if (!items.length) return null;
  return <>
    <div className={styles.interactiveGallery}>
      <div className={`${styles.galleryFeatureGrid} ${items.length === 1 ? styles.gallerySingle : ""}`}>
        {items.slice(0, Math.min(2, items.length)).map((item, index) => <button type="button" key={item.url} className={styles.galleryFeature} onClick={() => { setActive(index); setOpen(true); }} aria-label={`Ouvrir ${item.alt}`}><Image src={item.url} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></button>)}
      </div>
      {items.length > 2 && <div className={styles.galleryThumbs} aria-label="Sélectionner un document">{items.map((item, index) => <button type="button" key={item.url} className={index === active ? styles.galleryThumbActive : styles.galleryThumb} onClick={() => setActive(index)} aria-label={`Sélectionner le document ${index + 1}`}><Image src={item.url} alt="" fill sizes="96px" /></button>)}</div>}
      {items.length > 2 && <div className={styles.galleryCount}>{active + 1} / {items.length}</div>}
    </div>
    {open && current && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Visionneuse de document" onClick={() => setOpen(false)}><button type="button" className={styles.lightboxClose} onClick={() => setOpen(false)} aria-label="Fermer">×</button><button type="button" className={styles.lightboxPrev} onClick={(event) => { event.stopPropagation(); setActive((value) => (value - 1 + items.length) % items.length); }} aria-label="Document précédent">←</button><Image src={current.url} alt={current.alt} width={1800} height={1200} className={styles.lightboxImage} onClick={(event) => event.stopPropagation()} /><button type="button" className={styles.lightboxNext} onClick={(event) => { event.stopPropagation(); setActive((value) => (value + 1) % items.length); }} aria-label="Document suivant">→</button></div>}
  </>;
}
