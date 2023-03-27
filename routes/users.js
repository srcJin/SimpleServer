const express = require("express");
const loginForm = require("../forms/login");
const User = require("../models/user");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth')
const registerForm = require('../forms/register')
const hash = require('../utils/hash')


router.get("/", (req, res) => {
  let name = "";
  if (req.session.user) {
    name = req.session.user.name;
  }
  res.render("index", {
    name: name,
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    form: loginForm.toHTML(),
    errors:errors,
  });
});

router.get("/account", checkAuth, (req, res) => {
  res.status(200).send("GOOD JOB");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let foundUser = null;
  try {
    foundUser = await User.collection()
      .where({ username: username })
      .fetchOne();
  } catch {
    console.error("Cannot find user", username);
  }

  if (foundUser && foundUser.attributes.password === hash(password)) {
    // Login the user
    req.session.user = {
      name: foundUser.attributes.username,
    };
    res.redirect("/");
    return;
  }
  // so here errors is the name of where flash store the messages
  req.flash('errors','Wrong credentials')
  res.redirect("/login");
});

router.post("/register", (req, res) => {
  registerForm.handle(req, {
    success: async (newForm) => {
      let users = await User.collection()
        .where({ username: newForm.data.username })
        .fetch();
      if (users.length > 0) {
        // TODO Flash message to user that this username already exists

        req.flash('errors',`Username ${newForm.data.username} already exists`);

        res.render("register", {
          form: newForm.toHTML(),
        });
        return;
      }

      let user = new User({
        username: newForm.data.username,
        password: hash(newForm.data.password),
      });
      await user.save(null, { method: "insert" });

      res.redirect("/login");
    },
    error: (newForm) => {
      res.render("register", {
        form: newForm.toHTML(),
      });
    },
    empty: (newForm) => {
      res.render("register", {
        form: newForm.toHTML(),
      });
    },
  });
});

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }
  res.render("register", {
    form: registerForm.toHTML(),
  });
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});
module.exports = router;
