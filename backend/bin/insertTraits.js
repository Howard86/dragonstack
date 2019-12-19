const pool = require('../databasePool');
const TRAITS = require('../app/data/traits.json');

TRAITS.forEach(TRAIT => {
  const traitType = TRAIT.type;
  const traitValues = TRAIT.values;

  traitValues.forEach(traitValue => {
    pool.query(
      `INSERT INTO  trait(trait_type, trait_value)
            VALUES  ($1, $2)
         RETURNING  id`,
      [traitType, traitValue],
      (error, response) => {
        if (error) console.error(error);

        const traitId = response.rows[0].id;
        console.log(`Inserted trait - id: ${traitId}`);
      },
    );
  });
});
