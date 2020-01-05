CREATE TABLE dragon(
  id            SERIAL PRIMARY KEY,
  birthdate     TIMESTAMP NOT NULL,
  nickname      VARCHAR(64),
  is_public     BOOLEAN NOT NULL,
  sale_value    INTEGER NOT NULL,
  sire_value    INTEGER NOT NULL,
  generation_id INTEGER
);
