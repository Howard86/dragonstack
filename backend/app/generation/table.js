const pool = require('../../databasePool');

class GenerationTable {
  static storeGeneration(generation) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
        [generation.expiration],
        (error, response) => {
          if (error) return reject(error);

          const generationId = response.rows[0].id;

          resolve({ generationId });
        },
      );
    });
  }
}

class DragonTable {
  static storeDragon(dragon) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO dragon(nickname, birthdate, generation_id) VALUES ($1, $2, $3)',
        [dragon.nickname, dragon.birthdate, dragon.generationId],
        (error, response) => {
          if (error) return reject(error);

          const { nickname, birthdate, generationId } = response.rows[0];

          resolve({ nickname, birthdate, generationId });
        },
      );
    });
  }
}

module.exports = { GenerationTable, DragonTable };
