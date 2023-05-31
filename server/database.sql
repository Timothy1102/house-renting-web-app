-- database command examples

-- create uuid extension to generate uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. create a new database
CREATE DATABASE house_renting;

-- 2. create a new table inside that database
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 3. insert some data into the table
INSERT INTO users (user_name, email, password) VALUES ('John', 'henry@gmail.com', 'password123');

-- 4. query the table
SELECT * FROM user;

-- 5. delete the table
DROP TABLE user;