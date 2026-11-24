import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, MapPin, Sparkles, User } from "lucide-react";
import { FULL_PORTFOLIO_REFERENCES } from "@/data/all-projects";
import { PROJECTS_MEDIA } from "@/data/media-manifest";
import PaulSidebar from "@/components/paul/PaulSidebar";
import paulStyles from "@/styles/paul-portfolio.module.css";
import styles from "./case-study.module.css";
import ProjectGallery from "./ProjectGallery";

const editorialSlugs = FULL_PORTFOLIO_REFERENCES.map((project) => project.slug);
const hunterPlans = [
  ["/assets/projects/hunter/pdf/p05_img1.png", "Plan du rez-de-chaussée — document extrait du PDF, page 5"],
  ["/assets/projects/hunter/pdf/p05_img2.png", "Plan d'aménagement du rez-de-chaussée — document extrait du PDF, page 5"],
  ["/assets/projects/hunter/pdf/p05_img3.png", "Plan de l'étage — document extrait du PDF, page 5"],
];
const hunterConception = [
  ["/assets/projects/hunter/pdf/p04_img1.jpg", "Visualisation architecturale — phase de conception, PDF page 4"],
  ["/assets/projects/hunter/pdf/p04_img2.jpg", "Visualisation architecturale — claustra et terrasse, PDF page 4"],
  ["/assets/projects/hunter/pdf/p04_img3.jpg", "Visualisation architecturale — façade et accès, PDF page 4"],
  ["/assets/projects/hunter/pdf/p05_img4.jpg", "Visualisation architecturale — document extrait du PDF, page 5"],
  ["/assets/projects/hunter/pdf/p05_img5.jpg", "Détail de conception — document extrait du PDF, page 5"],
  ["/assets/projects/hunter/pdf/p05_img6.jpg", "Détail de conception — document extrait du PDF, page 5"],
  ["/assets/projects/hunter/pdf/p05_img7.jpg", "Détail de conception — document extrait du PDF, page 5"],
];

const isPublicDocumentaryText = (value: string) => !/(à vérifier|a vérifier|à confirmer|a confirmer|correspondance des médias|confidentialité à vérifier|autorisation de publication)/i.test(value);

interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return editorialSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = FULL_PORTFOLIO_REFERENCES.find((item) => item.slug === slug);
  return project
    ? {
        title: `${project.title} — Étude de cas | Paul Boubert`,
        description: project.programme || project.excerpt,
        alternates: { canonical: `/paul/projet/${project.slug}` },
      }
    : { title: "Projet non trouvé | Paul Boubert" };
}

export default async function PersonalCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  if (!editorialSlugs.includes(slug)) notFound();
  const project = FULL_PORTFOLIO_REFERENCES.find((item) => item.slug === slug);
  if (!project) notFound();
  const isHunter = slug === "residence-hunter";
  const specialMedia = slug === "atelier-modulaire"
    ? ["p06_img1.jpg", "p06_img2.jpg", "p06_img3.jpg", "p06_img4.jpg", "p06_img5.jpg", "p07_img36.jpg", "p07_img41.jpg"].map((name) => `/assets/projects/workbox/pdf/${name}`)
      : slug === "agence-bancaire-regionale"
      ? ["p08_img1.jpg", "p08_img2.jpg", "p08_img3.jpg", "p08_img4.jpg", "p08_img5.jpg", "p08_img6.jpg", "p09_img1.jpg", "p09_img2.jpg", "p09_img3.jpg", "p09_img4.jpg", "p09_img5.jpg", "p09_img6.jpg", "p09_img7.jpg"].map((name) => `/assets/projects/bicec_bafoussam/pdf/${name}`)
      : slug === "residence-neo-classique"
        ? ["p10_img1.jpg", "p10_img2.jpg", "p10_img3.jpg", "p10_img4.jpg", "p10_img5.jpg", "p10_img6.jpg", "p11_img5.jpg", "p11_img6.jpg", "p11_img7.jpg"].map((name) => `/assets/projects/residence_h/pdf/${name}`)
        : slug === "residence-tropicale"
          ? ["p12_img1.jpg", "p12_img2.jpg", "p12_img3.jpg", "p12_img4.jpg", "p12_img5.jpg", "p13_img1.jpg", "p13_img2.jpg", "p13_img4.jpg", "p13_img5.jpg", "p13_img9.png"].map((name) => `/assets/projects/oasis/pdf/${name}`)
          : slug === "villa-californienne"
            ? ["p14_img1.jpg", "p14_img2.jpg", "p14_img3.jpg", "p14_img4.jpg", "p14_img5.jpg", "p15_img1.jpg", "p15_img2.jpg", "p15_img3.jpg", "p15_img5.jpg"].map((name) => `/assets/projects/harmony/pdf/${name}`)
            : slug === "residence-urbaine"
              ? ["p16_img1.jpg", "p16_img3.jpg", "p16_img4.jpg", "p16_img6.jpg", "p17_img1.png", "p17_img2.png", "p17_img3.png", "p17_img4.png", "p17_img5.jpg", "p17_img6.jpg", "p17_img7.jpg"].map((name) => `/assets/projects/tonye/pdf/${name}`)
        : [];

  const media = PROJECTS_MEDIA[project.mediaFolder];
  const hasContribution = Boolean(project.paulRole || project.responsibleEntity || project.toolsUsed?.length);
  const publicParticularities = (project.particularities ?? []).filter(isPublicDocumentaryText);
  const compactParticularities = publicParticularities.length > 0 && publicParticularities.length <= 2 ? publicParticularities : [];
  const richParticularities = publicParticularities.length > 2 ? publicParticularities : [];
  const gallerySource = media?.gallery?.length ? media.gallery : media?.cover ? [media.cover] : [];
  const uniqueGalleryImages = gallerySource.filter((image, index, images) => images.findIndex((candidate) => candidate.url === image.url) === index);
  const galleryItems = (specialMedia.length > 0 ? Array.from(new Set(specialMedia)).map((url) => ({ url, alt: `${project.title} — document architectural` })) : uniqueGalleryImages.map((image) => ({ url: image.url, alt: `${project.title} — document architectural` })));
  const publicIntroduction = slug === "agence-bancaire-moderne"
    ? "Ce projet concerne la réhabilitation et l'aménagement d'une agence bancaire à Douala. L'intervention porte sur l'organisation des espaces professionnels, la conception des aménagements intérieurs et du mobilier sur mesure, ainsi que la réalisation de visualisations 3D pour accompagner le développement du projet."
    : project.programme || "Projet architectural documenté dans le portfolio personnel.";
  const publicPresentation = slug === "agence-bancaire-moderne"
    ? "Le projet concerne la réhabilitation et l'aménagement d'une agence bancaire située à Bonapriso, dans la ville de Douala. L'intervention vise à adapter les espaces existants aux exigences fonctionnelles d'un établissement bancaire, en associant organisation des activités, qualité des aménagements intérieurs et confort des utilisateurs. L'étude porte sur la réorganisation des espaces professionnels, le traitement des accès, l'aménagement des zones de travail et la conception de mobilier sur mesure. Le développement du projet s'accompagne d'études architecturales et de visualisations 3D permettant de préciser les choix de conception avant sa réalisation."
    : project.programme;
  const presentationParagraphs = slug === "agence-bancaire-moderne"
    ? [
        "Le projet concerne la réhabilitation et l'aménagement d'une agence bancaire située à Bonapriso, dans la ville de Douala. L'intervention vise à adapter les espaces existants aux exigences fonctionnelles d'un établissement bancaire, en associant organisation des activités, qualité des aménagements intérieurs et confort des utilisateurs.",
        "L'étude architecturale porte sur la réorganisation des espaces professionnels, le traitement des accès et l'aménagement des différentes zones de travail. Elle intègre également la conception de mobilier sur mesure, afin de proposer des solutions adaptées aux usages et à la configuration des locaux.",
        "Le développement du projet s'accompagne d'études architecturales et de visualisations 3D permettant d'apprécier les propositions d'aménagement, de préciser les choix de conception et de faciliter la compréhension du projet avant sa réalisation.",
      ]
    : publicPresentation ? [publicPresentation] : [];
  const agencyContributionParagraphs = [
    "Dans le cadre de mes fonctions au sein de BARLABARLA Architectes, j'ai participé au développement architectural et technique de ce projet de réhabilitation et d'aménagement bancaire, en intervenant à différentes étapes des études et de la réalisation.",
    "Mon intervention a notamment porté sur les études de conception aux phases APS et APD, la production de documents graphiques et de rendus 3D, ainsi que la préparation des pièces techniques nécessaires au développement du projet.",
    "J'ai également contribué à l'élaboration des dossiers de consultation des entreprises (DCE), aux documents quantitatifs et estimatifs (DQE) et aux activités de coordination liées à l'exécution des travaux.",
    "Cette participation s'est prolongée jusqu'aux opérations de réception, depuis les études architecturales jusqu'au suivi de la réalisation.",
  ];
  const projectIndex = editorialSlugs.indexOf(slug);
  const previous = projectIndex > 0 ? FULL_PORTFOLIO_REFERENCES.find((item) => item.slug === editorialSlugs[projectIndex - 1]) : undefined;
  const next = projectIndex < editorialSlugs.length - 1 ? FULL_PORTFOLIO_REFERENCES.find((item) => item.slug === editorialSlugs[projectIndex + 1]) : undefined;

  return (
    <div className={paulStyles.pageWrapper}>
      <PaulSidebar activeTab="portfolio" />
      <main className={`${paulStyles.mainContent} ${styles.page}`}>
        <nav className={styles.topbar} aria-label="Fil d’Ariane">
          <Link href="/paul" className={styles.back}><ArrowLeft size={16} /> Tous les projets</Link>
          <span>Portfolio / {project.title}</span>
        </nav>
        <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>{project.category}</p>
          <h1>{project.title}</h1>
          <p className={styles.intro}>{publicIntroduction}</p>
          <Link href="#lecture" className={styles.cta}>Lire l&apos;étude <ArrowUpRight size={16} /></Link>
        </div>
        <div className={styles.heroMedia}>
          {media?.cover ? <Image src={media.cover.url} alt={project.title} fill priority sizes="(max-width: 900px) 100vw, 62vw" /> : <div className={styles.emptyMedia}>Aucun média principal disponible</div>}
        </div>
        </header>

      <section className={styles.metaGrid} aria-label="Informations du projet">
        {project.location && <div><MapPin size={17} /><span><small>Localisation</small>{project.location}</span></div>}
        {project.year && <div><Calendar size={17} /><span><small>Année</small>{project.year}</span></div>}
        <div><Sparkles size={17} /><span><small>Statut</small>{project.status ?? "Non renseigné"}</span></div>
        <div><User size={17} /><span><small>Crédit</small>{project.credits ?? project.responsibleEntity ?? "Non renseigné"}</span></div>
      </section>

      {isHunter ? <>
        <section id="lecture" className={styles.contentGrid}><div><p className={styles.sectionLabel}>01 / Le projet en bref</p><h2>Architecture modulaire et réemploi.</h2></div><div className={styles.prose}><p>Deux appartements T2 destinés à la location meublée, installés dans un bâtiment R+1 composé de deux conteneurs de 40 pieds superposés.</p><p><strong>Surface :</strong> environ 55 m² par logement, terrasses comprises.</p><p><strong>Livraison :</strong> décembre 2024 · <strong>Maître d’ouvrage :</strong> client privé.</p><p><strong>Logiciels :</strong> Revit, Enscape, Excel.</p></div></section>
        <section className={styles.contentGrid}><div><p className={styles.sectionLabel}>02 / Concept et parti architectural</p><h2>Transformer, adapter, réemployer.</h2></div><div className={styles.prose}><p><strong>Transformer le conteneur industriel.</strong> La découpe des parois latérales étend les volumes. Une structure complémentaire en poteaux et poutres de bois accompagne cette transformation, avec réemploi des parois découpées dans les extensions.</p><p><strong>Adapter la construction au climat tropical.</strong> Double toiture ventilée, claustras en bois et surélévation sur plots en béton favorisent la circulation naturelle de l’air.</p><p><strong>Valoriser le réemploi.</strong> L’isolation intérieure utilise de la sciure récupérée dans une usine de transformation du bois, associée à un habillage en contreplaqué.</p></div></section>
        <section className={styles.gallery}><p className={styles.sectionLabel}>03 / Plans et conception</p><div className={styles.mediaGrid}>{hunterPlans.map(([url, caption]) => <figure key={url} className={styles.mediaPlan}><a href={url} target="_blank" rel="noreferrer"><Image src={url} alt={caption} fill sizes="(max-width: 900px) 100vw, 50vw" /></a><figcaption>{caption}</figcaption></figure>)}</div></section>
        <section className={styles.gallery}><p className={styles.sectionLabel}>04 / Conception &amp; visualisations</p><div className={styles.mediaGrid}>{hunterConception.map(([url, caption], index) => <figure key={url} className={index === 0 ? styles.mediaPrimary : styles.mediaThumb}><a href={url} target="_blank" rel="noreferrer"><Image src={url} alt={caption} fill sizes="(max-width: 900px) 100vw, 50vw" /></a><figcaption>{caption}</figcaption></figure>)}</div></section>
        <section className={styles.attribution}><div><p className={styles.sectionLabel}>05 / Ma contribution</p><h2>Une contribution au sein du cabinet.</h2></div><div className={styles.prose}><p>Au sein de BARLABARLA Architectes, j’ai assuré la conception principale du projet, la production des livrables architecturaux et techniques, ainsi que la coordination des différentes phases de développement et de réalisation.</p><p>Les propositions et documents étaient présentés à l’architecte senior pour examen, amendements éventuels et validation.</p><p>Mon intervention a couvert les études d’esquisse, APS et APD, la modélisation et la visualisation, les plans d’exécution, les détails constructifs, les quantitatifs, les démarches administratives, le suivi régulier du chantier et la participation à la réception des travaux.</p></div></section>
        <section className={styles.contentGrid}><div><p className={styles.sectionLabel}>06 / Crédits et statut documentaire</p><h2>Projet réalisé, médias à compléter.</h2></div><div className={styles.prose}><p><strong>Projet architectural :</strong> BARLABARLA Architectes.</p><p><strong>Conception principale, études et coordination :</strong> Paul Boubert, au sein du cabinet.</p><p><strong>Supervision et validation :</strong> architecte senior — BARLABARLA Architectes.</p><p><strong>Maître d’ouvrage :</strong> client privé.</p><p className={styles.mediaNotice}>Les photographies de chantier et du bâtiment achevé ne sont pas encore disponibles dans la médiathèque publique. Aucun visuel de conception n’est présenté comme une photographie de réalisation.</p></div></section>
      </> : specialMedia.length > 0 ? <>
        <section id="lecture" className={styles.contentGrid}><div><p className={styles.sectionLabel}>01 / Présentation du projet</p><h2>Présentation</h2></div><div className={styles.prose}>{presentationParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
        <section className={styles.contentGrid}><div><p className={styles.sectionLabel}>02 / Parti architectural</p><h2>{slug === "atelier-modulaire" ? "Composition, climat et flexibilité." : slug === "agence-bancaire-regionale" ? "Réhabiliter sans interrompre l’activité." : slug === "residence-neo-classique" ? "Une élégance intérieure construite par les usages." : slug === "villa-californienne" ? "Transformer l’existant." : slug === "residence-urbaine" ? "Densifier la ville." : "Habiter autour d’un cœur paysager."}</h2></div><div className={styles.prose}>{slug === "atelier-modulaire" ? <><p>La proposition explore une composition de modules de 20 et 40 pieds, des assemblages décalés, une rotation d’un module à l’étage et des terrasses privatives.</p><p>Les intentions bioclimatiques comprennent une sur-toiture ventilée, la ventilation naturelle envisagée, la protection solaire et une isolation projetée des parois.</p><p>Les assemblages, fondations et porte-à-faux n’ont pas fait l’objet d’une étude structurelle détaillée.</p></> : slug === "agence-bancaire-regionale" ? <><p>La réhabilitation concerne une agence bancaire en activité, avec une progression par niveaux et transferts successifs du personnel.</p><p>Les adaptations découvertes pendant les démolitions ont conduit à un diagnostic structurel complémentaire et à une étude de sol recommandés par la maîtrise d’œuvre.</p><p>Le projet a été livré en janvier 2026 ; les réserves de réception ont ensuite été levées.</p></> : slug === "residence-neo-classique" ? <><p>Cette étude APS de rénovation intérieure d’un duplex associe une identité néoclassique contemporaine, des aménagements résidentiels et du mobilier sur mesure.</p><p>Le projet a été développé en collaboration avec une designeuse d’intérieur ; sa réalisation n’est pas confirmée.</p></> : slug === "villa-californienne" ? <><p>Le projet part d’un relevé architectural réalisé sur place, aucun plan de l’existant n’étant disponible.</p><p>La distribution intérieure est repensée et une chambre supplémentaire est créée sans extension majeure. La toiture existante est conservée ; seul le chéneau est revu.</p></> : slug === "residence-urbaine" ? <><p>La parcelle contrainte accueille trois appartements T3 et un duplex dans un immeuble R+5. La résille métallique pixelisée à trame de 20 × 20 cm forme une double peau destinée à filtrer le rayonnement solaire et préserver l’intimité.</p><p>Le puits de lumière accompagne les circulations et porte une intention de ventilation naturelle par effet cheminée, non mesurée.</p></> : <><p>La conception organise trois bâtiments R+1 autour d’un cœur d’îlot paysager à Kribi, avec dix appartements, une piscine et un stationnement central.</p><p>Les études ont couvert l’ESQ, l’APS, l’APD, les plans de permis et le DQE. Le projet a été suspendu pour raisons financières et n’a pas été construit.</p></>}</div></section>
        <section className={styles.gallery}><p className={styles.sectionLabel}>03 / Documents et visualisations</p><ProjectGallery items={galleryItems} /></section>
        <section className={styles.attribution}><div><p className={styles.sectionLabel}>02 / MA CONTRIBUTION</p><h2>Ma contribution au projet</h2></div><div className={styles.prose}>{slug === "agence-bancaire-regionale" ? agencyContributionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <><p><strong>Rôle :</strong> {project.paulRole}</p><p><strong>Structure responsable :</strong> {project.responsibleEntity}</p><p><strong>Outils :</strong> {project.toolsUsed?.join(" · ") || "Non renseignés"}</p></>}</div></section>
        <section className={styles.contentGrid}><div><p className={styles.sectionLabel}>05 / Statut du projet</p><h2>{project.status ?? "Statut non renseigné"}</h2></div><div className={styles.prose}><p><strong>Cadre :</strong> {project.responsibleEntity}</p><p><strong>Crédits :</strong> {project.credits ?? project.responsibleEntity}</p></div></section>
      </> : <>
        {presentationParagraphs.length > 0 && <section id="lecture" className={styles.contentGrid}><div><p className={styles.sectionLabel}>01 / Présentation</p><h2>Présentation</h2></div><div className={styles.prose}>{presentationParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{compactParticularities.length > 0 && <p>{compactParticularities.join(" ")}</p>}</div></section>}
        {richParticularities.length ? <section className={styles.contentGrid}><div><p className={styles.sectionLabel}>02 / Particularités</p><h2>Caractéristiques documentées.</h2></div><div className={styles.prose}><ul>{richParticularities.map((item) => <li key={item}>{item}</li>)}</ul></div></section> : null}
        {hasContribution && <section className={styles.attribution}><div><p className={styles.sectionLabel}>02 / MA CONTRIBUTION</p><h2>Ma contribution au projet</h2></div><div>{slug === "agence-bancaire-moderne" ? agencyContributionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <>{project.paulRole && <p><strong>Rôle :</strong> {project.paulRole}</p>}{project.responsibleEntity && <p><strong>Structure responsable :</strong> {project.responsibleEntity}</p>}{project.toolsUsed?.length ? <p><strong>Outils :</strong> {project.toolsUsed.join(" · ")}</p> : null}</>}</div></section>}
        {galleryItems.length > 0 && <section className={styles.gallery}><p className={styles.sectionLabel}>03 / Galerie de documents visuels</p><ProjectGallery items={galleryItems} /></section>}
      </>}
        <nav className={styles.projectPager} aria-label="Navigation entre projets">
          {previous ? <Link href={`/paul/projet/${previous.slug}`}><span><small>← Projet précédent</small>{previous.title}<em>{previous.category}</em></span></Link> : <span />}
          {next ? <Link href={`/paul/projet/${next.slug}`}><span><small>Projet suivant →</small>{next.title}<em>{next.category}</em></span></Link> : <span />}
        </nav>
      </main>
    </div>
  );
}
