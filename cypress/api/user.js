import data from '../fixtures/data.json';
import colorC from '../support/consoleColor';

module.exports = {
  login({ email = data.email, password = data.password, statusCode = 200, testMessage = '' }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: 'POST',
        url: Cypress.env('login_url'),
        body: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        typeof response.status !== 'undefined' && response.status === statusCode
          ? colorC.log(`${testMessage} - Pass`, 'success')
          : colorC.log(`${testMessage} -Fail - ${JSON.stringify(response)}`, 'error');
        expect(response.status).to.eq(statusCode);
        return response.body.token;
      });
  },
};
