---
sidebarDepth: 2
---
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

## 变量

ECMAScript 变量是松散类型的，可以保存任何类型的数据。有 3 个关键字用于声明变量：`var`、`const` 和 `let`。  

### var

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

### let

`let` 跟 `var` 的作用相似，但有以下重要区别。

* `let` 声明的范围是块级作用域。  
  
  ``` js
  if (true) {
    var name = 'neal'
    console.log(name) // "neal"
  }
  console.log(name) // "neal"

  if (true) {
    let name = 'feng'
    console.log(name) // "feng"
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
  在 let 声明之前的执行瞬间被称为“暂时性死区”，这时引用任何后面才声明的变量都会抛出 ReferenceError（引用错误）。

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

* `for` 循环中的 `let` 声明  
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
    let l = k
    setTimeout(() => console.log(l), 0)
  }
  // 依次输出 1、 2、 3、 4、 5
  console.log(l) // ReferenceError: l is not defined
  ```

### const

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
console.log(a) // "hi"
```

:::

::: details 严格模式下，如果在函数中给未声明的变量赋值，会抛出 ReferenceError。

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
* 借助 [ESLint](http://eslint.cn/) 代码检查工具可以高效地帮助我们规范书写 JavaScript 代码。

:::

## 数据类型

ECMAScript 有 8 种基本的数据类型，其中包括 Undefined、Null、Boolean、Number、String、Symbol（ES6 新增）和 BigInt（ES11 新增） 7 种原始类型和 Object 引用类型。

### typeof 操作符

**typeof** 操作符返回参数的类型。对一个值使用 `typeof` 操作符会返回下列字符串之一：

* `undefined` 表示值未定义；
* `boolean` 表示值为布尔值；
* `string` 表示值为字符串；
* `number` 表示值为数值；
* `bigint` 表示值为任意大的整数；
* `object` 表示值为对象（不是函数）或 `null`；
* `function` 表示值为函数；
* `symbol` 表示值为符号。

### Undefined 类型

**Undefined** 类型只有一个特殊值 `undefined`。当使用 `var` 或 `let` 声明了变量但没有初始化时，就相当于给变量赋予了 `undefined` 值：

``` js
let name
console.log(name) // undefined
console.log(name === undefined) // true
```

当对未声明过的变量使用 `typeof` 操作符时，也会返回 `undefined`。

``` js
// let age 
console.log(typeof age) // "undefined"
```

::: tip 建议
在使用 `var` 或 `let` 声明变量时，同时进行初始化，这样当使用 `typeof` 返回 `undefined` 时，就可以确定这个变量是没有声明过的。
:::

### Null 类型

**Null** 类型只有一个特殊值 `null`，表示一个空对象指针，通常用以初始化将来要保存对象值的变量。  
对值为 `null` 的变量使用 `typeof` 会返回 `object`。

``` js
let person = null
console.log(typeof null) // "object"
```

`undefined` 值是由 `null` 值派生而来的，因此 ECMA-262 将它们定义为表面上相等。

``` js
console.log(undefined == null) // true
```

### Boolean 类型

**Boolean**（布尔值）类型仅包含两个值：`true` 和 `false`。  
其他类型的值都可以通过 `Boolean()` 转型函数转为布尔值。`if` 等流控制语句会自动执行其他类型值到布尔值的转换。

``` js
let name = 'neal'
console.log(Boolean(name)) // true

if (name) {
  console.log('ok') // ok
}
```

不同类型与布尔值之间的转换规则如下：

| 数据类型   | 转为 `true` | 转为 `false`   |
| :-------- | :---------- | :------------- |
| Boolean   | `true`      | `false`        |
| String    | 非空字符串   | `""`（空字符串）|
| Number    | 非零数值     |  `0`、`NaN`    |
| Object    | 任意对象     | `null`         |
| Undefined | -           | `undefined`    |

### Number 类型

**Number** 类型使用 [IEEE 754](http://en.wikipedia.org/wiki/IEEE_754-1985) 格式表示整数和浮点值。  

``` js
let num = 18; // 十进制 18
let octaNum = 0o20 // 八进制 18
let hexNum = 0x12 // 十六进制 18

// 非严格模式下，也可以表示八进制 18，严格模式下，前缀 0 会被视为语法错误
let octaNum2 = 020 
// 非严格模式下，第一个数字为 0，如果第二个数字超过八进制数 7，就会忽略前面的 0，后面的数字会被当成十进制。
let num1 = 099 
```

#### 浮点值

要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字。

``` js
let floatNum1 = 1.5
let floatNum2 = 0.1
let floatNum3 = .1 // 有效，但不推荐

let floatNum4 = 1. // 小数点后面没有数字，会被当成整数 1 处理
let floatNum5 = 10.0 // 小数点后面是零，会被当成整数 10 处理
```

ECMAScript 中科学记数法的格式是一个数值后跟一个大写或小写的字母 `e`，再加上 10 的次幂数。默认情况下，小数点后至少包含 6 个零的浮点值会自动转换为科学记数法。

``` js
let floatNum1 = 1.125e5 // 112500
let floadtNum2 = 0.0000003
console.log(floadtNum2) // 3e-7
```

::: details 为什么 0.1 加 0.2 不等于 0.3 ？

``` js
let sum = 0.1 + 0.2
console.log(sum) // 0.30000000000000004 
```

我们知道，数字以二进制的形式存储在内存中，二进制数字系统可以保证以 2 的整数次幂作为除数时能够正常工作，但 1/10 就变成了一个无限循环的二进制小数，所以无法精确存储 0.1 或 0.2。虽然 IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题，但这种精度损失还是会存在。
:::

#### 值的范围

ECMAScript 可以表示的最小数值保存在 `Number.MIN_VALUE`，可以表示的最大数值保存在 `Number.MAX_VALUE` 中。

如果某个计算得到的数值结果超出了可表示的范围，那么这个数值会被自动转换为一个特殊的 `Infinity`（无穷）值，负数以 `-Infinity`（负无穷大）表示，正数以 `Infinity`（正无穷大）表示。使用 `isFinite()` 函数可以判断一个数值是否是在可表示的范围内。

``` js
console.log(3 / 0); // Infinity
console.log(3 / -0); // -Infinity 

console.log(isFinite('')) // true 空字符串或仅有空格的字符串会被视为 0
console.log(isFinite(Number.NEGATIVE_INFINITY)) // false Number.NEGATIVE_INFINITY 存储的是 -Infinity
console.log(isFinite(Number.POSITIVE_INFINITY)) // false Number.POSITIVE_INFINITY 存储的是 Infinity
```

#### NaN

`NaN` 是 Not a Number 的缩写，表示不是数值，它不等于包括它自身的任何值，通常用于表示原本要返回数值的失败操作。

``` js
console.log(0 / 0) // NaN
console.log(-0 / +0) // NaN

console.log(NaN == NaN) // false
```

使用 `isNaN()` 函数可以判断一个值是否是 `NaN`，任何不能转换为数值的值都会导致这个函数返回 `true`。

``` js
console.log(isNaN(NaN)) // true
console.log(isNaN(1)) // false
console.log(isNaN('2')) // false，可以转换为数值 2
console.log(isNaN('hi')) // true，不可以转换为数值
console.log(isNaN(true)) // false，可以转换为数值 1
```

#### 数值转换

`Number()` 是转型函数，可用于任何数据类型。转换规则如下：

* 布尔值，`true` 转换为 `1`，`false` 转换为 `0`。
* 数值，直接返回。
* `null`，返回 `0`。
* `undefined`，返回 `NaN`。
* 字符串，应用以下规则。
  
  * 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值（忽略前面的零）。
  * 如果字符串包含有效的浮点值格式，则会转换为相应的浮点值。
  * 如果字符串包含有效的十六进制格式，则会转换为对应的十进制整数值。
  * 如果是空字符串，则返回 `0`。
  * 如果字符串包含除上述情况之外的其他字符，则返回 `NaN`。
  
* 对象，调用 `valueOf()` 方法，并按照上述规则转换返回的值。如果转换结果是 `NaN`，则调用 `toString()` 方法，再按照转换字符串的规则转换。

``` js
console.log(Number(true)) // 1
console.log(Number(false)) // 0
console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN
console.log(Number('012')) // 12
console.log(Number('012.5')) // 12.5
console.log(Number('0xF')) // 15
console.log(Number('')) // 0
console.log(Number('hi')) // NaN
console.log(Number({})) // NaN
const obj = {
  valueOf() { 
    return 1 
  }
}
console.log(Number(obj)) // 1
```

`parseInt()` 函数更专注于字符串是否包含数值模式。转换规则如下：

* 从第一个非空格字符开始转换，如果第一个字符不是数值、加号或减号，立即返回 `NaN`。
* 如果第一个非空格字符是数值字符、加号或减号，则依次检测后面每个字符，遇到非数值字符就结束检测并忽略剩余所有字符。
* 如果字符串以 `0x` 开头，会被解释为十六进制整数。

``` js
console.log(parseInt('')) // NaN
console.log(parseInt('a123')) // NaN
console.log(parseInt('-123hi')) // -123
console.log(parseInt('0xA')) // 10
console.log(parseInt(22.5)) // 22
```

`parseInt()` 接收第二个参数，用于指定进制数。

``` js
console.log(parseInt('020', 8)) // 16
console.log(parseInt('20', 8)) // 16
console.log(parseInt('0xAA', 16)) // 170
console.log(parseInt('AA', 16)) // 170
```

`parseFloat()` 函数的工作方式跟 `parseInt()` 函数类似。具体规则如下：

* 从第一个非空格字符开始解析，并忽略字符串开头的零，解析到字符串末尾或者解析到一个无效的浮点数值字符为止。
* 字符串中第一次出现的小数点有效，第二次出现的小数点无效且忽略剩余的字符。
* 只能识别浮点格式以及十进制格式，识别十六进制数值始终会返回 `0`。
* 如果字符串表示整数（包括小数点后面只有一个零），则返回整数。

``` js
console.log(parseFloat('  001.5a')) // 1.5
console.log(parseFloat('1.3.5')) // 1.3
console.log(parseFloat('0xAA')) // 0
console.log(parseFloat('123hi')) // 123
console.log(parseFloat('10.0')) // 10
```

### String 类型

**String**（字符串）数据类型表示零或多个 16 位 Unicode 字符序列。  
字符串必须使用双引号（"）、单引号（'）或反引号（`）包起来。

``` js
let name1 = 'neal'
let name2 = "neal"
let name3 = `neal`
```

#### 字符字面量

字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符。

| 字面量 | 含义|
| :---- | :--- |
| `\n`  | 换行 |
| `\t`  | 制表符 |
| `\b`,`\f`,`\v`   | 退格，换页，垂直标签，已经不使用 |
| `\r`   | 回车，不单独使用。Windows 文本文件使用两个字符 \r\n 的组合来表示换行 |
| `\\`    | 反斜杠 |
| `\'`,`\"`,`` \` ``  | 引号 |
| `\xXX`  | 以十六进制编码 `XX` 表示的字符，例如 `'\x41'` 等于 `'A'` |
| `\uXXXX`  | 以十六进制编码 `XXXX` 表示的 Unicode 字符，例如 `'\u03a3'` 等于希腊字符 `'Σ'` |
| `\u{X…XXXXXX}`（1 到 6 个十六进制字符）  | 具有给定 UTF-32 编码的 Unicode 符号。一些罕见的字符用两个 Unicode 符号编码，占用 4 个字节。例如 `'\u{1F60D}'` 等于 😍|

#### 字符串的特点

ECMAScript 中的字符串是不可变的。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。

``` js
let str = 'hi'
str[0] = 'H'
console.log(str[0]) // h
```

#### 转换为字符串

使用 `toString()` 方法可以返回当前值的字符串等价物。它遵循以下规则：

* `toString()` 方法可见于数值、布尔值、对象和字符串值，`null` 和 `undefined` 值没有该方法。
* 对数值调用这个方法时，`toString()` 可以接收一个参数，表示以什么进制来输出数值的字符串表示，默认十进制。

``` js
let age = 18
console.log(age.toString()) // "18"

let found = false
console.log(found.toString()) // "false"

let num = 10;
console.log(num.toString()); // "10"
console.log(num.toString(2)); // "1010"
console.log(num.toString(8)); // "12"
console.log(num.toString(10)); // "10"
console.log(num.toString(16)); // "a" 
```

使用 `String()` 转型函数始终会返回表示相应类型值的字符串。它遵循以下规则：

* 如果值有 toString()方法，则调用该方法（不传参数）并返回结果。
* 如果值是 null，返回"null"。
* 如果值是 undefined，返回"undefined"。

``` js
let v1 = 10;
let v2 = true;
let v3 = null;
let v4;
console.log(String(v1)); // "10"
console.log(String(v2)); // "true"
console.log(String(v3)); // "null"
console.log(String(v4)); // "undefined" 
```

#### 模板字面量

ECMAScript 6 新增了使用模板字面量定义字符串的能力。

* 模板字面量保留换行字符，支持跨行定义字符串。

``` js
let description = `
hi, 
long time no see!`
console.log(description)
// hi, 
// long time no see!
console.log(description[0] === '\n') // true
```

* 模板字面量支持字符串插值，通过在 `${}` 中使用一个 JavaScript 表达式实现。所有插入的值都会使用 `toString()` 强制转型为字符串，嵌套的模板字符串无须转义。

``` js
let name = 'neal'
let age = { toString: () => '18' }
let intro = `my name is ${name}`
console.log(intro) // "my name is neal"

console.log(`${intro}, ${age} years old.`) // "my name is neal, 18 years old."
```

* 模板字面量也支持定义标签函数。标签函数用于自定义插值行为，它接收的参数依次是原始字符串数组和对每个表达式求值的结果，返回值是对模板字面量求值得到的字符串。

``` js
let a = 2
let b = 3
function tag(strings, ...expressions) {
  console.log(strings, expressions) // [ '', ' * ', ' = ', '' ] [ 2, 3, 6 ]
  return expressions.map((e, i) => `${e}${strings[i + 1]}`).join('')
}

let untaggedResult = `${a} * ${b} = ${a * b}`
let taggedResult = tag`${a} * ${b} = ${a * b}`
console.log(untaggedResult) // "2 * 3 = 6"
console.log(taggedResult) // "2 * 3 = 6"
```

* 模板字面量也可以直接获取原始的模板字面量内容。

``` js
console.log(`\u00A9`); // ©
console.log(String.raw`\u00A9`); // \u00A9 

console.log(String.raw`first line\nsecond line`); // "first line\nsecond line" 
```

### Symbol 类型

**Symbol**（符号）是 ECMAScript 6 新增的数据类型，用于创建唯一标识符。

#### 基本用法

使用 `Symbol()` 函数可以初始化一个 Symbol，同时可以传入一个字符串参数作为对该符号的描述。

``` js
let symbol1 = Symbol('fff')
console.log(typeof symbol1) // "symbol"
console.log(symbol1) // Symbol(fff)
console.log(symbol1.description) // "fff"

// 不能将 Symbol() 函数作为构造函数使用
let symbol2 = new Symbol() // TypeError: Symbol is not a constructor

// 可以使用 Object() 函数包装 Symbol
let symbol3 = Object(Symbol())
console.log(symbol3) // Symbol {Symbol()}
console.log(typeof symbol3) // "object"
```

#### 全局 Symbol

可以在全局 Symbol 注册表中创建全局 Symbol，以供代码其他部分共享和重用。使用 `Symbol.for()` 方法可以从注册表中读取（不存在则创建) Symbol，需要传入一个字符串（非字符串会转为字符串）作为键。

``` js
// 读取失败，创建全局 Symbol
let globalSymbol1 = Symbol.for('fff');
console.log(typeof globalSymbol1); // "symbol" 

// 读取全局 Symbol
let globalSymbol2 = Symbol.for('fff');
console.log(globalSymbol1 === globalSymbol2); // true

// 再次读取全局 Symbol
let globalSymbol3 = Symbol.for({
  toString() {
    return 'fff'
  },
})

console.log(globalSymbol1 === globalSymbol3); // true
```

使用 `Symbol.keyFor()` 方法可以查询全局注册表，返回传入的全局 Symbol 对应的字符串键。如果查询的不是全局 Symbol，则返回 `undefined`；如果传入参数不是 Symbol，则返回，则抛出 TypeError。

``` js
let globalSymbol = Symbol.for('js') // 全局符号
console.log(Symbol.keyFor(globalSymbol)) // "js"

let symbol = Symbol('css') // 普通符号
console.log(Symbol.keyFor(symbol)) // "undefined"

console.log(Symbol.keyFor(1)) // TypeError: 1 is not a symbol
```

#### 使用 Symbol 作为属性

凡是可以使用字符串或数值作为属性的地方，都可以使用 Symbol。

``` js
let symbol1 = Symbol('a')
let symbol2 = Symbol('b')
let symbol3 = Symbol('c')
let symbol4 = Symbol('d')

let obj = {
  [symbol1]: 'A',
}

Object.defineProperty(obj, symbol2, {
  value: 'B',
})

Object.defineProperties(obj, {
  [symbol3]: {
    value: 'C',
  },
  [symbol4]: {
    value: 'D',
  },
})

console.log(obj) // {Symbol(a): "A", Symbol(b): "B", Symbol(c): "C", Symbol(d): "D"}
```

* `for..in` 循环和 `Object.keys()` 方法会忽略 Symbol 属性。
* `Object.assign()` 方法会同时复制字符串和 Symbol 属性。
* `Object.getOwnPropertyNames()` 返回对象的常规属性数组，`Object.getOwnPropertySymbols()` 返回对象的 Symbol 属性数组。
* `Object.getOwnPropertyDescriptors()` 会返回同时包含常规和 Symbol 属性描述符的对象，`Reflect.ownKeys()` 会返回两种类型的键。

``` js
let obj = {
  firstName: 'neal',
  lastName: 'feng',
  [Symbol('age')]: 20,
}

for (let key in obj) {
  console.log(key)
}
// "firstName"
// "lastName"

console.log(Object.keys(obj)) // ["firstName", "lastName"]
console.log(Object.getOwnPropertyNames(obj)) // ["firstName", "lastName"]
console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(age)]
console.log(Object.getOwnPropertyDescriptors(obj)) // {firstName: {…}, lastName: {…}, Symbol(age): {…}}
console.log(Reflect.ownKeys(obj)) // ["firstName", "lastName", Symbol(age)]
```

Symbol 属性是对内存中 Symbol 的一个引用，如果没有显式地保存对 Symbol 属性的引用，那么必须遍历对象的所有符号属性才能找到相应的属性键。

``` js
let obj = {
  [Symbol('js')]: 'JavaScript',
  [Symbol('css')]: 'Cascading Style Sheets',
}

let jsSymbol = Object.getOwnPropertySymbols(obj).find((s) => s.description === 'js')
console.log(jsSymbol) // Symbol(js)
```

#### 系统 Symbol

JavaScript 内部有很多“系统” Symbol，用于暴露语言内部行为，我们可以使用它们来微调对象的各个方面。例如 `Symbol.iterator` 返回对象默认的迭代器，由类似 `for-of` 语句的接收可迭代对象的原生语言特性使用，我们可以按需重写某个对象的 `Symbol.iterator` 返回的迭代器。

``` js
class Double {
  constructor(params) {
    this.params = params
  }

  * [Symbol.iterator]() {
    yield* this.params.map((v) => v * 2)
  }
}

const foo = new Double([1, 2, 3])

for (const element of foo) {
  console.log(element)
}
// 2
// 4
// 6
```

更多“系统” Symbol 请参考[Well-known Symbols](https://tc39.es/ecma262/#sec-well-known-symbols)。

### BigInt 类型

**BigInt** 是一种特殊的数字类型，它可以表示任意大的整数。可以在一个整数字面量后面加 `n` 或者调用 `BigInt()` 函数定义一个 `BigInt`。

``` js
const bigint1 = 123456789n
console.log(typeof bigint1) // "bigint"

const bigint2 = BigInt(987654321)
console.log(typeof bigint2) // "bigint"
```

`+`（非一元 `+`）、`*`、`-`、`**`、`%`、`==`、`===`、`!`、`!!` 以及除 `>>>`（无符号右移）之外的位操作，这些操作符都可以和 `BigInt` 一起使用，其中带小数的运算会被向零取整。

``` js
const bigint1 = 3n
const bigint2 = 2n

console.log(bigint1 + bigint2) // 5n
console.log(bigint1 - bigint2) // 1n
console.log(bigint2 - bigint1) // -1n
console.log(bigint1 * bigint2) // 6n
console.log(bigint1 / bigint2) // 1n 被向零取整
console.log(bigint1 ** bigint2) // 9n
console.log(bigint1 % bigint2) // 1n
console.log(bigint1 >> bigint2) // 0n
console.log(bigint1 << bigint2) // 12n
console.log(0n === 0) // false
console.log(0n == 0) // true
console.log(0n || bigint1) // 3n
console.log(0n && bigint1) // 0n
console.log(!bigint1) // false
console.log(!0n) // true
```

### Object 类型

ECMAScript 中的对象是一组数据和功能的集合。可以通过创建 **Object** 类型的实例来创建对象，每个 Object 实例都有以下属性和方法。

* `constructor`：用于创建当前对象的函数。
* `hasOwnProperty(propertyName)`：用于判断当前对象实例（非原型）上是否存在给定的属性，传入的属性名必须是字符串或 Symbol。
* `isPrototypeOf(object)`：用于判断当前对象是否为另一个对象的原型。
* `propertyIsEnumerable(propertyName)`：用于判断给定的属性是否可以使用 `for-in` 语句枚举。
* `toString()`：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
* `toLocaleString()`：返回对象的字符串表示。
* `valueOf()`：返回对象对应的字符串、数值或布尔值表示。

``` js
const person = new Object()
person.name = 'neal'
person.age = 20

const cat = new Object()
cat.name = 'seven'
cat.color = 'white'

console.log(person.constructor) // ƒ Object() { [native code] }
console.log(person.hasOwnProperty('name')) // true
console.log(person.isPrototypeOf(cat)) // false
console.log(person.propertyIsEnumerable('age')) // true
console.log(person.toString()) // [object Object]
console.log(person.toLocaleString()) // [object Object]
console.log(person.valueOf()) // {name: "neal", age: 20}
```


