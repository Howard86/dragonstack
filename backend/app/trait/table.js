import pool from '../../databasePool';

class TraitTable {
  static getTraitId({ traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT  id
           FROM  trait
          WHERE  trait_type = $1
            AND  trait_value = $2`,
        [traitType, traitValue],
        (error, response) => {
          if (error) return reject(error);

          resolve({ traitId: response.rows[0].id });
        },
      );
    });
  }
}

export default TraitTable;
