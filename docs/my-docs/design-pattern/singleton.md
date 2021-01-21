# 单例模式

单例模式是开发中常用的一种设计模式，用途十分广泛，它的核心是保证一个类仅有一个实例（一个对象是唯一的），并提供全局访问。

## 传统的单例模式

以类为中心的传统面向对象言语实现单例模式通常需要定义类来创建单例对象，实现大致如下：

```js
const Cat = (function () {
  let cat = null

  function Cat(name) {
    if (cat) {
      return cat
    }
    this.name = name
    cat = this
  }

  Cat.prototype.getName = function () {
    return this.name
  }

  return Cat
})()

const cat1 = new Cat('seven')
const cat2 = new Cat('eleven')
console.log(cat1 === cat2) // true
console.log(cat1.getName() === cat2.getName()) // true
```

### 用代理实现单例模式

通过使用代理类将负责管理单例的逻辑分离出去：

```js
const Cat = function (name) {
  this.name = name
}

Cat.prototype.getName = function () {
  return this.name
}

const ProxySingletonCat = (function () {
  let cat = null

  return function (name) {
    if (!cat) {
      cat = new Cat(name)
    }
    return cat
  }
})()

const cat1 = new ProxySingletonCat('seven')
const cat2 = new ProxySingletonCat('eleven')
console.log(cat1 === cat2) // true
console.log(cat1.getName() === cat2.getName()) // true
```

### 惰性单例

惰性单例指的是在需要的时候才创建单例对象。

```js
const Singleton = function (id) {
  this.id = id
}

Singleton.instance = null

Singleton.getInstance = function (id) {
  if (!this.instance) { 
    this.instance = new Singleton(id) // 没有实例才创建
  }
  return this.instance
}

const ins1 = Singleton.getInstance(1)
const ins2 = Singleton.getInstance(2)
console.log(ins1 === ins2) // true
```

## JavaScript 中的单例模式

与传统面向对象语言不同，JavaScript 并没有真正的“类”，创建对象也非常简单，一个全局变量就已满足单例的条件，所以传统的单例模式实现在 JavaScript 中并不适用。

我们可以利用高阶函数（此处指将函数作为函数参数传递）和闭包来实现通用的惰性单例模式：

```js
// 用于管理单例的函数
const getSingle = function (fn) {
  let result = null

  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

// 实际用于创建单例对象的函数
const createSingletonObj = getSingle((id) => {id})

const obj1 = createSingletonObj(1)
const obj2 = createSingletonObj(2)
console.log(obj1 === obj2) // true
```

单例模式的强大之处在于它不仅可以用来创建唯一对象，也可以用它来确保某些功能函数只执行一次，例如事件绑定。
