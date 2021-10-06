import { firebaseConfigEmulatorDemo } from '@app/firebase/firebase-config-emulator-demo';

import { Environment } from './environment-types';

export const environment: Environment = {
  appCode: 'ngrx-auth-module',
  production: false,
  firebase: {
    config: firebaseConfigEmulatorDemo,
    emulators: {
      auth: ['http://localhost:9099'],
      firestore: ['localhost', 8080],
    },
  },
};
