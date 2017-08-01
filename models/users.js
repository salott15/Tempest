const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	loginToken: {type: String, required: true, default:'new'},
	bars: [{ barName: String}]
});

let usrGlobal = {};

userSchema.methods.apiRepr = function() {
	return {
		username: this.username,
		email: this.email,
		password: this.password,
		loginToken: '',
		id: this._id,
		bars: this.bars,
	};
};
userSchema.methods.setuid = function(uid){
	usrGlobal.id = uid;
	return(true)
}

userSchema.methods.getuid = function(uid){
	return(this.uid)
}
userSchema.methods.validPassword = function(savedPassword, enteredPassword) {
	bcrypt.compare(enteredPassword, savedPassword, function(err, status){
		loginStatus(status);
	});
	let successPassword = false;
	function loginStatus(bool){ console.log('bool',bool,':',successPassword); successPassword = bool; }
	return setTimeout(function(){ console.log('timeout',successPassword); return successPassword; })
}

const User = mongoose.model('User', userSchema);

module.exports = {User, usrGlobal};
