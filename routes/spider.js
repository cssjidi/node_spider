var express = require('express');
var router = express.Router();
var process = require('process');
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send(result());
  console.log(12341234124123);
  var urls = 'https://u15.info';
  var resObj = [
	  {
	  	title:'134'
	  },
	  {
	  	title:'ad'
	  },
	  {
	  	title:'dfg'
	  },
	  {
	  	title:'ergerg'
	  },
  ]
  res.render('spider',{title:'爬虫',route:'spider'});
});

router.get('/spider/list',function(req,res,next){
	res.render('spider_list',{title:'爬虫规则列表',route:'spider'});
})

module.exports = router;
