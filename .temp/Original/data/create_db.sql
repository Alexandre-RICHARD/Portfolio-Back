BEGIN;

DROP TABLE IF EXISTS "chess";
DROP TABLE IF EXISTS "userdata";
DROP TABLE IF EXISTS "visits";
DROP TABLE IF EXISTS "user_uuid";
DROP TABLE IF EXISTS "genshin_data";
DROP TABLE IF EXISTS "contact_message";

CREATE TABLE chess (
    id SERIAL PRIMARY KEY,
    x integer NOT NULL,
    y integer NOT NULL,
    case_color text NOT NULL,
    case_name text NOT NULL,
    control_by_white integer NOT NULL,
    control_by_black integer NOT NULL,
    absolute_pin boolean NOT NULL,
    piece_name text,
    piece_id text,
    piece_color text,
    pawn_just_move_two boolean,
    already_move boolean
);

CREATE TABLE userdata (
    id SERIAL PRIMARY KEY,
    nickname text NOT NULL,
    mail text NOT NULL,
    password_hashed text NOT NULL
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    date date NOT NULL,
    target text NOT NULL,
    counter integer NOT NULL
);

CREATE TABLE user_uuid (
    id SERIAL PRIMARY KEY,
    user_uuid text NOT NULL
);

CREATE TABLE genshin_data (
    id SERIAL PRIMARY KEY,
    user_id SERIAL NOT NULL,
    data_type text NOT NULL,
    data_string text NOT NULL
);

ALTER TABLE genshin_data
ADD CONSTRAINT unique_user_data_type UNIQUE (user_id, data_type);

CREATE TABLE contact_message (
    id SERIAL PRIMARY KEY,
    user_name text,
    user_mail text,
    user_object text NOT NULL,
    user_message text NOT NULL
);

INSERT INTO chess VALUES (1, 1, 8, 'white', 'a8', 0, 0, false, 'rook', 'r1b', 'black', NULL, false);
INSERT INTO chess VALUES (2, 2, 8, 'black', 'b8', 0, 0, false, 'knight', 'c1b', 'black', NULL, NULL);
INSERT INTO chess VALUES (3, 3, 8, 'white', 'c8', 0, 0, false, 'bishop', 'b1b', 'black', NULL, NULL);
INSERT INTO chess VALUES (4, 4, 8, 'black', 'd8', 0, 0, false, 'queen', 'q1b', 'black', NULL, NULL);
INSERT INTO chess VALUES (5, 5, 8, 'white', 'e8', 0, 0, false, 'king', 'k1b', 'black', NULL, false);
INSERT INTO chess VALUES (6, 6, 8, 'black', 'f8', 0, 0, false, 'bishop', 'b2b', 'black', NULL, NULL);
INSERT INTO chess VALUES (7, 7, 8, 'white', 'g8', 0, 0, false, 'knight', 'c2b', 'black', NULL, NULL);
INSERT INTO chess VALUES (8, 8, 8, 'black', 'h8', 0, 0, false, 'rook', 'r2b', 'black', NULL, false);
INSERT INTO chess VALUES (9, 1, 7, 'black', 'a7', 0, 0, false, 'pawn', 'p1b', 'black', false, false);
INSERT INTO chess VALUES (10, 2, 7, 'white', 'b7', 0, 0, false, 'pawn', 'p2b', 'black', false, false);
INSERT INTO chess VALUES (11, 3, 7, 'black', 'c7', 0, 0, false, 'pawn', 'p3b', 'black', false, false);
INSERT INTO chess VALUES (12, 4, 7, 'white', 'd7', 0, 0, false, 'pawn', 'p4b', 'black', false, false);
INSERT INTO chess VALUES (13, 5, 7, 'black', 'e7', 0, 0, false, 'pawn', 'p5b', 'black', false, false);
INSERT INTO chess VALUES (14, 6, 7, 'white', 'f7', 0, 0, false, 'pawn', 'p6b', 'black', false, false);
INSERT INTO chess VALUES (15, 7, 7, 'black', 'g7', 0, 0, false, 'pawn', 'p7b', 'black', false, false);
INSERT INTO chess VALUES (16, 8, 7, 'white', 'h7', 0, 0, false, 'pawn', 'p8b', 'black', false, false);
INSERT INTO chess VALUES (17, 1, 6, 'white', 'a6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (18, 2, 6, 'black', 'b6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (19, 3, 6, 'white', 'c6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (20, 4, 6, 'black', 'd6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (21, 5, 6, 'white', 'e6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (22, 6, 6, 'black', 'f6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (23, 7, 6, 'white', 'g6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (24, 8, 6, 'black', 'h6', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (25, 1, 5, 'black', 'a5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (26, 2, 5, 'white', 'b5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (27, 3, 5, 'black', 'c5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (28, 4, 5, 'white', 'd5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (29, 5, 5, 'black', 'e5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (30, 6, 5, 'white', 'f5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (31, 7, 5, 'black', 'g5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (32, 8, 5, 'white', 'h5', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (33, 1, 4, 'white', 'a4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (34, 2, 4, 'black', 'b4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (35, 3, 4, 'white', 'c4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (36, 4, 4, 'black', 'd4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (37, 5, 4, 'white', 'e4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (38, 6, 4, 'black', 'f4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (39, 7, 4, 'white', 'g4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (40, 8, 4, 'black', 'h4', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (41, 1, 3, 'black', 'a3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (42, 2, 3, 'white', 'b3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (43, 3, 3, 'black', 'c3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (44, 4, 3, 'white', 'd3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (45, 5, 3, 'black', 'e3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (46, 6, 3, 'white', 'f3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (47, 7, 3, 'black', 'g3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (48, 8, 3, 'white', 'h3', 0, 0, false, NULL, NULL, NULL, NULL, NULL);
INSERT INTO chess VALUES (49, 1, 2, 'white', 'a2', 0, 0, false, 'pawn', 'p1w', 'white', false, false);
INSERT INTO chess VALUES (50, 2, 2, 'black', 'b2', 0, 0, false, 'pawn', 'p2w', 'white', false, false);
INSERT INTO chess VALUES (51, 3, 2, 'white', 'c2', 0, 0, false, 'pawn', 'p3w', 'white', false, false);
INSERT INTO chess VALUES (52, 4, 2, 'black', 'd2', 0, 0, false, 'pawn', 'p4w', 'white', false, false);
INSERT INTO chess VALUES (53, 5, 2, 'white', 'e2', 0, 0, false, 'pawn', 'p5w', 'white', false, false);
INSERT INTO chess VALUES (54, 6, 2, 'black', 'f2', 0, 0, false, 'pawn', 'p6w', 'white', false, false);
INSERT INTO chess VALUES (55, 7, 2, 'white', 'g2', 0, 0, false, 'pawn', 'p7w', 'white', false, false);
INSERT INTO chess VALUES (56, 8, 2, 'black', 'h2', 0, 0, false, 'pawn', 'p8w', 'white', false, false);
INSERT INTO chess VALUES (57, 1, 1, 'black', 'a1', 0, 0, false, 'rook', 'r1w', 'white', NULL, false);
INSERT INTO chess VALUES (58, 2, 1, 'white', 'b1', 0, 0, false, 'knight', 'c1w', 'white', NULL, NULL);
INSERT INTO chess VALUES (59, 3, 1, 'black', 'c1', 0, 0, false, 'bishop', 'b1w', 'white', NULL, NULL);
INSERT INTO chess VALUES (60, 4, 1, 'white', 'd1', 0, 0, false, 'queen', 'q1w', 'white', NULL, NULL);
INSERT INTO chess VALUES (61, 5, 1, 'black', 'e1', 0, 0, false, 'king', 'k1w', 'white', NULL, false);
INSERT INTO chess VALUES (62, 6, 1, 'white', 'f1', 0, 0, false, 'bishop', 'b2w', 'white', NULL, NULL);
INSERT INTO chess VALUES (63, 7, 1, 'black', 'g1', 0, 0, false, 'knight', 'c2w', 'white', NULL, NULL);
INSERT INTO chess VALUES (64, 8, 1, 'white', 'h1', 0, 0, false, 'rook', 'r2w', 'white', NULL, false);

COMMIT;