const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const glob = require('glob');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

glob.sync('./routes/api/*.js').forEach(file => {
  let fileName = path.resolve(file).match(/\/api\/[a-zA-Z_]*/g)[0]
  let router = require(path.resolve(file));
  app.use(fileName, router);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))