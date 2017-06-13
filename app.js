var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('Hello world !!!');
});

var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s',host,port);
});

//将所有的（/）url或路由返回“hello world”字符串，对其他所有路径全部返回404 not found。
//req（请求）和res(响应) 与node提供的对象完全一致，所以可以调用req.pipe() , req.on("data",callback)以及任何nodet提供的方法


//express应用生成器 快速构建一个应用的骨架
// 1.npm install express-generator -g  2.express myapp 3.npm install 4.npm start

