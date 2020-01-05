CREATE TABLE account(
  id              SERIAL PRIMARY KEY,
  username_hash   VARCHAR(64) UNIQUE,
  password_hash   VARCHAR(64),
  session_id      VARCHAR(36),
  balance         INTEGER NOT NULL
);
