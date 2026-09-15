const fs=require('fs'),path=require('path');
const identities=[['adp-brief','brief','ADP Brief','#08763c','#063d25','#7bdda8','8,118,60','#f1faf5'],['adp-project','project','ADP Project','#cf1230','#510b1b','#ff90a1','207,18,48','#fff5f6'],['adp-studio','studio','ADP Studio','#926719','#47340f','#ebcd89','146,103,25','#faf7ef'],['adp-tools','tools','ADP Tools','#42494d','#202528','#c3cbcf','66,73,77','#f3f5f5'],['adp-academy','academy','ADP Academy','#8539c6','#3e1b61','#d4a1ff','133,57,198','#f9f3ff'],['adp-lab','lab','ADP Lab','#bd4d00','#542500','#ffbb7b','189,77,0','#fff6ee'],['rosbri-design','rosbri','Rosbri Wax Design','#855409','#38260e','#edc878','133,84,9','#fbf6ed']];
for(const [,id]of identities)fs.copyFileSync(`assets/paul/identities/${id}.webp`,`assets/identities/${id}.webp`);
fs.copyFileSync('assets/paul/brand/adp.webp','assets/identities/adp.webp');
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','.claude','.codex','POST','scratch','node_modules'].includes(e.name))continue;const f=path.join(dir,e.name);if(e.isDirectory()){walk(f);continue}if(!f.endsWith('.html'))continue;let s=fs.readFileSync(f,'utf8');if(!s.includes('adp-shared.css'))continue;const old=s;
if(!s.includes('href="/brand-pages.css"'))s=s.replace('</head>','<link rel="stylesheet" href="/brand-pages.css">\n</head>');
for(const [slug,id,label] of identities){const re=new RegExp(`(<a href="/${slug}/" class="adp-dropdown-item">)[\\s\\S]*?(</a>)`,'g');s=s.replace(re,`$1<img class="identity-menu-logo" src="/assets/identities/${id}.webp" alt="" width="64" height="43"><span>${label}</span>$2`);
s=s.replace(new RegExp(`(<a href="/${slug}/" class="adp-pole-item[^\"]*">\\s*<div class="adp-pole-card__icon">)[\\s\\S]*?(</div>)`,'g'),`$1<img src="/assets/identities/${id}.webp" alt="${label}" width="160" height="107" loading="lazy">$2`);
s=s.replace(/(<ul class="adp-footer-links">)([\s\S]*?)(<\/ul>)/g,(all,start,body,end)=>start+body.replace(new RegExp(`<a href="/${slug}/">(?:<img[^>]*>)?${label}</a>`,'g'),`<a href="/${slug}/"><img class="identity-footer-logo" src="/assets/identities/${id}.webp" alt="" width="60" height="40" loading="lazy">${label}</a>`)+end);
}
const own=identities.find(([slug])=>path.normalize(f)===path.normalize(slug+'/index.html'));
const id=own?own[1]:'adp',label=own?own[2]:'Les Ateliers de Paul';
s=s.replace(/(<a href="\/" class="adp-logo">\s*)<img[^>]+>/,`$1<img src="/assets/identities/${id}.webp" alt="${label} — accueil Les Ateliers de Paul" class="adp-logo-img" width="160" height="107">`);
s=s.replace(/(<div class="adp-footer-logo">)[\s\S]*?(<\/div>\s*<p class="adp-footer-tagline">)/,`$1<img class="identity-brand-footer" src="/assets/identities/${id}.webp" alt="${label}" width="180" height="120"></div><p class="adp-footer-tagline">`);
if(own){s=s.replace(/<body(?: class="[^"]*")?>/,`<body class="brand-${id}">`);if(!s.includes('class="pole-brand-logo"'))s=s.replace(/(<p class="adp-label fade-in-up">)/,`<div class="pole-brand-logo"><img src="/assets/identities/${id}.webp" alt="Logo ${label}" width="360" height="240"></div>\n$1`);s=s.replace(/<link rel="icon"[^>]*>/,`<link rel="icon" type="image/webp" href="/assets/identities/${id}.webp">`);}
if(s!==old)fs.writeFileSync(f,s);
}}walk('.');
let css=fs.readFileSync('brand-pages.css','utf8').split('/* Unified identity system */')[0];
css+='\n/* Unified identity system */\n';
for(const [slug,id,,color,dark,light,rgb,surface]of identities){css+=`.brand-${id}{--adp-blue:${color};--adp-blue-dark:${dark};--adp-blue-light:${light};--adp-blue-rgb:${rgb};--adp-surface:${surface}}\n.brand-${id} .pole-hero{background:linear-gradient(135deg,${dark},${color})}\na.adp-dropdown-item[href="/${slug}/"],a.adp-pole-item[href="/${slug}/"]{--identity-color:${color};--identity-surface:${surface}}\n`;}
css+=`[class*="brand-"] .text-gradient{background:linear-gradient(135deg,var(--adp-blue),var(--adp-blue-dark));background-clip:text;-webkit-background-clip:text}
.identity-menu-logo{width:64px;height:43px;object-fit:contain;background:white;border-radius:3px;flex-shrink:0}.adp-dropdown-menu{min-width:255px}.adp-dropdown-item{color:var(--identity-color,var(--adp-blue));min-height:54px}.adp-dropdown-item:hover{color:var(--identity-color);background:var(--identity-surface)}
.adp-logo-img{object-fit:contain;width:145px;height:70px}.identity-brand-footer{width:180px;height:120px;object-fit:contain;background:white;border-radius:4px;padding:8px}.identity-footer-logo{width:60px;height:40px;object-fit:contain;background:white;border-radius:3px;margin-right:10px;flex-shrink:0}.adp-footer-links a:has(.identity-footer-logo){display:flex;align-items:center;min-height:48px}
.adp-pole-item .adp-pole-card__icon{width:160px;height:107px;background:white;color:var(--identity-color);flex-shrink:0}.adp-pole-card__icon img{width:160px;height:107px;object-fit:contain}.adp-pole-item:hover{border-color:var(--identity-color)}.adp-pole-item .adp-pole-card__body h3,.adp-pole-item .adp-pole-card__body h3 span,.adp-pole-item .adp-pole-card__link{color:var(--identity-color)}
@media(max-width:900px){.adp-nav-links.open{max-height:calc(100dvh - var(--adp-nav-height));overflow-y:auto}.adp-dropdown-menu{min-width:0}.adp-dropdown-item{min-height:54px}}
`;
fs.writeFileSync('brand-pages.css',css);console.log('Identity logos and themes synchronized across the site.');
