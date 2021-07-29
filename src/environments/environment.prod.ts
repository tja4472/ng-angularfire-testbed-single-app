import { firebaseConfigProd } from '@app/firebase/firebase-config-prod';

export const environment = {
  appCode: 'ngrx-auth-module',
  production: true,
  firebase: firebaseConfigProd,
  useEmulator: false,
};
