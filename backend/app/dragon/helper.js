import pool from '../../databasePool';
import DragonTable from './table';
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
        traits: dragonTraits.map(trait => {
          return {
            traitType: trait.trait_type,
            traitValue: trait.trait_value,
          };
        }),
      });
    })
    .catch(error => console.error(error));
};

const getPublicDragons = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id FROM dragon WHERE is_public = TRUE',
      (error, response) => {
        if (error) return reject(error);

        const publicDragonRows = response.rows;

        Promise.all(
          publicDragonRows.map(({ id }) =>
            getDragonWithTraits({ dragonId: id }),
          ),
        )
          .then(dragons => resolve({ dragons }))
          .catch(error => reject(error));
      },
    );
  });
};

export { getDragonWithTraits, getPublicDragons };
