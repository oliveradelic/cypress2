import userApi from '../api/user';
import organizationApi from '../api/organization';

describe('Api testing', () => {
  let userToken;
  before(() => {
    userApi.login({ testMessage: '01 - Login before other tests' }).then((token) => {
      userToken = token;
    });
  });

  let organizationId;
  it('02 - create organization', () => {
    organizationApi
      .post({ token: userToken, testMessage: '02 - Create organization' })
      .then((organizationObject) => {
        organizationId = organizationObject.id;
        console.log(organizationId);
      });
  });

  it('02 - update organization', () => {
    organizationApi
      .put({ token: userToken, orgID: organizationId, testMessage: '02 - Create organization' })
      .then((organizationObject) => {
        organizationId = organizationObject.id;
      });
  });

  it('03 - delete organization', () => {
    //console.log(organizationId.id);
    organizationApi.delete({ token: userToken, orgID: organizationId });
  });

  it('04 - get all organizations', () => {
    organizationApi.get({ token: userToken });
  });

  after(() => {
    organizationApi.get({ token: userToken }).then((allOrg) => {
      allOrg.forEach((organization) => {
        organizationApi.delete({ token: userToken, orgID: organization.id });
      });
    });
  });
});
