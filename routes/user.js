let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const {User} = require('../models/users')

router.post('/current', (req, res) => {
	users.findOneAndUpdate({"_id": localStorage.getItem("uid")}, {bars:[req.body.barName]} )
})

module.exports = router;