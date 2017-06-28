let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
 // res.render('landing');
 console.log("getting bar")
});

router.post('/current', (req, res) => {
	console.log(req.body)
})

module.exports = router;

