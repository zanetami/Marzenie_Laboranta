CREATE TABLE users(
    id integer PRIMARY KEY,
    name text,
    lastname text,
    company text,
    role text,
	login text  NOT NULL unique,
    password text NOT NULL
);

CREATE SEQUENCE users_id_seq
AS integer
START WITH 1
INCREMENT BY 1 ;
