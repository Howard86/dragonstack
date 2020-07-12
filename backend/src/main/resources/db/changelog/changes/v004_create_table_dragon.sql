CREATE TABLE dragon(
	id              SERIAL PRIMARY KEY,
	birthdate       TIMESTAMP NOT NULL,
	nickname        VARCHAR(64),
	is_public       BOOLEAN NOT NULL,
	sale_value      INTEGER NOT NULL,
	sire_value      INTEGER NOT NULL,
	generation_id   INTEGER REFERENCES generation(id),
account_id   INTEGER REFERENCES account(id),
created_at      timestamptz NOT NULL DEFAULT now(),
updated_at timestamptz NOT NULL DEFAULT now()
);