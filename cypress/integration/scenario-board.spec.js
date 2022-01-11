import userApi from '../api/user';
import boardApi from '../api/board';

describe('Api testing', () => {
  let userToken;
  before(() => {
    userApi.login({ testMessage: '00 - Login before other tests' }).then((token) => {
      userToken = token;
    });
  });

  let boardId;
  it('01 - create board', () => {
    boardApi
      .post({
        boardID: boardId,
        token: userToken,
        testMessage: '01 - Create board',
      })
      .then((boardObject) => {
        boardId = boardObject.id;
      });
  });

  it('02 - update board', () => {
    boardApi
      .put({ token: userToken, boardID: boardId, testMessage: '02 - Update board' })
      .then((boardObject) => {
        boardId = boardObject.id;
      });
  });

  it('03 - delete board', () => {
    boardApi.delete({ token: userToken, boardID: boardId, testMessage: '03 - Delete board' });
  });

  it('04 - get all boards', () => {
    boardApi.get({ token: userToken, testMessage: '04 - Get all boards' });
  });

  after(() => {
    boardApi.get({ token: userToken }).then((allBoards) => {
      allBoards.forEach((board) => {
        boardApi.delete({ token: userToken, boardID: board.id });
      });
    });
  });
});
