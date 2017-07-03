let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {Bar} = require('../models/bars')

router.get('/find/:barname/:lat/:lng', (req, res) => {
 res.render('bar', {currentBarname:req.params.barname, lat:req.params.lat, lng:req.params.lng});
 console.log("getting bar")
});

router.post('/current', (req, res) => {
	console.log(req.body)
});

router.put('/current', (req, res) => {
	console.log('updating bar', encodeURI(req.body.barId))
	res.json({"hello": "world"})

	Bar
      	.findOneAndUpdate ({
      		barId: encodeURI(req.body.barId),
      	},
      		{busy: req.body.busy, barname: req.body.barname},
      		{upsert: true}
      	)
      	.then(
           console.log('success:', Bar))
      		//user => res.status(201).redirect("/"))
      	.catch(err => {
      		console.error(err);
      		res.status(500).json({message: 'Internal server error'});
      	});

})

module.exports = router;

