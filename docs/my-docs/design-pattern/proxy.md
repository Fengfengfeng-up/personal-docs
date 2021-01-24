# 代理模式

代理模式是一个对象提供一个代用品或占位符，以便控制对它的访问。

当不方便直接访问目标对象或访问目标对象时需要额外操作的时候，为了尽可能遵守单一指责原则和开放—封闭原则，可以使用代理模式对代码结果进行优化，使得目标对象高内聚，低耦合，易于扩展和复用。

代理模式包含了许多变体，在 JavaScript 开发中最常用的是虚拟代理和缓存代理。

## 虚拟代理

对于一些占用系统资源较多或者加载时间较长的对象，可以给这些对象提供一个虚拟代理。在真实对象创建成功之前虚拟代理扮演真实对象的替身，而当真实对象创建之后，虚拟代理将用户的请求转发给真实对象。

这里以实现图片预加载为例子，`myImg` 对象作为真实对象，用于创建 `img` 标签，并对外提供 `setSrc` 接口。`virtualProxyImg` 作为虚拟代理对象，用以控制对 `myImg` 的访问，在真正的图片加载完成之前，先将 `img` 标签的 `src` 属性设置为一张本地的图片。

```js
const myImg = (function() {
  const img = document.createElement('img')
  document.body.appendChild(img)
  return {
    setSrc(src) {
      img.src = src
    }
  }
})()

const virtualProxyImg = (function() {
  const img = new Image()
  img.onload = function() {
    // 当图片加载完成时，通知 myImg 替换 src
    myImg.setSrc(this.src)
  }

  return {
    setSrc(src) {
      myImg.setSrc('loading.gif') // 图片加载完成之前使用另外一张图片进行占位
      img.src = src
    }
  }
})()

virtualProxyImg.setSrc('https://cdn.striveforus.com/IMG_7151.JPG')
```

给 `img` 标签设置 `src` 属性和图片预加载这两个功能被隔离在两个对象里，它们可以各自变化而不互相影响，这是符合开放—封闭原则的。

## 缓存代理

缓存代理为某一个操作的结果提供临时的缓存存储空间，以便在后续使用中能够共享这些结果，从而可以避免某些方法的重复执行，优化系统性能。

这里以对乘法运算创建缓存代理为例：

```js
const multiplication = function(...params) {
  console.log('multiplication')
  let result = 1
  for (let i = 0; i < params.length; i++) {
    result *= params[i]
  }
  return result
}

const cacheProxyMultiplication = (function() {
  const cache = {} // 缓存对象

  return function() {
    const params = Array.from(arguments).join(',')
    if (params in cache) {
      // 如果有缓存
      return cache[params]
    }
    return (cache[params] = multiplication.apply(this, arguments))
  }
})()

console.log(cacheProxyMultiplication(7, 11))
console.log(cacheProxyMultiplication(7, 11))
// multiplication
// 77
// 77
```

多次调用 `cacheProxyMultiplication()` 函数时，如果再次传入相同参数，将不会重复执行 `multiplication()` 函数，而是返回缓存对象 `cache` 保存的结果。
