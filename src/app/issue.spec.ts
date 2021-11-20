/**
 * @jest-environment jsdom
 */

// Based on https://github.com/angular/angularfire/blob/master/src/firestore/firestore.spec.ts
// import 'zone.js/testing';

/*
  Upgrade to 9.2.0 gives error in jest unit tests
  https://github.com/firebase/firebase-js-sdk/issues/5687
*/

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import {
  FirebaseApp,
  provideFirebaseApp,
  getApp,
  initializeApp,
  deleteApp,
} from '@angular/fire/app';

import {
  Firestore,
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';

const randomString = () => (Math.random() + 1).toString(36).split('.')[1];

const rando = () => [randomString(), randomString(), randomString()].join('');

const COMMON_CONFIG = {
  apiKey: 'AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA',
  authDomain: 'angularfire2-test.firebaseapp.com',
  databaseURL: 'https://angularfire2-test.firebaseio.com',
  projectId: 'demo-1',
  storageBucket: 'angularfire2-test.appspot.com',
  messagingSenderId: '920323787688',
  appId: '1:920323787688:web:2253a0e5eb5b9a8b',
  databaseName: 'angularfire2-test',
  measurementId: 'G-W20QDV5CZP',
};

describe('Firestore', () => {
  let app: FirebaseApp;
  let firestore: Firestore;
  let providedFirestore: Firestore;
  let appName: string;

  describe('single injection', () => {
    /*    
    beforeAll(() => {
      TestBed.resetTestEnvironment();
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    });
*/
    beforeEach(() => {
      appName = rando();
      TestBed.configureTestingModule({
        imports: [
          provideFirebaseApp(() => initializeApp(COMMON_CONFIG, appName)),
          provideFirestore(() => {
            providedFirestore = getFirestore(getApp(appName));
            connectFirestoreEmulator(providedFirestore, 'localhost', 8080);
            return providedFirestore;
          }),
        ],
      });
      app = TestBed.inject(FirebaseApp);
      firestore = TestBed.inject(Firestore);
    });

    afterEach(() => {
      deleteApp(app).catch(() => undefined);
    });

    it('should be injectable', () => {
      expect(providedFirestore).toBeTruthy();
      expect(firestore).toEqual(providedFirestore);
      expect(firestore.app).toEqual(app);
    });
  });
});
