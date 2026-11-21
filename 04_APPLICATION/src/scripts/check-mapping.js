const fs = require('fs');
const path = require('path');

const portfolioDir = '01_LEGACY/paul-boubert-portfolio/portfolio';
const projectDirs = fs.readdirSync(portfolioDir).filter(f => {
  return fs.statSync(path.join(portfolioDir, f)).isDirectory();
});

console.log(`Nombre de projets dans legacy/portfolio : ${projectDirs.length}`);

const legacyProjects = [];
for (const dir of projectDirs) {
  const htmlPath = path.join(portfolioDir, dir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : dir;
    legacyProjects.push({ dir, title });
  }
}

console.log(legacyProjects.map((p, i) => `${i+1}. [${p.dir}] -> ${p.title}`).join('\n'));
