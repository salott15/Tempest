let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
	name: {type: String, required: true},

});

barSchema.methods.apiRepr = function() {
	return {
		name: this.name,
		id: this._id,
	};
}

router.get('/', (req, res) => {
 // res.render('landing');
 console.log("getting bar")
});

router.post('/WHATEVER', (req, res) => {
	console.log(req.body)
})

module.exports = router;

