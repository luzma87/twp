/* eslint-disable class-methods-use-this */

const URL = '/pw-forget';
const EMAIL_FIELD = '[data-cy=email]';
const SIGN_IN_BUTTON = '[data-cy=sign-in-button]';
const FORGOT_PASS_SUBMIT = '[data-cy=send-forgot-pass-button]';
const SENT_MAIL_MESSAGE = '[data-cy=forgot-pass-msg]';

class ForgotPassPage {
  fillEmail(email) {
    cy.get(EMAIL_FIELD).type(email);
    return this;
  }

  checkUrl() {
    cy.url()
      .should('include', URL);
  }

  gotoSingIn() {
    cy.get(SIGN_IN_BUTTON).click();
  }

  submitForgotPass() {
    cy.get(FORGOT_PASS_SUBMIT).click();
  }

  checkSentMessage() {
    cy.get(SENT_MAIL_MESSAGE)
      .should('contain', 'Email con recuperación de password enviado');
  }
}

export default ForgotPassPage;
