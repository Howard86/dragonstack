import pool from '../../databasePool';
import DragonTable from '.table';
import Dragon from '.';

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId }),
    new Promise((resolve, reject) => {
      pool.query(
        `
            SELECT  trait_type, trait_value
              FROM  dragon_trait
        INNER JOIN  trait ON dragon_trait.trait_id = trait.id
             WHERE  dragon_trait.dragon_id = $1
      `,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve(response.rows);
        },
      );
    }),
  ])
    .then(([dragon, dragonTraits]) => {
      return new Dragon({
        ...dragon,
        dragonId,
        traits: dragonTraits,
      });
    })
    .catch(error => console.error(error));
};

export default getDragonWithTraits;
