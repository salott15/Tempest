let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
 // res.render('landing');
 console.log("getting bar")
})

module.exports = router;