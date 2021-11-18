import data from '../fixtures/data.json';
import loginModule from '../fixtures/loginModule.json';

module.exports = {
  get addNewButton() {
    return cy.get('.el-tooltip.vs-c-list-btn--new-workspace.vs-c-list__btn');
  },

  get addOrganizationButton() {
    return cy.get('.vs-c-list > :nth-child(1) > a');
  },

  get nameInput() {
    return cy.get("input[name='name']");
  },

  get cancelButton() {
    return cy.get("button[name='prev_btn']");
  },

  get nextButton() {
    return cy.get("button[name='next_btn']");
  },

  get closeButton() {
    return cy.get("button[name='close-new-board-modal-btn']");
  },

  get createButton() {
    return cy.get("button[name='next_btn']");
  },
  get uploadLogoButton() {
    return cy.get("svg[slot='dropdown-button']");
  },
  get deleteLogo() {
    return cy.get(
      "div:nth-of-type(21) > .el-dialog__wrapper.vs-c-modal__flex-center > div vs-c-modal__footer  button[name='delete-btn']"
    );
  },
  get cancelLogo() {
    return cy.get(
      "div:nth-of-type(21) > .el-dialog__wrapper.vs-c-modal__flex-center > div .vs-c-modal__footer  button[name='cancel-btn']"
    );
  },
  get saveLogo() {
    return cy.get(
      "div:nth-of-type(21) > .el-dialog__wrapper.vs-c-modal__flex-center > div .vs-c-modal__footer  button[name='save-btn']"
    );
  },
  get newOrganization() {
    return cy.get(
      ':nth-child(2) > :nth-child(1) > :nth-child(1) > [effect="dark"] > .vs-c-list__btn > .vs-c-list__oragnisation-item > :nth-child(2)'
    );
  },
  get xButton() {
    return cy.get('.vs-c-modal__body > .el-button > .el-icon-close');
  },
  get configurationButton() {
    return cy.get(":nth-child(8) > [effect='dark'] > :nth-child(2) > .vs-c-site-logo");
  },
  get updateOrgName() {
    return cy.get("input[name='name']");
  },
  get updateOrganizationButton() {
    return cy.get(
      '.vs-c-material-input.vs-c-settings-section-form > .el-form .vs-c-btn.vs-c-btn--primary.vs-c-btn--spaced.vs-c-btn-auth--top-gap.vs-u-font-weight-bold'
    );
  },
  get archiveOrganizationButton() {
    return cy.get("input[name='name']");
  },
  get deleteOrganizationButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']");
  },
  get password() {
    return cy.get("input[type='password']");
  },
  get confirmButtonDelete() {
    return cy.get("button[class='el-button el-button--success el-button']");
  },

  organization({ nameInput = data.nameOrg }) {
    cy.intercept('POST', '**/api/v2/organizations').as('organization');
    this.addNewButton.click();
    this.addOrganizationButton.click();
    this.nameInput.should('be.visible').type(nameInput);
    this.nextButton.click();
    this.createButton.click();
    //this.xButton.click();
  },
  organizationUpdate({ updateOrgName = data.updateOrgName }) {
    cy.intercept('POST', '**/api/v2/organizations').as('organization');
    this.newOrganization.click({ force: true });
    this.xButton.click();
    this.configurationButton.click();
    this.updateOrgName.should('be.visible').type(updateOrgName);
    this.updateOrganizationButton.click();
  },
  organizationDelete({ password = data.password }) {
    cy.intercept('POST', '**/api/v2/organizations').as('organization');
    //this.newOrganization.click({ force: true });
    //this.xButton.click();
    this.configurationButton.click({ force: true });
    this.deleteOrganizationButton.click();
    this.password.should('be.visible').type(password);
    this.confirmButtonDelete.click();
  },
};
