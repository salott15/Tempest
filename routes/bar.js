let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {Bar} = require('../models/bars')

router.get('/find/:barname/:lat/:lng', (req, res) => {
	let barInfo = {barname: req.params.barname, lat:req.params.lat, lng:req.params.lng}
Bar.findOne(barInfo)
.then(
	(barFromMongo) => {console.log(barFromMongo)
		if(!barFromMongo){
			barFromMongo = barInfo
			barFromMongo.busy = "not rated"
		}

	 res.render("bar", {bar:barFromMongo})
// res.render('bar', {currentBarname:req.params.barname, lat:req.params.lat, lng:req.params.lng});
 console.log("getting bar")})
});

router.get('/status/:status/:boundsLatOne/:boundsLat2/:boundsLngOne/:boundsLng2', (req, res) => {
	//res.render('barStatus', )
	Bar.find({busy: req.params.status, 
		// {'$gte': new Date('3/1/2014'), '$lt': new Date('3/16/2014')}
		//lat: req.body.lat >= localStoarge.getItem("boundsLatOne") && req.body.lat <= localStorage.getItem("boundsLat2"), 
		lat: {'$gte': req.params.boundsLatOne, '$lt': req.params.boundsLat2},
		lng: {'$gte': req.params.boundsLngOne, '$lt': req.params.boundsLng2}
	})
		//lng: req.body.lng >= localStoarge.getItem("boundsLngOne") && req.body.lng <= localStoarge.getItem("boundsLng2")})
	.then(
		bar => {console.log(bar);
			res.render("status", {bars: bar})})
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
      		{busy: req.body.busy, barname: req.body.barname, lat: req.body.lat, lng: req.body.lng},
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

