/**
 * @jest-environment node
 *
 * Required for Firebase
 *
 * @group emulator-required
 */
import * as admin from 'firebase-admin';

import { clearDatabase, clearUserAccounts } from '../emulator/emulator-helpers';
import { EmulatorInfo } from '../emulator/emulator-info';

describe('firebase-admin', () => {
  beforeEach(async () => {
    await clearUserAccounts('demo-1');
    await clearDatabase('demo-1');
  });

  afterEach(() => {
    // app.delete().catch(() => undefined);
  });

  it('auth - CreateUser', async () => {
    // The Firebase Admin SDK automatically connects to the Authentication emulator when the FIREBASE_AUTH_EMULATOR_HOST environment variable is set.
    // https://firebase.google.com/docs/emulator-suite/connect_auth
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] =
      EmulatorInfo.auth.firebaseAuthEmulatorHost;

    admin.initializeApp({ projectId: 'demo-1' });

    const userRecord = await admin.auth().createUser({
      uid: 'uid1',
      email: 'test@test.example',
      password: 'password',
    });

    expect(userRecord.uid).toEqual('uid1');
  });
});
