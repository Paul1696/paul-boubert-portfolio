const fs = require('node:fs');
const pages = [
  {
    slug:'adp-project', theme:'project', name:'ADP Project', logo:'project', themeColor:'#cf1230',
    title:'ADP Project — Accompagner votre projet | Les Ateliers de Paul',
    description:'ADP Project, le pôle accompagnement de Les Ateliers de Paul. Échangeons sur votre projet, ses priorités et ses prochaines étapes à Douala, au Cameroun.',
    kicker:'Les Ateliers de Paul · Accompagner',
    heading:'Votre projet.<br>Une direction <em>claire.</em>',
    lead:'Un projet avance mieux quand les idées, les décisions et les intervenants vont dans le même sens. ADP Project est le pôle accompagnement de Les Ateliers de Paul.',
    action:'Parlons de votre projet', secondary:'Découvrir notre approche', section:'approche',
    strip:['ADP Project','Clarifier les priorités','Relier les étapes','Avancer ensemble'],
    sectionKicker:'Notre approche', sectionHeading:'De la première idée<br>aux prochaines étapes.',
    items:[['Comprendre le besoin','Partir de votre contexte, de vos objectifs et de vos contraintes pour poser les bonnes questions.'],['Organiser la démarche','Mettre les priorités en perspective et identifier les sujets à traiter avec les intervenants concernés.'],['Accompagner les échanges','Favoriser une compréhension commune du projet et des décisions à prendre au fil de son évolution.']],
    splitKicker:'Un écosystème, plusieurs expertises', splitHeading:'Faire le lien.<br>Garder le cap.',
    splitText:'Structurer un besoin avec ADP Brief, explorer sa traduction visuelle avec ADP Studio, s’appuyer sur ADP Tools : l’écosystème Les Ateliers de Paul réunit des approches complémentaires autour de votre projet.',
    splitLink:'/adp/', splitLabel:'Découvrir Les Ateliers de Paul',
    contactHeading:'Où en est votre projet ?', contactText:'Présentez votre idée, votre localisation et les points sur lesquels vous souhaitez être accompagné. Ce premier échange permettra de préciser votre besoin.',
    message:'Bonjour Paul, je souhaite échanger au sujet d’un projet avec ADP Project.', footer:'Accompagner · Les Ateliers de Paul'
  },
  {
    slug:'rosbri-design', theme:'rosbri', name:'Rosbri Wax Design', logo:'rosbri', themeColor:'#855409',
    title:'Rosbri Wax Design — L’élégance africaine au quotidien',
    description:'Découvrez l’univers Rosbri Wax Design : le wax, le motif et l’élégance africaine au quotidien, au sein de l’écosystème Les Ateliers de Paul.',
    kicker:'Rosbri Wax Design', heading:'L’élégance africaine<br><em>au quotidien.</em>',
    lead:'Une identité singulière, portée par le wax, la richesse des motifs et la chaleur des couleurs. Entrez dans l’univers Rosbri Wax Design.',
    action:'Échanger avec nous', secondary:'Explorer l’univers', section:'univers',
    strip:['Rosbri Wax Design','Le motif','La couleur','L’expression personnelle'],
    sectionKicker:'Notre univers', sectionHeading:'Des motifs qui s’expriment.<br>Une identité qui se distingue.',
    items:[['Le wax, point de départ','Un univers visuel où les motifs et les couleurs se rencontrent pour donner du caractère au quotidien.'],['L’élégance, fil conducteur','Une invitation à faire dialoguer expression personnelle et sens du détail.'],['Une signature à part entière','Rosbri Wax Design conserve son nom, son emblème et son univers au sein de l’écosystème Les Ateliers de Paul.']],
    splitKicker:'Une envie, une idée', splitHeading:'Commençons<br>par une conversation.',
    splitText:'Un motif vous inspire ? Vous souhaitez en savoir plus sur Rosbri Wax Design ? Partagez vos envies et vos références pour ouvrir la discussion.',
    splitLink:'#contact',splitLabel:'Nous parler de votre envie',
    contactHeading:'Faisons connaissance.',contactText:'Contactez Paul pour découvrir Rosbri Wax Design et échanger autour de votre demande.',
    message:'Bonjour Paul, je souhaite en savoir plus sur Rosbri Wax Design.',footer:'L’élégance africaine au quotidien'
  }
];
// Reuse the existing pole template: shared navigation, hero, services, process and footer.
const template=fs.readFileSync('adp-brief/index.html','utf8');
for(const p of pages){
 let head=template.slice(0,template.indexOf('<main id="main-content">'));
 head=head.replaceAll('ADP Brief | Documents de Projet & Cahiers des Charges à Douala',p.title).replaceAll('ADP Brief — Rédaction de programmes, cahiers des charges, CCTP et dossiers de consultation pour vos projets de construction et d’aménagement à Douala, Cameroun.',p.description);
 head=head.replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*(">)/g,`$1${p.description}$2`).replaceAll('https://ateliersdepaul.com/adp-brief/',`https://ateliersdepaul.com/${p.slug}/`).replaceAll('https://ateliersdepaul.com/assets/og/og-brief.jpg',`https://ateliersdepaul.com/assets/identities/og-${p.logo}.png`);
 head=head.replace('</head>','    <link rel="stylesheet" href="/brand-pages.css">\n</head>').replace('<body>',`<body class="brand-${p.theme}">`);
 if(!head.includes('href="/adp-project/"')) head=head.replace('<a href="/adp-lab/" class="adp-dropdown-item">',`<a href="/adp-project/" class="adp-dropdown-item"><span class="di-icon"><i class="fas fa-tasks"></i></span>ADP Project</a><a href="/rosbri-design/" class="adp-dropdown-item"><span class="di-icon"><i class="fas fa-palette"></i></span>Rosbri Wax Design</a><a href="/adp-lab/" class="adp-dropdown-item">`);
 let footer=template.slice(template.indexOf('<footer class="adp-footer">'),template.indexOf('<script type="application/ld+json">'));
 if(!footer.includes('href="/adp-project/"')) footer=footer.replace('<li><a href="/adp-lab/">ADP Lab</a></li>','<li><a href="/adp-lab/">ADP Lab</a></li><li><a href="/adp-project/">ADP Project</a></li><li><a href="/rosbri-design/">Rosbri Wax Design</a></li>');
 const steps=p.theme==='project'?[['Recueil du besoin','Échanger sur votre projet, vos objectifs et les contraintes à prendre en compte.'],['Définition du périmètre','Préciser ensemble les attentes et les étapes de l’accompagnement.'],['Échanges & coordination','Faire le point sur les décisions et les sujets à traiter avec les intervenants concernés.'],['Prochaines étapes','Partager une vision claire des actions à poursuivre.']]:[['Premier échange','Présentez votre envie et les questions que vous souhaitez nous poser.'],['Inspirations','Partagez les couleurs, motifs et références qui vous parlent.'],['Discussion','Précisons ensemble votre demande et ses possibilités.'],['Suite à donner','Convenons des prochaines étapes adaptées à votre besoin.']];
 const icons=p.theme==='project'?['fa-comments','fa-list-check','fa-people-arrows']:['fa-palette','fa-gem','fa-fingerprint'];
 const main=`<main id="main-content">
 <section class="pole-hero"><div class="pole-hero__watermark" aria-hidden="true">${p.theme==='project'?'PROJECT':'RO SBRI'.replace(' ','')}</div><div class="adp-container"><div class="pole-hero__inner">
 <nav class="pole-breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><i class="fas fa-chevron-right" aria-hidden="true"></i><a href="/adp/">Pôles</a><i class="fas fa-chevron-right" aria-hidden="true"></i><span aria-current="page">${p.name}</span></nav>
 <div class="pole-brand-logo"><img src="/assets/identities/${p.logo}.webp" alt="Logo ${p.name}" width="360" height="240"></div>
 <p class="adp-label fade-in-up">${p.theme==='project'?'Accompagnement de projet':'L’élégance africaine au quotidien'}</p><h1 class="pole-hero__title fade-in-up">${p.name}</h1><p class="pole-hero__subtitle fade-in-up">${p.lead}</p>
 <div class="pole-hero__actions fade-in-up"><a href="/contact/" class="btn-primary">${p.action} <i class="fas fa-arrow-right" aria-hidden="true"></i></a><a href="#${p.section}" class="btn-outline">${p.secondary}</a></div>
 </div></div></section>
 <section class="pole-services" id="${p.section}"><div class="adp-container"><p class="adp-label fade-in-up">${p.sectionKicker}</p><h2 class="section-title fade-in-up">${p.theme==='project'?'Notre <span class="text-gradient">accompagnement</span>':'Notre <span class="text-gradient">univers</span>'}</h2><p class="section-subtitle fade-in-up">${p.sectionHeading.replace('<br>',' ')}</p><div class="pole-services-grid">${p.items.map(([title,text],i)=>`<div class="pole-service-card fade-in-up"><div class="pole-service-card__icon"><i class="fas ${icons[i]}" aria-hidden="true"></i></div><h3>${title}</h3><p>${text}</p></div>`).join('')}</div></div></section>
 <section class="pole-process"><div class="adp-container"><p class="adp-label fade-in-up">Comment ça se passe</p><h2 class="section-title fade-in-up">En <span class="text-gradient">4 étapes</span></h2><div class="pole-process-steps">${steps.map(([title,text],i)=>`<div class="pole-step fade-in-up"><div class="pole-step__num">0${i+1}</div><h3>${title}</h3><p>${text}</p></div>`).join('')}</div></div></section>
 <section class="pole-cta" id="contact"><div class="adp-container"><h2 class="fade-in-up">${p.contactHeading}</h2><p class="fade-in-up">${p.contactText}</p><a href="/contact/" class="btn-primary fade-in-up">${p.action} <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></section>
 </main>`;
 fs.writeFileSync(`${p.slug}/index.html`,head+main+footer+'\n</body>\n</html>\n');
}
console.log('Pages rebuilt using the existing ADP pole layout.');

require('./sync-identities.cjs');
