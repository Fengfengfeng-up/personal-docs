# 模板方法模式

**模板方法模式**是基于继承的一种设计模式，父类封装了子类的算法框架和方法的执行顺序，子类通过继承父类之后，由父类通知子类执行这些方法。

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，其中包括一些公共方法和这些方法的执行顺序。子类通过继承抽象父类，不仅继承了整个算法结构，还可以重写父类的方法。

在模板方法模式中，通过增加新的子类就可以给系统增加新的功能，并不需要改动抽象父类以及其他子类，符合开放-封闭原则。

## 传统的模板方法模式

在类似 Java 的传统面向对象语言中，实现模板方法模式往往需要实现一个抽象类，它由一个模板方法和若干个基本方法构成，然后由具体实现类继承和扩展。

沿用书中泡柠檬茶和泡咖啡的例子，可以知道它们都有以下操作步骤：

1. 把水煮沸
2. 用沸水冲泡原料（泡柠檬茶的原料是茶叶，泡咖啡的原料是咖啡）
3. 把冲泡好的饮料倒入杯中
4. 往杯中加入调料（泡柠檬茶加入的是柠檬，泡咖啡加入的是牛奶和糖）

用 JavaScript 模拟传统语言实现的代码如下：

``` js
// 抽象类-饮料
class Beverage {
  // 模板方法
  init() {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
  }

  // 具体方法-把水煮沸
  boilWater() {
    console.log('把水煮沸')
  }

  // 具体方法-把冲泡好的饮料导入杯中
  pourInCup() {
    console.log('把冲泡好的饮料导入杯中')
  }

  // 抽象方法-用沸水冲泡原料
  brew() {
    throw new Error('请在子类中实现对应的抽象方法')
  }

  // 抽象方法-往杯中加入调料
  addCondiments() {
    throw new Error('请在子类中实现对应的抽象方法')
  }
}

class Coffee extends Beverage {
  // 重写抽象方法
  brew() {
    console.log('用沸水冲泡咖啡')
  }

  // 重写抽象方法
  addCondiments() {
    console.log('往杯中加入牛奶和糖')
  }
}

const coffee = new Coffee()
coffee.init()
// 把水煮沸
// 用沸水冲泡咖啡
// 把冲泡好的饮料导入杯中
// 往杯中加入牛奶和糖

class LemonTea extends Beverage {
  // 重写抽象方法
  brew() {
    console.log('用沸水冲泡茶叶')
  }

  // 重写抽象方法
  addCondiments() {
    console.log('往杯中加入柠檬')
  }
}

const lemonTea = new LemonTea()
lemonTea.init()
// 把水煮沸
// 用沸水冲泡茶叶
// 把冲泡好的饮料导入杯中
// 往杯中加入柠檬
```

### 钩子方法

在上述例子中，泡柠檬茶和泡咖啡的操作步骤被父类限制，如果我们面对的客人不想加调料，那就尴尬了。

**钩子方法**可以用来解决这个问题，放置钩子是隔离变化的一种常见手段。我们在往杯中加入调料之前，放置一个钩子函数，然后根据钩子函数的意图执行后续操作，这时子类就可以通过实现自己的钩子函数来达到不加调料的目的。

这里我们假定钩子函数的名称为 `customWantsCondiments`，那么得到一杯不加糖和牛奶的咖啡的实现代码如下：

```js
// 抽象类-饮料
class Beverage {
  // 模板方法
  init() {
    this.boilWater()
    this.brew()
    this.pourInCup()

    // 判断钩子函数的意图
    if (this.customWantsCondiments()) {
      this.addCondiments()
    }
  }

  // 具体方法-把水煮沸
  boilWater() {
    console.log('把水煮沸')
  }

  // 具体方法-把冲泡好的饮料导入杯中
  pourInCup() {
    console.log('把冲泡好的饮料导入杯中')
  }

  // 抽象方法-用沸水冲泡原料
  brew() {
    throw new Error('请在子类中实现对应的抽象方法')
  }

  // 抽象方法-往杯中加入调料
  addCondiments() {
    throw new Error('请在子类中实现对应的抽象方法')
  }

  // 钩子函数
  customWantsCondiments() {
    return true // 默认要添加牛奶和糖
  }
}

class Coffee extends Beverage {
  // 重写抽象方法
  brew() {
    console.log('用沸水冲泡咖啡')
  }

  // 重写钩子函数
  customWantsCondiments() {
    return false
  }
}

const coffee = new Coffee()
coffee.init()
// 把水煮沸
// 用沸水冲泡咖啡
// 把冲泡好的饮料导入杯中
```

## JavaScript 中的模板方法模式

模板方法模式是为数不多的基于继承的设计模式，但 JavaScript 语言没有提供真正的类式继承，继承是通过对象与对象之间的委托来实现的。因此，在 JavaScript 中，我们往往通过高阶函数来实现模板方法模式。

通过高阶函数形式改写后，得到一杯不加牛奶和糖的咖啡的代码如下：

```js
const Beverage = (
  { brew, addCondiments, customWantsCondiments } = {
    brew() {
      throw new Error('必须传递 brew 方法')
    },
    addCondiments() {
      throw new Error('必须传递 addCondiments 方法')
    },
    customWantsCondiments() {
      return true
    }
  }
) => {
  const boilWater = () => console.log('把水煮沸')
  const pourInCup = () => console.log('把冲泡好的饮料导入杯中')

  const F = function () {}
  F.prototype.init = () => {
    boilWater()
    brew()
    pourInCup()

    if (customWantsCondiments()) {
      addCondiments()
    }
  }
  return F
}

const Coffee = Beverage({
  brew() {
    console.log('用沸水冲泡咖啡')
  },
  customWantsCondiments() {
    return false
  }
})

const coffee = new Coffee()
coffee.init()
// 把水煮沸
// 用沸水冲泡咖啡
// 把冲泡好的饮料导入杯中
```
