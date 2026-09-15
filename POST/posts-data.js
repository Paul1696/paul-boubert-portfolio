/**
 * ADP — Données des posts Social Media
 * Structure de chaque post :
 *   id          : identifiant unique (ex: 'li-2026-06-23')
 *   platform    : linkedin | instagram | facebook | x | tiktok | whatsapp
 *   date        : 'YYYY-MM-DD' — date de publication prévue
 *   topic       : sujet du jour (identique pour les 6 plateformes du même jour)
 *   type        : format du post (ex: "Article long", "Carrousel", "Thread")
 *   text        : texte principal du post (vide = à rédiger)
 *   hashtags    : hashtags (vide = à rédiger)
 *   networkUrl  : URL d'ouverture directe sur le réseau
 */

const PLATFORM_URLS = {
    linkedin:  'https://www.linkedin.com/feed/',
    instagram: 'https://www.instagram.com/',
    facebook:  'https://www.facebook.com/',
    x:         'https://x.com/compose/post',
    tiktok:    'https://www.tiktok.com/upload',
    whatsapp:  'https://web.whatsapp.com/',
};

const PLATFORM_TYPES = {
    linkedin:  'Article long',
    instagram: 'Carrousel',
    facebook:  'Texte + image',
    x:         'Tweet / Thread',
    tiktok:    'Script vidéo',
    whatsapp:  'Message broadcast',
};

const ALL_PLATFORMS = ['linkedin', 'instagram', 'facebook', 'x', 'tiktok', 'whatsapp'];

/* ── Génère les slots vides à partir du lundi 22 juin 2026 ── */
function generateSlots(startDate, days) {
    const slots = [];
    const start = new Date(startDate);

    for (let d = 0; d < days; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + d);
        const dateStr = date.toISOString().split('T')[0];

        ALL_PLATFORMS.forEach(platform => {
            slots.push({
                id:         `${platform}-${dateStr}`,
                platform,
                date:       dateStr,
                topic:      '',
                type:       PLATFORM_TYPES[platform],
                text:       '',
                hashtags:   '',
                networkUrl: PLATFORM_URLS[platform],
            });
        });
    }
    return slots;
}

/* Charge les posts : fusionne slots + contenu rédigé + localStorage */
function loadPosts() {
    const base = generateSlots('2026-06-22', 30);
    try {
        const saved = JSON.parse(localStorage.getItem('adp_posts_content')) || {};
        return base.map(slot => ({
            ...slot,
            ...(POSTS_CONTENT[slot.id] || {}),
            ...(saved[slot.id]         || {}),
        }));
    } catch {
        return base;
    }
}

/* Sauvegarde les modifications d'un post dans localStorage */
function savePost(id, data) {
    try {
        const saved = JSON.parse(localStorage.getItem('adp_posts_content')) || {};
        saved[id] = { ...saved[id], ...data };
        localStorage.setItem('adp_posts_content', JSON.stringify(saved));
    } catch (e) {
        console.error('Erreur sauvegarde post', e);
    }
}

/* ── Contenu rédigé — injecté au chargement ── */
const POSTS_CONTENT = {

    'linkedin-2026-06-22': {
        topic: 'Présentation ADP',
        text: `Il y a un problème structurel dans le secteur de la construction au Cameroun.

Pas de manque de talent. Pas de manque de projets. Mais un manque criant d'outils, de méthodes et de repères adaptés au contexte local.

Les chantiers démarrent sans permis. Les budgets se gèrent à vue d'œil. Les contrats se concluent à l'oral.

C'est ce constat qui est à l'origine d'ADP — Ateliers de Paul.

ADP, c'est une structure d'accompagnement et de coordination de projets de construction basée à Douala. Mais c'est surtout une conviction : ceux qui construisent au Cameroun méritent des outils sérieux, des méthodes claires et un accompagnement ancré dans leur réalité.

Ce sur quoi on travaille :

— ADP Academy : formation et transmission de méthodes pour les professionnels du bâtiment
— ADP Lab : expérimentation et recherche appliquée au contexte local
— ADP Tools : outils numériques pour les professionnels du bâtiment (en développement actif)

On lance aujourd'hui notre présence sur les réseaux. Pour partager ce qu'on apprend, ce qu'on construit, et ce qui peut être utile à ceux qui construisent au Cameroun.

Bienvenue chez ADP — Ateliers de Paul.
👉 ateliersdepaul.com`,
        hashtags: '#adp #ateliersdepaul #douala #cameroun #construction #btp #architecture #lancement',
    },

    'instagram-2026-06-22': {
        topic: 'Présentation ADP',
        text: `On est là. 👋

ADP — Ateliers de Paul lance officiellement sa présence sur Instagram.

Swipe pour découvrir ce qu'on fait →

--- Structure des slides ---
Slide 1 : Logo ADP + "Bienvenue chez ADP — Ateliers de Paul"
Slide 2 : "Le BTP au Cameroun manque d'outils et de méthodes. On s'y attaque."
Slide 3 : ADP Academy — Formation et méthodes pour les pros du bâtiment
Slide 4 : ADP Lab — Recherche et expérimentation appliquée au contexte local
Slide 5 : ADP Tools — "Des outils numériques pour les pros du bâtiment. En développement."
Slide 6 : CTA — "Suivez-nous → ateliersdepaul.com"`,
        hashtags: '#adp #ateliersdepaul #douala #cameroun #btp #construction #lancement',
    },

    'facebook-2026-06-22': {
        topic: 'Présentation ADP',
        text: `🏗️ ADP — Ateliers de Paul est maintenant sur Facebook.

On est une structure d'accompagnement et de coordination de projets de construction basée à Douala. On développe des outils, des méthodes et des formations pour mieux construire au Cameroun.

Ce que vous trouverez ici :
— Des conseils pratiques sur la construction et la gestion de projets
— Des actualités sur ADP Tools, nos outils en développement
— Des ressources gratuites à télécharger

Bienvenue — n'hésitez pas à partager à ceux qui construisent ou rénovent. 👇

👉 ateliersdepaul.com`,
        hashtags: '',
    },

    'x-2026-06-22': {
        topic: 'Présentation ADP',
        text: `On lance ADP — Ateliers de Paul sur X.

Design d'espace + coordination de projets + outils numériques pour le BTP au Cameroun.

Pourquoi ? Parce que construire à Douala mérite mieux que des chantiers sans méthode.

Thread dans les prochains jours. Pour l'instant : ateliersdepaul.com`,
        hashtags: '#adp #douala #cameroun #btp #construction #lancement',
    },

    'tiktok-2026-06-22': {
        topic: 'Présentation ADP',
        text: `[0–3s — HOOK]
"Je développe des outils pour les professionnels du bâtiment au Cameroun. Voici pourquoi."

[3–20s — Constat]
"Construire à Douala, c'est souvent naviguer à vue. Pas de méthodes claires, pas d'outils adaptés, pas de repères. Les projets coûtent plus cher, prennent plus de temps, et génèrent des conflits évitables."

[20–38s — La réponse ADP]
"ADP — Ateliers de Paul, c'est ma réponse à ce problème. De l'accompagnement, de la coordination de projet, et surtout : des outils numériques conçus pour le contexte camerounais. C'est ce que je construis."

[38–45s — CTA]
"Je vais documenter tout ça ici. Suivez pour ne rien rater. Lien en bio."`,
        hashtags: '#adp #douala #cameroun #construction #btp #lancement',
    },

    'whatsapp-2026-06-22': {
        topic: 'Présentation ADP',
        text: `Bonjour 👋

ADP — Ateliers de Paul lance officiellement sa présence sur les réseaux sociaux.

Design d'espace, coordination de projets et outils numériques pour le BTP au Cameroun.

Retrouvez-nous sur LinkedIn, Instagram, Facebook, X et TikTok.

Notre site : ateliersdepaul.com

Des questions ? Répondez directement à ce message.`,
        hashtags: '',
    },
};

let POSTS = [];

if (typeof module !== 'undefined') module.exports = { loadPosts, savePost, POSTS_CONTENT };
