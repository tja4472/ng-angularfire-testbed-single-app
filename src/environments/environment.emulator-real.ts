import { firebaseConfigEmulatorReal } from '@app/firebase/firebase-config-emulator-real';

export const environment = {
    appCode: 'ngrx-auth-module',
    production: false,
    firebase: firebaseConfigEmulatorReal,
    useEmulator: true,
};
