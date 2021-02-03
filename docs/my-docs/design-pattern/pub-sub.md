# 发布—订阅模式

发布—订阅模式类似观察者模式，它定义了对象之间的一种一对多的依赖关系，当一个对象的状态改变时，所有依赖于它的对象都将得到通知。

## 理解发布—订阅模式

从字面上不难看出，发布—订阅模式有“发布”和“订阅”两个动词对应着发布者和订阅者两种对象，而订阅者往往是多个，所以也就是一对多的关系。当发布者达到某种状态时，将执行“发布”动作，订阅者们也将收到“发布”的消息。

在现实生活中，随处可见发布—订阅模式的例子。比如微信公众号，人们通过订阅喜欢的公众号来获取信息，当公众号管理者发布新文章时，微信后台将陆续通知订阅该公众号的所有读者。公众号管理者不需要自己主动通知所有的读者，只需要点击发布按钮即可，读者们也不需要一直盯着屏幕查看是否更新，因为公众号一旦更新，微信会立刻发出提醒通知。公众号管理者也不用担心新增的读者是否能收到更新消息，因为微信后台会将一切搞定。

由上面的例子可以得出以下两点：

* 发布—订阅模式使得我们无需关心一个对象内部状态的改变，只需要订阅感兴趣的某个事件发生点即可，即为时间上的解耦。
* 发布—订阅模式可以取代对象之间硬编码的通知机制，一个对象不需要再显式地调用另一个对象的某个接口，即为对象之间的解耦。

## JavaScript 中的发布—订阅模式

在 JavaScript 中也能轻松找到发布—订阅模式的影子，例如 DOM 事件：

```js
document.body.addEventListener('click', () => {
  console.log('body')
})
```

因为无法预测用户动作，所以我们订阅 `document.body` 上的点击事件，当事件发生时，引擎会自动执行我们写入的回调函数。

### 实现发布—订阅模式

假如有这样一个需求，要求实现一个 `Events` 模块，可以实现自定义事件的订阅、触发、移除等功能。

使用该功能的代码如下：

```js
const event = new Events()
const fn1 = (...args) => console.log('I want sleep1', ...args)
const fn2 = (...args) => console.log('I want sleep2', ...args)
event.on('sleep', fn1, 1, 2, 3)
event.on('sleep', fn2, 1, 2, 3)
event.fire('sleep', 4, 5, 6)
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1)
event.fire('sleep', 4)
// I want sleep2 1 2 3 4
event.once('sleep', () => console.log('I want sleep too'))
event.fire('sleep')
// I want sleep2 1 2 3
// I want sleep too
event.fire('sleep') 
// I want sleep2 1 2 3
```

使用发布—订阅模式实现该需求的代码如下：

```js
class Events {
  constructor() {
    this.clients = {} // 存放事件类型以及对应的订阅者列表
  }

  // 静态方法，增加订阅者
  static addListener(type, listener) {
    if (!this.clients[type]) {
      this.clients[type] = new Map()
    }

    const { origin, ...rest } = listener
    this.clients[type].set(origin, rest)
  }

  // 订阅
  on(type, fn, ...args) {
    Events.addListener.call(this, type, {
      origin: fn,
      bindFn: fn.bind(this, ...args),
    })
  }

  // 触发（发布）
  fire(type, ...args) {
    const clients = this.clients[type]
    if (!clients || clients.size === 0) return false

    for (const [origin, { bindFn, once }] of clients) {
      bindFn.apply(null, args)

      if (once) {
        clients.delete(origin)
      }
    }
  }

  // 取消订阅
  off(type, fn) {
    const clients = this.clients[type]
    if (!clients || clients.size === 0) return false

    clients.delete(fn)
  }

  // 单次订阅（只触发一次）
  once(type, fn, ...args) {
    Events.addListener.call(this, type, {
      origin: fn,
      bindFn: fn.bind(this, ...args),
      once: true,
    })
  }
}
```

通过以上例子可以发现，在 JavaScript 中主要采取了回调函数的形式来代替传统的发布—订阅模式，显得更加简单和优雅。其次，我们无需选择使用推模型还是拉模型，当事件发生时，通过 `arguments` 对象和 `Function.prototype.apply()` 方法可以很便捷地将更改的状态和数据都推送给订阅者。
