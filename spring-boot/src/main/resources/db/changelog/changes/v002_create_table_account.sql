CREATE TABLE account(
	id              SERIAL PRIMARY KEY,
	username        VARCHAR(64) UNIQUE,
	password        VARCHAR(64),
	balance         INTEGER NOT NULL,
	created_at      timestamptz NOT NULL DEFAULT now(),
updated_at timestamptz NOT NULL DEFAULT now()
);