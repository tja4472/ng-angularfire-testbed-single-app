import { firebaseConfig } from '@app/firebase/firebase-config';

export const environment = {
    appCode: 'ngrx-auth-module',
    production: true,
    firebase: firebaseConfig,
    useEmulator: false,
};
