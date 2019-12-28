import pool from '../../databasePool';

class AccountTable {
  static storeAccount({ usernameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO account(username_hash, password_hash) VALUES($1, $2)',
        [usernameHash, passwordHash],
        (error, _) => {
          if (error) return reject(error);

          // const userId = response.rows[0].id;
          resolve();
        },
      );
    });
  }

  static getAccount({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT id, password_hash, session_id FROM account WHERE username_hash = $1',
        [usernameHash],
        (error, response) => {
          if (error) return reject(error);

          const account = response.rows[0];
          resolve({ account });
        },
      );
    });
  }

  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE account SET session_id = $1 WHERE username_hash = $2',
        [sessionId, usernameHash],
        (error, _) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }
}

export default AccountTable;
