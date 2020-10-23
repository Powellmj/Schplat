const db = require('../index')
const query = `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`

db.query(query, undefined, (err, res) => {
  if (err) return console.error(err)
  return console.log('Tables Dropped')
})