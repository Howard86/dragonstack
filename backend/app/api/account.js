import { Router } from 'express';
import AccountTable from '../account/table';
import { hash } from '../account/helper';
import { setSession, authenticatedAccount } from './helper';
import Session from '../account/session';
import AccountDragonTable from '../accountDragon/table';
import { getDragonWithTraits } from '../dragon/helper';

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

  authenticatedAccount({ sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch(error => next(error));
});

router.get('/dragons', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return AccountDragonTable.getAccountDragons({ accountId: account.id });
    })
    .then(({ accountDragons }) => {
      return Promise.all(
        accountDragons.map(accountDragon => {
          return getDragonWithTraits({ dragonId: accountDragon.dragon_id });
        }),
      );
    })
    .then(dragons => {
      res.json({ dragons });
    })
    .catch(error => next(error));
});

router.get('/info', (req, res, next) => {
  authenticatedAccount({
    sessionString: req.cookies.sessionString,
  })
    .then(({ account, username }) =>
      res.json({ info: { balance: account.balance, username } }),
    )
    .catch(error => next(error));
});

export default router;