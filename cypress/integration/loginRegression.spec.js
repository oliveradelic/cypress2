import userApi from '../api/user';

describe('Api testing', () => {
  let userToken;
  before(() => {
    userApi.login({ testMessage: '01 - Login before other tests' }).then((token) => {
      userToken = token;
    });
  });
  it('wrong email', () => {
    userApi.login({
      email: 'pera@gmail',
      testMessage: '02 - wrong email',
      statusCode: 401,
    });
  });
  it('wrong email without @', () => {
    userApi.login({
      email: 'peragmail.com',
      testMessage: '03 - wrong email without @',
      statusCode: 401,
    });
  });
  it('wrong email without com', () => {
    userApi.login({
      email: 'pera@gmail',
      testMessage: '04 - wrong email without com',
      statusCode: 401,
    });
  });
  it('wrong email with space infront', () => {
    userApi.login({
      email: '@.gmail',
      testMessage: '05 - wrong email with space infront',
      statusCode: 401,
    });
  });
  it('wrong password', () => {
    userApi.login({
      password: '@.gmail',
      testMessage: '06 - wrong password',
      statusCode: 401,
    });
  });
});
