/// <reference types ="Cypress" />
import loginPage from '../fixtures/loginModule.json';
import data from '../fixtures/data.json';

describe('login', () => {
  it('visit vivify scrum', () => {
    cy.visit('/', { timeout: 30000 });
  });

  it('login without password', () => {
    cy.get(loginPage.emailInput).clear().type(data.email);
    cy.get(loginPage.loginButton).click();
  });

  it('login with invalid credentials', () => {
    cy.get(loginPage.emailInput).clear().type(data.invalidEmail);
    cy.get(loginPage.passwordInput).clear().type(data.invalidPassword);
    cy.get(loginPage.loginButton).click();
  });

  it('login with invalid email', () => {
    cy.get(loginPage.emailInput).clear().type(data.invalidEmail);
    cy.get(loginPage.loginButton).click();
  });

  it('email without @', () => {
    cy.get(loginPage.emailInput).clear().type(data.withoutEt);
    cy.get(loginPage.loginButton).click();
  });

  it('email without .com', () => {
    cy.get(loginPage.emailInput).clear().type(data.withoutDotcom);
    cy.get(loginPage.loginButton).click();
  });

  it('login with invalid password', () => {
    cy.get(loginPage.emailInput).clear().type(data.email);
    cy.get(loginPage.passwordInput).clear().type(data.invalidPassword);
    cy.get(loginPage.loginButton).click();
  });

  it('valid login', () => {
    cy.get(loginPage.emailInput).clear().type(data.email);
    cy.get(loginPage.passwordInput).clear().type(data.password);
    cy.get(loginPage.loginButton).click();
  });

  it('logout', () => {
    cy.get(loginPage.userProfile, { timeout: 400000 }).click();
    cy.get(loginPage.profile).click();
    cy.get(loginPage.logOutButton).click();
  });
});
