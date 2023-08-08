DROP DATABASE IF EXISTS "better_polling";

CREATE DATABASE "better_polling";

\c better_polling;

\i db/schema.sql
\i db/seed.sql
