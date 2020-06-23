import { firebaseConfig } from '@app/firebase/firebase-config';

export const environment = {
    appCode: 'ngrx-auth-module',
    production: false,
    firebase: firebaseConfig,
    useEmulator: true,
};
