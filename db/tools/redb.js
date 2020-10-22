const { Client } = require('pg');
const glob = require('glob');
const path = require('path');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'schplatdb',
  password: '1234',
  port: 5432,
});

const deleteQuery = `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
let createQuery = `CREATE EXTENSION IF NOT EXISTS pgcrypto;`;

glob.sync('./db/models/**/*.js').forEach(file => {
  let table = require(path.resolve(file)).default;
  createQuery += table
});

async function reTables() {
  await client.connect()
  await client.query(deleteQuery)
  await client.query(createQuery)
  await client.end()
}
reTables()