import data from '../fixtures/data.json';

module.exports = {
  get freeSignupButton() {
    return cy.get("a[onclick='goToSignUpCard('starter', 'yearly')']");
  },

  get emailInput() {
    return cy.get('input[type="email"]');
  },

  get passwordInput() {
    return cy.get("input[type='password']");
  },

  get numberOfUsersInput() {
    return cy.get("input[name='number_of_users']");
  },

  get checkbox() {
    return cy.get("input[type='checkbox']");
  },

  get signupButton() {
    return cy.get("button[type='submit']");
  },

  get loginLink() {
    return cy.get("a[href='/login']");
  },

  register({
    email = data.email,
    password = data.password,
    numberOfUsersInput = data.numberOfUsers,
  }) {
    if (email == '' || password == '' || numberOfUsersInput == '') {
      this.signupButton.click();
    } else if (password == '') {
      this.emailInput.should('be.visible').type(email);
      this.numberOfUsersInput.should('be.visible').type(numberOfUsersInput);
      this.signupButton.click();
    } else {
      cy.intercept('POST', '**api/v2/pricing-plans/1').as('register');
      this.emailInput.should('be.visible').type(email);
      this.passwordInput.should('be.visible').type(password);
      this.numberOfUsersInput.should('be.visible').type(numberOfUsersInput);
      this.signupButton.click();
    }
  },
};
