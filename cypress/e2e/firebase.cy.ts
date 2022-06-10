// https://github.com/orthodoc/binder/blob/dev/cypress/integration/login.spec.ts
// tickist-app
describe('Some Test', () => {
  it('Adds document to test_hello_world collection of Firestore', () => {
    cy.callFirestore('add', 'test_hello_world', { some: 'value' });
  });
});
