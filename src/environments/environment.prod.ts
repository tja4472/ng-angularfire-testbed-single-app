import { firebaseConfigProd } from '@app/firebase/firebase-config-prod';

import { Environment } from './environment-types';

export const environment: Environment = {
  appCode: 'ngrx-auth-module',
  production: true,
  firebase: {
    config: firebaseConfigProd,
  },
};
