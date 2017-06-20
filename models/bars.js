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

const Bar = mongoose.model('Bar', barSchema);

module.exports = {Bar};