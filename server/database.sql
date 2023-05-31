-- database command examples

-- create uuid extension to generate uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. create a new database
CREATE DATABASE house_renting;

-- 2. create a new table inside that database
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
--  role: 'admin' or 'landlord' or 'tenant'

-- 3. insert some data into the table
INSERT INTO users (role, name, email, password) VALUES ('landlord', 'John', 'john@gmail.com', 'password');

-- 4. query the table
SELECT * FROM user;

-- 5. delete the table
DROP TABLE user;