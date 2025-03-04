import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: 31180,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'firebase-messaging-sw.js',
          dest: '',
          transform: (contents) => {
            const env: { [key: string]: string | undefined } = {
              VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
              VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
              VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
              VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
              VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
              VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
              VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID,
            };

            let fileContent = contents.toString();
            Object.keys(env).forEach((key) => {
              fileContent = fileContent.replace(new RegExp(`\\\${${key}}`, 'g'), env[key] || '');
            });

            return fileContent;
          },
        },
      ],
    }),
  ],
});
