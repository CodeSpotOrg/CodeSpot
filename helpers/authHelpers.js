const knex = require('../db/knex');

module.exports = {
	ensureAuthenticated(req,res,next){
		if (req.user) {
			return next();
		} else {
			req.flash('msg', 'Please login');
			res.redirect('/')
		}
	},
  ensureAuthorized (req,res,next){
    if (req.user) {
      if(req.params.id == req.user.id){
        res.locals.owner = true;
      }
      else {
        res.locals.owner = false;
      }
    }
    return next();
  },
  idUser (req,res,next){
    if(req.isAuthenticated()){
      res.locals.currentUser = req.user;
    }
    else {
      res.locals.currentUser = undefined;
    }
    return next();
  },
  setRedirect(req,res,next) {
    if (req.body) {
      req.session.url = req.body.url;
    }
    return next();
  },
  showFlashMessage(req,res,next) {
    res.locals.msg = req.flash('msg');
    return next();
  }
};