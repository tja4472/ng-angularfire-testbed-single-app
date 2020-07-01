export function login() {
  cy.login(Cypress.env('TEST_UID'));
}

export function logout() {
  cy.logout();
}
