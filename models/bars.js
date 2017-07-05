const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
	name: {type: String, required: true},
	busy: {type: String, required: false},
	barId: {type: String, required: true},
	lat: {type: Number, required: true},
	lng: {type: Number, required: true}

});

barSchema.methods.apiRepr = function() {
	return {
		name: this.name,
		busy: this.busy,
		id: this._id
	};
}

const Bar = mongoose.model('Bar', barSchema);

module.exports = {Bar};