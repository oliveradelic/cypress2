/// <reference types ="Cypress" />
const registerPage = require('../fixtures/signUpModule.json');
import data from '../fixtures/data.json';

describe('register', () => {
  it('visit vivify scrum', () => {
    cy.visit('/sign-up?type=yearly&plan=1&event=page-card');
  });

  it('register without number of users', () => {
    cy.get(registerPage.emailInput).clear().type(data.email);
    cy.get(registerPage.passwordInput).clear().type(data.password);
    cy.get(registerPage.signupButton).click();
  });

  it('register without email', () => {
    cy.get(registerPage.passwordInput).clear().type(data.password);
    cy.get(registerPage.numberOfUsersInput).clear().type(data.numberOfUsers);
    cy.get(registerPage.signupButton).click();
  });

  it('register without password', () => {
    cy.get(registerPage.emailInput).clear().type(data.email);
    cy.get(registerPage.numberOfUsersInput).clear().type(data.numberOfUsers);
    cy.get(registerPage.signupButton).click();
  });

  it('register with password less than 5 characters', () => {
    cy.get(registerPage.emailInput).clear().type(data.email);
    cy.get(registerPage.passwordInput).clear().type(data.passLessThan5);
    cy.get(registerPage.numberOfUsersInput).clear().type(data.numberOfUsers);
    cy.get(registerPage.signupButton).click();
  });

  it('register when "number of users" field is string', () => {
    cy.get(registerPage.emailInput).clear().type(data.email);
    cy.get(registerPage.passwordInput).clear().type(data.passLessThan5);
    cy.get(registerPage.numberOfUsersInput).clear().type(data.numberOfUsersString);
    cy.get(registerPage.signupButton).click();
  });

  it('register without checkbox', () => {
    cy.get(registerPage.emailInput).clear().type(data.email);
    cy.get(registerPage.passwordInput).clear().type(data.password);
    cy.get(registerPage.numberOfUsersInput).clear().type(data.numberOfUsers);
    cy.get(registerPage.checkbox).click({ force: true });
    cy.get(registerPage.signupButton).click();
  });

  it('valid registration', () => {
    cy.get(registerPage.emailInput).clear().type(data.email);
    cy.get(registerPage.passwordInput).clear().type(data.password);
    cy.get(registerPage.numberOfUsersInput).clear().type(data.numberOfUsers);
    cy.get(registerPage.checkbox).click({ force: true });
    cy.get(registerPage.signupButton).click();
  });
});
