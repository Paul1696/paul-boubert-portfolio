/**
 * Déclarations d'environnement TypeScript pour ADP WEB EXPERIENCE
 * Fournit le typage des variables process.env sans dépendance réseau externe
 */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    NEXT_PUBLIC_SERVER_URL?: string;
    PAYLOAD_SECRET?: string;
    DATABASE_URI?: string;
    R2_ACCESS_KEY_ID?: string;
    R2_SECRET_ACCESS_KEY?: string;
    R2_BUCKET?: string;
    R2_ENDPOINT?: string;
    R2_PUBLIC_DOMAIN?: string;
    WHATSAPP_API_TOKEN?: string;
    WHATSAPP_PHONE_NUMBER_ID?: string;
    [key: string]: string | undefined;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
  versions: {
    node: string;
    [key: string]: string | undefined;
  };
  cwd(): string;
  exit(code?: number): never;
};

declare module "path" {
  export function resolve(...pathSegments: string[]): string;
  export function join(...paths: string[]): string;
  export function dirname(path: string): string;
  const path: {
    resolve(...pathSegments: string[]): string;
    join(...paths: string[]): string;
    dirname(path: string): string;
  };
  export default path;
}

