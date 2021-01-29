# 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

## 理解迭代

循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要执行什么操作。每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的。例如遍历一个数组：

```js
const arr = ['bar', 'foo', 'baz']

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
// bar
// foo
// baz
```

通过这种循环操作来执行例程有以下不足：

* 迭代之前需要事先知道如何使用数据结构。数组中的每一项都只能先通过引用取得数组对象，然后再通过 `[]` 操作符取得特定索引位置上的项。这种情况并不适用于所有数据结构，例如 [Map](https://developer.mozilla.org/zh-cn/docs/Web/JavaScript/Reference/Global_Objects/Map)。
* 遍历顺序并不是数据结构固有的。通过递增索引来访问数据是特定于数组类型的方式，并不适用于其他具有隐式顺序的数据结构。

为此，很多语言都提供了原生语言结构以解决这个问题，开发者无须事先知道如何迭代就能实现迭代操作。这个解决方案就是迭代器模式。Python、Java、C++，还有其他很多语言都对迭代器模式提供了完备的支持。

JavaScript 在 ES5 新增了 `Array.prototype.forEach()` 方法，它解决了单独记录索引和通过数组对象取得值的问题，但是没有办法标识迭代何时终止。ES6 以后，JavaScript 新增了[迭代器和生成器](https://developer.mozilla.org/zh-cn/docs/Web/JavaScript/Guide/Iterators_and_Generators#%E8%BF%AD%E4%BB%A3%E5%99%A8)，完美地支持了迭代器模式。

## 内部迭代器和外部迭代器

### 内部迭代器

由于内部迭代器的迭代规则在使用前就被定义，所以在调用的时候比较方便，外界不用关心迭代器内部的实现，正因为如此，内部迭代器也不够灵活。

比如实现一个简单迭代器 `each()` 如下：

```js
const each = function (arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn.call(arr[i], arr[i], i)
  }
}
```

显然， `each()` 函数将无法完成同时迭代两个数组的需求，如果迭代的对象不是数组结构也会失败。

### 外部迭代器

外部迭代器必须显式地请求迭代下一个元素，虽然增加了一些调用的复杂度，但增强了其灵活性，使用者可以手动控制迭代的过程。

比如实现一个外部迭代器工厂 `Iterator()`，它返回一个迭代器对象：

```js
const Iterator = function (obj) {
  let index = 0
  let done = false

  const next = function () {
    done = index >= obj.length
    const value = done ? undefined : obj[index++]
    return { done, value }
  }

  return {
    next
  }
}

const iterator = Iterator(['foo', 'bar', 'baz'])
console.log(iterator.next()) // {done: false, value: "foo"}
console.log(iterator.next()) // {done: false, value: "bar"}
console.log(iterator.next()) // {done: false, value: "baz"}
console.log(iterator.next()) // {done: true, value: undefined}
```

外部迭代器虽然调用方式相对复杂，但它可以满足更多场景。
