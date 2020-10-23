const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'z7&&ARMvX[*q=e+:',
  host: 'localhost',
  database: 'schplatdb',
  port: 5432,
  max: 25,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params, callback) => (
    pool.query(text, params, (err, res) => {
      callback(err, res)
    })
  ),
}