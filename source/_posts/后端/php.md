---
title: PHP
tags:
  - php
id: '1663'
categories:
  - 前端
date: 2018-10-25 14:42:21
---

## 服务器

### 什么是服务器？

> 通过安装服务器软件，**提供服务** 的计算机

服务器可以从硬件、软件(系统软件、应用软件)几个角度描述。

按硬件描述： 服务器就是一台超级计算机(配置很高)。
按操作系统划分： 在硬件上安装了什么操作系统，就可以称为该系统的服务器
​ 例如: linux 服务器、windows 服务器、unix 服务器等。
按软件划分： 在操作系统中安装了什么软件，就可以称作该软件的服务器 iis tomcat
​ 例如: **web 服务器**、数据库服务器、邮件服务器等。

### 什么是 Web 服务器

Web 服务器就是安装了 Web 服务软件，web 服务器的作用是能够提供网站服务的服务器。淘宝、京东、新浪等等

常见的 Web 软件：
**Apache**、Nginx、IIS、Tomcat、Node 等。
Apache 服务器、Nginx 服务器、IIS 服务器、Tomcat 服务器、Node 服务器

Apache 是世界使用排名第一的 Web 服务器软件。我们将编写好的 html、css、js 等文件存入 apache，就能够通过网络来访问这些文件了

PS: web 服务器又叫做 http/httpd 服务器

## phpStudy 介绍

> phpStudy 是一个 PHP 调试环境的程序集成包
>
> 该程序包集成最新的 Apache+PHP+MySQL
>
> 安装 phpStudy，一定不能有中文，否则肯定启动不起来

**注意: **将要访问的文件(html,php,img 等)，放到安装路径下的 `www` 目录下，通过浏览器就可以访问到了

### phpStudy 的错误解决

如果 phpStudy 启动发生错误，参数下列几点。

- 一是防火墙拦截

- 二是 80 端口已经被别的程序占用，如 IIS 等

- 三是没有安装 VC9 运行库,php 和 apache 都是 VC9 编译

## PHP 基础(重点)

### PHP 简介

PHP（外文名:PHP: Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。主要适用于 **Web 领域的开发** ，能够完成 **动态网页** 的制作

### PHP 特点

- PHP 是目前最流行的网站开发语言（B/S 结构）之一
- PHP 是一种在服务器端执行的嵌入 HTML 文档的脚本语言
- 支持几乎所有流行的 **数据库** 以及操作系统
- 源码开放、免费（free)
- php 是世界上最好的语言

### 动态网站与静态网站(了解)

- 静态网站：使用浏览器端语言进行编程，网站由静态代码（HTML,CSS,JS）组成。

- 动态网站  ：网页通过服务器的程序(php 等)动态生成。用户可以和服务器进行交互（可以根据用户输入的不同信息，返回不同的运行结果）

**总结**

动态网站的 **动** 指的是网站 **数据的动** 而不是 **视觉上的动**

### 软件架构(了解)

> 软件架构可以分为 BS 架构与 CS 架构

#### C/S 架构

Client/Server 架构，即客户端/服务器架构。需要安装对应的客户端软件，才能获取服务器的服务

常见的 CS 架构：QQ、LOL、微信等

特点：

- 需要安装才能使用

- 性能高效，使用更加稳定和流畅

#### B/S 架构

Broswer/Server 架构，即浏览器/服务器架构。随着 Internet 的兴起，无需安装专门客户端软件，通过浏览器去请求服务器

- 不需要安装，只需要浏览器即可。
- 相比 CS 架构，性能相对较差，没有那么流畅和稳定

## php 基本语法结构

```php
// 避免使用中文目录和中文文件名
// 文件以.php后缀结尾，所有程序包含在<?php 这里是代码 ?>
// php页面无法直接打开需要运行在服务器环境当中
// 末尾必须加分号，不然就报错了（最后一行可以不加分号）

<?php
  echo "hello world";
?>
```

输出中文乱码问题：如果使用 echo 输出中文，可能会乱码

```php
<?php
  // 解决中文乱码的问题
  header("content-Type:text/html;charset=utf-8"); // 返回HTML文档文本并设置编码集
  echo "hello world";
  echo "<br/>";
  echo "大家好，我是一名摄影工作者";
?>
```

## PHP 运行原理

### HTML 运行原理

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102205640.png)

1. 在浏览器的 URL 地址栏中输入 www.baidu.com/index.html 地址，点回车。请求就发送给百度服务器。
2. 百度服务器找到 index.html 文件，并将文件的内容返回给浏览器
3. 浏览器接收到 index.html 中的内容，渲染到页面上。

同理: localhost/a.html , 则会返回 本机 web 服务器根目录下 a.html 文件的内容。浏览器拿到内容后进行渲染。

### PHP 运行原理

apache 不认识 php
浏览器也不认识 php

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102205658.png)

1.  在浏览器地址栏中输入 localhost/index.php ,点回车之后。将请求发送给 apache 服务器
2.  服务器找到 index.php 文件之后，转发给 php 解释器
3.  php 解释器将 index.php 文件中的 php 代码全部转为字符串，再返回给 apache
4.  apache 将处理好的字符串返回给浏览器，浏览器渲染后就可以看到页面

## 变量

> php 是一门弱类型语法，变量的类型可以随意改变。
> 变量其实就是存储数据的容器

**变量的命名规则**

- 不需要关键字进行声明，变量在第一次赋值的时候被创建
- 必须以 `$` 符号开始
- `$` 后面的命名规则与 js 的变量命名规则一致

### 变量操作

**声明变量**

声明变量的时候也一定要同时赋值,否则变量无法声明成功

```php
// 变量在声明的时候一定要同时赋值,否则变量无法声明成功
$name = "呵呵";
echo $name;
```

**删除变量 unset()**

```php
unset($name); // 销毁指定的变量
```

**判断变量是否设置值 isset()**

```php
isset($name);
echo isset($name); // 用 echo 打印，如果为 true 会打印出 1 ， 如果为 false 打印空
var_dump(isset($name)); // 会打印出 bool(true)/bool(false)
```

变量未设置或者设置为 null，返回 false（认为变量没有设置），其余情况全部为 true。一般用来判断变量是否设置，因为变量未设置，无法直接使用。(变量先赋值，在使用！）

**判断变量是否为空 empty()**

```php
var_dump(empty($name)); // 为空打印出 bool(true)，不为空则打印 bool(false)
```

PHP 中认为变量的值为：`""`、`0`、`"0"`、`null`、`false`、`[]` 时，变量虽然赋值了，但是无实际的意义，为空。

## 数据类型

> php 数据类型: 8 种数据类型
>
> 基本数据类型: 布尔, 字符串, 整数, 浮点数
>
> 复合数据类型:数组, 对象
>
> 特殊的类型:resource(资源) null

### 简单数据类型

#### 输出语句

```php
//1. echo 输出简单数据类型
//2. print_r 输出数据结构，一般用于输出复杂类型。
print_r($arr); // print_r 是一个函数，不要忘记小括号
//3. var_dump 输出完整的数据结构，包括类型，一般用于精准调试
var_dump($arr);
```

#### 字符串

```php
$str = "php是世界上是最好的语言";
echo $str;
```

**字符串连接符**

php 中，`+` 号只有算数的功能，并不能拼串，拼串使用 `.`

```php
$name = "大象";
echo "大家好，我是" . $name . "，今年18岁";
```

**php 中的单引号与双引号**

```php
//1. 字符串的定义可以使用单引号，也可以使用双引号
//2. 双引号可以解析变量
//3. 单引号的性能会高于双引号（了解）

$name = "大象";
$desc = '很帅';
$str = '$name 很帅';
echo $str; // $name 很帅
$str = "$name 很帅";
echo $str; // 大象 很帅
```

#### 整数

```php
$num = 100;
echo $num;
```

#### 浮点型

```php
$float = 11.11;
echo $float;
```

#### 布尔类型

```php
$flag = true;
// 当布尔类型值为true时，输出1
echo $flag;
$flag = false;
// 当布尔类型为false时，输出空字符串
echo $flag;
```

### 数组

> 在 php 中，数组分为两种，**索引数组** 和 **关联数组**
>
> 计算数组长度的方法：count(数组名)；

**索引数组（类似与 JS 中的数组）**

```php
$arr = array("张飞","赵云","马超");
echo $arr; // Array // echo 只能打印基本数据类型
// 使用 print_r() 打印
print_r($arr); // Array ([0] => 张飞 [1] => 赵云 [2] => 马超)
echo $arr[0]; // 张飞
```

**关联数组（类似与 JS 中的对象）**

```php
// 属性名必须用引号引起来
$arr = array("name"=>"zhangsan", "age"=>18);
print_r($arr); // Array ( [name] => zhangsan [age] => 18 )
echo $arr["name"];
```

**二维数组与多维数组**

数组中的每个元素又是一个数组
二维数组的存取元素，需要两次访问，依次确定行和列 `$arr[x][y]`;

> 多维数组数组里面嵌套了两层以上的数组

### 对象(了解)

> 在 php 以及其他高级语言中，都有类的概念，表示一类对象，跟 js 中构造函数类似。

```php
//定义一个类（类似js的构造函数）
class Person {
  public $name = "小明";
  private $sex = "男";
}

$zs = new Person;
print_r($zs);
//打印对象的结构信息 Person Object ([name] => 小明[sex:Person:private] => 男 )

echo $zs->name; // 对象中取值用 ->
echo $zs->sex; // 私有属性，无法获取
```

## 流程控制

### 分支结构(if/switch)

基本上来说，所有语言的 if..else 语法都是一样

```php
$age = 17;
if ($age >= 18) {
  echo "终于可以抽烟喝酒烫头了";
} else {
  echo "哎......";
}
//===================
switch(变量){
	case 值1:
		程序块1；
		break;
	case 值2:
		程序块2；
		break;
	...
	default:
		程序块
}
```

### 循环结构(while / for / do...while)

```php
while(判断表达式){
	程序块;
}

for(赋值表达式; 判断表达式; 步进表达式){
	程序块;
}

do{
	程序块
} while(判断表达式)
```

**遍历索引数组**

```php
$arr = array("张三", "李四", "王五", "赵六", "田七", "王八");
// 获取数组的长度： count($arr)
for($i = 0; $i < count($arr); $i++) {
  echo $arr[$i];
  echo "<br>";
}
```

### foreach 语句结构

> 用来遍历数组(关联数组和索引数组均可)。

```php
foreach($arr as $key => $value){
	程序体
}
foreach($arr as $value){
	程序体
}
```

`$arr` : 要遍历的数组

`$key`: 键，可以是任意变量名

`$value`: 值，可以是任意变量名

```php
//遍历关联数组
$arr = array(
  "name"=>"zs",
  "age"=>18,
  "sex"=>20
);
foreach($arr as $k => $v) {
  echo $k . "=" . $v . "<br>";
}
```

## 函数

> 注意，在 php 中函数不能重复声明

php 中函数的语法与 js 中函数的语法基本一样，不同点在于

1. 函数名大小写不敏感
2. 函数的形参可以设置默认值

```php
<?php
    header("content-Type:text/html;charset=utf-8");
    function sayHello ($name="周杰伦") {
        echo "大家好，我是$name";
        echo "<br>";
        [return 返回值;]
    }
    sayHello(); // 不传参数，会使用默认值
    sayHello("大象"); // 传参数，默认值不生效
?>
```

1. 在 php 中函数不能重复声明
2. 函数体内的变量只在函数体内有效
3. 函数体外的变量只在函数体外有效

```php
<?php
    $age = 18
    function fn(){
    	$name = '大象';
    	echo $name;  // 有效
    	echo $age;  // 无效
	}
	fn();
	echo $name;  // 无效
  echo $age; // 有效
?>
```

## 常量

保存不会发生改变的数据(如：3.1415， 路径等)时，最好使用常量。

常量的使用方法：

```php
define(常量名, 常量值, [是否区分大小写]);
// 默认 false 区分大小写， true 不区分大小写
define("PI", 3.1415, true);
echo PI;
echo pi;
```

**注意:** 一般在实际工作中，常量都用大写，**常量不能被重新赋值**

## PHP 内置函数

### 数学函数

- max(),min() 分别返回一组数的最大值及最小值；
- abs() 返回绝对值。
- floor() 向下取整。
- ceil() 向上取整。
- round() 四舍五入。
- rand()  返回随机整数，可以取到两端的值。

### 日期函数

- `time()` 返回当前的时间戳 (1970 到现在的时间的秒数)

- `date(format,time)` 格式化一个本地时间或日期

  格式：Y(年) m(月) d(日) H(时) i(分) s 秒

```php
$time = time(); // 获取时间戳
echo date('Y-m-d H:i:s',$time); // 格式化时间戳
// Y, m, d, H, i, s 分别代表 年 月 日 时 分 秒
```

默认时区会不太正确, 我们在东八区, 比 0 时区会多八小时

```php
路径: D:\phpStudy\php\php-5.4.45
在php.ini里加上找到date.timezone项，设置date.timezone = "PRC"，重启环境就ok了。
PRC: 中华人民共和国
```

### 字符串函数

- `str_replace(查找的值，替换的值，执行替换操作的字符)` 字符串替换（会把符合的值全部替换）
- `trim(字符串);` 去除首尾空白字符
- `explode(分割符，执行分割的字符串);` 使用一个字符分割一个字符串，返回一个数组(类似 split)
- `implode(连接符，执行连接的数组);` 将数组根据连接符拼接成字符串(类似 join)
- `substr(字符串，起始索引，截取长度);` 截取字符串，注意中文占 3 个字节长度
- `strchr(字符串，标识字符);` 从左向右找标识字符，返回该字符后全部字符(包括该字符)
- `strrchr(字符串，标识字符);` 从右向左找标识字符，返回该字符后全部字符(包括该字符) **主要用于获取后缀名**

### 补充

**查找数组中是否含有指定内容**

```php
// in_array(查找的内容, 数组)   如果查找到返回 true ，查找不到返回 false
result = in_array($uname, $arr);
// 可用来判断用户名是否已存在数据库中
```

**从数组中随机获取数据**

```php
// array_rand(被操作的数据, 数据长度) 返回一个随机的下标
$arr = array_rand($results, 2); // 返回一个数组，随机两个下标
$index = array_rand($results, 1); // 返回一个随机的下标
$results[$index]; // 用来随机获取数组中的一项
```

## 页面动态渲染

- PHP 本身支持与 HTML 混编

- 混编的文件后缀必须为 .php， Apache 才会调用 PHP 解析

- PHP 与 HTML 混编时，服务器中的 PHP 引擎 只会执行 php 标签内部的 PHP 代码，非 PHP 的代码(PHP 标签外部的内容)直接忽略，最后会将 PHP 的执行结果和非 PHP 代码 一起返回给浏览器,由浏览器进行解析

- 一个 php 页面当中,可以写多个 php 语法结构,但是 php 语法结构 **不能嵌套**

```php
<?php
  header('content-type:text/html;charset=utf-8');
  echo 2+3;
  // php的引擎 只会执行php代码块中代码，代码块外面的代码会被忽略最后 服务器会将php执行的结果和代码块外面的内容一起返回给浏览器，由浏览器进行解析
?>
// 在php语法结构外面， 可以写 html ，会直接在浏览器中渲染
<a href="http://www.baidu.com">百度一下</a>
```

## include 文件引入

**介绍**：不同的页面中有相同的代码部分，可以将其分离为单个文件。需要调用时，**include 引入对应的文件即可调用**。提高代码的复用率。类似于 js 中 script 标签导入, 可以用于函数复用

**语法**

```javascript
// 可以是html、php或其他类型的页面
include | include_once   "文件的路径"
```

**include 与 include_once 区别**

- include 可以重复引入文件
- include_once 只引入一次，防止多次引入文件
- 如果文件中有函数，include 重复引入会报错，include_once 不会报错

## PHP 数据读写到文件(数据持久化)

程序运行过程中，数据存储在内存中的，程序结束, 数据会销毁

如果希望可以永久存储某些数据，可以将数据存储在硬盘上（存储在文件中）

将数据由内存存储到硬盘的过程，称为数据持久化；

- `file_get_contents(path)`   根据路径读取文件内容, 返回一个字符串

- `file_put_contents(path,$str)`   将一个字符串写入到一个文件中。(只能存储字符串)

  ```php
  file_put_contents(string $file, string $data[, constants flag]);
  参数1: 文件路径
  参数2: 要写入文件的字符串
  参数3: 可选参数，默认不写，新内容覆盖原文件中的内容；FILE_APPEND 是向文件中追加内容
  返回值: 写入文件的字符串长度(不用记)
  ```

使用 `file_put_contents` 存储数组的时候，会丢失数据

```php
$arr = ['zs', 'ls', 'ww'];
$arr1 = ['name'=>'zs', 'age'=>18];
file_put_contents("02-test.txt", $arr); // zslsww
file_put_contents("02-test.txt", $arr1); // zs18
```

把一个数组，转成一个 json 格式的字符串

- `json_encode($data)` 将 PHP 数组转成 JSON 格式字符串。
- `json_decode($str,true)` 将 JSON 字符串, 转换为 PHP 数组。（不传 true, 有可能转完之后是个对象, 传了 true,一定是数组）

## 表单处理

> 表单（form）：表单用于收集用户输入信息，并将数据提交给服务器。是一种常见的与服务端数据交互的一种方式

1. `action`: 指定表单的提交地址（如果提交到当前页面，action 可以为空）
2. `method`: 指定表单的提交方式，get/post，默认 get
3. `input` 的数据想要提交到后台，必须指定 name 属性，后台通过 name 属性获取值
4. 想要提交表单，不能使用 `input:button` 必须使用 `input:submit`

### php 获取表单数据

```php
// $_GET 是 PHP 系统提供的一个超全局变量，是一个数组，里面存放了表单通过 get 方式提交的数据
// $_POST 是 PHP 系统提供的一个超全局变量，是一个数组，里面存放了表单通过 post 方式提交的数据
```

**get 与 post 的区别**

- `get` 方式
  数据会拼接在 url 地址的后面 (?username=pp&password=123456)
  地址栏有长度限制，因此 get 方式提交数据大小不会超过 4k
- `post` 方式
  数据不会在 url 中显示，相比 get 方式，post 更安全
  提交的数据没有大小限制，可用于文件上传

### 文件上传

**html 要求**

- 文件上传的提交方式必须是 `post` 方式

- 需要给 `form` 指定 `enctype="multipart/form-data"`

- 指定 `name` 属性，后台才能获取到

**php 相关**

- 文件上传时，通过 `$_FILES` 才能获取到，这是一个二维数组。

```php
  Array
  (
    [photo] => Array
      (
        [name] => 001.jpg   // 文件名字
        [type] => image/jpeg  // 文件类型
        // 上传图片保存的位置
        [tmp_name] => C:\Users\Jepson\AppData\Local\Temp\phpF2A0.tmp
        [error] => 0     // 上传错误码, 错误码为 0 表示没有错误
        [size] => 6000   // 文件大小, 单位字节, 大小 6kb 左右
      )
  )
```

- 上传文件时，文件会临时保存在服务器上，如果文件最终没有保存，那么临时文件会被删除，保证服务器安全。

- `sleep(10)` 可以让代码延迟 10 秒钟才执行。

- `move_uploaded_file($path, $newPath);` 可以转存临时文件，真正把文件存储起来

- `unlink(filename,context)` 删除文件，若成功，则返回 true，失败则返回 false

```php
  // 保存图片的完整代码
  // 思路:
  // 1. 在文件上传成功的情况下, 进行图片的保存   error == 0
  // 2. 获取临时文件路径
  // 3. 随机生成新的文件名, 注意文件中后缀名是不能改变的
  // 4. 根据新的文件名, 转移临时文件

  $file = $_FILES['photo'];

  // 判断上传是否成功
  if ( $file['error'] == 0 ) { // 上传成功
    // 1. 获取临时文件路径
    $ftemp = $file['tmp_name'];

    // 2. 随机生成新的文件名, 后缀不能随便起, 要获取一下
    $name = $file['name'];
    $text = strrchr($name, '.');
    // 为了防止重复, 生成随机的文件名以当前时间秒数+随机数组成
    $newName = time().rand(10000,99990).$text;

    // 3. 进行转存
    move_uploaded_file($ftemp, "./upload/$newName");
  }
```

## 学生信息管理系统 1.0

### 基本功能

- 学生添加功能
- 展示学生信息功能
- 删除学生信息

```php
// array_splice(数组, 开始的下标, 截取长度) 将匹配到的数据截取掉，会改变原来的数组
array_splice($arr, $_GET["index"], 1);

// 添加内容到数组：将 $stuArr 添加到数组 $arr 中
$arr[] = $stuArr;
```

## Mysql 数据库

### 数据库概念

专门用来存储、管理数据的仓库 英文：Database, DB。

### 数据库的分类

- 关系型数据库: 基于表，表与表之间可以存在关系，可以进行多表查询的存储方式，适合较为复杂的存储

  如: MySQL, SQL Server, oracle

  表结构:

  每一行代表一条数据 --- **记录**

  每一列都是一类数据 --- **字段**

  | **订单编号** | **商品名称** | **价格** | **数量** |
  | ------------ | ------------ | -------- | -------- |
  | 100123       | 华为 mate10  | 4999     | 2        |
  | 100124       | 花裙子       | 499      | 1        |

- | 订单编号 | 用户     | 配送地址              |
  | -------- | -------- | --------------------- |
  | 100123   | 隔壁老王 | 北京市京顺路 99 号    |
  | 100124   | 隔壁老宋 | 北京市清华大学 1 号楼 |

* 非关系型数据库: 基于键值对的存储方式，数据之间没有耦合性，特点执行效率高

  如：mongodb

  ```js
  // 类似对象的键值对形式
  {
      "username": "gblw",
      "password": 123456,
      "uid": 007
  }
  ```

### MySQL 数据库软件

> MySQL 数据库软件中可以有多个数据库,每一个数据库中可以有多个表

#### 可视化工具 navicat

> MySQL 只是一个数据库软件，如果我们要创建数据库，或对数据库进行增删改查，刚开始可以用可视化工具来操作，让我们更加直观的了解数据库

##### 安装 navicat

##### 让 navicat 和 MySQL 建立连接

点击左上角 连接 => MySQL => 常规 => 端口 3306 =>

#### 数据库表的操作

##### 数据库的数据类型

> 也就是数据库中可以存储的数据类型(又叫做字段类型)

**字段类型**

- 整型 `int`

  ​ 存储如年龄，产品数量，编号等。

- 小数类型 `float` , `decimal`

  > 重量，工资，奖金，价格等使用 decimal 类型，实现小数的精确存储,一般用来存储与钱有关的数字。3.333333331

- 字符串型 `varchar(M)`，`char(M)`

  - M 为该字段可以存储的最多字符数(字节) ，如 varchar(10)最大可以存储 10 个字节

  - varchar 一般用来存储长度变化比较大的字符串，如文章标题，商品名称

  - char 存储长度比较固定的字符串，如手机号，身份证号，序列号，邮编

  - 此外可以使用 text 类型，存储较长的字符串，无需指定字符串的具体长度

- 日期时间型 `datetime`, `date(年月日)`，`time(时分秒)`

**字段约束**

字段约束: 字段数据的属性规则（特征）

1. `not null` 不为空，可以限制字段值不能为空

2. `default` 默认值，可以设置字段的默认值，在没有录入时自动使用默认值填充。

3. `primary key` 主键 ：唯一标识，不能重复，不能为空

   设置字段为主键，主键字段的值不能重复，不能为空。而且一个数据表中只能设置一个字段为主键，作为每行记录的唯一身份信息（索引）。

4. `auto_increment` 自动增长

   设置字段为自动增长，默认从 1 开始自动分配编号。自增长字段必须为一个 key（索引，数据结构，便于快速查找数据，相当于书的目录），一般与 primary key 结合使用。类型必须为整型。

5. `unique key` 不能重复

   唯一键，设置字段的值为唯一的，可以设置多个字段为唯一键。唯一键字段的值可以为空。

##### 创建数据表

> 注意 创建表时，每个表必须有一个主键

## SQL-操作数据库的语言

> SQL：structured Query Language 结构化查询语言。

- 通过这个语言可以对数据库进行增删改查

SQL 编写注意点: 注释用 `--` , 语句结束加分号 `;`

### 基本用法：增删改查

1. 插入数据 `insert`

```sql
-- insert into 表名 (字段列表) values (值列表)
insert into book (name, age, sex) values ('zs','18','m');
```

1. 修改数据 `update`

```sql
-- update 表名 set 字段名称1=值1,字段名称2=值2,... where 条件
-- 如果不加条件会修改表中所有对应的字段
update book set name='ls', age='30' where id=10;
```

1. 删除数据 `delete`

```sql
-- delete from 表名 where 条件
delete from book -- 会删除所有数据
delete from book where id=10;
```

1. 查询数据 select

```sql
-- select 字段列表 from 表名
select name, age from book -- 只查询表中 name 和 author 的信息
-- select * from 表名 where 条件  * 表示所有字段
select * from book where id = 2;
select * from book where name='zs' and age=20;
```

### 高级用法

- `where` 条件

  查询时，不添加 where 条件, 返回数据表所有行。需要添加限定条件，只返回需要的行。

  ```sql
  -- select  字段列表 from  表名 where 条件；
  -- 条件 : =, >, <, >=, <=, and, or
  ```

- `like` 模糊匹配  % 通配符

  ```sql
  -- 查找姓张的人
  select * from 表名 where name like '张%';​
  ```

- `in` 语法：一次查询多个符合条件的数据

  ```sql
  -- select * from 表名 where 字段 in (value1,value2,value3);
  select * from stu where name in ('zs', 'ls', 'ww'); -- 查找name值为zs, ls, ww 的数据
  ```

- `count()` 获取返回数据的总条数

  ```sql
  -- 查询满足条件数据的总条数
  -- select count(*) from 表名 where 条件
  ```

- `order` 排序

  ```sql
  -- select * from 表名 order by  字段名称;   	  	默认升序
  -- select * from 表名 order by  age;  -- 按照年龄来排序
  -- select * from 表名 order by 字段名称 desc;      desc 表示降序
  ```

- `limit` 对结果集进行截取 一般用于取数据的前几条

  ```sql
  -- select *  from  表名  limit 截取的起始索引，截取的长度
  ```

- 联合查询（多个表联合查询）

  ```sql
  select 字段列表 from 表A join 表B on 表A.字段=表B.字段 where 条件
  join 将表A和表B联合起来
  on 根据什么字段把表A和表B联合起来

  select *  from  teacher  join class  on class.id=teacher.classid;  -- 老师表和班级表联合查询
  select teacher.*, class.classname  from  teacher  join class  on class.id=teacher.classid;   -- 老师表和班级表联合查询,但只显示老师表的全部内容和班级表的名称
  -- 注意: 多表联合查询时,字段要写明是那个表的字段 如  表.字段名
  ```

## PHP 操作数据库

### 连接数据库基本步骤

1. 连接数据库
2. 准备 sql 语句
3. 执行 sql 语句
4. 获取执行的结果并分析
5. 关闭数据库

### 操作数据库常用 API

- `mysqli_connect(IP, 用户名，密码，数据库名)，端口号` 连接数据库

- `mysqli_query($link, $sql)` 执行 SQL 语句

- `mysqli_error($link);` 返回错误描述

- `mysqli_close($link);` 关闭连接

- `mysqli_fetch_assoc($res);` 从结果集中取得一行作为关联数组返回

- `mysqli_num_rows($res);` 返回结果集的行数

### sql 操作

- 使用 PHP 发送 SQL 语句前，可以先打印 SQL 语句，检查语句的正确性。
- 修改数据库的数据时, 使用变量拼接 SQL 语句=，字段的值为字符串类型时，需要在变量的两侧使用单、双引号包裹。可以将所有的字段外面都使用双引号包含。

```php
// 1. 连接数据库
// mysqli_connect(ip地址, 用户名, 密码, 数据库的名称, 端口号);
// 执行结果
//    1. 连接成功, 返回一个数据库连接对象
//    2. 连接失败, 返回 false
// @ 表示错误抑制符, 可以抑制错误的输出
$link = @ mysqli_connect('127.0.0.1', 'root', 'root', 'study', 3306);
// var_dump($link);

// 如果数据库连接失败
if ( !$link ) {
    echo "数据库连接失败"；
    return false;

	// 程序结束, die 方法, 终止当前程序执行, 输出一段语句
	die("数据库连接失败");
}
echo "数据库连接成功<br>";

// 2. 准备 sql 语句: 删除一条数据
$sql = "delete from stu where id = 14";
$name = "gblw";
$age = 31;
$sq2 = "insert into stu (name, age) values ('$name', $age)";
// sql 语句一般用双引号包裹
// 如果语句中含有拼接的变量，需要用单引号包裹

// 3. 让数据库执行 sql 语句, 并分析结果
// mysqli_query(数据库连接对象, 要执行的sql语句)
// 非查询语句：执行成功返回 true, 执行失败返回 false

// 4. 根据结果不同做逻辑判断
if ( mysqli_query( $link, $sql ) ) {
    // 如果删除的数据不存在，也会返回 true，
    echo "删除成功";
}else {
    // sql 语句错误，才会返回 false
    echo "删除失败";
    // mysqli_error 可以查看错误消息
    echo mysqli_error($link);
}

// 查询语句： 成功返回结果集, 失败返回 false
// 数据查询不到也会返回结果集，只是数据条数为 0，sql 语句有错误才会返回 false
$res2 = mysqli_query( $link, $sq2 );
// $res2 是返回的结果集,是一个对象，表面上看没有我们要的数据,如果我们想要数据,需要调用mysqli_fetch_assoc($res2)去获取
// 结果集中 field_count 表示字段数，num_rows 表示查询到的数据条数
// 注意: mysqli_fetch_assoc($res2)执行一次,只会从结果集中拿一条数据出来(执行几次就拿出几条数据)

// 4. 根据结果不同做逻辑判断
if ( !$res ) {
    echo mysqli_error( $link );
    die('数据库查询失败');
}

// mysqli_fetch_assoc 查询成功, 从结果集中取数据, 以关联数组的形式返回
// 一次只取一条数据, 如果没取到, 返回 null
$arr = [];
while( $row = mysqli_fetch_assoc( $res ) ) {
    // 将值推到数组中
    $arr[] = $row;
}
// 也可以采用 for 循环遍历
// mysqli_num_rows($res) 方法返回获取到的数据条数 ，
for($i = 0; $i < mysqli_num_rows($res); $i++){
    // echo $i;
    $arr[] =  mysqli_fetch_assoc($res);
}
// echo '<pre>';
// print_r($arr);
// echo '</pre>';

// 5. 关闭数据库连接 (挂电话)
mysqli_close( $link );
```

### 数据库工具函数的封装

> 为了提高代码的复用性，把数据增删改的操作封装成一个方法

```php
  // 定义常量
  define( 'HOST', '127.0.0.1' );
  define( 'UNAME', 'root' );
  define( 'PWD', 'root' );
  define( 'DB', 'test02' );
  define( 'PORT', 3306 );

  // 非查询语句封装
  // 封装一个执行非查询语句的方法, 提高代码的复用性
  // 参数: $sql 要执行的 sql 语句
  // 返回值: true / false
  function my_exec( $sql ) {
    // 1. 连接数据库
    $link = @ mysqli_connect( HOST, UNAME, PWD, DB, PORT);

    if( !$link ) {
      echo '数据库连接失败';
      return false;
    }

    // 2. 准备 sql 语句, 就是传递过来的 $sql

    // 3. 执行 sql 语句, 分析结果
    if ( mysqli_query( $link, $sql ) ) {
      // 执行成功
      mysqli_close( $link ); // 关闭数据库
      return true;
    }
    else {
      // 执行失败
      mysqli_close( $link ); // 关闭数据库
      return false;
    }

  }

  // 查询语句的封装
  // 参数: $sql 要执行的 sql 语句
  // 返回值:
  //    (1) 成功, 返回数据(二维数组)
  //    (2) 失败, 返回 false
  function my_query( $sql ) {

    // 1. 建立连接
    $link = @ mysqli_connect( HOST, UNAME, PWD, DB, PORT );
    if ( !$link ) {
      echo "数据库连接失败";
      return false;
    }

    // 2. 准备 sql 语句 $sql
    // 3. 执行 sql 语句, 分析结果
    $res = mysqli_query( $link, $sql );  // 结果集 或者 false

    if ( !$res ) {
      echo "获取数据失败<br>";
      echo mysqli_error($link);
      mysqli_close( $link );
      return false;
    }

    // 得到结果集, 将结果集的所有内容取出到数组中
    $arr = [];
    while ( $row = mysqli_fetch_assoc($res) ) {
      $arr[] = $row;
    }

    mysqli_close( $link );
    return $arr; // 返回结果数组
  }
```

## 学生管理系统 2.0

### 基本功能

- 添加学生功能
- 展示学生列表功能
- 删除学生功能
- 查看学生详情
- 更新学生数据

### 实现思路

**注册功能思路：**

1. 表单设计，点击提交按钮向服务器提交表单数据
2. 在后台获取表单提交的数据，保存到数据库中
   - 先获取表单的标签的数据
   - 保存上传的图片（并保存图片存储的路径）
   - 将表单的数据和图片的路径一起保存到数据库中
3. 保存完成，跳转到列表页，查看新添加的数据

**展示功能思路：**

1. 先从数据库中获取数据（二维数组 arr）
2. 遍历二维数组，将数组中数据渲染到页面中

**删除功能思路：**

1. 获取要删除数据的 id
2. 根据 id 删除数据库中指定的数据
3. 删除完毕，返回列表页

**详情展示功能**

1. 获取要查看详情数据的 id
2. 根据 id 通过联合查询，获取到需要用数据
3. 把数据显示在页面中
4. 点击返回按钮，可以返回到列表页

**更新数据思路：**
更新数据的思路=先渲染再提交

1. 获取要查看详情数据的 id
2. 把对应 id 的数据填充到修改页面中
3. 点击修改按钮，获取表单的数据，提交给服务器
4. 在服务器更新数据
5. 更新完成后跳转到列表页

```html
隐藏域表单：和其他表单标签一样，只是看不到而已
<input type="hidden" name="id" value="<?php echo $data['id'] ?>" />
```
