import UserPaymentPage from '../page-objects/UserPaymentPage';
import SignInPage from '../page-objects/SignInPage';

describe('As an admin', () => {
  it('has all the menus', () => {
    const signInPage = new SignInPage();
    const userPaymentPage = new UserPaymentPage();
    signInPage.visit();
    signInPage.fillEmail('lmunda@thoughtworks.com');
    signInPage.fillPassword('123123');
    cy.get('[data-cy=navbar]')
      .should('not.exist');
    signInPage.submitLogin();

    userPaymentPage.checkUrl();
    cy.get('[data-cy=navbar]')
      .should('exist');

    const buttons = ['my-payments', 'people', 'places', 'assignments',
      'email', 'owner-payments', 'user-payments', 'params', 'my-account', 'logout'];

    buttons.forEach((buttonName) => {
      cy.get(`[data-cy=${buttonName}-nav-button]`)
        .should('exist');
    });
  });
});
