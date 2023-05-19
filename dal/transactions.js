const Transaction = require("../models/transaction");
const {TransactionStatus} = require('../utils/constants');

module.exports = {
  async create(sender, recipient, amount) {
    const txn = new Transaction({
      sender,
      recipient,
      amount, 
      status: Math.random() < 0.5 ? TransactionStatus.Failure : TransactionStatus.Success, // a random value for status
      // lable the constants by defining constants in utils then import
      // status: Math.floor(Math.random() * 2),
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
