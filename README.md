# TODO

- Get ng test working with app.

# NgAngularfireTestbed

- [Test Security Rules](https://firebase.google.com/docs/rules/emulator-setup)
- https://firebase.google.com/docs/emulator-suite

# Test security rules using emulator

Run scripts

- `emulators:start`
- `test - test-security-rules`

# Run app using emulator

Run scripts

- `emulators:start`
- `start:emulator`

# Run Cypress tests with emulator

Run scripts

- `emulators:start`
- `start:emulator`
- `cy:emulate`

## Run unit tests with emulator?

May have a requirement to run tests which require the emulator to be running. These tests should not run when the emulator is not running.

The current technique is to `x` the tests when not needed and `f` the tests when they are needed.

Or maybe switch to Jest.

## Scripts

### cy:emulate

Opens Cypress after setting environment variable.

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

Use Cypress.

# References

- https://github.com/angular/angularfire
- Cypress

  - https://github.com/cypress-io/cypress
  - https://www.cypress.io/
  - https://github.com/cypress-io/cypress-realworld-app
  - https://github.com/prescottprue/cypress-firebase

- https://github.com/firebase/firebase-tools

- UKM
  - firestore.rules.spec.ts
  - transactions.service.spec.ts
- tickist-app
- angularfire

  - document.spec.ts

    - provide

# Release Notes

- [@angular-builders/jest](https://github.com/just-jeb/angular-builders/blob/master/packages/jest/CHANGELOG.md)
- [@firebase/testing](https://github.com/firebase/firebase-js-sdk/blob/master/packages/testing/CHANGELOG.md)
- [firebase](https://firebase.google.com/support/release-notes/js)
- [firebase-tools](https://github.com/firebase/firebase-tools/releases)
- [cypress](https://github.com/cypress-io/cypress/releases)
- [cypress-firebase](https://github.com/prescottprue/cypress-firebase/releases)
- [Typescript](https://github.com/microsoft/TypeScript/releases)

# Testing Security Rules with Jest

- Open the `test-security-rules` folder in another instance of vscode. This will allow the use of the `vscode-jest` extension for working with the tests.
- Initially Jest will be stopped. `View > Command Pallete > Jest: Start Ruuner` will start Jest.
- The emulator needs to be running for the the tests to pass: `emulators:start`

# Notes

After upgrade Angular to v8: Can't resolve all parameters for Component: (?)

https://github.com/thymikee/jest-preset-angular/issues/288

# aaa

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
