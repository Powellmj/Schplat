const db = require('../index')
const glob = require('glob');
const path = require('path');

let query = `DROP SCHEMA public CASCADE; CREATE SCHEMA public; CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
let table;

glob.sync('./db/models/**/*.js').forEach(file => {
  table = require(path.resolve(file)).default;
  query += table
});

db.query(query, undefined, (err, res) => {
  if (err) return console.error(err)
  return console.log('Tables Recreated')
})