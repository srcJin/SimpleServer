const Transaction = require("../models/transaction");

module.exports = {
  async create(recipient, amount) {
    const txn = new Transaction({
      recipient,
      amount,
    });
    return await txn.save();
  },

  async listByUser(username) {},
};
