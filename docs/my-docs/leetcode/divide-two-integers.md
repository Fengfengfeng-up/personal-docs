# 两数相除

力扣🔗：<https://leetcode-cn.com/problems/divide-two-integers>

## 题目

给定两个整数，被除数 `dividend` 和除数 `divisor`。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 `dividend` 除以除数 `divisor` 得到的商。

整数除法的结果应当截去（`truncate`）其小数部分，例如：`truncate(8.345) = 8` 以及 `truncate(-2.7335) = -2`

**示例 1：**
  
    输入: dividend = 10, divisor = 3
    输出: 3
    解释: 10/3 = truncate(3.33333..) = truncate(3) = 3

示例 2:

    输入: dividend = 7, divisor = -3
    输出: -2
    解释: 7/-3 = truncate(-2.33333..) = -2

**提示：**

* 被除数和除数均为 32 位有符号整数。
* 除数不为 0。
* 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。

## 解题思路

* 首先处理特殊情况，当 `divisor === -1` 时，如果 `dividend === -2^31` 就返回结果 `-2^31 - 1`，否则返回 `-divisor`。当除数 `divisor === 1` 时，返回结果 `dividend`。
* 然后通过式子 `(dividend ^ divisor) < 0` 得出最终结果的正负性，保存在变量 `isNegative` 当中，`true` 表示为负值，`false` 表示为正值。随后将 `divisor` 和 `dividend` 转为各自的负数形式。
* 通过递归函数 `resolve(dividend, divisor)` 得出结果，根据变量 `isNegative` 转换并得出最终结果。
* `resolve()` 函数的作用是通过递归更新除数和被除数，每次利用循环对它们进行自加操作，当被除数大于除数时退出函数，这样快速找出它们的商。

## 代码实现

<<< docs/my-docs/leetcode/code/29.divide-two-integers.js
