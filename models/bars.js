const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
	name: {type: String, required: true},
	busy: {type: String, required: false},
	location: {type: String, required: true},
	_creator:{ type:mongoose.Schema.Types.ObjectId, ref:'user'},

});

barSchema.methods.apiRepr = function() {
	return {
		name: this.name,
		busy: this.busy,
		id: this._id,
		_creator: this._creator,
	};
}

const Bar = mongoose.model('Bar', barSchema);

module.exports = {Bar};