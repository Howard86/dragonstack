CREATE TABLE account_dragon(
  account_id INTEGER REFERENCES account(id),
  dragon_id INTEGER REFERENCES dragon(id),
  PRIMARY KEY (account_id, dragon_id)
);
