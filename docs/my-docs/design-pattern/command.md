# 命令模式

**命令模式**是将请求以命令的形式包裹在对象中，并传给调用对象，调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。

命令模式将请求封装成 `command` 对象，该对象可以在程序中四处传递，请求发送者不必直接与请求接收者产生联系，因此解开了请求发送者和请求接收者之间的耦合关系。相对于过程化的请求调用，`command` 对象拥有更长的生命周期。此外，命令模式还支持撤销、排队等操作。

## 传统的命令模式

假设有一个用户界面程序，该用户界面上有几个按钮，点击按钮后，必须向某些负责具体行为的对象发送请求，这些对象就是请求的接收者。起初并不清楚接收者是什么对象，也不知道接收者会做什么，所以需要借助命令对象的帮助解开按钮与负责具体行为的对象之间的耦合。

模拟传统面向对象语言的实现如下：

```js
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')

const setCommand = (button, command) => {
  // 负责往按钮上安装命令，点击该按钮时，会默认调用 command 对象的 execute() 方法
  button.onclick = () => command.execute()
}

// 菜单
const MenuBar = {
  refresh: () => console.log('刷新菜单目录'),
}

// 子菜单
const SubMenu = {
  add: () => console.log('增加子菜单'),
  del: () => console.log('删除子菜单'),
}

// 刷新菜单目录命令类
class RefreshMenuBarCommend {
  constructor(receiver) {
    this.receiver = receiver
  }

  execute() {
    this.receiver.refresh()
  }
}

// 增加子菜单命令类
class AddSubMenuCommend {
  constructor(receiver) {
    this.receiver = receiver
  }

  execute() {
    this.receiver.add()
  }
}

// 删除子菜单命令类
class DelSubMenuCommend {
  constructor(receiver) {
    this.receiver = receiver
  }

  execute() {
    this.receiver.del()
  }
}


// 将命令接收者传入 command 对象
const refreshMenuBarCommend = new RefreshMenuBarCommend(MenuBar)
const addSubMenuCommend = new AddSubMenuCommend(SubMenu)
const delSubMenuCommend = new DelSubMenuCommend(SubMenu)

// 将 command 对象安装到对应的 button 上
setCommand(btn1, refreshMenuBarCommend)
setCommand(btn2, addSubMenuCommend)
setCommand(btn3, delSubMenuCommend)
```

## JavaScript 中的命令模式

JavaScript 作为将函数作为一等对象的语言，跟策略模式一样，命令模式也早已融入到语言之中。在面向对象设计中，命令模式的接收者被当成 `command` 对象的属性保存起来，同时约定执行命令的操作调用 `command.execute()` 方法。在 JavaScript 中，利用闭包和回调函数可以更加轻松实现命令模式，接收者被封闭在闭包产生的环境中，执行命令只需要执行回调函数即可。

用闭包实现的命令模式的代码如下：

```js
const setCommend = (button, command) => {
  button.onclick = () => command.execute()
}

const MenuBar = {
  refresh: () => console.log('刷新菜单界面')
}

const RefreshMenuBarCommend = (receiver) => {
  return {
    execute: () => receiver.refresh()
  }
}

const refreshMenuBarCommend = RefreshMenuBarCommend(MenuBar)
setCommend(btn1, refreshMenuBarCommend)
```
