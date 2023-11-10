create table message (
	id serial PRIMARY KEY,
	message TEXT,
	from_user_id INT NOT NULL,
	to_user_id INT NOT NULL,
	insert_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT fk_user_from FOREIGN KEY(from_user_id) REFERENCES user(id),
	CONSTRAINT fk_user_to FOREIGN KEY(to_user_id) REFERENCES user(id)
);