import Boards from '../support/classes/boards';
import data from '../fixtures/data.json';

const boards = new Boards();
describe('Plugins', () => {
  beforeEach(() => {
    boards.setupTests({
      resetDB: true,
    });
  });

  it('Can fetch data from backend and create a new organization', () => {
    boards.createOrganization();
    boards.updateOrganization({ updateOrgName: data.updateOrgName });
    boards.deleteOrganization({ password: data.password });
  });

  it(
    'smoke test staging api',
    {
      env: {
        api: 'https://cypress.vivifyscrum-stage.com',
      },
    },
    () => {
      cy.request(Cypress.env('api')).its('status').should('eq', 200);
    }
  );

  it(
    'smoke test qa api',
    {
      env: {
        api: ' https://stage.vivifyscrum.com/',
      },
    },
    () => {
      cy.request(Cypress.env('api')).its('status').should('eq', 200);
    }
  );
  function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('..', 'config', `${file}.json`);

    return fs.readJson(pathToConfigFile);
  }
});
