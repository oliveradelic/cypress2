/// <reference types ="Cypress" />
import registerPage from '../fixtures/signUpModule.json';
import data from '../fixtures/data.json';
import signUpModule from '../models/signUpModule';

describe('register', () => {
  beforeEach(() => {
    cy.intercept('/sign-up').as('sign-up');
    cy.visit('/sign-up?type=yearly&plan=1&event=page-card');
  });

  it('register with password less than 5 characters', () => {
    signUpModule.register({
      email: data.email,
      password: data.passLessThan5,
      numberOfUsersInput: data.numberOfUsers,
    });
  });

  it('register when "number of users" field is string', () => {
    signUpModule.register({
      email: data.email,
      password: data.passLessThan5,
      numberOfUsersInput: data.numberOfUsersString,
    });
  });

  it('register without checkbox', () => {
    signUpModule.register({
      email: data.email,
      password: data.password,
      numberOfUsersInput: data.numberOfUsers,
    });
    cy.get(registerPage.checkbox).click({ force: true });
  });

  it('valid registration', () => {
    signUpModule.register({
      email: data.email,
      password: data.password,
      numberOfUsersInput: data.numberOfUsers,
    });
    cy.get(registerPage.checkbox).click({ force: true });
  });
});
