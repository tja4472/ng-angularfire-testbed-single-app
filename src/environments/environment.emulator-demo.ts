import { firebaseConfigEmulatorDemo } from '@app/firebase/firebase-config-emulator-demo';

export const environment = {
    appCode: 'ngrx-auth-module',
    production: false,
    firebase: firebaseConfigEmulatorDemo,
    useEmulator: true,
};
