# 电话号码的字母组合

力扣🔗：<https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number>

## 题目

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![phone-number](./images/letter-combinations-of-a-phone-number.png)

**示例：**

    输入："23"
    输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

**说明：**
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

## 解题思路

* 首先取出 `digits` 中第一个数字，通过 `map` 字母表找出对应的字母字符串并转为数组赋值给 `result` 变量。
* 随后从 `digits` 第二个数字字符开始遍历，在每个循环中进行以下操作：
  
  * 从 `map` 中找到当前循环中的数字字符对应的字母字符串，并赋值给 `letters` 变量。
  * 遍历数组 `result`，每次迭代进行出队操作，将出队的字符串分别 `letters` 的每个字符进行拼接并入队。

## 代码实现

<<< docs/my-docs/leetcode/code/17.letter-combinations-of-a-phone-number.js
