import SignInPage from '../page-objects/SignInPage';
import ForgotPassPage from '../page-objects/ForgotPassPage';

describe('Sign In', () => {
  it('forgotten password', () => {
    const signInPage = new SignInPage();
    const forgotPassPage = new ForgotPassPage();

    signInPage.visit();

    signInPage.gotoForgotPass();
    forgotPassPage.checkUrl();
    forgotPassPage.fillEmail('test@example.com');
    // forgotPassPage.submitForgotPass();

    // forgotPassPage.checkSentMessage();

    forgotPassPage.gotoSingIn();
    signInPage.checkUrl();
  });

  it('logs the user in', () => {
    const signInPage = new SignInPage();

    signInPage.visit();

    signInPage.fillEmail('luzma_87@yahoo.com');
    signInPage.fillPassword('234234');
    cy.get('[data-cy=navbar]')
      .should('not.exist');
    signInPage.submitLogin();
  });
});
