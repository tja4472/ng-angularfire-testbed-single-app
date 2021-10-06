const authPort = 9099;
const firestorePort = 8080;
const host = 'localhost';

export const EmulatorInfo = {
  host,
  auth: {
    port: authPort,
    useEmulatorUrl: `http://${host}:${authPort}`,
    firebaseAuthEmulatorHost: `${host}:${authPort}`,
  },
  firestore: {
    port: firestorePort,
  },
} as const;
