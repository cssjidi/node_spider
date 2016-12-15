var express = require('express');
var router = express.Router();
var events = require("events");
var emitter = new events.EventEmitter();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',route:'index'});
});
module.exports = router;
