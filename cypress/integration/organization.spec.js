import loginPage from '../fixtures/loginModule.json';
import data from '../fixtures/data.json';
import organizationPage from '../fixtures/createOrganization.json';
import sidebar from '../fixtures/sidebar.json';

describe('organization', () => {
  it('visit vivify scrum', () => {
    cy.visit('/', { timeout: 30000 });
  });

  it('valid login', () => {
    cy.get(loginPage.emailInput).clear().type(data.email);
    cy.get(loginPage.passwordInput).clear().type(data.password);
    cy.get(loginPage.loginButton).click();
  });

  it('create organization', () => {
    cy.wait(3000);
    cy.get(organizationPage.addNewButton).click();
    cy.get(sidebar.addOrganizationButton).click({ force: true });
    cy.get(organizationPage.nameInput).type(data.nameOrg);
    cy.get(organizationPage.nextButton).click();
    cy.get(organizationPage.createButton).click();
  });

  it('update organization', () => {
    cy.get(organizationPage.xButton).click();
    cy.get(organizationPage.newOrganization).contains('M').click({ force: true });
    cy.get(organizationPage.configurationButton).click();
    cy.get(organizationPage.updateOrgName).clear().type(data.updateOrgName);
    cy.get(organizationPage.updateOrganizationButton).click();
  });

  it('delete organization', () => {
    cy.get(organizationPage.deleteOrganizationButton).click();
    cy.get(organizationPage.confirmPasswordDelete).type(data.password);
    cy.get(organizationPage.confirmButtonDelete).click();
  });
});
