var routeHelpers = {
  ensureLoggedIn: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      return next();
    }
    else {
     res.redirect('/login');
    }
  },

  ensureCorrectUser: function(req, res, next) {
    db.Puppy.findById(req.params.id, function(err,puppy){
      if (puppy.ownerId !== req.session.id) {
        res.redirect('/users');
      }
      else {
       return next();
      }
    });
  },

  preventLoginSignup: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      res.redirect('/users');
    }
    else {
     return next();
    }
  }
};
module.exports = routeHelpers;
