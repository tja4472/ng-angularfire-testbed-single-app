import * as firebase from '@firebase/testing';
import * as fs from 'fs';

const projectId = 'emulators-codelab-a5a89';
const rules = fs.readFileSync('firestore.test.rules', 'utf8');
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const myId = 'user_abc';
const theirId = 'user_xyz';
const myAuth = { uid: myId, email: 'abc@gamil.com' };

function getFirestore(auth: any) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

// initializeAdminApp ignores rules
function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId }).firestore();
}

describe('test security rules', () => {
  beforeAll(async () => {
    // Load the content of the "firestore.rules" file into the emulator before running the
    // test suite. This is necessary because we are using a fake Project ID in the tests,
    // so the rules "hot reloading" behavior which works in the Web App does not apply here.
    await firebase.loadFirestoreRules({ projectId, rules });
  });

  beforeEach(async () => {
    // Clear the database between tests
    await firebase.clearFirestoreData({ projectId });
  });
  /* ??
  afterEach(async () => {
    // Clear the database between tests
    await firebase.clearFirestoreData({ projectId });
  });
*/
  afterAll(async () => {
    // await Promise.all(firebase.apps().map((app) => app.delete()));
    // await firebase.clearFirestoreData({ projectId });
    console.log(`View rule coverage information at ${coverageUrl}\n`);
  });

  it('should create the app', () => {
    expect(true).toBeTruthy();
  });

  it('require users to log in before creating a profile', async () => {
    // firebase.initializeTestApp({ projectId, auth: { uid: "alice", email: "alice@example.com" }});
    const db = getFirestore(null);
    const profile = db.collection('users').doc('alice');
    await firebase.assertFails(profile.set({ birthday: 'January 1' }));
  });

  it('should enforce the createdAt date in user profiles', async () => {
    const db = getFirestore({ uid: 'alice' });
    const profile = db.collection('users').doc('alice');
    await firebase.assertFails(profile.set({ birthday: 'January 1' }));
    await firebase.assertSucceeds(
      profile.set({
        birthday: 'January 1',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it('should only let users create their own profile', async () => {
    const db = getFirestore({ uid: 'alice' });
    await firebase.assertSucceeds(
      db.collection('users').doc('alice').set({
        birthday: 'January 1',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
    await firebase.assertFails(
      db.collection('users').doc('bob').set({
        birthday: 'January 1',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it('should let anyone read any profile', async () => {
    const db = getFirestore(null);
    const profile = db.collection('users').doc('alice');
    await firebase.assertSucceeds(profile.get());
  });

  it('should let anyone create a room', async () => {
    const db = getFirestore({ uid: 'alice' });
    const room = db.collection('rooms').doc('firebase');
    await firebase.assertSucceeds(
      room.set({
        owner: 'alice',
        topic: 'All Things Firebase',
      })
    );
  });

  it('should force people to name themselves as room owner when creating a room', async () => {
    const db = getFirestore({ uid: 'alice' });
    const room = db.collection('rooms').doc('firebase');
    await firebase.assertFails(
      room.set({
        owner: 'scott',
        topic: 'Firebase Rocks!',
      })
    );
  });

  it('should not let one user steal a room from another user', async () => {
    const alice = getFirestore({ uid: 'alice' });
    const bob = getFirestore({ uid: 'bob' });

    await firebase.assertSucceeds(
      bob.collection('rooms').doc('snow').set({
        owner: 'bob',
        topic: 'All Things Snowboarding',
      })
    );

    await firebase.assertFails(
      alice.collection('rooms').doc('snow').set({
        owner: 'alice',
        topic: 'skiing > snowboarding',
      })
    );
  });
});

// https://firebaseonair.withgoogle.com/events/firebase-live20/watch?talk=security-rules-with-emulator-suite
describe('Unit testing security rules with the new Firebase emulator suite.', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({ projectId, rules });
  });

  beforeEach(async () => {
    // Clear the database between tests
    await firebase.clearFirestoreData({ projectId });
  });

  // =============================
  it('Can read a single public post', async () => {
    const admin = getAdminFirestore();
    const postId = 'public_post';
    const setupDoc = admin.collection('aposts').doc(postId);
    await setupDoc.set({ authorId: theirId, visibility: 'public' });

    const db = getFirestore(null);
    const testRead = db.collection('aposts').doc(postId);
    await firebase.assertSucceeds(testRead.get());
  });

  it('Can read a private post belonging to the user', async () => {
    const admin = getAdminFirestore();
    const postId = 'private_post';
    const setupDoc = admin.collection('aposts').doc(postId);
    await setupDoc.set({ authorId: myId, visibility: 'private' });

    const db = getFirestore(myAuth);
    const testRead = db.collection('aposts').doc(postId);
    await firebase.assertSucceeds(testRead.get());
  });

  it(`Can't read a private post belonging to another user`, async () => {
    const admin = getAdminFirestore();
    const postId = 'private_post';
    const setupDoc = admin.collection('aposts').doc(postId);
    await setupDoc.set({ authorId: theirId, visibility: 'private' });

    const db = getFirestore(myAuth);
    const testRead = db.collection('aposts').doc(postId);
    await firebase.assertFails(testRead.get());
  });
});

/*
  it('require users to log in before creating a profile', async () => {
  });
*/
// https://github.com/firebase/quickstart-nodejs/blob/master/firestore-emulator/typescript-quickstart/test/test.ts
// https://firebase.google.com/docs/firestore/security/insecure-rules?authuser=0
