const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://default:uFeDR95xngaw@ep-twilight-cake-a4jlzhv1-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
