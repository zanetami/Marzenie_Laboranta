CREATE TABLE issue (
    id integer PRIMARY KEY,
    descr text,
    notif_d timestamp without time zone,
    state text,
    priority text,
    accept_d timestamp without time zone,
    solve_d timestamp without time zone,
    reporter_id integer,
    solver_id integer,
	FOREIGN KEY (reporter_id) REFERENCES users(id),
	FOREIGN KEY (solver_id) REFERENCES users(id)
);

CREATE SEQUENCE public.issue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1;