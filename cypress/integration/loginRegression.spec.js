import userApi from '../api/user';
import data from '../fixtures/data.json';

describe('Api testing', () => {
  let userToken;
  before(() => {
    userApi.login({ testMessage: '01 - Login before other tests' }).then((token) => {
      userToken = token;
    });
  });
  it('wrong email', () => {
    userApi.login({
      email: data.invalidEmail,
      testMessage: '02 - wrong email',
      statusCode: 401,
    });
  });
  it('wrong email without @', () => {
    userApi.login({
      email: data.withoutEt,
      testMessage: '03 - wrong email without @',
      statusCode: 401,
    });
  });
  it('wrong email without com', () => {
    userApi.login({
      email: data.withoutDotcom,
      testMessage: '04 - wrong email without com',
      statusCode: 401,
    });
  });
  it('wrong email with space infront', () => {
    userApi.login({
      email: data.withSpaceInfront,
      testMessage: '05 - wrong email with space infront',
      statusCode: 401,
    });
  });
  it('wrong password', () => {
    userApi.login({
      password: data.invalidPassword,
      testMessage: '06 - wrong password',
      statusCode: 401,
    });
  });
});
