import pool from '../../databasePool';
import DragonTraitTable from '../dragonTrait/table';

class DragonTable {
  static storeDragon(dragon) {
    const {
      birthdate,
      nickname,
      generationId,
      isPublic,
      saleValue,
      sireValue,
    } = dragon;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO  dragon(birthdate, nickname, generation_id, is_public, sale_value, sire_value)
              VALUES  ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [birthdate, nickname, generationId, isPublic, saleValue, sireValue],
        (error, response) => {
          if (error) return reject(error);

          const dragonId = response.rows[0].id;

          Promise.all(
            dragon.traits.map(({ traitType, traitValue }) => {
              return DragonTraitTable.storeDragonTrait({
                dragonId,
                traitType,
                traitValue,
              });
            }),
          )
            .then(() => {
              resolve({ dragonId });
            })
            .catch(error => reject(error));
        },
      );
    });
  }

  static getDragon({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `
      SELECT  birthdate, nickname, generation_id, is_public, sale_value, sire_value
        FROM  dragon
       WHERE  dragon.id = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length == 0) return reject(new Error('no dragon'));
          const {
            birthdate,
            nickname,
            generation_id,
            is_public,
            sale_value,
            sire_value,
          } = response.rows[0];
          resolve({
            birthdate,
            nickname,
            generationId: generation_id,
            isPublic: is_public,
            saleValue: sale_value,
            sireValue: sire_value,
          });
        },
      );
    });
  }

  static updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }) {
    const settingMap = { nickname, isPublic, saleValue, sireValue };
    const validQueries = Object.entries(settingMap).filter(
      ([settingKey, settingValue]) => {
        if (settingValue !== undefined) {
          return new Promise((resolve, reject) => {
            pool.query(
              `UPDATE dragon SET ${camelToSnake(
                settingKey,
              )} = $1 WHERE id = $2`,
              [settingValue, dragonId],
              (error, response) => {
                if (error) return reject(error);

                resolve();
              },
            );
          });
        }
      },
    );

    return Promise.all(validQueries);
  }
}

const camelToSnake = text =>
  text.replace(/[A-Z]/g, char => `_${char[0].toLowerCase()}`);
export default DragonTable;
