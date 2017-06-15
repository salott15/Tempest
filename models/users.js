const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
});

userSchema.methods.apiRepr = function() {
	return {
		username: this.username,
		email: this.email,
		password: this.password,
		id: this._id,
	};
}

const User = mongoose.model('User', userSchema);

module.exports = {User};