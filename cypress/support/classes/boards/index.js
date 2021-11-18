import Utils from '../utils';
import authModule from '../../../models/authModule';
import organizationModule from '../../../models/organizationModule';
import data from '../../../fixtures/data.json';

const utils = new Utils();
class Boards {
  setupTests(options) {
    if (options && options.resetDB) {
      // cy.request('DELETE', '/api/v2/organizations');
    }

    utils.visitUrl('/');
    authModule.login({});
    cy.wait('@login');
  }

  createOrganization() {
    organizationModule.organization({ nameInput: data.nameInput });
  }

  updateOrganization() {
    organizationModule.organizationUpdate({ updateOrgName: data.updateOrgName });
  }
  deleteOrganization() {
    organizationModule.organizationDelete({ password: data.password });
  }

  createNewOrganizationFromApi(url) {
    return cy.task('fetchData', {
      url: url,
    });
  }
}

export default Boards;
