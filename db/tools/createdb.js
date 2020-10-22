const glob = require('glob');
const path = require('path');
const { Client } = require('pg');

let table;
let tables = `CREATE EXTENSION IF NOT EXISTS pgcrypto;`;

glob.sync('./db/models/**/*.js').forEach(file => {
  table = require(path.resolve(file)).default;
  tables += table
});

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'schplatdb',
  password: '1234',
  port: 5432,
});

async function createTables() {
  await client.connect()
  await client.query(tables)
  await client.end()
}
createTables()