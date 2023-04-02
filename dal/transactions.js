const Transaction = require("../models/transaction");

module.exports = {
  async create(sender, recipient, amount) {
    const txn = new Transaction({
      sender,
      recipient,
      amount,
      created_at: Date.now(), // Use the current unix timestamp in milliseconds as the txn creation time
    });
    return await txn.save();
  },

  async listByUsername(username) {
    return await Transaction.collection().query(function() {
      this.where({ recipient: username })
      .orWhere({ sender: username })
    })
      .orderBy("created_at", "DESC")
      .fetch();
  },
};
