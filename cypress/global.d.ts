// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.getBySel('hello-text')
     * <h1 data-test="hello-text">Hello {{ user.uid }}!</h1>
     */
    getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;
    getBySelLike(
      dataTestPrefixAttribute: string,
      args?: any
    ): Chainable<Element>;
  }
}
