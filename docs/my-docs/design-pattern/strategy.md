# 策略模式

**策略模式**是将一系列算法（行为）封装起来，使它们可以相互替换。它有以下优点：

* 利用组合、委托和多态等技术和思想，将算法的使用与算法的实现分离开来，有效地避免了多重条件选择语句。
* 提供了对开放——封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换、理解、复用和扩展。
* 利用组合和委托让 `Context` 拥有执行算法的能力。

## 传统的策略模式

传统面向对象言语中的策略模式至少由以下两部分组成：

* 一组策略类，每个策略类封装了具体的算法，用于负责具体的计算过程。
* 环境类 `Context`，用于接收用户请求，并把请求委托给某一个策略类。

这里以实现一个简单计算器为例子，模仿实现如下：

```js
// 加法策略类
const Addition = function () {}
Addition.prototype.calculate = (a, b) => a + b

// 减法策略类
const Subtraction = function () {}
Subtraction.prototype.calculate = (a, b) => a - b

// 乘法策略类
const Multiplication = function () {}
Multiplication.prototype.calculate = (a, b) => a * b

// 除法策略类
const Division = function () {}
Division.prototype.calculate = (a, b) => a / b

// Context
const Calculator = function () {
  this.a = 0
  this.b = 0
  this.strategy = null // 策略对象
}

Calculator.prototype.setParams = function (a, b) {
  this.a = a
  this.b = b
}

Calculator.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}

Calculator.prototype.calculate = function () {
  if (!this.strategy) {
    throw new Error('have you set a strategy to apply?')
  }

  return this.strategy.calculate(this.a, this.b) // 将计算操作委托给对应的策略对象
}

const calculator = new Calculator()
calculator.setParams(7, 11)
calculator.setStrategy(new Multiplication())
console.log(calculator.calculate()) // 77
```

## JavaScript 中的策略模式

由于在 JavaScript 中函数也是对象，同时可以作为函数参数传递，所以更简单的做法是将这些 strategy 直接定义为函数，封装在一个对象中，同时也不再需要 `Context` 类，而是直接通过函数充当 context 接收用户请求，利用对象多态性委托具体 strategy 函数。

这里沿用简单计算器的例子：

```js
// 包含一系列策略对象的对象
const strategies = {
  addition: (a, b) => a + b,
  subtraction: (a, b) => a - b,
  multiplication: (a, b) => a * b,
  division: (a, b) => a / b
}

// context 函数
const calculator = (strategy, a, b) => {
  return strategies[strategy](a, b)
}

console.log(calculator('multiplication', 7, 11)) // 77
```
