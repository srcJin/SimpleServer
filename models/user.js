const database = require('../database/index');

const User = database.model('User', {
  tableName: 'users',
  idAttribute: 'username',
});

module.exports = User;
