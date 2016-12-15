var https = require('https');
var superagent = require('superagent');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var urls = [
	'https://login.weidian.com/weidian/loginAsSeller',
	'https:baidu.com'
	];
var params = {
	param:{"client_type":"PC","country_code":86,"telephone":"13560093057","password":"a33521053"},
callback:'post_1481814284547_14247129677362702',
redirect_url:'https://d.weidian.com/login_direct.php'
}


superagent.post(urls[0])
//.query('client_type=PC&country_code=86&telephone=13560093057&password=a33521053&callback=post_1481813297434_4932188189969611&redirect_url=https://weidian.com/login_direct.php')
//.send(JSON.stringify(params))
.query(JSON.stringify(params))
.set('Content-Type', 'application/json')
//.set('Content-Type', 'text/html')
.set('User-Agent','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.1708.400 QQBrowser/9.5.9635.400')
//.send(JSON.stringify('{"client_type":"pc","country_code":"86",telephone":"13560093057","password":"a33521053"}'))
.end(function(err,res){
	console.log(res.text);
})