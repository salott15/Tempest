let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const {User, usrGlobal} = require('../models/users')

router.get('/mybars', (req, res) => {
	console.log('usrGlobal.id',usrGlobal.id);
	User.findOne({"_id":usrGlobal.id})
	.then((usr) =>{
		console.log('barsRES:',usr);
		let tmpBars = [];
		usr.bars.map((itm) => {
			if(itm)
			{
				let uniq = true;
				for (var i = 0; i < tmpBars.length; i++)
				{ if( tmpBars[i] === itm.barName ){ uniq = false; } }
				if(uniq){ tmpBars.push(itm.barName); }
			}
			console.log('?????');
		})
		console.log('tmpBars:',tmpBars);
		usr.uniqueBars = tmpBars;
		console.log('usr.uniqueBars:',usr.bars);

		if(!usr){ res.redirect('/userlogin'); return; }
		res.render('mybars',{user:usr});
	})
	.catch((e)=>res.redirect('/userlogin'))
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
