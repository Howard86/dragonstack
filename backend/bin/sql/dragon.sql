CREATE TABLE dragon(
  id            SERIAL PRIMARY KEY,
  birthdate     TIMESTAMP NOT NULL,
  nickname      VARCHAR(64),
  generation_id INTEGER,
  FOREIGN KEY (generation_id) REFERENCES generation(id)
);
