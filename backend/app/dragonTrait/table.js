import pool from '../../databasePool';
import TraitTable from '../trait/table';

class DragonTraitTable {
  static storeDragonTrait({ dragonId, traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({ traitType, traitValue }).then(({ traitId }) => {
        pool.query(
          `INSERT INTO  dragon_trait(trait_id, dragon_id)
                VALUES  ($1, $2)`,
          [traitId, dragonId],
          (error, response) => {
            if (error) return reject(error);

            resolve();
          },
        );
      });
    });
  }
}

export default DragonTraitTable;
