import { firebaseConfigEmulatorDemo } from '@app/firebase/firebase-config-emulator-demo';

import { Environment } from './environment-types';

export const environment: Environment = {
  appCode: 'ngrx-auth-module',
  production: true,
  firebase: {
    config: firebaseConfigEmulatorDemo,
    emulators: {
      auth: ['http://localhost:9099'],
      firestore: ['localhost', 8080],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
