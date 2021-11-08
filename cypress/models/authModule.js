import data from '../fixtures/data.json';

module.exports = {
  get forgotPasswordButton() {
    return cy.get('.vs-c-auth-modal__body-text.vs-c-auth-modal__body-text--small');
  },

  get emailInput() {
    return cy.get('input[type="email"]');
  },

  get passwordInput() {
    return cy.get('input[type="password"]');
  },

  get loginButton() {
    return cy.get('button[type="submit"]');
  },

  get userProfile() {
    return cy.get('.vs-l-sidebar__user > a  img');
  },

  get profile() {
    return cy.get("a[href='/account/settings']");
  },

  get logOutButton() {
    return cy.get('.vs-c-btn.vs-c-btn--danger.vs-c-btn--link');
  },

  login({ email = data.email, password = data.password }) {
    if (password == '') {
      this.emailInput.should('be.visible').type(email);
      this.submitButton.click();
    } else {
      cy.intercept('POST', '**/api/v2/login').as('login');
      this.emailInput.should('be.visible').type(email);
      this.passwordInput.should('be.visible').type(password);
      this.loginButton.click();
    }
  },

  logout() {
    cy.intercept('POST', '**/api/v2/logout').as('logout');
    this.userProfile.should('be.visible').click({ force: true });
    this.profile.should('be.visible').click({ force: true });
    this.logOutButton.should('be.visible').click({ force: true });
    cy.wait('@logout').then((intercept) => {
      expect(intercept.response.statusCode).to.eql(201);
    });
  },
};
