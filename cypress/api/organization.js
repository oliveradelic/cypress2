import faker from 'faker';
import colorC from '../support/consoleColor';

module.exports = {
  get({ token = '' }) {
    return cy
      .request({
        method: 'GET',
        url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data',
        headers: {
          Authorization: `Bearer${token}`,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        return response.body;
        //console.log(response);
      });
  },
  post({ orgName = faker.animal.rabbit(), token = '', statusCode = 200, testMessage = '' }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: 'POST',
        url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations',
        body: {
          name: orgName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== 'undefined' && response.status === statusCode
          ? colorC.log(`${testMessage} - Pass`, 'success')
          : colorC.log(`${testMessage} -Fail - ${JSON.stringify(response)}`, 'error');
        expect(response.status).to.eq(statusCode);
        return response.body;
      });
  },
  delete({ orgID = '', token = '', statusCode = 201, testMessage = '', password = 'test12345' }) {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgID}`,
      body: {
        passwordOrEmail: password,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      typeof response.status !== 'undefined' && response.status === statusCode
        ? colorC.log(`${testMessage} - Pass`, 'success')
        : colorC.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, 'error');
      console.log(response);
      //expect(response.status).to.eql(statusCode);

      return response.body;
    });
  },
  put({
    orgID = '',
    orgName = faker.animal.rabbit(),
    token = '',
    statusCode = 200,
    testMessage = '',
    password = 'test12345',
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: 'PUT',
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgID}`,
        body: {
          passwordOrEmail: password,
          name: orgName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== 'undefined' && response.status === statusCode
          ? colorC.log(`${testMessage} - Pass`, 'success')
          : colorC.log(`${testMessage} -Fail - ${JSON.stringify(response)}`, 'error');
        expect(response.status).to.eq(statusCode);
        return response.body;
      });
  },
};
