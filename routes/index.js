let express = require('express');
let router = express.Router();

//ROUTE ROUTE
router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/location', (req,res) => {
	res.render('location');
});

module.exports = router;


