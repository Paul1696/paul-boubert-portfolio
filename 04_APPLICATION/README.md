# ADP Web Experience — Application Socle Monolithe (Next.js 15)

Plateforme d'ingénierie et de création numérique des **Ateliers de Paul** — *The Possibility Machine*.

---

## 1. Stack Technique & Versions Vérifiées

- **Framework :** Next.js 15.4.11 (App Router)
- **Bibliothèque UI :** React 19.1.0 / React-DOM 19.1.0
- **Langage :** TypeScript 5.9.3 (mode strict)
- **Linter :** ESLint 9.21.0 (`eslint-config-next` 15.4.11, `@eslint/eslintrc` 3.3.7)
- **Moteur SWC :** `@next/swc-wasm-nodejs` 15.4.8 (WebAssembly officiel)
- **Environnement hôte certifié :** Node.js v24.16.0 (Windows x64), npm 11.13.0, pnpm 11.5.2

---

## 2. Commandes Disponibles

```bash
# Lancement du serveur de développement local (par défaut port 3000 ou personnalisé)
npm run dev
npm run dev -- --port 3001

# Vérification stricte des types TypeScript (zéro émission)
npm run type-check

# Analyse statique ESLint
npm run lint

# Compilation et génération des pages statiques (SSG / SSR)
npm run build

# Démarrage du serveur en mode production
npm run start
```

---

## 3. Note d'Architecture : Moteur SWC sous Windows / Node 24

Sous Windows avec Node.js 24+, les binaires C++ natifs MSVC compilés pour les versions LTS précédentes (`@next/swc-win32-x64-msvc`) peuvent subir des violations d'accès mémoire dues aux évolutions internes de N-API.

L'application utilise le moteur WebAssembly officiel `@next/swc-wasm-nodejs` configuré via :
1. `wasm-env.js` : injection de la variable `NEXT_TEST_WASM_DIR` pour les scripts CLI ;
2. `next.config.ts` : initialisation du chemin WASM lors du chargement de la configuration Next.js ;
3. Script `postinstall` dans `package.json` garantissant la disponibilité automatique des liaisons WASM.

Cette configuration assure une reproductibilité et une stabilité parfaites lors de toute nouvelle installation (`npm install`).
