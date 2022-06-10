module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  runner: 'groups',
  /*
    https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

    tsconfig.json
    "baseUrl": "src",    
    "paths": {
      "@app/*": ["app/*"]
    }
  */
  moduleNameMapper: {
    '^@app\/(.*)$': '<rootDir>/src/app/$1',
    '^#libs\/(.*)$': '<rootDir>/libs/$1/src/public-api.ts'
  },
  resolver: '<rootDir>/jest-resolver.js',   
  // https://github.com/thymikee/jest-preset-angular/issues/1625
/*  
  transformIgnorePatterns: [
    "node_modules/(?!@angular|@firebase|firebase|@ngrx)",
    // 'node_modules/(?!.*\\.mjs$)'
  ],
*/  
  /*  
  "+lib1":["projects/my-library1/src/public-api.ts"]
  // https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization
  transformIgnorePatterns: ['node_modules/(?!(@angular/fire|@firebase|firebase|rxfire)/)'],
*/
};
