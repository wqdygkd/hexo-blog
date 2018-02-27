---
title: JavaScript基础教程
date: 2017-12-23
updated: 2018-2-27
tags: js
---

# JS引入

```html
<script>document.write("hello world!");</script>
<script src="hello world.js"></script> 
```

> 外部脚本不能包含 `<script>` 标签

* CSS引入方式

```html
<link rel="stylesheet" type="text/css" href="css/style.css"/> 
```

# JS输出

JavaScript 可以通过不同的方式来输出数据：

* 使用 `alert()` 弹出警告框。

* 使用 `document.write()` 方法将内容写到 HTML 文档中。

```javascript
document.write(Date());//输出当前时间
```

> 如果在文档已完成加载后执行 `document.write()`，整个 HTML 页面将被覆盖。

* 使用 `document.getElementById(id)` 访问某个 HTML 元素。

* 使用 `innerHTML` 写入到 HTML 元素。

```javascript
document.getElementById("demo").innerHTML = "段落已修改。";
```

* 使用 `console.log()` 写入到浏览器的控制台。

# JS注释

* 单行注释
以`//`开头快捷键 `ctrl` +`/`

* 块级注释
以`/*`开头，以`*/`结尾，不可嵌套

> html注释
`<!--   -->`

# 变量 

```javascript
var age,name,sex;
var age = 12;
function add (num1,num2){ 
	return num1+num2;//把两个数字加起来
}
/*
var student = {
	name:"小明"
}
*/
```

* **var** 声明变量,可一次声明多个，用逗号隔开
* 变量**命名要求**(变量是[标识符][1]的一种)
	1.以字母、下划线或美元符号（$）开头
	2.由字母、下划线、美元符号（$）和数字组成
	3.标识符**区分大小写**
	4.标识符不能使用关键字和保留字
	5.如果重新声明 JavaScript 变量，该变量的值不会丢失
	>var car="yellow";   
	 var car; //car 的值依然是 "yellow"

>关键字
`break` `do` `instanceof` `typeof` `case` `else` `new` `var` `in` `catch` `finally` `return` `void` `continue` `for` `switch` `while` `try` `debugger` `function` `this` `with` `default` `if` `throw` `deleat`

>保留字
`abstract` `enum` `int` `short` `boolean` `export` `interface` `static` `extends` `long` `super` `Char` `final` `native` `Class` `synchronized` `package` `throws` `Const` `goto` `private` `transient` `degubber` `implements` `volatile` `double` `import` `public` `byte` `float` `protected`

# 基本数据类型

## Number

* 浮点数

```javascript
var num = 3.1416;//3.1416
var num = 3.12e2;//312
var num = 3.12e-1;//0.312
```

* 整数

```javascript
var num = 10;//10
var num = 070;//56 (八进制)
var num = 0xA;//10 (十六进制)
```

* 特殊值<p>
> `NaN` `Infinity`

```javascript
var num = 1/0;//Infinity (无穷大)
```

## String

只要是在单引号或双引号内的就是String类型

```javascript
var name = "hello"
var name = 'july'
var name = '3.1416'
```

使用索引位置来访问字符串中的每个字符,字符串的索引从 0 开始:

```java
var name = "july"
var character = name[3];//y
```

>若在字符串中使用引号，字符串中的引号不要与字符串的引号相同，或在字符串添加转义字符`\`来使用引号

>内置属性 length 来计算字符串的长度

字符串可以是对象

```javascript
var x = "john";
var y = new String("john");
typeof x; // String
typeof y; // Object
```

## Boolean

布尔型，只有`true`和`false`两个值，且是小写 
* true  `1`、`2`、`1.1`、`-1`、`"0"`、`"1"`、`[] `、`Infinity` 
* false `0`、`""`、`null`、`NaN`、`undefined`

>所有非0数都是true，0是false  

```javascript
var sex = true;
if(sex){
	document.write('男');
}else{
	document.write('女');
}
```

## Array

```javascript
var car = new Array();
cat[0] = "yellow";
cat[1] = "red";
cat[2] = "blue";

var cat = ["yellow","red","blue"];
```

>关键词`new`用于声明新变量的类型

## Object

由花括号分隔，属性和方法的容器；对象的属性以名称和值对的形式 (name : value) 来定义；属性由逗号分隔。对象的方法定义了一个函数，并作为对象的属性存储。对象方法通过添加 `()` 调用

```javascript
var cat = new Object();
cat.name = "kitty";
cat.age = "2";
cat.eat = function(){ }

var cat = {
	name:'kitty',
	age:2,
	eat:function(){
	}
};
```

对象属性有两种访问方式：

```javascript
name = cat.name;
name = cat["name"];
```

对象方法的访问：

```javascript
eat = cat.eat();//输出函数执行结果
eat = cat.eat;//输出函数表达式
```

## Null

只有一个值：`null`,表示对象不存在

```javascript
var cat = null;//将cat的值清空
```

## Undefined

只有一个值：`undefined`

* 以声明未赋值的变量

```javascript
var a;
console.log(a); //undefined
```

* 获取对象不存在的属性

```javascript
var obj = {a:1,b:2};
console.log(obj.c); //undefined
```

## 类型识别

```javascript
var num;
typeof num; //undefined

var num = 1;
typeof num; //number

var num = '1';
typeof num; //string

var flag = true;
typeof flag; //bollean

var cat = null;
typeof cat; //object

var cat = {name:'kitty'};
typeof cat; //object
```

# 原始类型与引用类型

* 原始类型

> `Number` `String` `Boolean` `Undefined` `Null`

* 引用类型

> `Object`

```javascript
var num1 = 123;
var num2 = num1;
num2 = 456;
console.log(num1);//123

var obj1 = {a:1};
var obj2 = obj1;
obj2.a = 3;
console.log(obj1.a);//3
```

>原始类型和引用类型的存储结构不一致，其实，针对“=”本身，对这两种数据类型是没有本质区别的，都是"="左边的值等于右边的值，但不同的是，**针对引用类型，赋值符“=”改变的是对象引用，而不是对象本身**，也就是说当程序执行完`var obj2 = obj1;`之后，obj1和obj2，均指向了同一个对象，因此对obj2的任何操作，同时也会影响到obj1。

# 操作符

## 算数操作符

> `+`、`-`、`*`、`/`、`%`

```javascript
var num = 5 + 6; //11
var num = 5 % 2; //1 取余数
var num = 5 % (-2); //1
var num = (-5) % 2; //-1 只与左边值的符号有关

var num = "5" + 6 + 7; //"567" 数字与字符串相加，返回字符串
var num = 5 + 6 + "7"; //"117"
var num = "" +5 + 6 + "7"; //"567" 字符串+数字得到字符串
var num = "" +5 + 6 + 7; //"567"

var num = 5 + true; //6  返回数值，false 转成 0，true 转成 1

var num = "1" + true;//"1true" 字符串与布尔值相加,布尔值转化成字符串
```

## 赋值操作符

> `a = a + 1`即`a++`,`a--`即`a = a - 1`
> `a = a + 5`可简写成`a+ = 5`，类似的还有`a- = 5`、`a* = 5`、`a/ = 5`

```javascript
var age = 10;
var num = age++;//num=10 age=11 (先将变量中的值取出做赋值操作,再自身+1)

var age = 10;
var num = ++age;//num=11 age=11 (先自身+1,然后再将+1后的结果赋值)

var x = 3;
var y = x++ + ++x + x * 10;//x=3
//y = 3 + ++x + x * 10  //x=4
//y = 3 + 5 + x * 10 //x=5
//y = 58
```

## 关系操作符

> `>`、`<`、`>=`、`<=`

```javascript
var result = 6 > 4;
alert(result); //true 输出Boolean类型
```

## 相等操作符

> `==` 相等、`！=` 不相等、`===` 全等、`！===` 不全等

运算符的结果类型为 `Boolean`

* `==` 相等、`！=` 不相等  
在转换不同的数据类型时，相等和不相等遵循以下规则：   
1.如果有一个操作数是布尔值，则在比较相等性前先将其转换为**数值**---false转换为0，true转换为1；  
2.如果一个操作数是字符串，另一个操作数是数值，则在比较相等性前将字符串转换为数值；  
3.如果一个操作数是对象昂，另一个不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则比较；  
4.**null和undefined是相等的**；  
5.在比较相等性之前，不能将null和undefined转换为其他任何值;  
6.如果有一个操作符是NaN，则相等操作符返回false，不相等操作符返回true；即使两个操作数都是NaN,也一样；  
7.如果两个操作数都是对象，则比较它们是否指向同一个对象

* `===` 全等、`！===` 不全等      
两个操作数在未经转换的情况下相等返回true，不相等返回false;
```javascript
0 == false;//true
1 == true;//true
2 == true;//false

'' == 0;//true
'4' == 4;//true

null == undefined;//true
undefined == 0;//false
null == 0;//false

"NaN" == NaN;//false
5 == NaN;//false
NaN == NaN;//false
NaN != NaN;//true

"4" === 4;//false
undefined === null;//false
```

### 逻辑操作符

> `！` 非、`&&` 与、`||` 或 

* `!` 对Boolean值取反

```javascript
var flag = true;
alert(!flag);//false

alert(!0);  //true
alert(![]);  //false
alert(!“”);  //true
alert(!![]);  //true
alert(!!1);  //true
```

* `&&` 如果第一个值转换成boolean值之后为true， 则输出第二个值；如果第一个值转换成boolean值之后为false，则输出第一个值，且第二个值不在执行

```javascript
var result = true && 3; //3
var result = 1&&3; //3
var result = [] && ""; //""
var result = false && 3; //false
var result = "" && 3; //""
var result = null && true; //null

var num = 0;
var result = "" && num++; //""   num = 0 
```

* `||` 如果第一个值转换成boolean值之后为true， 则输出第一个值，且第二个值不在执行；如果第一个值转换成boolean值之后为false，则输出第二个值。

```javascript
var result = true || 3; //true
var result = 1 || 3; //1
var result = [] || ""; //[]
var result = false || 0; //0
var result = "" || 3; //3
var result = numm || true; //true

var num = 0;
var result = 3 || num++; //3  num=0
```




[1]:http://www.jb51.net/article/85661.htm