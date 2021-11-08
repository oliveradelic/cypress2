/// <reference types ="Cypress" />
import data from '../fixtures/data.json';
import authModule from '../models/authModule';

describe('login', () => {
  beforeEach(() => {
    cy.intercept('/login').as('login');
    cy.visit('/');
  });

  it('login with invalid credentials', () => {
    authModule.login({ email: data.invalidEmail, password: data.invalidPassword });
  });

  it('login with invalid email', () => {
    authModule.login({ email: data.invalidEmail });
  });

  it('email without @', () => {
    authModule.login({ email: data.withoutEt });
  });

  it('email without .com', () => {
    authModule.login({ email: data.withoutDotcom });
  });

  it('login with invalid password', () => {
    authModule.login({ email: data.email, password: data.password });
  });

  it('valid login', () => {
    authModule.login({});
    cy.wait('@login');
  });

  after(() => {
    authModule.logout({});
  });
});
