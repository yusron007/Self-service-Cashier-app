const { Pool } = require('pg');

const connectPostgres = () => {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  pool.connect((err) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
      process.exit(1);
    } else {
      console.log('Connected to PostgreSQL');
    }
  });

  return pool;
};

module.exports = connectPostgres;
