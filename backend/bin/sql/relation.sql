ALTER TABLE dragon ADD FOREIGN KEY (generation_id) REFERENCES generation(id);

ALTER TABLE dragon_trait ADD FOREIGN KEY (trait_id) REFERENCES trait(id);

ALTER TABLE dragon_trait ADD FOREIGN KEY (dragon_id) REFERENCES dragon(id);
