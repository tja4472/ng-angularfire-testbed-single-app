// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/support/commands.ts
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

import { firebaseConfigDev } from './firebase/firebase-config-dev';
import { FirebaseConfig } from './firebase/firebase-config-interface';
import { firebaseConfigEmulatorDemo } from './firebase/firebase-config-emulator-demo';
import { attachCustomCommands } from 'cypress-firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const cypressUseDemoProject = Cypress.env('USE_DEMO_PROJECT');
console.log('cypressUseDemoProject: ', cypressUseDemoProject);

var firebaseConfig: FirebaseConfig;

if (cypressUseDemoProject) {
  firebaseConfig = firebaseConfigEmulatorDemo;
} else {
  firebaseConfig = firebaseConfigDev;
}

console.log('apiKey:', firebaseConfig.apiKey);
firebase.initializeApp(firebaseConfig);

// const fbInstance = firebase.initializeApp(firebaseConfig);
/* ok
const fbInstance = firebase.initializeApp({ apiKey: 'AIzaSyCM95TN-IRTj0QCl2xUwNr7Q-LBzfzsT1Y',
 projectId: 'demo-1'});
*/
/*
const fbInstance = firebase.initializeApp({
  apiKey: 'demo-1-key',
  projectId: 'demo-1',
});
*/

const firestoreEmulatorHost = Cypress.env('FIRESTORE_EMULATOR_HOST');

if (firestoreEmulatorHost) {
  console.log('firestoreEmulatorHost');
  /*
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false,
    // experimentalForceLongPolling: true,
  });
*/
  firebase.firestore().useEmulator('localhost', 8080);
}

/*
if (fbInstance) {
  (window as any).fbInstance = fbInstance;
}
*/
const authEmulatorHost = Cypress.env('FIREBASE_AUTH_EMULATOR_HOST');
if (authEmulatorHost) {
  firebase.auth().useEmulator(`http://${authEmulatorHost}/`);
  console.log(`Using Auth emulator: http://${authEmulatorHost}/`);
}

attachCustomCommands({ Cypress, cy, firebase });
