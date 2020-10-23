const db = require('../db')

exports.insert = (table, body, response) => {  
  let query = `INSERT INTO ${table}(`
  let queryValues = ` VALUES(`
  let values = Object.values(body)
  let i = 1

  for (const key in body) {
    query += `${key}, `
    if (key == 'created_date' || key == 'updated_date') {
      queryValues += `TO_TIMESTAMP($${i} / 1000.0), `
    } else {
      queryValues += `$${i}, `
    }
    i++
  }
  query = (query.slice(0, -2) + ')')
  queryValues = (queryValues.slice(0, -2) + ') RETURNING *')
  query += queryValues
  
  db.query(query, values, (err, res) => {
    if (err) return console.error(err)
    response.send(res.rows[0])
  })
}