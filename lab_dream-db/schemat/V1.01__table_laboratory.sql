CREATE TABLE laboratory (
    id integer PRIMARY KEY,
    lab_no text
);

CREATE SEQUENCE lab_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1;