var db = require("../models");

var loginHelpers = function (req, res, next) {
  console.log("req.session: ", req.session);
  req.login = function (user) {
    console.log("user in req.login: ", user);
    console.log("req.session.id: ", req.session.id);
    console.log("user._id: ", user._id);
    req.session.id = user._id;
    console.log("req.session.id: ", req.session.id);
  };

  req.logout = function () {
    req.session.id = null;
  };

  next();
};

module.exports = loginHelpers;
