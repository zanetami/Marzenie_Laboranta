CREATE TABLE rel_ui (
	id integer PRIMARY KEY,
	id_u integer,
	id_i integer,
	FOREIGN KEY (id_u) REFERENCES users(id),
	FOREIGN KEY (id_i) REFERENCES issue(id)
);

CREATE SEQUENCE rel_ui_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1