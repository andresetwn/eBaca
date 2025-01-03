import mysql from "mysql2/promise";

const dbUsers = mysql.createPool({
  host: process.env.DB_USERS_HOST,
  user: process.env.DB_USERS_USER,
  password: process.env.DB_USERS_PASSWORD,
  database: process.env.DB_USERS_NAME,
});

const dbBooks = mysql.createPool({
  host: process.env.DB_BOOKS_HOST,
  user: process.env.DB_BOOKS_USER,
  password: process.env.DB_BOOKS_PASSWORD,
  database: process.env.DB_BOOKS_NAME,
});

export { dbUsers, dbBooks };
