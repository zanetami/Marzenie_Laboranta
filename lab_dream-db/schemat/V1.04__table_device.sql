CREATE TABLE device (
    id integer PRIMARY KEY,
    type text,
    brand text,
    model text,
    issue_id integer,
    lab_id integer,
    FOREIGN KEY (issue_id) REFERENCES issue(id),
    FOREIGN KEY (lab_id) REFERENCES laboratory(id)
);

CREATE SEQUENCE device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1;