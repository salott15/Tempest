let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

router.get('/find/:barname/:lat/:lng', (req, res) => {
 res.render('bar', {currentBarname:req.params.barname});
 console.log("getting bar")
});

router.post('/current', (req, res) => {
	console.log(req.body)
})

module.exports = router;

