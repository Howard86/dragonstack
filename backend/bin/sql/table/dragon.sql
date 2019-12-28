CREATE TABLE dragon(
  id            SERIAL PRIMARY KEY,
  birthdate     TIMESTAMP NOT NULL,
  nickname      VARCHAR(64),
  generation_id INTEGER
);
