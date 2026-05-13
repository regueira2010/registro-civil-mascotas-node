import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Usar URL en producción
/*export const pool = new Pool({
  connectionString: process.env.DATABASE_URL 
});*/