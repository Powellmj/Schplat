const pgtools = require("pgtools");
const glob = require('glob');
const path = require('path');
const db = require('../index')

const config = {
  user: "postgres",
  host: "localhost",
  password: "z7&&ARMvX[*q=e+:",
  port: 5432
};

pgtools.createdb(config, "schplatdb", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
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
});
