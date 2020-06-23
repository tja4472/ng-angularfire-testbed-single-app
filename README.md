# NgAngularfireTestbed

- [Test Security Rules](https://firebase.google.com/docs/rules/emulator-setup)
- https://firebase.google.com/docs/emulator-suite

- UKM
  - firestore.rules.spec.ts
  - transactions.service.spec.ts
- tickist-app
- angularfire
  - document.spec.ts
    - provide

## Test Security Rules using emulator

Run script `test-firestore-rules:emulator` or run scripts `emulators:start` and `test-firestore-rules`.

## Run app using emulator

Run scripts `emulators:start` and `start:emulator`.

## Run e2e tests with emulator

Use Cypress.
- https://github.com/cypress-io/cypress
- https://www.cypress.io/

## Run unit tests with emulator?

May have a requirement to run tests which require the emulator to be running. These tests should not run when the emulator is not running.

The current technique is to `x` the tests when not needed and `f` the tests when they are needed.

Or maybe switch to Jest.

## Scripts

### emulators:start

Starts emulator

### start:emulator

Starts app using the emulator configuration. Requires the emulator to be running.

### test-firestore-rules

Runs security rules tests. Requires the emulator to be running.

### test-firestore-rules:emulator

Starts emulator and runs security rules tests.

- emulators:start
  - Starts emulator
- test-firestore-rules
  - Runs security rules tests. Requires the emulator to be running.
- test-firestore-rules:emulator
  - Starts emulator and runs security rules tests.

* need to only run tests when emulator is running.

## blah

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
