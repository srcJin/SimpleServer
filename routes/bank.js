const express = require('express');
const transferForm = require('../forms/transfer');
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();

router.get('/transfer', checkAuth, (req, res) => {
  res.render('transfer', {
    form: transferForm.toHTML(),
  })
})

router.post('/transfer', checkAuth, (req, res) => {
  res.send(`Successfully transferred $${req.body.amount} to ${req.body.recipient}`);
});


module.exports = router;