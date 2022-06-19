/**
 * @pppppppjest-environment node
 *
 * Required for Firebase
 *
 */
import { readFileSync, createWriteStream } from 'fs';
import http from 'http';
import path from 'path';

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestContext,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  setLogLevel,
} from 'firebase/firestore';

// https://github.com/KentaYamada/my-trainer/blob/master/tests/unit/firebase/firestore/security-rules/report.spec.ts
// https://github.com/KentaYamada/my-trainer/blob/master/tests/unit/firebase/firestore/security-rules/test-app.ts

export const getTestApp = async (): Promise<RulesTestEnvironment> => {
  return await initializeTestEnvironment({
    projectId: 'demo-1',
    firestore: {
      host: 'localhost',
      port: 8080,
      rules: readFileSync(
        path.resolve(__dirname, 'firestore.v9.test.rules'),
        'utf8'
      ),
    },
  });
};

export const clearUpFirestoreData = async (): Promise<void> => {
  const testApp: RulesTestEnvironment = await getTestApp();
  await testApp.clearFirestore();
};

export const clearUpTestApp = async (): Promise<void> => {
  const testApp: RulesTestEnvironment = await getTestApp();
  await testApp.cleanup();
};

export const getAuthorizedContext = async (): Promise<RulesTestContext> => {
  const testApp: RulesTestEnvironment = await getTestApp();
  return testApp.authenticatedContext('test_user');
};

export const getUnauthorizedContext = async (): Promise<RulesTestContext> => {
  const testApp: RulesTestEnvironment = await getTestApp();
  return testApp.unauthenticatedContext();
};

jest.retryTimes(3);

describe('security tests', () => {

  afterAll(async () => {
    await clearUpTestApp();
  });

/*  
  afterEach(async () => {
    await clearUpFirestoreData();
  });
*/
  beforeEach(async () => {
    await clearUpFirestoreData();
  });

  // jest.setTimeout(20 * 1000) ;

  it('should let anyone read any profile', async () => {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await (
      await getTestApp()
    ).withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users/foobar'), { foo: 'bar' });
    });


    // const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const unauthedDb = (await getUnauthorizedContext()).firestore();

   
    // Then test security rules by trying to read it using the client SDK.
    await assertSucceeds(getDoc(doc(unauthedDb, 'users/foobar')));
  
  });
  
});
