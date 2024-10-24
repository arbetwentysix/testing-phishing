const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'opl49',
  host: 'localhost',
  port: 5432,
  database: 'testing_phishing',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
