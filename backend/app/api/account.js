import { Router } from 'express';
import AccountTable from '../account/table';
import { hash } from '../account/helper';
import { setSession } from './helper';
import Session from '../account/session';

const router = new Router();

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash });
      } else {
        const error = new Error('This username has already been taken');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(message => {
      res.json({ message });
    })
    .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.password_hash === hash(password)) {
        const { session_id } = account;

        return setSession({ username, res, sessionId: session_id });
      } else {
        const error = new Error('Incorrect username/password');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
  // TODO: Check the user is logged in
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    usernameHash: hash(username),
    sessionId: null,
  })
    .then(() => {
      res.clearCookie('sessionString');

      res.json({ message: 'Successful logout' });
    })
    .catch(error => next(error));
});

export default router;
