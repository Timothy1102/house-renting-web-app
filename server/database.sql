-- command examples

-- 1. create a new database
CREATE DATABASE test;

-- 2. create a new table inside that database
CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

-- 3. insert some data into the table
INSERT INTO test_table (name, age) VALUES ('John', 25);

-- 4. query the table
SELECT * FROM test_table;
