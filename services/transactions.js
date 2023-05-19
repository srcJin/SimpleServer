const Transactions = require("../dal/transactions");

class TransactionsService {
  constructor(username) {
    this.username = username;
  }

  async transferTo(recipient, amount) {
    if (recipient === this.username) {
      throw new Error("Cannot send money to yourself at the moment");
    }
    const txn = await Transactions.create(this.username, recipient, amount);
    return txn.toJSON();
  }

  async listTransactions() {
    const txns = await Transactions.listByUsername(this.username);
    const txnList = txns.toJSON();

    return txnList.map((t) => { // t = one transaction, t comes from txnList
      let debit = 0,
        credit = 0,
        description = "";
      if (t.recipient === this.username) {
        debit = t.amount;
        description = `Receive from ${t.sender}`;
      } else if (t.sender === this.username) {
        credit = t.amount;
        description = `Send money to ${t.recipient}`;
      }

      return {
        debit: debit,
        credit: credit,
        time: new Date(t.created_at).toDateString(),
        description: description,
        status: t.status,
      };
    });
  }
}

module.exports = TransactionsService;
