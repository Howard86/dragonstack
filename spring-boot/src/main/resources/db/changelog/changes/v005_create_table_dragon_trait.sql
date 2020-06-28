CREATE TABLE dragon_trait(
	trait_id  INTEGER REFERENCES trait(id),
dragon_id INTEGER REFERENCES dragon(id),
PRIMARY KEY(trait_id, dragon_id)
)