/* eslint-disable class-methods-use-this */

const URL = '/signin';
const EMAIL_FIELD = '[data-cy=email]';
const PASSWORD_FIELD = '[data-cy=password]';
const LOGIN_BUTTON = '[data-cy=login-button]';
const PASS_FORGOT_BUTTON = '[data-cy=forgot-pass-button]';

class SignInPage {
  visit() {
    cy.visit(URL);
  }

  checkUrl() {
    cy.url()
      .should('include', URL);
  }

  fillEmail(email) {
    cy.get(EMAIL_FIELD).type(email);
    return this;
  }

  fillPassword(password) {
    cy.get(PASSWORD_FIELD).type(password);
    return this;
  }

  submitLogin() {
    cy.get(LOGIN_BUTTON).click();
  }

  gotoForgotPass() {
    cy.get(PASS_FORGOT_BUTTON).click();
  }
}

export default SignInPage;
