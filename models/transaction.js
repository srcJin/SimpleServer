const database = require("../database/index");

const Transaction = database.model("Transaction", {
  tableName: "transactions",
  user() {
    return this.belongsTo("User");
  },
});

module.exports = Transaction;
