const glob = require('glob');
const path = require('path');
const db = require('../index')

let table;
let tables = `CREATE EXTENSION IF NOT EXISTS pgcrypto;`;

glob.sync('./db/models/**/*.js').forEach(file => {
  table = require(path.resolve(file)).default;
  tables += table
});

db.query(tables, undefined, (err, res) => {
  if (err) return console.error(err)
  return console.log('Tables Inserted')
})