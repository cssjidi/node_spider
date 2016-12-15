const cheerio = require('cheerio');
const request = require('request');
const url = require('url');
const async = require('async');
var resObj = [];
var process = require('process');
process.on('message', function(m) {
	if(m.action === 'start'){
		//console.log('CHILD got message:', m);
		new cjdSpider().init();
	}
});
//process.send({ foo: 'bar' });

function cjdSpider(){
	this.config = {
		start:1,
		end:3,
		baseUrl:'https://u15.info/page/%%',
		urls:[]
	}
	this.pageList = [];
	this.desc = [];
}

cjdSpider.prototype = {
	//constructor:cjdSpider,23.
	init:function(){
		var self = this;
		this.getUrls();
		this.getLevelpage(function(){
			self.getDetail();
		});
		return this;
	},
	getUrls : function(){
		var self = this;
		for(var i=this.config.start;i<=this.config.end;++i){
			this.config.urls.push(this.config.baseUrl.replace('%%',i));
		}
		//console.log(this.config.urls);
		return this.config.urls;
	},
	getLevelpage:function(fn){
		var self = this;
		//console.log(this.config.urls);
		self.log('共：'+this.config.urls.length+'页，正在努力爬取','yellow');
		async.eachSeries(this.config.urls,function(item,callback){
			// console.log(item)
			// callback();
			setTimeout(function(){
				self.request(item,function(dom){
					var $ = dom;
					if(!!dom){
						$('#primary-content>.post').each(function(){
							var arr = {
								title:$(this).find('.title a').text(),
								url:$(this).find('.title a').attr('href')
							}
							self.pageList.push(arr);
						});
						//console.log(self.pageList)
						//console.log(item)
						callback();
					}
				});
				//console.log(self.pageList)
			},Math.random()*1000);
		},function(err){
			if(err){
				//console.log('error:'+err);//
				self.log('错误：'+err,'red');
			}else{
			self.log('收集完成，共收集到'+self.pageList.length+'文章','green');
			//console.log(self.pageList);
			}
			fn();
		});
	},
	request:function(url,callback){
		var self = this;
		request(url,function(err,res,body){
			if(err && res.statusCode !== 200) self.log('请求错误：'+err,'red');
			var $ = cheerio.load(body);
			callback.call(this,$);
		});
	},
	getDetail:function(){
		var self = this;
		async.eachSeries(this.pageList,function(item,callback){
			// console.log(item)
			// callback();
			setTimeout(function(){
				self.request(item,function(dom){
					var $ = dom;
					var imgs = [];
					if(!!dom){
						$('.post-content').find('img').each(function(){
									imgs.push($(this).attr('src'));
									return imgs;
								})
						var arr = {
							title:$('h1.title').text(),
							desc:$('.post-content').html(),
							img: imgs
						}
						//console.log(self.desc)
						self.desc.push(arr);
						//console.log(self.pageList)
						//console.log(item)
						callback();
					}
				});
				//console.log(self.pageList)
			},Math.random()*1000);
		},function(err){
			if(err){
				self.log('请求错误：'+err,'red');
			}else{
			self.log('收集完成，共收集到'+self.desc.length+'文章','green');
			//console.log(self.pageList);
			}
			//fn();
		});
	},
	log:function(info,color){
		process.send(JSON.stringify({ color: color || '', info: info }));
	}
}

//module.exports = new cjdSpider();