var express = require('express');
var router = express.Router();
var process = require('process');
var Spider = require('../models').Spider;
const mongoose = require('mongoose');
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send(result());
  console.log(12341234124123);
  var urls = 'https://baidu.com';
  res.render('spider',{title:'爬虫',route:'spider'});
});

router.get('/list',function(req,res,next){
    //Spider.save(req);
    //console.log(req.body);
    console.log(Spider.fetch);
    // Spider.fetch(function (result) {
    //     console.log(result);
    // });
    Spider.find(function(err,result){
        console.log(typeof result)
        if(err){
            console.log(err.message);
            res.send(404);
        }else {
            res.render('spider_list', {title: '爬虫规则列表', route: 'spider', lists: result});
        }
    })

});


router.post('/post',function(req,res,next){
    Spider.create(req.body,function (err,spider) {
        if(err) console.log(err)
        console.log(spider);
    })
    // Spider.save(req.body,function (err,res) {
    //     if(err) console.log(err);
    //     console.log(res);
    // });
    //console.log(req.body);
    //res.render('spider_list',{title:'爬虫规则列表',route:'spider'});
});

module.exports = router;
