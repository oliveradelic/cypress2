import colorC from '../support/consoleColor';

module.exports = {
  login({
    email = 'olivera.delic+1@vivifyideas.com',
    password = 'test12345',
    statusCode = 200,
    testMessage = '',
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: 'POST',
        url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login',
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
