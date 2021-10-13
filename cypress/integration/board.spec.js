const loginPage = require('../fixtures/loginModule.json');
import data from '../fixtures/data.json';
import boardPage from '../fixtures/createBoard.json';
import sidebar from '../fixtures/sidebar.json';
import organizationPage from '../fixtures/createOrganization.json';

describe('board', () => {
  it('visit vivify scrum', () => {
    cy.visit('/', { timeout: 30000 });
  });

  it('valid login', () => {
    cy.get(loginPage.emailInput).clear().type(data.email);
    cy.get(loginPage.passwordInput).clear().type(data.password);
    cy.get(loginPage.loginButton).click();
  });

  it('create board', () => {
    cy.wait(3000);
    cy.get(organizationPage.addNewButton).click();
    cy.get(sidebar.addBoardButton).click();
    cy.get(boardPage.organizationNameInput).click();
    cy.get(boardPage.dropdownButton).click();
    cy.get(boardPage.boardTitleInput).type(data.boardTitleInput);
    cy.get(boardPage.nextButton).click();
    cy.get(boardPage.checkboxScrum).click();
    cy.get(boardPage.nextButton).click();
    cy.get(boardPage.nextButton).click();
    cy.get(boardPage.nextButton).click();
    //cy.get(boardPage.nextButton).click();
  });

  it('create columns', () => {
    cy.wait(3000);
    cy.get(boardPage.newColumn).click();
    cy.get(boardPage.columnName).type(data.columName);
    cy.get(boardPage.taskList).trigger('mouseover');
  });

  it('create task', () => {
    cy.wait(3000);
    cy.get(boardPage.taskList).click();
    cy.get(boardPage.newTask).click({ force: true });
    cy.get(boardPage.taskName).type(data.itemName);
    cy.get(boardPage.saveButton).click();
  });

  it('start sprint', () => {
    cy.get(boardPage.actionButton).click();
    cy.get(boardPage.startSprint).click();
    cy.get(boardPage.textarea).type(data.textarea);
    cy.get(boardPage.saveSprintButton).click();
  });

  it('update board', () => {
    cy.get(organizationPage.newOrganization).contains('Planet').click({ force: true });
    cy.get(boardPage.configurationButton).click();
    cy.get(boardPage.updateBoardName).clear().type(data.updateBoardName);
    cy.get(organizationPage.updateOrganizationButton).click();
  });

  it('delete board', () => {
    cy.get(organizationPage.deleteOrganizationButton).click();
    cy.get(organizationPage.confirmButtonDelete).click();
    cy.get(organizationPage.xButton).click();
  });
});
