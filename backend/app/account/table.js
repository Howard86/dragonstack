import pool from '../../databasePool';
import { STARTING_BALANCE } from '../config';

class AccountTable {
  static storeAccount({ usernameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO account(username_hash, password_hash, balance) VALUES($1, $2, $3)',
        [usernameHash, passwordHash, STARTING_BALANCE],
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
        'SELECT id, password_hash, session_id, balance FROM account WHERE username_hash = $1',
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

  static updateBalance({ accountId, value }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE account SET balance = balance + $1 WHERE id = $2`,
        [value, accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }
}

export default AccountTable;
