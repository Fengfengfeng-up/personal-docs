# 无重复字符的最长子串

## 题目

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

* 示例 1：

  ``` 
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
  ```

* 示例 2：
  
  ``` 
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
  ```

* 示例 3：
  
  ```
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
  ```

* 示例 4：
  
  ```
  输入: s = ""
  输出: 0
  ```

* 提示：
  * `0 <= s.length <= 5 * 10^4`
  * `s` 由英文字母、数字、符号和空格组成

力扣🔗：<https://leetcode-cn.com/problems/longest-substring-without-repeating-characters>

## 解题思路

* 依次遍历传入的字符串中的每个字符。
* 创建变量 `count` 用于记录当前循环结束时最长子串的长度。
* 创建一个临时数组 `tempArray`，用于存放子串字符。在当前循环中，如果临时数组已有相同字符，立即更新 `count`， 值为 `count` 与 `tempArray.length` 的最大值，然后清除包括相同字符之前的所有字符，最后将当前字符存入临时数组。
* 遍历结束后，返回 `count` 与 `tempArray.length` 的最大值，也就是计算出的不含有重复字符的最长子串的长度。

## 代码实现

<<< leet-code/longest-substring-without-repeating-characters.js
