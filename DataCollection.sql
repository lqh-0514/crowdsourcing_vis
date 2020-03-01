CREATE TABLE user_main_2 (
    user_id text NOT NULL PRIMARY KEY,
    age text NOT NULL,
    gender text NOT NULL,
    address text NOT NULL,
    background text NOT NULL,
    properties_1 text NOT NULL,
    properties_2 text NOT NULL,
    properties_3 text NOT NULL
);

CREATE TABLE data_collection_2(
	user_id text NOT NULL,
    age text NOT NULL,
    gender text NOT NULL,
    address text NOT NULL,
    background text NOT NULL,
    video_l_dir text NOT NULL,
    video_r_dir text NOT NULL,
    selection text NOT NULL,
    volume_selection text NOT NULL

);
CREATE TABLE user_main_after (
    user_id text NOT NULL PRIMARY KEY,
    age text NOT NULL,
    gender text NOT NULL,
    address text NOT NULL,
    background text NOT NULL,
    properties_1 text NOT NULL,
    properties_2 text NOT NULL,
    properties_3 text NOT NULL
);

CREATE TABLE video_clip_meta(
    idx text NOT NULL, 
    uuid text NOT NULL PRIMARY KEY,
    video_name text NOT NULL,
    raw_video text NOT NULL,
    raw_start_time text,
    raw_end_time text,
    raw_start_real text,
    raw_end_real text,
    delay text,
    filepath text NOT NULL,
    trajectory text NOT NULL,
    video_server text NOT NULL,
    trajectory_server text NOT NULL
);


COPY video_clip_meta FROM './thesis_github/video_clip_meta.csv' WITH (FORMAT csv);