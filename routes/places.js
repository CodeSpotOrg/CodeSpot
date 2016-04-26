'use strict'
const express = require('express'),
      router = express.Router({mergeParams:true});


router.get('/',(req,res)=>{
	console.log('Query:',req.query);
	res.render('site_views/index');
});

// router.get('/',(req,res)=>{
// 	res.render('site_views/index.jade');
// });
module.exports = router;