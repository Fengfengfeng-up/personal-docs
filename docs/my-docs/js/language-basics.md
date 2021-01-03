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

### 变量

ECMAScript 变量是松散类型的，可以保存任何类型的数据。有 3 个关键字用于声明变量：`var`、`const` 和 `let`。  

#### var

使用 `var` 关键字声明变量：

``` js
var a
console.log(a) // undefined 不初始化的情况下，变量会保存特殊值 undefined

var b = 'foo' // 声明变量并初始化，b 被定义为一个保存字符串值 foo 的变量
b = 1 // 不仅可以改变变量保存的值，也可以改变值的类型

// 一条语句中声明多个变量
var c = 'bar',
  d = 2,
  e

// 重复声明会被合并为一个声明
var name = 'neal'
var name
```

* 声明作用域  
  在函数中使用 `var` 声明的变量会成为该函数的局部变量，因此该变量在函数退出时会被销毁。

  ``` js
  function test() {
    var a = 'hi' // 局部变量
  }

  test() 
  console.log(a) // ReferenceError: a is not define
  ```

* 声明提升  
  使用 `var` 声明的变量会被提升到所在作用域的顶部。

  ``` js
  console.log(obj) // undefined
  var obj

  function foo() {
    console.log(age); // undefined
    var age = 26;
  }

  foo();  
  ```

* 全局声明  
  浏览器环境下，在全局作用域中使用 `var` 声明的变量会成为 [window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象的属性。

  ``` js
  var age = 1
  console.log(window.age) // 1
  ```

#### let

`let` 跟 `var` 的作用相似，但有以下重要区别。

* `let` 声明的范围是块级作用域。  
  
  ``` js
  if (true) {
    var name = 'neal'
    console.log(name) // neal
  }
  console.log(name) // neal

  if (true) {
    let name = 'feng'
    console.log(name) // feng
  } 
  console.log(name) // ReferenceError: name is not define
  ```

* `let` 不允许同一个块作用域中出现冗余声明。  
  
  ``` js
  var name
  let name // SyntaxError: Identifier 'name' has already been declared
  
  let age
  let age // SyntaxError: Identifier 'name' has already been declared 
  ```

* `let` 声明的变量不会在作用域中被提升。  
  在 let 声明之前的执行瞬间被称为“暂时性死区”，这时引用任何后面才声明的变量都会抛出 ReferenceError。

  ``` js
  console.log(name) // ReferenceError: Cannot access 'name' before initialization
  let name
  ```

* 浏览器环境中，使用`let` 在全局作用域声明的变量不会成为 window 对象的属性。  
  
  ``` js
  let age = 18
  console.log(window.age) // undefined
  ```

* 使用 `let` 声明变量不能依赖条件声明模式。  
  因为 `let` 的作用域是块，所以无法检查前面是否已经使用 let 声明过同名变量，也无法在没有声明的情况下声明它。

  ``` js
  try {
    console.log(a)
  } catch(error) {
    let a // 变量 a 被限制在 catch {}块的作用域内
  }
  a = 1 // 这个赋值形同全局赋值
  ```

* for 循环中的 `let` 声明  
  使用 `let` 声明迭代变量时，引擎在后台会为每个迭代循环声明一个新的迭代变量。`let` 不仅会将这个变量绑定到 `for` 循环的块中，还会将它重新绑定到循环的每一个迭代中，并使用上一个循环迭代结束时的值重新进行赋值。

  ``` js
  for (var i = 1; i < 6; i++) {
    setTimeout(() => console.log(i), 0)
  }
  // 依次输出 6、 6、 6、 6、 6
  console.log(i) // 6

  for (let j = 1; j < 6; j++) {
    setTimeout(() => console.log(j), 0)
  }
  // 依次输出 1、 2、 3、 4、 5
  console.log(j) // ReferenceError: j is not defined

  for (var k = 1; k < 6; k++) {
    let i = k
    setTimeout(() => console.log(i), 0)
  }
  // 依次输出 1、 2、 3、 4、 5
  console.log(i) // ReferenceError: i is not defined
  ```

#### const

`const` 的行为与 `let` 基本相同，区别是用它声明变量时必须同时初始化变量，且尝试修改 `const` 声明的变量会导致运行时错误。

``` js
const a = 1
a = 2 // TypeError: Assignment to constant variable.
```

* `const` 声明的限制只适用于它指向的变量的引用。

``` js
const person = {};
person.name = 'neal'; // 不会报错 
```

::: details 在函数中，如果去掉声明语句的关键字，该变量会变为全局变量，在函数外部也能访问到。

``` js
function test() {
  a = 'hi' // 局部变量
}

test() 
console.log(a) // hi
```

:::

::: details 严格模式下，如果在函数中给未声明的变量赋值，会抛出 ReferenceError（引用错误）。

``` js
function test() {
  'use strict'
  a = 'hi' // ReferenceError: a is not define
}

test()
```

:::

::: tip 最佳实践

* 尽量不用行为怪异的 `var`。
* 优先使用 `const`，其次使用 `let`。  
* 借助 [ESlint](http://eslint.cn/) 代码检查工具可以高效地帮助我们规范书写 JavaScript 代码。

:::
