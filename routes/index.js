let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const {User, usrGlobal} = require('../models/users')

//ROUTE ROUTE
router.get('/', (req, res) => {
  res.render('location');
});

router.get('/li/:hash/:id/:un', (req, res) => {
  res.render('location');
});

router.get('/location', (req,res) => {
	res.render('location');
});

router.get('/userlogin', (req,res) => {
	res.render('userlogin');
});

router.get('/userlogout', (req,res) => {
  delete usrGlobal.id
  res.redirect('/location');
})

router.get('/createaccount', (req,res) => {
	res.render('createaccount');
});

router.post('/createaccount', (req,res) => {
	console.log('.',req.body),bcrypt;
  const SALT_FACTOR = 5;
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
  		if (err) return err;
  		bcrypt.hash(req.body.password, salt, null, function(err, hash) {
  			if (err) return next(err);
        req.session.usrhash = hash;
        req.session.usrid = usr._id;
        console.log('hash is:',hash, req.session);
  			req.body.password = hash;

        User
      	.create ({
      		username: req.body.username,
      		email: req.body.email,
      		password: req.body.password
      	})
      	.then(
          // console.log('success:', user.password);
      		user => res.status(201).redirect("/"))
      	.catch(err => {
      		console.error(err);
      		res.status(500).json({message: 'Internal server error'});
      	});
  		});
  	});
});

router.post('/login', (req,res)=>{
  User.findOne({username:req.body.username})
  .then(
    (usr) =>{
      bcrypt.compare(req.body.password, usr.password, function(err, status){
    		if(status)
        {
          let pseudoHash = (new Date()* new Date()+'').replace(/\+.*$/,'').replace(/\./g,'');

          User.findByIdAndUpdate(usr._id, { loginToken :  pseudoHash })
		          .exec()
              .then((usr)=>{
                usr.setuid(usr._id)
                res.status(200).redirect('/li'+ '/'+pseudoHash+'/'+usr._id+'/'+usr.username)
              })
              .catch(err=>{ console.log('err:??',err);});
        }
        else{ res.status(403).json({message:'You be wrong yo'}); }
    	});
    }
  )
  .catch(err=>{ console.log('err:',err); })
});

router.get('/')

module.exports = router;
