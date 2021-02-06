# 实现 strStr()

力扣🔗：<https://leetcode-cn.com/problems/implement-strstr>

## 题目

实现 `strStr()` 函数。

给定一个 `haystack` 字符串和一个 `needle` 字符串，在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置 (从 0 开始)。如果不存在，则返回  **-1**。

**示例 1：**
  
    输入: haystack = "hello", needle = "ll"
    输出: 2

**示例 2：**
  
    输入: haystack = "aaaaa", needle = "bba"
    输出: -1

**说明：**

当 `needle` 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 `needle` 是空字符串时我们应当返回 0。这与 C 语言的 `strstr()` 以及 Java 的 `indexOf()` 定义相符。

## 解题思路

* 设置 `index1` 和 `index2` 双指针分别用于指向 `haystack` 和 `needle` 字符串中的字符索引，初始值都为 `0`。
* 向右移动指针 `index1`，对比两指针指向的字符是否相同。字符相同时，进入匹配状态，继续往后移动两指针进行比较，如果不相同匹配停止，将指针 `index1` 回溯到 `index1 - index2 + 1` 的位置（匹配起始位置的下一个），重置指针 `index2` 到初始状态，重复这一步骤；如果指针 `index2` 到达 `needle` 末位，表示匹配完成，返回结果 `index1 - index2 + 1`。

## 代码实现

<<< docs/my-docs/leetcode/code/28.implement-strstr.js
