const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  database: 'schplatdb',
  port: 5432,
  max: 25,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params, callback) => (
    pool.query(text, params, (err, res) => (
      callback(err, res)
    ))
  ),
}