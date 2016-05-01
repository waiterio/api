CREATE TABLE categories (
  id   INTEGER PRIMARY KEY NOT NULL,
  name TEXT                NOT NULL
);

CREATE TABLE dishes (
  id            INTEGER PRIMARY KEY NOT NULL,
  name          TEXT                NOT NULL,
  image         TEXT,
  price         INTEGER             NOT NULL,
  description   TEXT,
  categories_id INTEGER,

  FOREIGN KEY (categories_id) REFERENCES categories (id)
);

CREATE TABLE orderitems (
  id        INTEGER PRIMARY KEY NOT NULL,
  orders_id INTEGER             NOT NULL,
  dishes_id INTEGER             NOT NULL,

  FOREIGN KEY (orders_id) REFERENCES orders (id),
  FOREIGN KEY (dishes_id) REFERENCES dishes (id)
);

CREATE TABLE orders (
  id               INTEGER PRIMARY KEY NOT NULL,
  tablenumber      INTEGER             NOT NULL,
  ordertimestamp   TEXT                NOT NULL,
  servingtimestamp TEXT,
  notes            TEXT
);

CREATE TABLE users (
  id       INTEGER PRIMARY KEY NOT NULL,
  username TEXT                NOT NULL,
  password TEXT                NOT NULL,
  role     TEXT                NOT NULL,
  email    TEXT                NOT NULL
);

