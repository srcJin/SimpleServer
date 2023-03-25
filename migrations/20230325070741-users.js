'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable(
    'users',
    {
      username: { type: 'string', primaryKey: true, notNull: true },
      password: { type: 'string', notNull: true }
    }
  );
  await db.insert('users', ['username', 'password'], ['bee', '123']);
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
