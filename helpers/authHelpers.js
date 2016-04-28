const knex = require('../db/knex');

module.exports = {
	ensureAuthenticated(req,res,next){
		if (req.user) {
			return next();
		} else {
			req.flash('msg', 'Please login');
			req.redirect('/users/login')
		}
	},
  ensureAuthorized (req,res,next){
    if(+req.params.user_id === req.user.id)
      return next();
    else {
      req.flash('msg',"You don't have permission to visit that page!")
      res.redirect('/users')
    }
  },
  idUser (req,res,next){
    if(req.isAuthenticated()){
      res.locals.currentUser = req.user;
      return next();
    }
    else {
      res.locals.currentUser = undefined;
      return next();
    }
  },
  setRedirect(req,res,next) {
    if (req.body) {
      req.session.url = req.body.url;
    }
    return next();
  },
  showFlashMessage(req,res,next) {
      res.locals.msg = req.flash('msg');
      console.log(res.locals.msg)
    return next();
  }
};