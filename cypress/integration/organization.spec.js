import data from '../fixtures/data.json';
import authModule from '../models/authModule';
import organizationModule from '../models/organizationModule';

describe('organization', () => {
  beforeEach(() => {
    cy.intercept('/login').as('login');
    cy.visit('/');
    authModule.login({ timeout: 4000 });
  });

  it.skip('create organization', () => {
    organizationModule.organization({ nameInput: data.nameInput });
  });

  it.skip('update organization', () => {
    organizationModule.organizationUpdate({ updateOrgName: data.updateOrgName });
  });

  it('delete organization', () => {
    organizationModule.organizationDelete({ password: data.password });
  });
});
