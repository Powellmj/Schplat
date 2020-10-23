const express = require("express");
const router = express.Router();
const routeTemplates = require('../route_templates')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db')
const keys = require('../../config/keys.js');

router.post('/create', (req, response) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return response.status(400).json(errors);
  
  let query = `SELECT * FROM users WHERE email = $1`;
  let values = [req.body.email];
  let newUser = req.body;

  db.query(query, values, (err, res) => {
    if (err) return response.status(400).json(err)
    if (res.rows.length) {
      errors.email = "User already exists";
      return response.status(400).json(errors);
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          routeTemplates.insert('users', newUser, response)
        });
      });
    }
  })
})

router.post('/login', (req, response) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return response.status(400).json(errors);
  }

  let query = `SELECT * FROM users WHERE email = $1`;
  let values = [req.body.email];

  db.query(query, values, (err, res) => {
    if (err) return response.status(400).json(err)
    let user = res.rows[0]
    if (!user) {
      errors.email = 'Invalid Email/Password Combination';
      return response.status(404).json(errors);
    } else {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user._id, name: user.handle };
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            response.json({ success: true, token: 'Bearer ' + token });
          });
        } else {
          return response.status(400).json({ password: 'Invalid Email/Password Combination' });
        }
      })
    }
  })
})

module.exports = router;