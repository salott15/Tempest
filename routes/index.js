let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
LocalStrategy  = require('passport-local').Strategy,

mongoose.Promise = global.Promise;

const {User} = require('../models/users')

//ROUTE ROUTE
router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/location', (req,res) => {
	res.render('location');
});

router.get('/userlogin', (req,res) => {
	res.render('userlogin');
});

router.get('/createaccount', (req,res) => {
	res.render('createaccount');
});

router.post('/createaccount', (req,res) => {
	console.log(req.body);
	User 
	.create ({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then(
		user => res.status(201).redirect("/"))
	.catch(err => {
		console.error(err);
		res.status(500).json({message: 'Internal server error'});
	});
});

passport.use(new LocalStrategy( function(username, password, done) { 
	User.findOne({ username: username }, function (err, user) { 
		console.log(user, password);
		if (err) { 
			return done(err); 
		} 
		if (!user) { 
			return done(null, false, { message: 'Incorrect username.' }); 
		} 
		console.log(user.validPassword(user.password, password));
		if (!user.validPassword(user.password, password)) { 
			return done(null, false, { message: 'Incorrect password.' }); 
		} 
		console.log(user)
		return done(null, user); 
	}); 
} ));

router.post('/login', passport.authenticate('local', { successRedirect: '/',
     failureRedirect: '/userlogin' }));

router.get('/')

module.exports = router;


