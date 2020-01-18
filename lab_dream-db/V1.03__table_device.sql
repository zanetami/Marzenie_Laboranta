CREATE TABLE device (
    id integer PRIMARY KEY,
    type text,
    brand text,
    model text,
    lab_no text
);

CREATE SEQUENCE device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1;