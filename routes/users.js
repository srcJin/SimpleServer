const express = require('express');
const loginForm = require('../forms/login');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req,res) => {
  let name = '';
  if (req.session.user) {
    name = req.session.user.name;
  }
  res.render('index', {
    name: name,
  });
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    form: loginForm.toHTML(),
  });
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  let foundUser = null;
  try {
    foundUser = await User.collection()
      .where({username: username}).fetchOne();
  }catch {
    console.error("Cannot find user", username);
  }

  if (foundUser && foundUser.attributes.password === password) {
    // Login the user
    req.session.user = {
      name: foundUser.attributes.username,
    }
    res.redirect('/');
    return;
  }
  
  res.redirect('/login');
})

router.get('/register', (req, res) => {
  res.send('OK');
})

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
})
module.exports = router;