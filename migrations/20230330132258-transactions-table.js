"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.createTable("transactions", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    amount: { type: "int", notNull: true },
    recipient: "string",
    sender: "string",
    created_at: "bigint", // to support 64-bit integers
  });

  await db.addForeignKey(
    "transactions",
    "users",
    "transactions_user_recipient_fk",
    {
      recipient: "username",
    },
    {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    }
  );

  await db.addForeignKey(
    "transactions",
    "users",
    "transactions_user_sender_fk",
    {
      sender: "username",
    },
    {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    }
  );
};

exports.down = function (db) {
  return db.dropTable("transactions");
};

exports._meta = {
  version: 1,
};
