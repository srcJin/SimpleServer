const database = require("../database/index");

const User = database.model("User", {
  tableName: "users",
  idAttribute: "username",

  transactions() {
    return this.hasMany("Transaction");
  },
});

module.exports = User;
