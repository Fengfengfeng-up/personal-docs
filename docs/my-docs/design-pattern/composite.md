# 组合模式

组合模式是又称整体-部分模式，它是一种将对象组合成树状的层次结构的模式，用来表示“整体-部分”的关系，使用户对单个对象和组合对象具有一致的访问性，属于结构型设计模式。

组合模式将对象组合成树形结构中，以表示“整体-部分”的层次结构，每当对最上层的对象进行一次请求时，实际上是在对整个树形结构进行深度优先遍历。利用对象的多态性表现，组合模式可以使客户端忽略组合对象和单个对象的不同，对它们进行统一处理。其次，往树形结构里添加新的节点也很容易，客户端不会因为加入了新的对象而更改源代码，满足开放-封闭原则。

## JavaScript 中的组合模式

静态类型语言，如 Java 中实现组合模式的关键是 `Composite` 类和 `Leaf` 类都必须继承自一个 `Component` 抽象类。这个 `Component` 类既代表组合对象，又代表叶对象，它能够保证组合对象和叶对象拥有同样名字的方法，从而可以对同一消息都做出反馈。组合对象和叶对象的具体类型被隐藏在 `Component` 抽象类身后。

在 JavaScript 中，对象的多态性是与生俱来的，因此在 JavaScript 中实现组合模式不需要抽象类，只要保证组合对象和叶对象拥有同样的方法。

### 实现组合模式

文件夹和文件之间的关系非常适合使用组合模式来描述。文件夹里既可以包含文件，又可以包含其他文件夹，最终可能组合成一棵树。

这里使用组合模式模拟杀毒软件的一次扫描杀毒操作，代码如下：

``` js
// 文件夹构造函数
const Folder = function (name) {
  this.name = name
  this.parent = null
  this.files = []
}

// 添加文件或文件夹
Folder.prototype.add = function (file) {
  this.files.push(file)
  file.parent = this
  return this
}

// 扫描文件夹
Folder.prototype.scan = function (callback) {
  this.files.forEach((file) => file.scan(callback))
}

// 删除文件夹
Folder.prototype.remove = function () {
  if (!this.parent) return

  const files = this.parent.files
  for (let i = files.length; i >= 0; i--) {
    if (files[i] === this) {
      files.splice(i, 1)
    }
  }
}

// 文件类
const File = function (name) {
  this.name = name
  this.parent = null
}

File.prototype.add = function () {
  throw new Error('不能往文件里添加文件')
}

// 扫描文件
File.prototype.scan = function (callback) {
  if (callback) {
    callback(this)
  } else {
    console.log(this.name)
  }
}

// 删除文件
File.prototype.remove = function () {
  if (!this.parent) return

  const files = this.parent.files
  for (let i = files.length; i >= 0; i--) {
    if (files[i] === this) {
      files.splice(i, 1)
    }
  }
}

const books = new Folder('books')
const js = new Folder('js')
const css = new Folder('css')
books.add(js).add(css)

const virus = new File('virus')
books.add(virus) // 添加病毒文件

js.add(new File('学习 JavaScript 数据结构与算法（第 3 版）'))
css.add(new File('CSS 揭秘'))

books.scan((file) => {
  if (file.name === virus.name) {
    console.log(`发现病毒：${file.name}`)
    file.remove()
    console.log('已清除...')
  } else {
    console.log(file.name)
  }
})

// 学习 JavaScript 数据结构与算法（第 3 版）
// CSS 揭秘
// 发现病毒：virus
// 已清除...
```

可以发现，当对 `books` 文件夹进行扫描时，只需要执行该对象的 `scan()` 方法，即可对其包含的所有文件夹及文件统一进行扫描操作。其次，增加和删除文件非常方便，不需要修改额外代码，符合开放-封闭原则。
