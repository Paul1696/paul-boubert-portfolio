const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const LEGACY_DIR = path.join(PROJECT_ROOT, '01_LEGACY/paul-boubert-portfolio');
const APP_DIR = path.join(PROJECT_ROOT, '04_APPLICATION');
const MEDIA_TARGET_DIR = path.join(APP_DIR, 'src/assets/media');

const rawTree = execSync('git ls-tree -r --name-only HEAD assets/projects/', {
  cwd: LEGACY_DIR,
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});

const projectAssets = rawTree.split('\n').map(p => p.trim()).filter(Boolean);
const projectFolders = {};
for (const p of projectAssets) {
  const parts = p.split('/');
  const folder = parts[2];
  if (!projectFolders[folder]) projectFolders[folder] = [];
  projectFolders[folder].push(p);
}

const folderKeys = Object.keys(projectFolders);
console.log(`Nombre total de dossiers de projets : ${folderKeys.length}`);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const projectsManifest = {};

  for (let idx = 0; idx < folderKeys.length; idx++) {
    const folder = folderKeys[idx];
    const files = projectFolders[folder];
    const targetProjectDir = path.join(MEDIA_TARGET_DIR, 'projects', folder);
    fs.mkdirSync(targetProjectDir, { recursive: true });

    // Check existing files in target
    const existing = fs.readdirSync(targetProjectDir);

    // Prefer webp, then jpg/png
    const webpFiles = files.filter(f => f.endsWith('.webp'));
    let coverPath = files.find(f => /main\.|cover\.|hero\.|preview\.|_1\./i.test(path.basename(f)));
    if (!coverPath && webpFiles.length > 0) coverPath = webpFiles[0];
    if (!coverPath && files.length > 0) coverPath = files[0];

    const galleryPaths = [];
    for (const f of files) {
      if (galleryPaths.length >= 2) break;
      if (f !== coverPath && (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'))) {
        galleryPaths.push(f);
      }
    }

    const itemsToExtract = [coverPath, ...galleryPaths].filter(Boolean);
    const manifestItems = [];

    for (const itemPath of itemsToExtract) {
      const filename = path.basename(itemPath);
      const dest = path.join(targetProjectDir, filename);

      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        manifestItems.push({
          filename,
          url: `/assets/projects/${folder}/${filename}`,
          isCover: itemPath === coverPath,
          sizeBytes: fs.statSync(dest).size,
        });
      } else {
        try {
          const buf = execSync(`git cat-file -p "HEAD:${itemPath}"`, {
            cwd: LEGACY_DIR,
            maxBuffer: 25 * 1024 * 1024,
          });
          fs.writeFileSync(dest, buf);
          manifestItems.push({
            filename,
            url: `/assets/projects/${folder}/${filename}`,
            isCover: itemPath === coverPath,
            sizeBytes: buf.length,
          });
        } catch (err) {
          console.warn(`! Fallback pour ${folder}/${filename}: ${err.message}`);
        }
      }
    }

    projectsManifest[folder] = {
      folder,
      totalLegacyAssets: files.length,
      cover: manifestItems.find(i => i.isCover) || manifestItems[0] || null,
      gallery: manifestItems.filter(i => !i.isCover),
    };

    console.log(`[${idx + 1}/${folderKeys.length}] ${folder} -> ${manifestItems.length} images OK`);
    await sleep(80); // Protect mechanical drive & USB controller
  }

  // Write Manifest
  const manifestContent = `/**
 * ADP WEB EXPERIENCE — Manifeste Officiel de la Médiathèque
 * Généré lors de l'Étape 06
 */

export interface MediaItem {
  filename: string;
  url: string;
  sizeBytes: number;
  isCover?: boolean;
}

export interface ProjectMediaFolder {
  folder: string;
  totalLegacyAssets: number;
  cover: MediaItem | null;
  gallery: MediaItem[];
}

export const PROJECTS_MEDIA: Record<string, ProjectMediaFolder> = ${JSON.stringify(projectsManifest, null, 2)};

export const DEFAULT_PLACEHOLDER = "/assets/placeholders/project-placeholder.svg";
`;

  fs.writeFileSync(path.join(APP_DIR, 'src/data/media-manifest.ts'), manifestContent, 'utf8');
  console.log('✓ Manifeste media-manifest.ts généré avec succès !');
}

run().catch(console.error);
