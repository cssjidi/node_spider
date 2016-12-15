var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mkdirp = require('mkdirp');

var weidian = function(config) {
    this.savePath = path.resolve('./save');
}

var color = {
	red:'#990000',
	green:'#00CC00',
	orange:'#FF9900'
}

weidian.prototype.start = function(urls,callback) {
    var self = this;
    
    async.eachOfSeries(urls, function(item,index, fn) {
		self.request(item,function($$){
			var data = self.loadData($$);
			self.log(color.green,'正在爬取第{0}页,共{1}页'.format(index+1,urls.length));
			self.dlImages(data.result,function(){
				setTimeout(function(){
					fn();
				},Math.random()*2000);
			});
		})
    },function(err){
    	if(err) self.log(color.red,'错误：'+err);
		self.log(color.green,'爬取完成');
		callback();
    })
}

weidian.prototype.request = function(uri, callback) {
    request(uri, function(err, res, body) {
        if (err && res.statusCode !== 200) {
            console.log('error:' + err);
        }
        var $ = cheerio.load(body);
        callback($);
    })
    return this;
}


weidian.prototype.loadData = function($$) {
    //console.log($$);
    var $ = $$;
    //console.log($('body').find('script').toString());
    //var str = $('script').toString();
    var detail_string;
    $('script').each(function(index, item) {
        var reg = /itemInfo\ = ({.*}});/;
        //var getStr = reg.exec(str);
        var detail = ($(item).toString()).replace(/\<br\ \\\/\>/, '');
        //console.log(item);
        if (reg.test(detail)) {
            detail_string = reg.exec(detail);
        }

    });

    //console.log(getStr[1].split(/[\r\n]/).length);
    return JSON.parse(detail_string[1]);
}

weidian.prototype.dlImages = function(args, _callback) {
    var self = this;
    var pathName = path.join(self.savePath, args.itemID);
    mkdirp.sync(pathName);
    self.text(pathName + '/' + args.itemID + '.html', args);
    async.eachOfSeries(args.Imgs, function(item,index, fn) {
            var file_name = url.parse(item).pathname.split('/').pop();
            fs.exists('file_name', function(exists) {
                    if (exists) {
                        self.log(color.orange,'文件已存在');
                    } else {
                        var file = fs.createWriteStream(path.join(pathName, file_name));
                        https.get(item, function(res) {
                            res.on('data', function(data) {
                                file.write(data);
                            }).on('end', function() {
                                file.end();
                                self.log(color.green,(file_name + ' 已下载第{0}张图片到 '.format(index+1) + pathName));
                                fn();
                            });
                        });
                    }
                })
                //file.end();
                //console.log(file_name + ' downloaded to ' + self.savePath + '/' + args.itemID + '/');
                //fn();

        },
        function(err) {
            if (err) self.log(color.red,'错误：'+err);
            self.log(color.green,'下载完成');
            _callback('下载完成');
        })
}

weidian.prototype.text = function(fileName, args) {
    var content = '<!doctype><html lang="en"><head><title>spider</title><meta charset="utf-8"/></head><body><div><h3>产品ID：</h3><input type="text" value="' + args.itemID + '" /></div>';
    content += '<div><h3>产品描述：</h3><textarea rows="10" cols="100">' + args.itemName + '</textarea></div>';
    content += '<div><h3>产品属性：</h3>';
    if (args.sku.length > 0) {
        args.sku.forEach(function(attr) {
            content += '<div style="border-bottom:1px solid #ccc;margin-bottom:20px;padding-bottom:20px;"><div><label>型号：</label><input type="text" value="' + attr.title + '" /></div><div><label>库存：</label><input type="text" value="' + attr.stock + '" /></div><div><label>售价：</label><input type="text" value="' + parseInt(attr.price) + '" /></div></div></div>';
        });
    }else if(!isNaN(args.price, 10)){
		content += '<div style="border-bottom:1px solid #ccc;margin-bottom:20px;padding-bottom:20px;"><div><label>型号：</label><input type="text" value="' + args.seller_id + '" /></div><div><label>库存：</label><input type="text" value="' + args.stock + '" /></div><div><label>售价：</label><input type="text" value="' + parseInt(args.price) + '" /></div></div></div>';
    }
    content += '</body></html>';
    fs.writeFileSync(fileName, content, 'utf-8');
}

weidian.prototype.log = function(color,info){
	console.log(JSON.stringify({ color:color, info: info }));
	//process.send(JSON.stringify({ color: color || '', info: info }));
};

String.prototype.format = function () {
    var formatted = this;
    var length = arguments.length;
    for (var i = 0; i < length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        var value = arguments[i];
        if (value === null || value === undefined)
            value = '';
        formatted = formatted.replace(regexp, value);
    }
    return formatted;
};

module.exports = new weidian();
