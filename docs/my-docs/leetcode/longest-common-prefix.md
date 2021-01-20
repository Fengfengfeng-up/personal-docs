# 最长公共前缀

力扣🔗：<https://leetcode-cn.com/problems/longest-common-prefix>

## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1：**

    输入：strs = ["flower","flow","flight"]
    输出："fl"

**示例 2：**
  
    输入：strs = ["dog","racecar","car"]
    输出：""
    解释：输入不存在公共前缀。

**提示：**

* `0 <= strs.length <= 200`
* `0 <= strs[i].length <= 200`
* `strs[i]` 仅由小写英文字母组成

## 解题思路

* 首先取出 `strs` 中第一个字符串作为参照字符串 `first`。
* 依次从 `first` 中取出每个字符 `cur`，记录该字符索引值为 'pos'。
* 每更新一次 `cur`， 将 `cur` 与 `strs` 中除第一个字符串的所有字符串的 `pos` 位置字符进行对比，如不相同则得到结果为 `first.slice(0, pos)`。

## 代码实现

<<< docs/my-docs/leetcode/code/14.longest-common-prefix.js
