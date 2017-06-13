//中间件  是一个函数，它可以访问请求对象（request object(req)）,响应对象（response object（res））, 和web应用中处于请求-响应循环流程中的中间件，一般被命名为next变量
//中间件的功能包括：1.执行任何代码 2.修改请求和响应对象 3.终结请求-响应循环 4.调用堆栈中的下一个中间件 
//如果当前中间件没有终结请求-响应循环，则必须调用next（）方法将控制权交给下一个中间件，否则请求就会挂起。
//express 应用可使用如下中间件 1.应用级中间件 2.路由级中间件 3.错误处理中间件 4.内置中间件 5.第三方中间件

//1.应用级中间件 ----- 绑定到app对象 使用app.use()和app.METHOD()，其中METHOD 是需要处理的http请求的方法，例如 GET,PUT,POST
var app = express();
//没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function(req,res,next){
	console.log('Time:',Date.now());
	next();
});
//挂载至/user/:id 的中间件，任何指向/user/:id的请求都会执行它
app.use('/user/:id',function(req,res,next){
	console.log('Request Type:',req.method);
	next();
});
//路由和句柄函数（中间件系统），处理指向/user/:id的GET请求
app.get('/user/:id',function(req,res,next){
	res.send('USER')
})
//展示了在一个挂载点装载一组中间件
//一个中间件栈，对任何指向/user/：id的http请求打印出相关信息
app.use('/user/:id',function(req,res,next){
	console.log('Request url',req.originalUrl);
	next();
},function(req,res,next){
	console.log('Request Type:',req.method);
	next();
})
// 作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。
//一个中间件栈，处理指向/user/:id的get请求
app.get('/user/:id',function(req,res,next){
	console.log("ID:",req.param.id);
	next();
},function(req,res,next){
	res.send('user info');
});
//处理/user/:id,打印出用户id
app.get('/user/:id', function(req,res,next){
	res.send(req.param,id);
})
//如果需要在中间件栈中跳过剩余中间件，调用next('route')方法将控制权交给下一个路由。 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id',function(req,res,next){
	//如果id 为0 ，就跳到下一个路由
	if(req.params.id == 0 ){
		next('route');
	}else{
		next();
	}
},function(req,res,next){
	 // 渲染常规页面
	res.render('regular')
})
// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id',function(req,res,next){
	res.send('special');
})


//路由级中间件  和应用级中间件一样，绑定的对象是express.Router(); 使用router.use()或 router.VERB()
var router = express.Router();
//将应用级改成路由级中间件
var app = express();
var router = express.Router();
//没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function(req,res,next){
	console.log('Time:',Date.now());
	next();
});
//一个中间件栈，显示任何指向/user/:id的http请求的信息
router.use('/user/:id',function(req,res,next){
	//如果user id 为0，跳到下一个路由
})



 