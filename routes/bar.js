let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

router.get('/find/:barname/:lat/:lng', (req, res) => {
 res.render('bar', {currentBarname:req.params.barname, lat:req.params.lat, lng:req.params.lng});
 console.log("getting bar")
});

router.post('/current', (req, res) => {
	console.log(req.body)
});

router.put('/current', (req, res) => {
	console.log('updating bar', req.body.barId)
	res.json({"hello": "world"})
})

module.exports = router;

