require 用来加载代码，而 exports 和 module.exports 则用来导出代码。
------------------------------------------------------------
var a = {name:1};
var b = a;
console.log(a);    //{name:1}
console.log(b);    //{name:1}
b.name = 2;
console.log(a);    //{name:2}
console.log(b);    //{name:2}
var b = {name :3}; 
console.log(a);    //{name:2}
console.log(b);    //{name:3}
解释： a 是一个对象，b是对a的引用，即a和b指向同一块内存，所以前2个输出一样。当对b作修改时，即a和b指向同一块内存地址的内容发生了改变，所以a也会体现出来，所以第三四个输出一样。当b被覆盖时，b指向了一块新的内存，a还是指向原来的内存，所以2个输出不一样。
-------------------
exports 和 module.exports 的区别：
1.module.exports 初始值为一个空对象 {};
2.exports 是指向的 module.exports 的引用
3.require() 返回的是 module.exports 而不是exports 

exports = module.exports = {...}

我们经常看到这样的写法：

exports = module.exports = {...}

上面的代码等价于:

module.exports = {...}
exports = module.exports

原理很简单：module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports。