const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
	name: {type: String, required: true},
	busy: {type: String, required: false},
	_creator:{ type:mongoose.Schema.Types.ObjectId, ref:'user'},

});

barSchema.methods.apiRepr = function() {
	return {
		name: this.name,
		id: this._id,
		_creator:{ type:mongoose.Schema.Types.ObjectId, ref:'user'},
	};
}

const Bar = mongoose.model('Bar', barSchema);

module.exports = {Bar};