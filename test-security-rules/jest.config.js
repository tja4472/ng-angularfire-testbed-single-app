module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/**/**.tsr-test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  // FIRESTORE (7.14.3) INTERNAL ASSERTION FAILED: value must be undefined or Uint8Array
  // https://github.com/firebase/firebase-js-sdk/issues/3096
  // ArrayBuffer regression in node env
  // https://github.com/facebook/jest/issues/7780#issuecomment-645989788
  testEnvironment: 'node',
};
