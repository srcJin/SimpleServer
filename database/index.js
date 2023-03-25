const bookshelf = require('bookshelf');
const knex = require('knex');
const database = knex({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
  }
});

const orm = bookshelf(database);

module.exports = orm;
