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
import {
  Collection,
  importDatabase,
  SaveFunction,
} from '../emulator/importDatabase';


describe('firebase-admin', () => {
  beforeAll(() => {
    // The Firebase Admin SDK automatically connects to the Authentication emulator when the FIREBASE_AUTH_EMULATOR_HOST environment variable is set.
    // https://firebase.google.com/docs/emulator-suite/connect_auth
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] =
      EmulatorInfo.auth.firebaseAuthEmulatorHost;

    // The Firebase Admin SDKs automatically connect to the Cloud Firestore emulator when the FIRESTORE_EMULATOR_HOST environment variable is set.
    // https://firebase.google.com/docs/emulator-suite/connect_firestore
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

    admin.initializeApp({ projectId: 'demo-1' });
  });

  beforeEach(async () => {
    await clearUserAccounts('demo-1');
    await clearDatabase('demo-1');
  });

  afterEach(() => {
    // app.delete().catch(() => undefined);
  });

  jest.retryTimes(3);
  it('auth - CreateUser', async () => {
    const userRecord = await admin.auth().createUser({
      uid: 'uid1',
      email: 'test@test.example',
      password: 'password',
    });

    expect(userRecord.uid).toEqual('uid1');
  });

  it('firestore - Add item to collection using collection:add', async () => {
    interface Item {
      name: string;
      price: number;
    }

    const collection = admin.firestore().collection('items');
    const addedDoc = await collection.add({ name: 'item', price: 10 });

    const actualDoc = await collection.doc(addedDoc.id).get();
    const expectedDoc: Item = { name: 'item', price: 10 };

    expect(actualDoc.data()).toEqual(expectedDoc);
  });

  it('firestore - Add item to collection using doc:create', async () => {
    interface Item {
      name: string;
      price: number;
    }

    // The Firebase Admin SDKs automatically connect to the Cloud Firestore emulator when the FIRESTORE_EMULATOR_HOST environment variable is set.
    // https://firebase.google.com/docs/emulator-suite/connect_firestore
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

    const collection = admin.firestore().collection('items');
    const addedDoc = await collection
      .doc('docId1')
      .create({ name: 'item', price: 10 });

    const actualDoc = await collection.doc('docId1').get();
    const expectedDoc: Item = { name: 'item', price: 10 };

    expect(actualDoc.data()).toEqual(expectedDoc);
  });

  it('firestore - Add data to database using importDatabase', async () => {
    // #region Database
    type DocumentA = {
      doc_A_field1: string;
      doc_A_field2: number;
      __doc_A_collectionC: Collection<DocumentC>;
      __doc_A_collectionD: Collection<DocumentD>;
    };

    type Favorites = {
      food: string;
      color: string;
      subject: string;
    };

    type DocumentB = {
      doc_B_field1: string;
      doc_B_field2: number;
      favorites: Favorites;
    };

    type DocumentC = {
      doc_C_field1: string;
      doc_C_field2: number;
    };

    type DocumentD = {
      doc_D_field1: string;
      doc_D_field2: number;
    };

    type Database = {
      __collectionA: Collection<DocumentA>;
      __collectionB: Collection<DocumentB>;
    };

    const Database: Database = {
      // Collections prefixed by '__'.
      __collectionA: {
        documentA1: {
          doc_A_field1: 'field1-A1',
          doc_A_field2: 2,
          __doc_A_collectionC: {
            documentC1: {
              doc_C_field1: 'docC_field1-C1',
              doc_C_field2: 6,
            },
            documentC2: {
              doc_C_field1: 'docC_field1-C2',
              doc_C_field2: 6,
            },
          },
          __doc_A_collectionD: {
            documentD1: {
              doc_D_field1: 'docD_field1-D1',
              doc_D_field2: 6,
            },
          },
        },
        documentA2: {
          doc_A_field1: 'field1-A2',
          doc_A_field2: 2,
          __doc_A_collectionC: {},
          __doc_A_collectionD: {},
        },
        documentA3: {
          doc_A_field1: 'field1-A3',
          doc_A_field2: 2,
          __doc_A_collectionC: {},
          __doc_A_collectionD: {},
        },
      },
      __collectionB: {
        documentB1: {
          doc_B_field1: 'field1-B1',
          doc_B_field2: 2,
          favorites: {
            food: 'Pizza',
            color: 'Blue',
            subject: 'Recess',
          },
        },
      },
    };
    // #endregion

    const saveFunction: SaveFunction = async (
      documentPath: string,
      documentFields: NonNullable<Record<string, unknown>>
    ) => {
      await admin.firestore().doc(documentPath).create(documentFields);
    };

    await importDatabase(Database, saveFunction);

    const collectionB = admin.firestore().collection('collectionB');
    const doc1 = await collectionB.doc('documentB1').get();

    const expected1: DocumentB = {
      doc_B_field1: 'field1-B1',
      doc_B_field2: 2,
      favorites: {
        food: 'Pizza',
        color: 'Blue',
        subject: 'Recess',
      },
    };

    expect(doc1.data()).toEqual(expected1);

    const doc2 = await admin
      .firestore()
      .doc('/collectionA/documentA1/doc_A_collectionD/documentD1')
      .get();

    const expected2: DocumentD = {
      doc_D_field1: 'docD_field1-D1',
      doc_D_field2: 6,
    };

    expect(doc2.data()).toEqual(expected2);
  });
});
