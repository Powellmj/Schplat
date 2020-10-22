const express = require("express");
const router = express.Router();
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'schplatdb',
  password: '1234',
  port: 5432,
});

router.post('/register', (req, res) => {
  let user = req.body
  let query = `INSERT INTO users(email, handle, password, created_date) VALUES($1, $2, $3, TO_TIMESTAMP($4 / 1000.0)) RETURNING *`
  const values = [user.email, user.handle, user.password, user.created_date]
  console.log(req.body)
  
  try {
    client.connect()
    client.query(query, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    })
  } catch (err) {
    console.error(err.message)
  }
  setTimeout(() => { client.end() }, 1000)
})

module.exports = router;