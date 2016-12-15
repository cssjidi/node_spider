var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user',{title:'用户中心',active:'user'});
});

module.exports = router;
