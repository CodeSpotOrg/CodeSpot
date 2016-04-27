const knex = require('../db/knex');

module.exports = {
	ensureAuthenticated:(req,res,next)=>{
		if (req.user) {
			return next();
		} else {
			req.flash('message', 'Please login');
			req.redirect('/users/login')
		}
	},
  ensureAuthorized (req,res,next){
    if(+req.params.user_id === req.user.id)
      return next();
    else {
      req.flash('success',"You don't have permission to visit that page!")
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
}
};