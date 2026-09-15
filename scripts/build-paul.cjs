// Generates the static card and UTF-8 vCard. No runtime dependencies.
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const write = (file, text) => fs.writeFileSync(path.join(root,file),text);
const social = [
 ['linkedin','LinkedIn','https://www.linkedin.com/company/adp-les-ateliers-de-paul/'],
 ['instagram','Instagram','https://www.instagram.com/adp_ateliers_de_paul?stkn=cWUxdm4za3Bxc2p2&utm_source=qr'],
 ['facebook','Facebook','https://www.facebook.com/share/1SjoyqvTDQ/?mibextid=wwXIfr']
];
const escape = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;');
const icon = name => `<svg class="icon" aria-hidden="true"><use href="/assets/paul/icons/sprite.svg#${name}"></use></svg>`;
const ext = 'target="_blank" rel="noopener noreferrer"';
const quick = [['phone','Appeler','tel:+237690715403','call'],['whatsapp','WhatsApp','https://wa.me/237690087213','whatsapp'],['mail','E-mail','mailto:paul@ateliersdepaul.com','email'],['globe','Site ADP','https://ateliersdepaul.com','site']];
const poles = [['Brief','Structurer','/adp-brief/'],['Project','Accompagner','/adp-project/'],['Studio','Concevoir','/adp-studio/'],['Tools','Outiller','/adp-tools/'],['Academy','Transmettre','/adp-academy/'],['Lab','Expérimenter','/adp-lab/']];
write('paul/index.html',`<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Paul Boubert | Les Ateliers de Paul</title>
<meta name="description" content="Carte de visite numérique de Paul Boubert — Fondateur &amp; Directeur général de Les Ateliers de Paul.">
<meta name="theme-color" content="#006BE8">
<link rel="canonical" href="https://ateliersdepaul.com/paul">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<meta property="og:type" content="profile"><meta property="og:locale" content="fr_CM">
<meta property="og:site_name" content="Les Ateliers de Paul"><meta property="og:url" content="https://ateliersdepaul.com/paul">
<meta property="og:title" content="Paul Boubert | Les Ateliers de Paul">
<meta property="og:description" content="Fondateur &amp; Directeur général. Enregistrons le contact, donnons vie aux idées.">
<meta property="og:image" content="https://ateliersdepaul.com/assets/paul/og-paul.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Paul Boubert — Fondateur &amp; Directeur général, Les Ateliers de Paul">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Paul Boubert | Les Ateliers de Paul">
<meta name="twitter:description" content="La carte de visite numérique de Paul Boubert.">
<meta name="twitter:image" content="https://ateliersdepaul.com/assets/paul/og-paul.png">
<link rel="stylesheet" href="/paul/card.css"><script src="/paul/card.js" defer></script>
</head><body>
<a class="skip" href="#contact">Aller aux coordonnées</a>
<div class="surround" aria-hidden="true"><span>LES ATELIERS DE PAUL</span><span>CARTE DE VISITE NUMÉRIQUE</span></div>
<main class="card">
<div class="intro">
<img class="emboss" src="/assets/paul/decor/a-embossed.svg" width="390" height="390" alt="">
<header class="brand"><a href="https://ateliersdepaul.com" ${ext} aria-label="Les Ateliers de Paul — site officiel" data-event="site"><img src="/assets/paul/brand/adp.webp" width="400" height="267" alt="ADP — Les Ateliers de Paul"></a><span class="edition">CARTE DE VISITE<br>NUMÉRIQUE</span></header>
<section class="identity" aria-labelledby="name"><p class="eyebrow">LES ATELIERS DE PAUL</p><h1 id="name">PAUL <span>BOUBERT</span></h1><p class="role">Fondateur &amp; Directeur général</p><p class="profile">Collaborateur d’architecte · Génie civil</p><p class="location">${icon('pin')}Douala, Cameroun</p></section>
<section class="actions" id="contact" aria-label="Contacter Paul Boubert">
<a class="save" href="/public/contact/Paul_Boubert.vcf" download="Paul_Boubert.vcf" data-event="contact_save">${icon('plus')}AJOUTER À MES CONTACTS</a>
<p class="hint">Gardons le contact, en un geste.</p>
<nav class="quick" aria-label="Actions rapides">${quick.map(([i,label,url,event])=>`<a href="${url}" ${url.startsWith('https')?ext:''} data-event="${event}" aria-label="${label==='Appeler'?'Appeler Paul au +237 690 715 403':label==='E-mail'?'Écrire à paul@ateliersdepaul.com':label}">${icon(i)}<span>${label.toUpperCase()}</span></a>`).join('')}</nav>
</section></div>
<div class="lower"><section class="section" aria-labelledby="social-heading"><h2 id="social-heading">RESTONS CONNECTÉS</h2><nav class="social" aria-label="Réseaux sociaux">${social.map(([i,label,url])=>`<a href="${escape(url)}" ${ext} data-event="${i}" aria-label="${label} — Les Ateliers de Paul">${icon(i)}${label}</a>`).join('')}</nav></section>
<section class="section" aria-labelledby="ecosystem-heading"><div class="ecosystem-heading"><h2 id="ecosystem-heading">DÉCOUVRIR NOTRE ÉCOSYSTÈME</h2><span aria-hidden="true">↗</span></div><ul class="ecosystem">${poles.map(([name,verb,url])=>`<li>${url?`<a href="${url}">`:'<div class="identity-label">'}<img src="/assets/paul/identities/${name.toLowerCase()}.webp" alt="ADP ${name} — ${verb}" width="360" height="240" loading="lazy">${url?'</a>':'</div>'}</li>`).join('')}<li class="rosbri"><a class="identity-label" href="/rosbri-design/"><img src="/assets/paul/identities/rosbri.webp" alt="Rosbri Wax Design" width="360" height="240" loading="lazy"></a></li></ul></section>
<footer><strong>LES ATELIERS DE PAUL</strong><p>Des idées au service d’un<br>lendemain innovateur.</p><a href="https://ateliersdepaul.com" ${ext} data-event="site">ateliersdepaul.com</a><small>Douala · Cameroun</small><div class="endline" aria-hidden="true"></div></footer></div>
</main></body></html>\n`);
const vescape = text => text.replaceAll('\\','\\\\').replaceAll('\n','\\n').replaceAll(',','\\,').replaceAll(';','\\;');
const lines = ['BEGIN:VCARD','VERSION:3.0','N:Boubert;Paul;;;','FN:Paul Boubert','ORG:Les Ateliers de Paul','TITLE:Fondateur & Directeur général','TEL;TYPE=WORK,VOICE:+237690715403','TEL;TYPE=CELL:+237690087213','EMAIL;TYPE=WORK,INTERNET:paul@ateliersdepaul.com','URL:https://ateliersdepaul.com','ADR;TYPE=WORK:;;;Douala;;;Cameroun',`NOTE:${vescape('Collaborateur d’architecte · Génie civil\nWhatsApp : https://wa.me/237690087213\n'+social.map(([,name,url])=>name+' : '+url).join('\n'))}`,'item1.URL:https://wa.me/237690087213','item1.X-ABLabel:WhatsApp',...social.flatMap(([id,name,url],i)=>[`item${i+2}.URL:${url}`,`item${i+2}.X-ABLabel:${name}`,`X-SOCIALPROFILE;TYPE=${id}:${url}`]),'END:VCARD'];
function fold(line){let out='',current='';for(const ch of line){if(Buffer.byteLength(current+ch)>75){out+=current+'\r\n';current=' ';}current+=ch;}return out+current;}
write('public/contact/Paul_Boubert.vcf',lines.map(fold).join('\r\n')+'\r\n');
console.log('Static page and vCard generated.');
