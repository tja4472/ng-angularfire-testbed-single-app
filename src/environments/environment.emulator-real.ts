import { firebaseConfigDev } from '@app/firebase/firebase-config-dev';

export const environment = {
  appCode: 'ngrx-auth-module',
  production: false,
  firebase: firebaseConfigDev,
  useEmulator: true,
};
