
function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.status(403).send("FORBIDDEN");
    return;
  }
  next();
}

module.exports = checkAuth;
