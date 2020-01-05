import pool from '../../databasePool';

export default class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO account_dragon(account_id, dragon_id) VALUES($1, $2)',
        [accountId, dragonId],
        (error, _) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }

  static getAccountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT dragon_id FROM account_dragon WHERE account_id = $1',
        [accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountDragons: response.rows });
        },
      );
    });
  }

  static getDragonAccount({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT account_id FROM account_dragon WHERE dragon_id = $1',
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountId: response.rows[0].account_id });
        },
      );
    });
  }

  static updateDragonAccounts({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE account_dragon SET account_id = $1 WHERE dragon_id = $2',
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }
}
