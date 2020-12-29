# 什么是JavaScript

## 基本概念

**JavaScript** 是一种轻量级解释型脚本语言，能够实现复杂的计算与交互，包括闭包、匿名（lambda）函数，甚至元编程等特性。

### 特点

* 依赖宿主环境。
* 动态，灵活，可拓展性强。
* 与 **HTML**、**CSS** 完全集成。
* 主流浏览器默认支持和开启。
* 易上手，难掌握。
  
### 应用范围

* 桌面浏览器
* 手机浏览器
* 屏幕阅读器
* 服务器构建
* 移动端应用

## 主要构成

* **ECMAScript**：**JavaScript** 的核心，作为一个基准和规范，以便在它之上再构建更稳健的脚本语言，由 [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 定义。
* **DOM**（文档对象模型）：提供与网页内容交互的方法和接口。
* **BOM**（浏览器对象模型）：提供与浏览器交互的方法和接口。

::: warning 提示
**DOM** 和 **BOM** 仅当 **JavaScript** 宿主环境为浏览器时出现。
:::

## 发展历史

@flowstart
st=>start: 1995年，Brendan Eich 开发脚本语言 Mocha（LiveScript）
stage1=>operation: Netscape 公司 和 Sun（现为Oracle）公司共同开发 LiveScript
stage2=>operation: 为了赶上媒体炒作 Java 的顺风车，LiveScript 改名为 JavaScript
stage3=>operation: 1996 年 8 月，微软实现了 IE 版本的 JScript
stage4=>operation: 因各版本冲突导致诸多问题，JavaScript 最终踏上标准化征程
stage5=>operation: 1997 年，JavaScript 1.1 被提交给欧洲计算机制造商协会（Ecma）
stage6=>operation: 第 39 技术委员会（TC39）承担了 JavaScript 标准化任务
stage7=>operation: 脚本语言标准 ECMAScript（ECMA-262）出现
stage8=>operation: 1998 年，国际标准化组织（ISO）和国际电工委员会（IEC）将 ECMAScript 纳为标准
stage9=>operation: 1999 年，ECMAScript 3，引入了许多已成为语言固有部分的功能，绝大多数浏览器都支持的版本:>https://www-archive.mozilla.org/js/language/E262-3.pdf
stage10=>operation: 2008 年，ECMAScript 4，几乎是 JavaScript 的下一个全新版本。由于跳跃跨度太大，最终被废弃:>https://www.ecma-international.org/activities/Languages/Language%20overview.pdf
stage11=>operation: 2009 年，ECMAScript 5，新增严格模式，澄清了许多第3版本的模糊规范，增加了部分功能:>http://www.ecma-international.org/ecma-262/5.1/
stage12=>operation: 2015 年，ECMAScript 6，这一版包含了这个规范有史以来最重要的一批增强特性:>http://www.ecma-international.org/ecma-262/6.0/
stage13=>operation: 2016 年，ECMAScript 7，修订多个新的概念和语言特性:>https://www.ecma-international.org/ecma-262/7.0/
stage14=>operation: 2017 年，ECMAScript 8，新增了异步函数（async/await）、SharedArrayBuffer 及 Atomics API等新特性:>http://www.ecma-international.org/ecma-262/8.0/index.html
stage15=>operation: 2018 年，ECMAScript 9，新增异步迭代、剩余和扩展属性等新特性:>https://www.ecma-international.org/ecma-262/9.0/index.html
stage16=>operation: 2019 年，ECMAScript 10，新增 Array.prototype.flat()/flatMap() 等新特性:>https://ecma-international.org/ecma-262/10.0/index.html
stage17=>operation: 2020 年，ECMAScript 11，新增可选链操作符、BigInt 数据类型、动态导入等新特性:>https://www.ecma-international.org/publications/standards/Ecma-262.html
e=>end: 来日方长，未来可期

st->stage1->stage2->stage3->stage4->stage5->stage6->stage7->stage8->stage9->stage10->stage11->stage12->stage13->stage14->stage15->stage16->stage17->e
@flowend
