export function login() {
  // cy.login(Cypress.env('TEST_UID'));
  cy.login('UID-1');  
}

export function logout() {
  cy.logout();
}
