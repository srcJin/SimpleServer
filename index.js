require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const session = require('express-session');
const flash = require('connect-flash');
const csurf = require('csurf');
const cloudinary = require('cloudinary').v2;
var FileStore = require('session-file-store')(session);

const userRoutes = require('./routes/users');
const bankRoutes = require('./routes/bank');
const uploadRoutes = require('./routes/upload');

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

hbs.handlebars.registerPartial(
  "csrf",
  "<input type=\"hidden\" value=\"{{token}}\" name=\"_csrf\" />"
);

const App = express();

const csrfProtection = csurf();

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

App.use(csrfProtection);

App.use(function (req,res,next) {
  console.log(req.method, req.path);
  next();
});

App.use(function (req, res, next) {
  res.locals.errors = req.flash("errors");
  res.locals.token = req.csrfToken();
  next();
});

App.use(userRoutes);
App.use('/bank', bankRoutes);
App.use('/upload', uploadRoutes);


App.listen(3000, () => {
  console.log("Listening on port 3000");
});