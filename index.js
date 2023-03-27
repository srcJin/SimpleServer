require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const session = require('express-session');
const flash = require('connect-flash');
var FileStore = require('session-file-store')(session);

const userRoutes = require('./routes/users');
const bankRoutes = require('./routes/bank');

const App = express();

App.set('view engine', 'hbs');

App.use(flash());

App.use(
  express.urlencoded({
    extended: false
  })
);

App.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
}));

App.use(function (req,res,next) {
  console.log(req.method, req.path);
  next();
});

// Register Flash middleware
App.use(function (req, res, next) {
  res.locals.errors = req.flash("errors");
  next();
});

App.use(userRoutes);
App.use('/bank', bankRoutes);


App.listen(3000, () => {
  console.log("Listening on port 3000");
});