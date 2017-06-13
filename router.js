//一个简单的express路由
//路由是由一个url(或者叫路径)和一个特定的HTTP方法（get,post等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。
//对网站首页访问返回“hello world” 字样
app.get("/",function(req,res){
	res.send("Hello world!!!");
})
//网站接受post请求
app.post("/",function(req,res){
	res.send("go a post request");
})
// /user节点接受put请求
app.put("/user",function(req,res){
	res.send("go a post request at /user");
})
// /user节点接受delete请求
app.delete('/user',function(req,res){
	res.send('go a delete request at /user')
})

//app.all()特殊的路由方法，没有任何http方法与其对应，作用就是对于一个路径上的所有请求加载中间件。
//来自‘select’的请求，不管使用get，post，put，delete 或其他任何http模块支持的http请求，句柄都会得到执行。
app.all("/select",function(req，res,next){
	console.log('accessing the secret section ...');
	next();
})

//路由路径:路由路径和请求方法一起定义了请求的端点，它可以是字符串，字符串模式或者正则表达式。
//匹配根路径的请求
app.get('/',function(req,res){
	res.send('root');
});
//匹配 /about 路径的请求
app.get('/about',function(req,res){
	res.send('about');
})
//匹配 /random.text 路径的请求
app.get('/random.text',function(req,res){
	res.send('random.text');
})


//使用字符串模式的路由路径：(?，+，* ，（）正则表达式的子集， -和. 在基于字符串的路径中按照字面值解释)
//匹配acd和abcd
app.get('/ab?cd',function(req,res){
	res.send('ab?cd');
});
//匹配abcd,abbcd,abbbcd 等
app.get('/ab+cd',function(req,res){
	res.send('ab+cd');
});
//匹配abcd,abxcd,abRABDOMcd,ab123cd等
app.get('ab*cd',function(req,res){
	res.send('ab*cd');
});
//匹配 /abe , /abcde
app.get('/ab(cd)?e',function(req,res){
	res.send('ab(cd)?e');
});

//使用正则表达式的路由路径示例
//匹配任何路径中含有a的路径
app.get(/a/,function(req,res){
	res.send('/a/');
});
//匹配butterfly，dragonfly,不匹配butterflyman,dragonfly,man等
app.get(/.*fly$/,function(req,res){
	res.send('/.*fly$/');
});

//路由句柄 (可以为请求处理提供多个回调函数，其行为类似中间件。唯一的区别是这些回调函数有可能调用next('route') 方法而略过其他路由回调函数。)可以利用改机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。
//路由句柄有多钟形式，可以是一个函数，也可以是函数数组，或者是两者混合
//使用一个回调函数处理路由：
app.get('/example/a',function(req,res){
	res.send('Hello from A!');
});
//使用多个回调函数处理路由（记得指定next对象）
app.get('/example/b',function(req,res,next){
	console.log('response will be sent by the next function ...');
	next();
},function(req,res){
	res.send('Hello from B!');
});
//使用回调函数数组处理路由
var cb0 = function(req,res,next){
	console.log('CB0');
	next();
}
var cb1 = function(req,res,next){
	console.log('CB1');
	next();
}
var cb2 = function(req,res){
	res.send('Hello from C!');
}
app.get('/example/c',[cb0,cb1,cb2]);

//混合使用函数和函数数组处理路由：
var cb0 = function(req,res,next){
	console.log('cb0');
	next();
}
var cb1 = function(req,res,next){
	console.log('cb1');
	next();
}
app.get('/example/d',[cb0,cb1],function(req,res,next){
	console.log('response will be sent by the next function ...');
	next();
},function(req,res){
	res.send('hello from D!');
})

//响应方式
//1.app.route() 创建路由路径的链式路由句柄，由于路径在一个地方指定，这样有助于创建模块化的路由，减少代码冗余和拼写错误。
app.route('/book')
	.get(function(req,res){
		res.send('Get a random book');
	})
	.post(function(req,res){
		res.send('Add a book');
	})
	.put(function(req,res){
		res.send('Update the book');
	});

//2.express.Router 用其创建模块化，可挂载的路由句柄。Router实例是一个完整的中间件和路由系统，所以称其为一个‘mini-app’。
var express = require('express');
var router = express.Router();
//该路由使用的中间件
router.use(function timelog(req,res,next){
	console.log('Time:',Date.now());
	next();
})
//定义网站主页的路由
router.get('/',function(req,res){
	res.send('Birds home page');
})
//定义about 页面的路由
router.get('/about',function(req,res){
	res.send('about birds')
})
module.exports = router;

//然后在应用中加载路由模块；
var birds = require('./birds');
app.use('/birds',birds);