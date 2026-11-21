/**
 * Configuration Centrale Payload CMS — Ateliers de Paul
 * Architecture Cible : Monolithe Modulaire Next.js + PostgreSQL
 * Conforme à l'Étape 03A, 03B et 08 (ADP Control)
 */

import { UsersCollection } from "./collections/Users";
import { UniversesCollection } from "./collections/Universes";
import { ProjectsCollection } from "./collections/Projects";
import { ServicesCollection } from "./collections/Services";
import { QuoteRequestsCollection } from "./collections/QuoteRequests";
import { MediaCollection } from "./collections/Media";
import { ArticlesCollection } from "./collections/Articles";
import { NewsletterSubscribersCollection } from "./collections/NewsletterSubscribers";

export interface PayloadConfigOptions {
  serverURL?: string;
  secret: string;
  databaseUri?: string;
}

export const payloadConfig = {
  admin: {
    user: UsersCollection.slug,
    routes: {
      admin: "/admin",
    },
  },
  collections: [
    UsersCollection,
    UniversesCollection,
    ProjectsCollection,
    ServicesCollection,
    QuoteRequestsCollection,
    MediaCollection,
    ArticlesCollection,
    NewsletterSubscribersCollection,
  ],
  database: {
    adapter: "postgres",
    connectionString: process.env.DATABASE_URI || "",
  },
  secret: process.env.PAYLOAD_SECRET || "dev-payload-secret-at-least-32-characters-long",
  sharp: true,
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
};

export default payloadConfig;
