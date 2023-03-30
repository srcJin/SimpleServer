const express = require("express");
const loginForm = require("../forms/login");
const registerForm = require("../forms/register");
const checkAuth = require("../middlewares/checkAuth");
const Users = require("../dal/users");
const hash = require("../utils/hash");
const router = express.Router();

router.get("/", (req, res) => {
  /** Name of user */
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
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.verifyUser(username, password);
  if (!user) {
    req.flash("errors", "Wrong credentials");
    res.redirect("/login");
    return;
  }

  req.session.user = {
    name: user.attributes.username,
  };
  res.redirect("/");
});

router.post("/register", (req, res) => {
  registerForm.handle(req, {
    success: async (newForm) => {
      try {
        await Users.create(
          newForm.data.username,
          newForm.data.password,
          newForm.data.image_url
        );
      } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
          req.flash(
            "errors",
            `Username ${newForm.data.username} already exists`
          );
          res.redirect("/register");
          return;
        }

        req.flash("errors", `Got error while creating user: ${err.code}`);
        res.redirect("/register");
        return;
      }
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
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});
module.exports = router;
