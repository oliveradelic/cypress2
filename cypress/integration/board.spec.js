import loginPage from '../fixtures/loginModule.json';
import data from '../fixtures/data.json';
import boardPage from '../fixtures/createBoard.json';
import sidebar from '../fixtures/sidebar.json';
import organizationPage from '../fixtures/createOrganization.json';

describe('board', () => {
  beforeEach(() => {
    cy.intercept('/login').as('login');
    cy.visit('/');
    cy.get(loginPage.emailInput).clear().type(Cypress.env('username'));
    cy.get(loginPage.passwordInput).clear().type(Cypress.env('password'));
    cy.get(loginPage.loginButton).click();
    cy.wait(4000);
    cy.get(boardPage.userProfile).should('be.visible');
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

    //assertions
    cy.get(boardPage.icon).should('be.visible');
    cy.get(boardPage.avatar).should('be.visible');
    cy.get(boardPage.columnHead).eq(0).should('have.text', ' Backlog 1 Items | 0 Points     ');
    cy.get(boardPage.columnHead).eq(1).should('have.text', ' Sprint 1 0 Items | 0 Points     ');
  });

  it('create columns', () => {
    cy.get(boardPage.newColumn).click({ force: true });
    cy.get(boardPage.columnBody).click();
    cy.get(boardPage.columnName).type(data.columName);
    cy.get(boardPage.taskList).trigger('mouseover').click();

    //assertions
    cy.get(boardPage.columns).children().should('have.length', 4);
    cy.get(boardPage.columnHead).eq(2).should('have.text', ' Bugs 0 Items | 0 Points     ');
    cy.get(boardPage.btnLink).should('be.visible');
  });

  it('create task', () => {
    cy.wait(3000);
    cy.get(boardPage.newColumn).click({ force: true });
    cy.get(boardPage.newTask).click({ force: true });
    cy.get(boardPage.taskName).type(data.itemName);
    cy.get(boardPage.saveButton).click();
    cy.get(boardPage.textarea).type(data.itemName);
    cy.get(boardPage.saveButton).click();
    cy.get(boardPage.textarea).type(data.itemName);
    cy.get(boardPage.saveButton).click();

    //assertions
    cy.get(boardPage.taskTitle).eq(1).should('have.text', 'Big issue');
    cy.get(boardPage.taskTitle).should('have.length', 4);
    cy.get('li:nth-of-type(1) > span > div > .vs-c-site-logo').should(
      'have.css',
      'background-color',
      'rgb(254, 87, 35)'
    );
  });

  it('start sprint', () => {
    cy.get(boardPage.newColumn).click({ force: true });
    cy.get(boardPage.actionButton).click();
    cy.get(boardPage.startSprint).click();
    cy.get(boardPage.textarea).type(data.textarea);
    cy.get(boardPage.saveSprintButton).click();

    //assertions
    cy.get(boardPage.sprintLogo).should('have.css', 'background-color', 'rgb(254, 87, 35)');
    cy.get(boardPage.sprintLabel).should('be.visible');
    cy.get(boardPage.sprintTitle)
      .should('be.visible')
      .and('have.text', ' \n          Bug Fixes\n         ');
  });

  it('update board', () => {
    cy.get(boardPage.newColumn).click({ force: true });
    cy.get(organizationPage.newOrganization).contains('Planet').click({ force: true });
    cy.get(boardPage.configurationButton).click();
    cy.get(boardPage.updateBoardName).clear().type(data.updateBoardName);
    cy.get(organizationPage.updateOrganizationButton).click();

    //assertions
    cy.get(boardPage.popUpUpdate).should('be.visible');
    cy.get(boardPage.newColumn).should('have.text', 'Planet2');
  });

  it('delete board', () => {
    cy.get(boardPage.newColumn).click({ force: true });
    cy.get(boardPage.configurationButton).click();
    cy.get(organizationPage.deleteOrganizationButton).click();
    cy.get(organizationPage.confirmButtonDelete).click();
    cy.get(organizationPage.xButton).click();

    //assertions
    cy.get(boardPage.newColumn).should('not.exist');
    cy.get(boardPage.headerDelete).should('have.text', 'Boards');
    cy.get(boardPage.newBoardItem).should('be.visible');
    cy.get(boardPage.addNewBoardButton).should('be.visible');
    cy.get(boardPage.routerLink).should('have.css', 'background-color', 'rgb(254, 87, 35)');
  });
});
