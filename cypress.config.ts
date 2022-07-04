import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);

      // we can grab some process environment variables
      // and stick it into config.env before returning the updated config
      config.env = config.env || {};
      config.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
      config.env.FIREBASE_AUTH_EMULATOR_HOST =
        process.env.FIREBASE_AUTH_EMULATOR_HOST;

      return config;
    },
    baseUrl: 'http://localhost:4200',
  },
  retries: {
    runMode: 3,
    openMode: 2,
  },
});
