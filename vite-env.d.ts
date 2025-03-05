interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_PORT: string;
  readonly VITE_API_PREFIX: string;

  readonly VITE_KAKAO_APP_KEY: string;

  readonly VITE_GOOGLE_OAUTH_CLIEND_ID: string;
  readonly VITE_GOOGLE_OAUTH_REDIRECT_URL: string;

  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;

  readonly VITE_FIREBASE_WEB_PUSH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
