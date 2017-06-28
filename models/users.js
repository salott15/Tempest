const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	bars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bar' }]
});

userSchema.pre('save', function(next) { 
	const user = this, SALT_FACTOR = 5; 
	if (!user.isModified('password')) return next(); 
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) { 
		if (err) return next(err); 
		bcrypt.hash(user.password, salt, null, function(err, hash) { 
			if (err) return next(err); 
			user.password = hash; next(); 
		}); 
	}); 
});

userSchema.methods.apiRepr = function() {
	return {
		username: this.username,
		email: this.email,
		password: this.password,
		id: this._id,
		bars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bar' }]
	};
};

userSchema.methods.validPassword = function(savedPassword, enteredPassword) {
	return bcrypt.compare(enteredPassword, savedPassword, function(o, ol){
		return ol;

	});
}

const User = mongoose.model('User', userSchema);

module.exports = {User};