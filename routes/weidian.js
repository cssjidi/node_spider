var express = require('express');
var router = express.Router();
var process = require('process');
var request = require('request');
var cheerio= require('cheerio');
var weidian= require('../components/weidian');
var async = require('async');

var html = '';
router.get('/',function(req,res,next){
		res.render('weidian',{title:'微店',route:'weidian'});
	}).post('/',function(req,res,next){
		console.log(req.body.text);
		var text = req.body.text;
		if(text == null) return;
		var urls = text.split('\n');
		weidian.start(urls,function(){
			res.send('<h3>处理完成，3秒后返回首页</h3><script>setTimeout(function(){window.location.href="/weidian"},3000)</script>');
		});
		/*
		for(var i=0,len=urls.length;i<len;i++){
			if(urls[i]!==null){
				weidian.request(urls[i],function($$){
					html = weidian.loadData($$);
					var imgs = html.result.Imgs;
					weidian.dlImages(html.result,function(){
						res.send('<h3>处理完成，3秒后返回首页</h3><script>setTimeout(function(){window.location.href="/weidian"},3000)</script>');
					});
					//console.log(html);
					//res.send(html);
				})
			}
		}
		*/
		//res.render('weidian',{title:'微店',route:'weidian'});
	})

module.exports = router;