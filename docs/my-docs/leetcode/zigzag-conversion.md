# Z 字形变换

## 题目

将一个给定字符串 `s` 根据给定的行数 `numRows` ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 `"PAYPALISHIRING"` 行数为 3 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"PAHNAPLSIIGYIR"`。

请你实现这个将字符串进行指定行数变换的函数：

``` 
string convert(string s, int numRows);
```

* 示例 1：
  
  ``` 
  输入：s = "PAYPALISHIRING", numRows = 3
  输出："PAHNAPLSIIGYIR"
  ```

* 示例 2：
  
  ``` 
  输入：s = "PAYPALISHIRING", numRows = 4
  输出："PINALSIGYAHRPI"
  解释：
  P     I    N
  A   L S  I G
  Y A   H R
  P     I
  ```

* 示例 3：
  
  ``` 
  输入：s = "A", numRows = 1
  输出："A"1
  ```

* 提示：
  * `1 <= s.length <= 1000`
  * `s` 由英文字母（小写和大写）、`','` 和 `'.'` 组成
  * `1 <= numRows <= 1000`

力扣🔗：<https://leetcode-cn.com/problems/zigzag-conversion>

## 解题思路

* 首先定义 `T = numRows * 2 - 2` 为 Z 字符变换后的一个周期，类似一个 V 字形。
* 然后创建一个长度为 `numRows` 的数组，其中每个元素值（默认为空字符串）代表 Z 字符变换后的每一行字符组成的字符串，索引作为行数。
* 依次遍历字符串的每一个字符，通过 `T` 和索引 `i` 计算出当前字符应该保存在哪一行，然后存入上述数组当中。
* 最后依次组合上述数组中的每个元素值，即 Z 字符变换后的结果组成的字符串。

## 代码实现

<<< docs/my-docs/leetcode/code/6.zigzag-conversion.js
