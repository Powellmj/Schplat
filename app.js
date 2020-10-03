const express = require("express");
const app = express();
const { Client } = require('pg');
const users = require("./routes/api/users");
const bodyParser = require('body-parser');

app.get("/", (req, res) => res.send("Hello World"));

const port = process.env.PORT || 5000;

app.use("/api/users", users);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'schplatdb',
  password: '1234',
  port: 5432,
});

client.connect();


app.listen(port, () => console.log(`Server is running on port ${port}`));