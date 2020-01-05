import Session from '../account/session';
import AccountTable from '../account/table';
import { hash } from '../account/helper';

export const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });

      setSessionCookie({ sessionString, res });

      resolve({ message: 'session restored' });
    } else {
      session = new Session({ username });
      sessionString = session.toString();

      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username),
      })
        .then(() => {
          setSessionCookie({ sessionString, res });

          resolve({ message: 'session created' });
        })
        .catch(error => reject(error));
    }
  });
};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 60 * 60 * 1000,
    httpOnly: true,
    // secure: true, use with https
  });
};

export const authenticatedAccount = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error('Invalid session');

      error.statusCode = 400;

      return reject(error);
    } else {
      const { username, id } = Session.parse(sessionString);

      AccountTable.getAccount({
        usernameHash: hash(username),
      })
        .then(({ account }) => {
          if (account) {
            const authenticated = account.session_id === id;

            resolve({ account, authenticated, username });
          } else {
            const error = new Error('Cannot find account');

            throw error;
          }
        })
        .catch(error => reject(error));
    }
  });
};
