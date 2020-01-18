CREATE TABLE rel_id (
	id integer PRIMARY KEY,
	id_i integer,
	id_d integer,
	FOREIGN KEY (id_i) REFERENCES issue(id),
	FOREIGN KEY (id_d) REFERENCES device(id)
);

CREATE SEQUENCE rel_id_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1