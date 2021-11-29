import { getGreeting, getHello, navigateTo } from '../support/po';
import { login, logout } from '../support/utils';

describe('test', () => {
  before(() => {
    // Runs once before the first test in this block
    login();
  });

  beforeEach(() => {
    // Runs before every test block
    // Remove items collection.
    const opts = { recursive: true };
    cy.callFirestore('delete', 'items', opts);
    //
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
  beforeEach(() => {
    // Runs before every test block
    // Remove items collection.
    const opts = { recursive: true };
    cy.callFirestore('delete', 'items', opts);
  });

  it('test ', () => {
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
    cy.getBySel('list').children().should('have.length', 0);    
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
