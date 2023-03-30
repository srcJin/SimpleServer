const express = require("express");
const transferForm = require("../forms/transfer");
const checkAuth = require("../middlewares/checkAuth");
const Transactions = require("../dal/transactions");
const router = express.Router();

router.get("/transfer", checkAuth, (req, res) => {
  res.render("transfer", {
    form: transferForm.toHTML(),
  });
});

router.post("/transfer", checkAuth, (req, res) => {
  transferForm.handle(req, {
    success: async (newForm) => {
      const { amount, recipient } = newForm.data;

      const txn = await Transactions.create(recipient, amount);

      res.render("receipt", {
        transaction: txn.toJSON(),
      });
    },
    error: (newForm) => {
      res.render("transfer", {
        form: newForm.toHTML(),
      });
    },
    empty: (newForm) => {
      res.render("transfer", {
        form: newForm.toHTML(),
      });
    },
  });
});

module.exports = router;
