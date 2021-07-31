import { getGreeting, getHello, navigateTo } from '../support/po';
import { login, logout } from '../support/utils';

describe('test', () => {
  before(() => {
    // runs once before the first test in this block
    login();
    // cy.wait(1000);
    // createFirebase();
    cy.callFirestore('add', 'items', { name: 'XXXX' });
  });

  after(() => {
    // runs once after the last test in this block
    logout();
    // removeOldFirebaseData();
  });

  // beforeEach(navigateTo);

  it('use page object - should display hello message', () => {
    cy.visit('/');
    getHello().contains('Hello');
  });

  it('should display welcome message', () => {
    cy.visit('/');
    cy.getBySel('hello-text').should('contain', 'Hello');
    cy.getBySel('start-listening-button').click();
    // cy.getBySel('list-item', { timeout: 10000 }).should('contain', 'XXXX');
    cy.getBySel('list-item', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'XXXX');
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
    // cy.getBySel('hello-text').should('not.be.visible');
    cy.getBySel('sign-in-text')
      .should('be.visible')
      .and('contain', 'Please sign in');
    login();
    // getHello().contains('Hello xY');
    cy.getBySel('hello-text').should('contain', 'Hello UID-1');
    cy.contains('Start listening to Firestore').click();
    cy.callFirestore('add', 'items', { name: 'XXXX' });
    cy.getBySel('list-item', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'XXXX');
    // cy.contains('XXXX');
    // cy.get('ul').children().should('have.length', 1);
    cy.getBySel('list').children().should('have.length', 1);
    // cy.get('add item').click();
    // cy.get(':nth-child(6) > button')
    cy.contains('Add Item').click();
    cy.contains('Add Item Set').click();
    cy.get('ul').children().should('have.length', 3);
    logout();
    cy.contains('Please sign in');
  });
});
