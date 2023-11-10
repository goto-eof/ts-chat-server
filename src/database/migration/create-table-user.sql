create TABLE "user" (
	id serial PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	username: TEXT,
	password: TEXT,
	insert_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);