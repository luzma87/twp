/* eslint-disable class-methods-use-this */

const URL = '/';

class HomePage {
  visit() {
    cy.visit(URL);
  }
}

export default HomePage;
