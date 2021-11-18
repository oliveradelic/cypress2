// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
import 'cypress-file-upload';
import 'cypress-real-events/support';

import './commands';

Cypress.Commands.add('setupAssertTests', () => {
  cy.request('DELETE', '/api/boards');
  cy.intercept('/login').as('login');
  cy.visit('/');
});

Cypress.Commands.add(
  'login',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.get('input[type="email"]').click();
    cy.get('input[type="email"]').type(username);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');
  }
);

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=logged-user]').click();
  cy.get('[data-cy=logout]').click();
});
