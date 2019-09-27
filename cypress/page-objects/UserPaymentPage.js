/* eslint-disable class-methods-use-this */

const URL = '/';

class UserPaymentPage {
  visit() {
    cy.visit(URL);
  }

  checkUrl() {
    cy.url()
      .should('include', URL);
  }
}

export default UserPaymentPage;
