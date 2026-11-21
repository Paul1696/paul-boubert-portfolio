const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const LEGACY_DIR = path.join(PROJECT_ROOT, '01_LEGACY/paul-boubert-portfolio');
const APP_DIR = path.join(PROJECT_ROOT, '04_APPLICATION');
const MEDIA_TARGET_DIR = path.join(APP_DIR, 'src/assets/media');

console.log('--- AUDIT DES MEDIAS DU FOND DOCUMENTAIRE LEGACY ---');
const rawTree = execSync('git ls-tree -r --name-only HEAD assets/', {
  cwd: LEGACY_DIR,
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});

const allAssetPaths = rawTree.split('\n').map(p => p.trim()).filter(Boolean);
console.log(`Total fichiers medias suivis dans le legacy : ${allAssetPaths.length}`);

const projectAssets = allAssetPaths.filter(p => p.startsWith('assets/projects/'));
const identityAssets = allAssetPaths.filter(p => p.startsWith('assets/identities/'));
const paulAssets = allAssetPaths.filter(p => p.startsWith('assets/paul/'));

console.log(`- Images de projets : ${projectAssets.length}`);
console.log(`- Identites et Univers : ${identityAssets.length}`);
console.log(`- Actifs Paul Boubert & vCard : ${paulAssets.length}`);

const projectFolders = {};
for (const p of projectAssets) {
  const parts = p.split('/');
  const folder = parts[2];
  if (!projectFolders[folder]) {
    projectFolders[folder] = [];
  }
  projectFolders[folder].push(p);
}

const folderKeys = Object.keys(projectFolders);
console.log(`Nombre de repertoires de projets identifies : ${folderKeys.length}`);

fs.mkdirSync(path.join(MEDIA_TARGET_DIR, 'projects'), { recursive: true });
fs.mkdirSync(path.join(MEDIA_TARGET_DIR, 'identities'), { recursive: true });
fs.mkdirSync(path.join(MEDIA_TARGET_DIR, 'paul'), { recursive: true });
fs.mkdirSync(path.join(MEDIA_TARGET_DIR, 'placeholders'), { recursive: true });

console.log('\n--- EXTRACTION DES LOGOS ET IDENTITES ---');
const identityManifest = [];
for (const idPath of identityAssets) {
  const filename = path.basename(idPath);
  const targetPath = path.join(MEDIA_TARGET_DIR, 'identities', filename);
  try {
    const fileBuf = execSync(`git cat-file -p "HEAD:${idPath}"`, {
      cwd: LEGACY_DIR,
      maxBuffer: 20 * 1024 * 1024,
    });
    fs.writeFileSync(targetPath, fileBuf);
    identityManifest.push({
      id: filename.replace(/\.[^.]+$/, ''),
      filename,
      legacyPath: idPath,
      localPath: `/assets/identities/${filename}`,
      sizeBytes: fileBuf.length,
    });
    console.log(`OK Identite : ${filename} (${Math.round(fileBuf.length / 1024)} Ko)`);
  } catch (err) {
    console.error(`Echec extraction : ${idPath}`, err.message);
  }
}

console.log('\n--- EXTRACTION DES IMAGES DES 37 PROJETS ---');
const projectsManifest = {};

for (const folder of folderKeys) {
  const files = projectFolders[folder];
  const targetProjectDir = path.join(MEDIA_TARGET_DIR, 'projects', folder);
  fs.mkdirSync(targetProjectDir, { recursive: true });

  const webpFiles = files.filter(f => f.endsWith('.webp'));
  let coverPath = files.find(f => /main\.|cover\.|hero\.|preview\.|_1\./i.test(path.basename(f)));
  if (!coverPath && webpFiles.length > 0) coverPath = webpFiles[0];
  if (!coverPath && files.length > 0) coverPath = files[0];

  const galleryPaths = [];
  for (const f of files) {
    if (galleryPaths.length >= 4) break;
    if (f !== coverPath && (f.endsWith('.webp') || (!webpFiles.some(w => path.basename(w, '.webp') === path.basename(f, path.extname(f)))))) {
      galleryPaths.push(f);
    }
  }

  const extractedItems = [];
  const allToExtract = [coverPath, ...galleryPaths].filter(Boolean);

  for (const filePath of allToExtract) {
    const filename = path.basename(filePath);
    const dest = path.join(targetProjectDir, filename);
    try {
      const fileBuf = execSync(`git cat-file -p "HEAD:${filePath}"`, {
        cwd: LEGACY_DIR,
        maxBuffer: 30 * 1024 * 1024,
      });
      fs.writeFileSync(dest, fileBuf);
      extractedItems.push({
        filename,
        legacyPath: filePath,
        url: `/assets/projects/${folder}/${filename}`,
        sizeBytes: fileBuf.length,
        isCover: filePath === coverPath,
      });
    } catch (err) {
      console.warn(`Erreur extraction ${filePath}: ${err.message}`);
    }
  }

  projectsManifest[folder] = {
    folder,
    totalTrackedInLegacy: files.length,
    cover: extractedItems.find(i => i.isCover) || null,
    gallery: extractedItems.filter(i => !i.isCover),
  };
  console.log(`OK Projet ${folder} : ${extractedItems.length} medias extraits`);
}

console.log('\n--- GENERATION DU PLACEHOLDER MINERAL STANDARD ---');
const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="mineralBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4EFEA"/>
      <stop offset="50%" stop-color="#EBE3DB"/>
      <stop offset="100%" stop-color="#DDD3C7"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C59B53" stroke-width="0.75" stroke-opacity="0.25"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#mineralBg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#C59B53" stroke-width="2" stroke-opacity="0.6"/>
  <rect x="48" y="48" width="1104" height="704" fill="none" stroke="#8A6731" stroke-width="1" stroke-opacity="0.3"/>
  
  <g transform="translate(600, 340)">
    <circle r="60" fill="#C59B53" fill-opacity="0.12" stroke="#C59B53" stroke-width="2"/>
    <path d="M-24 -24 L24 24 M24 -24 L-24 24" stroke="#8A6731" stroke-width="2.5" stroke-linecap="round"/>
    <circle r="12" fill="none" stroke="#C59B53" stroke-width="2"/>
  </g>
  
  <text x="600" y="460" font-family="'Outfit', sans-serif" font-size="28" font-weight="700" fill="#1A222D" text-anchor="middle" letter-spacing="1">
    DOCUMENTATION GRAPHIQUE EN COURS D INDEXATION
  </text>
  <text x="600" y="500" font-family="'Outfit', sans-serif" font-size="18" font-weight="500" fill="#606E7F" text-anchor="middle">
    Archives d Atelier &amp; Fonds Architectural - Les Ateliers de Paul
  </text>
  <text x="600" y="540" font-family="'JetBrains Mono', monospace" font-size="14" fill="#C59B53" text-anchor="middle" letter-spacing="2">
    ATELIERSDEPAUL.COM - THE POSSIBILITY MACHINE
  </text>
</svg>`;

fs.writeFileSync(path.join(MEDIA_TARGET_DIR, 'placeholders', 'project-placeholder.svg'), placeholderSvg, 'utf8');

const manifestContent = `/**
 * ADP WEB EXPERIENCE - Manifeste Officiel de la Mediatheque
 * Genere lors de l'Etape 06
 */

export interface MediaItem {
  filename: string;
  url: string;
  legacyPath: string;
  sizeBytes: number;
  isCover?: boolean;
  alt?: string;
}

export interface ProjectMediaFolder {
  folder: string;
  totalTrackedInLegacy: number;
  cover: MediaItem | null;
  gallery: MediaItem[];
}

export const IDENTITIES_MANIFEST: Record<string, string> = ${JSON.stringify(
  identityManifest.reduce((acc, cur) => { acc[cur.id] = cur.localPath; return acc; }, {}),
  null, 2
)};

export const PROJECTS_MEDIA: Record<string, ProjectMediaFolder> = ${JSON.stringify(projectsManifest, null, 2)};

export const DEFAULT_PLACEHOLDER = "/assets/placeholders/project-placeholder.svg";
`;

fs.writeFileSync(path.join(APP_DIR, 'src/data/media-manifest.ts'), manifestContent, 'utf8');

const summaryReport = {
  totalLegacyAssets: allAssetPaths.length,
  totalProjects: folderKeys.length,
  projectsManifest,
  identityManifest,
};
fs.writeFileSync(path.join(APP_DIR, 'src/data/media-summary.json'), JSON.stringify(summaryReport, null, 2), 'utf8');
console.log('TERMINE AVEC SUCCES !');
