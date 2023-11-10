create TABLE "user" (
	id serial PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	insert_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);