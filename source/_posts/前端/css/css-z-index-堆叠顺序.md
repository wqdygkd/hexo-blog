---
title: css-z-index 堆叠顺序
tags:
  - css
id: '392'
categories:
  - 前端
date: 2018-08-27 22:08:12
---

### 9.3.2 堆叠顺序（z-index）

在使用**定位**布局时，可能会**出现盒子重叠的情况**。加了定位的盒子，默认**后来者居上**， 后面的盒子会压住前面的盒子。

应用 `z-index` 层叠等级属性可以**调整盒子的堆叠顺序**。

`z-index` 的特性如下：

1. **属性值**：**正整数**、**负整数**或 **0**，默认值是 0，数值越大，盒子越靠上
2. 如果**属性值相同**，则按照书写顺序，**后来居上**
3. **数字后面无单位**
4. 只应用于**相对定位**、**绝对定位**和**固定定位**的元素，其他**标准流**、**浮动**和**静态定位**无效
5. **层叠水平仅在直接父级层叠上下文中进行比较，即层叠上下文 A 中的子元素的层叠水平不会和另一个层叠上下文中的子元素进行比较**

**层叠上下文（stacking context）**：创建层叠上下文的元素自己会成为一个`参考对象`

**层叠水平（stacking level）**

**层叠顺序（stacking order）**

**满足下面规则的元素将会构造出一个 Stacking Context 结构：**

- `html` 根元素默认会创建层叠上下文
- `position`不为`static`且`z-index`不是 auto 的元素
- `display`为`flex`且`z-index`不是 auto 的元素
- `opacity`不等于 1
- `transform`不等于 none

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@main/img/20210102204249.png)

```html
<html>
  <div class="me">
    <div class="you"></div>
  </div>
</html>
<style>
  .me {
    width: 100px;
    height: 100px;
  }
  .you {
    width: 100px;
    height: 100px;
    left: 50px;
    position: relative;
    z-index: -1;
  }
</style>
```

you 在这里和 me 做比较，比较开始，首先 you 寻找参考对象，上一层 me 是吗？显然不是，因为 me 没有触发上面任一条件创建层叠上下文，所以继续往上寻找，找到 html。对于 me，也直接往上找到 html，所以这个例子里 me 和 you 是在以 html 为参考对象进行比较，**换句话说就是在 html 创建的层叠上下文环境中进行比较**！然后按照七阶图，负值 index 在 block 元素之下！所以 me 在 you 之上。

然后我们修改下 me，加个`z-index:0;` 按照之前的思路演算一遍，you 的参考对象变成 me 了！而 me 仍然是 html，然后 me 和 html 再做比较，me 参考对象是 html，html 的参考对象是 html，OK，在同一上下文了，me 明显高于 html，所以 you 高于 me。

参考链接

[元素上下层叠关系总结](https://segmentfault.com/a/1190000005354175?utm_source=tag-newest)

[ 北风吹雪：不起眼的 z-index 却能牵扯出这么大的学问](http://www.cnblogs.com/bfgis/p/5440956.html)

[张鑫旭:深入理解 CSS 中的层叠上下文和层叠顺序](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
