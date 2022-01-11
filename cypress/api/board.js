import faker from 'faker';
import colorC from '../support/consoleColor';

function randomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  get({ token = '' }) {
    return cy
      .request({
        method: 'GET',
        url: Cypress.env('board_data'),
        headers: {
          Authorization: `Bearer${token}`,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        return response.body;
      });
  },

  post({
    boardName = faker.animal.rabbit(),
    typeBoard = 'scrum_board',
    token = '',
    statusCode = 201,
    testMessage = '',
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: 'POST',
        url: Cypress.env('boards_url'),
        body: {
          name: boardName,
          configuration_board_id: null,
          organization_id: 8070,
          team_members_board_id: null,
          type: typeBoard,
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

  put({
    boardID = '',
    boardName = faker.animal.rabbit(),
    codeName = randomString(4),
    token = '',
    statusCode = 200,
    testMessage = '',
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: 'PUT',
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardID}`,
        body: {
          code: codeName,
          description: null,
          name: boardName,
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

  delete({ boardID = '', token = '', statusCode = 200, testMessage = '' }) {
    cy.request({
      failOnStatusCode: false,
      method: 'DELETE',
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      typeof response.status !== 'undefined' && response.status === statusCode
        ? colorC.log(`${testMessage} - Pass`, 'success')
        : colorC.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, 'error');
      console.log(response);
      return response.body;
    });
  },
};
