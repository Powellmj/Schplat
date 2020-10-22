const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'schplatdb',
  password: '1234',
  port: 5432,
});

const query = `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`

async function deleteTables() {
  await client.connect()
  await client.query(query)
  await client.end()
}
deleteTables()