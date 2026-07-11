-- first time setup
SELECT 'CREATE DATABASE biy_ae_main_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'biy_ae_main_db')\gexec

-- create biyae account for sql
CREATE USER biyaeconnect WITH PASSWORD 'bananaketchup';
GRANT CONNECT ON DATABASE biy_ae_main_db TO biyaeconnect;


-- enter database
\c biy_ae_main_db;

-- create schema
CREATE SCHEMA IF NOT EXISTS users;

-- give biyae access to schema
ALTER DEFAULT PRIVILEGES IN SCHEMA users GRANT USAGE ON SEQUENCES TO biyaeconnect;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA users TO biyaeconnect;

-- create users table
\ir users-table.sql

-- after we finish this burst of coding. we need to definitely 
-- annotate all of this stuff cause some of it is confusing me. 
-- and I just kinda copied a bunch of this stuff from stack exchange. 
-- annotate to understand better.

