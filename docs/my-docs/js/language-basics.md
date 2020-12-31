# 语言基础

## 语法

ECMAScript 的语法很大程度上借鉴了 C 语言和其他类 C 语言，ECMAScript 中无论是变量、函数名还是操作符，都区分大小写。

### 标识符

**标识符**，就是变量、函数、属性或函数参数的名称，由一或多个下列字符组成：

* 首字符必须是字母、下划线（_） 或 $。
* 剩余字符可以是字母、下划线、$ 或数字。

::: tip 惯例

ECMAScript 标识符使用驼峰大小写形式，如 `helloWorld`。

:::

::: warning 注意

关键字、保留字、`true`、`false` 和 `null` 不能作为标识符。

:::

### 语句

ECMAScript 中的语句一般以分号结尾，也可以省略分号。多条语句可以合并到一个 C 语言风格的代码块中，代码块由一个左花括号 `{` 标识开始，一个右花括号 `}` 标识结束。

### 关键字与保留字

ECMA-262 中的**关键字**和**保留字**（未来的关键字）有特殊用途或者执行特定的操作，不能用作标识符或属性名。所有关键字及保留字如下：

``` js
/* ECMA-262 第 6 版规定的所有关键字 */
break do in typeof case else instanceof var catch export new void class extends return while const finally super with continue for switch yield debugger function this default if throw delete import try 

/* 未来的保留字 */
// 始终保留:
enum 

// 严格模式下保留:
implements package public
interface protected static
let private

// 模块代码中保留:
await 
```

### 严格模式

ECMAScript 5 增加了**严格模式**，它是一种不同的 JavaScript 解析和执行模型，所有现代浏览器都支持。严格模式下，ECMAScript 3 中不规范的写法会被处理，不安全的活动将抛出错误，详细变化请查看 [严格模式 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。  

为整个脚本文件开启严格模式，需要在脚本开头加上这一行预处理指令：

``` js
// 整个脚本都开启严格模式的语法
"use strict";
```

也可以单独给某个函数开启严格模式：

``` js {2}
function doSomething() {
 "use strict";
 // 函数级别严格模式语法
}
```

<!-- ### 变量

ECMAScript 变量是松散类型的，可以用于保存任何类型的数据。有 3 个关键字用于声明变量：`var`、`const` 和 `let`。

#### var 关键字 -->

<!-- ::: tip 最佳实践

借助 [ESlint](http://eslint.cn/) 代码检查工具可以高效地帮助我们正确书写 JavaScript 代码。

::: -->
