let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

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
	console.log(req.params);
	User 
	.create ({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then(
		user => res.status(201).json(user.apiRepr()))
	.catch(err => {
		console.error(err);
		res.status(500).json({message: 'Internal server error'});
	});
});

router.get('/')

module.exports = router;


