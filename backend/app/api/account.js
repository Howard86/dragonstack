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

// router.post('/session', (req, res, next) => {
//   const { sessionString } = req.body;
//   // repalce %7 with SEPARATOR '|'
//   const givenSessionString = sessionString.replace(/%7C/g, '|');

//   const { username, id } = Session.parse(givenSessionString);
//   console.log('id', id);
//   AccountTable.getAccount({
//     usernameHash: hash(username),
//   })
//     .then(({ account }) => {
//       console.log('account', account);
//       if (account) {
//         res.json({ message: id === account.session_id, account });
//       } else {
//         const error = new Error('Cannot find account');

//         throw error;
//       }
//     })
//     .catch(error => next(error));
// });

router.get('/authenticated', (req, res, next) => {
  const { sessionString } = req.cookies;

  if (!sessionString || !Session.verify(sessionString)) {
    const error = new Error('Invalid session');

    error.statusCode = 400;

    return next(error);
  } else {
    const { username, id } = Session.parse(sessionString);

    AccountTable.getAccount({
      usernameHash: hash(username),
    })
      .then(({ account }) => {
        if (account) {
          const authenticated = account.session_id === id;

          res.json({ authenticated });
        } else {
          const error = new Error('Cannot find account');

          throw error;
        }
      })
      .catch(error => next(error));
  }
});

export default router;
