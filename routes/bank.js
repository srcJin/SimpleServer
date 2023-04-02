const express = require("express");
const transferForm = require("../forms/transfer");
const checkAuth = require("../middlewares/checkAuth");
const TransactionsService = require("../services/transactions");
const router = express.Router();

router.use(checkAuth);

router.get("/transfer", (req, res) => {
  res.render("bank/transfer", {
    form: transferForm.toHTML(),
  });
});

router.post("/transfer", (req, res) => {
  transferForm.handle(req, {
    success: async (newForm) => {
      const { amount, recipient } = newForm.data;

      const svc = new TransactionsService(req.session.user.name);
      const txn = await svc.transferTo(recipient, amount);

      res.render("bank/receipt", {
        transaction: txn,
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

router.get("/transactions", async (req, res) => {
  const svc = new TransactionsService(req.session.user.name);
  const txns = await svc.listTransactions();

  res.render("bank/transactions", {
    transactions: txns,
  });
});

module.exports = router;
