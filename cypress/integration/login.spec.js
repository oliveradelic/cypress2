/// <reference types ="Cypress" />
import data from '../fixtures/data.json';
import authModule from '../models/authModule';
import faker from 'faker';

describe('login', () => {
  let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  beforeEach(() => {
    cy.intercept('/login').as('login');
    cy.visit('/');
  });

  it('login with invalid credentials', () => {
    authModule.login({ email: user.email, password: data.invalidPassword });
  });

  it('login with invalid email', () => {
    authModule.login({ email: user.email });
  });

  it('email without @', () => {
    authModule.login({ email: user.email });
  });

  it('email without .com', () => {
    authModule.login({ email: data.withoutDotcom });
  });

  it('login with invalid password', () => {
    authModule.login({ email: data.email, password: data.password });
  });

  it('valid login', () => {
    authModule.login({ timeout: 3000 });
  });

  after(() => {
    authModule.logout();
  });
});
