let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const {User} = require('../models/users')

router.get('/mybars', (req, res) => {
	console.log(User.getuid())
	//User.findOne("_id":  )
  res.render('mybars');
});

router.get('/mybars/:username/:bars', (req, res) => {
	//I know this is going to be something like lines 9-22 of bar.js, but I am not quite sure what I need. 
})

router.post('/current', (req, res) => {
	console.log(req.body)
	User.findOneAndUpdate({"_id": req.body.uid}, {$push: {bars: {barName: req.body.barid}}})
	//.then(res.status(302).redirect("/mybars"))
	.then((newBar)=>{ console.log(newBar,res.redirect)
		res.redirect("/user/mybars")
	})
	.catch((e)=>console.log(e))
})

module.exports = router;