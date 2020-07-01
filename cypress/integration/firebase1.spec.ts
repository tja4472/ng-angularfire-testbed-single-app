import { getGreeting, getHello, navigateTo } from '../support/po';
import { login, logout } from '../support/utils';

describe('test', () => {
  before(() => {
    login();
    // cy.wait(1000);
    // createFirebase();
    cy.callFirestore('add', 'items', { name: 'XXXX' });
  });

  after(() => {
    logout();
    // removeOldFirebaseData();
  });

  // beforeEach(navigateTo);

  it('should display welcome message', () => {
    cy.visit('/');
    getHello().contains('Hello');
    cy.contains('XXXX');
    // cy.get('add item').click();
    // cy.get(':nth-child(6) > button')
    cy.contains('Add Item').click();
    cy.contains('Add Item Set').click();
  });
});

describe('login and logout', () => {
  it('test ', () => {
    const opts = { recursive: true };
    cy.callFirestore('delete', 'items', opts);
    cy.visit('/');
    getGreeting().contains('Welcome to');
    cy.contains('Please sign in');
    login();
    getHello().contains('Hello xY');
    cy.callFirestore('add', 'items', { name: 'XXXX' });
    cy.contains('XXXX');
    cy.get('ul').children().should('have.length', 1);
    // cy.get('add item').click();
    // cy.get(':nth-child(6) > button')
    cy.contains('Add Item').click();
    cy.contains('Add Item Set').click();
    cy.get('ul').children().should('have.length', 3);
    logout();
    cy.contains('Please sign in');
  });
});
