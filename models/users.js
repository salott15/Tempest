const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	loginToken: {type: String, required: true, default:'new'},
	bars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bar' }]
});

// userSchema.pre('save', function(next) {
// 	const user = this, SALT_FACTOR = 5;
// 	if (!user.isModified('password')) return next();
// 	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
// 		if (err) return next(err);
// 		bcrypt.hash(user.password, salt, null, function(err, hash) {
// 			if (err) return next(err);
// 			user.password = hash; next();
// 		});
// 	});
// });

userSchema.methods.apiRepr = function() {
	return {
		username: this.username,
		email: this.email,
		password: this.password,
		loginToken: '',
		id: this._id,
	};
};

userSchema.methods.validPassword = function(savedPassword, enteredPassword) {
	bcrypt.compare(enteredPassword, savedPassword, function(err, status){
		loginStatus(status);
	});
	let successPassword = false;
	function loginStatus(bool){ console.log('bool',bool,':',successPassword); successPassword = bool; }
	return setTimeout(function(){ console.log('timeout',successPassword); return successPassword; })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
