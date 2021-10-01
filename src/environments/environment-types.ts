import { FirebaseConfig } from '@app/firebase/firebase-config-interface';

type UseEmulatorArguments = [string, number];

type Firebase = {
  config: FirebaseConfig;
  emulators?: {
    auth: [string];
    firestore: UseEmulatorArguments;
  };
};

export type Environment = {
  appCode: string;
  production: boolean;
  firebase: Firebase;
};
