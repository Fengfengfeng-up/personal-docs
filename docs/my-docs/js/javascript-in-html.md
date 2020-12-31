# HTML 中的 JavaScript

## `<script>` 元素

在 JavaScript 早期，Netscape 公司创造出了 `<script>` 元素，用以将 JavaScript 插入到 HTML 页面中，现已加入 HTML 规范。它主要有以下属性和特点。

### 可选属性

| 属性名       |  默认值   |  用途                             | 作用脚本类型             |
| :---------: |  :--:    | :-------------------------------: | :---------------------: |
| async       |  `false` | 异步执行脚本                       | 外部                    |
| charset     |  `""`    | 指定代码字符集（不常用）            | 外部 / 行内              |
| crossorigin |  `null`  | 配置请求的 [CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) 设置           | 外部                     |
| defer       |  `false` | 推迟执行脚本                       | 外部 / 行内（ IE7 及以下）|
| integrity   |  `""`    | 检查获取的资源是否被篡改            | 外部                     |
| language    |          | ~~表示代码块中的脚本语言~~ （已废弃）|                         |
| src         |  `""`    | 表示要执行的外部文件地址            | 外部                     |
| type        |  `""`    | 表示脚本语言的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)                          | 外部 / 行内              |

### 特点

1. 可以在 `<script>` 元素内嵌入 JavaScript 代码，也可通过设置它的 `src` 属性中引入外部 JavaScript 文件。
2. 浏览器解析使用 `src` 属性的 `<script>` 元素时，会向该属性值指代的地址发送一个 GET 请求以取得相应资源，这个请求不受浏览器同源策略限制，返回并被执行的 JavaScript 则受限制。
3. 使用 `defer` 属性的脚本会推迟到文档渲染完毕后再执行。多个推迟脚本原则上按照它们在页面中出现的顺序执行。
4. 使用 `async` 属性的异步脚本不需要等待其他脚本，同时也不阻塞文档渲染，不能保证按照它们在页面中出现的顺序执行。
5. 所有不使用 `async` / `defer` 属性的 `<script>` 元素会按照它们出现的顺序被解释。
6. 包含在 `<script>` 元素内的代码会被从上至下解释。
7. 只要是不使用 `async` / `defer` 属性的 `<script>` 元素都会阻塞浏览器解析后面的内容。
8. 可以使用 DOM API 动态创建以异步方式加载 `<script>` 元素。

::: warning 注意事项

* 使用行内 JavaScript 代码时，字符串 `</script>` 需要进行转义，正确书写为 `<\/script>`。
* 解释外部 JavaScript 文件时，阻塞时间也包含下载文件的时间。
* 当在使用 src 属性的 `<script>` 元素中再包含 JavaScript 代码时，浏览器只会下载并执行外部脚本文件，忽略行内代码。
* 只有使用 `type` 属性值为 `module` 的 `<script>` 元素内才能使用 ES6 模块语法。

:::

## `<noscript>` 元素

`<noscript>` 元素被用于给不支持或禁用 JavaScript 的浏览器提供替代内容，从而实现优雅降级。它可以包含除了 `<script>` 以外任何可以出现在 `<body>` 中的 HTML 元素。

## 最佳实践

* 尽可能将 JavaScript 代码放在外部文件中，按需通过 `<script>` 标签对 JavaScript 代码进行分发，比如 [Content Delivery Network (CDN)](https://www.cdnetworks.com/what-is-a-cdn/)。
* 最好将 `<script>` 标签放在 `<body>` 元素中的页面内容后面，防止阻塞浏览器，以减少白屏时间。
* 尽量不使用异步脚本，如需使用则最好不要在加载期间修改 DOM，因为页面可能还未渲染完。
* 通过 DOM API 添加的脚本可以通过显式设置 `async` 属性值为 `false` 改为同步脚本，此时最好在文档头部显示声明 `<link rel="preload" href="xxx.js">` 标签，以减少它带来的性能影响。
