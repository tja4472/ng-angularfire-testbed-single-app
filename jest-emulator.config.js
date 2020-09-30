module.exports = {
  testMatch: ['<rootDir>/src/**/**.emul.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
  },
};
