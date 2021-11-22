import '../setup.js';
import pg from 'pg';

const { Pool } = pg;

let config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'production') {
  config = {
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
console.log("NODE_ENV É",process.env.NODE_ENV);
console.log("DATABASE É",process.env.DATABASE_URL);
const pool = new Pool(config);

export default pool;