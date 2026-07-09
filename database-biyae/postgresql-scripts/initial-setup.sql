-- first time setup
SELECT 'CREATE DATABASE biy_ae_main_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'biy_ae_main_db')\gexec

-- enter database
\c biy_ae_main_db;

-- create schema
CREATE SCHEMA IF NOT EXISTS users;

-- create users table
\ir users-table.sql
