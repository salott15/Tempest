let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const {User} = require('../models/users')

router.post('/current', (req, res) => {
	console.log(req.body)
	User.findOneAndUpdate({"_id": req.body.uid}, {$push: {bars: {barName: req.body.barid}}})
	//.then(res.redirect("/mybars"))
	.then((newBar)=>{ console.log(newBar,res.redirect)
		setTimeout( function(){ res.redirect('/mybars') },1000)
		res.end()})
	.catch((e)=>console.log(e))
})

module.exports = router;