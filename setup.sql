SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = ON;
SET check_function_bodies = FALSE;
SET client_min_messages = WARNING;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = FALSE;


CREATE TABLE categories (
  id   INTEGER                NOT NULL,
  name CHARACTER VARYING(255) NOT NULL
);

CREATE SEQUENCE categories_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER SEQUENCE categories_id_seq OWNED BY categories.id;

CREATE TABLE dishes (
  id            INTEGER                NOT NULL,
  name          CHARACTER VARYING(255) NOT NULL,
  image         CHARACTER VARYING(255),
  price         INTEGER                NOT NULL,
  description   TEXT,
  categories_id INTEGER
);

CREATE SEQUENCE dishes_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER SEQUENCE dishes_id_seq OWNED BY dishes.id;

CREATE TABLE orderitems (
  id        INTEGER NOT NULL,
  orders_id INTEGER NOT NULL,
  dishes_id INTEGER NOT NULL
);

CREATE SEQUENCE orderitems_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER SEQUENCE orderitems_id_seq OWNED BY orderitems.id;


CREATE TABLE orders (
  id               INTEGER                     NOT NULL,
  tablenumber      INTEGER                     NOT NULL,
  ordertimestamp   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  servingtimestamp TIMESTAMP WITHOUT TIME ZONE,
  notes            TEXT
);

CREATE SEQUENCE orders_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER SEQUENCE orders_id_seq OWNED BY orders.id;


CREATE TABLE users (
  id       INTEGER                NOT NULL,
  username CHARACTER VARYING(255) NOT NULL,
  password CHARACTER VARYING(255) NOT NULL,
  role     CHARACTER VARYING(255) NOT NULL,
  email    CHARACTER VARYING(255) NOT NULL
);

CREATE SEQUENCE users_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

ALTER SEQUENCE users_id_seq OWNED BY users.id;

ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq' :: REGCLASS);
ALTER TABLE ONLY dishes ALTER COLUMN id SET DEFAULT nextval('dishes_id_seq' :: REGCLASS);
ALTER TABLE ONLY orderitems ALTER COLUMN id SET DEFAULT nextval('orderitems_id_seq' :: REGCLASS);
ALTER TABLE ONLY orders ALTER COLUMN id SET DEFAULT nextval('orders_id_seq' :: REGCLASS);
ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq' :: REGCLASS);

ALTER TABLE ONLY categories
ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY dishes
ADD CONSTRAINT dishes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY orderitems
ADD CONSTRAINT orderitems_pkey PRIMARY KEY (id);

ALTER TABLE ONLY orders
ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

ALTER TABLE ONLY categories
ADD CONSTRAINT unique_id UNIQUE (id);

ALTER TABLE ONLY users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY dishes
ADD CONSTRAINT id FOREIGN KEY (categories_id) REFERENCES categories (id);

ALTER TABLE ONLY orderitems
ADD CONSTRAINT orderitems_dishes_id_fkey FOREIGN KEY (dishes_id) REFERENCES dishes (id);

ALTER TABLE ONLY orderitems
ADD CONSTRAINT orderitems_orders_id_fkey FOREIGN KEY (orders_id) REFERENCES orders (id);


REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
