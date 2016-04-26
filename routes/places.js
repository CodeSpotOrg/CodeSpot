const express = require('express'),
      router = express.Router({mergeParams:true});

      router.get('/', function(req,res){
      	res.render('site_views/index.jade', {authors: author});
      })

module.exports = router;