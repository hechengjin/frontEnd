//https://github.com/mqyqingfeng/Blog/issues/9
// AO Activation Object 活动对象
// VO Variable Object 变量对象
//js闭包，执行上下文，作用域链，

function main() {

(function () {
   'use strict';


  	$(document).ready(function() {
		var scope = "global scope";
		function checkscope(){
			var scope = "local scope";
			function f(){
				return scope;
			}
			return f;
		}

		var foo = checkscope();
		console.log(foo());  // "local scope";
		
		
/*

    1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
    2. 全局执行上下文初始化
    3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
    4. checkscope 执行上下文初始化，创建变量对象、作用域链、this等
    5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
    6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
    7. f 执行上下文初始化，创建变量对象、作用域链、this等
    8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

了解到这个过程，我们应该思考一个问题，那就是：

当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？

以上的代码，要是转换成 PHP，就会报错，因为在 PHP 中，f 函数只能读取到自己作用域和全局作用域里的值，所以读不到 checkscope 下的 scope 值。(这段我问的PHP同事……)

然而 JavaScript 却是可以的！

当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：

fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
}

对的，就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，
说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，
但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，
正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

所以，让我们再看一遍实践角度上闭包的定义：
    1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    2. 在代码中引用了自由变量

自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。
	
*/

	var data = [];
	for (var i = 0; i < 3; i++) {
	  data[i] = function () {
		console.log(i);
	  };
	}
	data[0]();
	data[1]();
	data[2]();
	
/*
答案是都是 3，让我们分析一下原因：
当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
当执行 data[0] 函数的时候，data[0] 函数的作用域链为：
data[0]Context = {
    Scope: [AO, globalContext.VO]
}

data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。
data[1] 和 data[2] 是一样的道理。
让我们改成闭包看看：
*/
	console.log("----------------closure--------------")
	
	var data2 = [];
	for (var i = 0; i < 3; i++) {
	  data2[i] = (function (i) {
		  return function(){
			console.log(i);	  
		  }		
	  })(i);
	}
	data2[0]();
	data2[1]();
	data2[2]();
	
/*
当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
跟没改之前一模一样。

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
匿名函数执行上下文的AO为：
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，
找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

data[1] 和 data[2] 是一样的道理。
*/	
	
		
  	});
	
	
	

	
    $(window).load(function() {
		//alert("win")
    });



}());


}
main();

/*
1、作用域链
     首先，我们如何创建一个作用域呢，function（）。函数是javascript中唯一一个能创建出作用域的，也就是说for、if、while的{}是不能创建出作用域的。区别c++中的块作用域{}。
     一个函数的作用域创建后，将贯穿他的始“{”，终“}”，作用域

在函数创建时被存储，与函数共存亡

。这句话就应该着重理解贯穿2字了，若函数内部嵌套着多个函数，那么从最内层函数作用域依次往外就形成了作用链。
ps:需要我们理解作用域链的变量查找机制是由内往外的。先找自身作用域，再一次往外，若没有，则等同没有var时的声明（为全局添加了一个属性）；

作用域链正是内部上下文所有变量对象（包括父变量对象）的列表


2、变量对象（Variable Object）、活动对象（Activation Object）
     浏览器在对代码进行解析时，会先进行变量声明和函数声明以及函数形参声明；
(全局作用域下)那么这些优先声明的变量储存在哪里呢？ 
没错，就在变量对象中（抽象概念）；活动对象怎么理解呢？

     抽象变量对象VO (变量初始化过程的一般行为)
    

      --> 全局上下文变量对象GlobalContextVO
          (VO === this === global)

      --> 函数上下文变量对象FunctionContextVO
           (VO === AO, 并且添加了<arguments>（形参类数组）和<formal parameters>（形参的值）)

ps:在函数执行上下文中，VO是不能直接访问的，此时由活动对象扮演VO的角色。Arguments对象是活动对象的一个属性，它包括如下属性：

    callee — 指向当前函数的引用

    length — 真正传递的参数个数

    properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 
	properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。
*/