CREATE TABLE rel_ud (
    id integer PRIMARY KEY,
    id_u integer,
    lab_no text,
	FOREIGN KEY (id_u) REFERENCES users(id)
);

CREATE SEQUENCE rel_ud_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1