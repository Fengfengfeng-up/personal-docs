# 串联所有单词的子串

力扣🔗：<https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words>

## 题目

给定一个字符串 `s` 和一些长度相同的单词 `words`。找出 `s` 中恰好可以由 `words` 中所有单词串联形成的子串的起始位置。

注意子串要与 `words` 中的单词完全匹配，中间不能有其他字符，但不需要考虑 `words` 中单词串联的顺序。

**示例 1：**
  
    输入：
      s = "barfoothefoobarman",
      words = ["foo","bar"]
    输出：[0,9]
    解释：
    从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
    输出的顺序不重要, [9,0] 也是有效答案。
  
**示例 2：**
  
    输入：
      s = "wordgoodgoodgoodbestword",
      words = ["word","good","best","word"]
    输出：[]

## 解题思路

* 依次遍历字符串 `s`，每次循环由当前索引 `i` 作为起始位置，向后截取所有单词组成的字符串长度的子串（下面的代码实现是依次向后截取每个单词长度的子串，一共截取 `words.length` 次），判断该子串中的每个单词出现次数是否与 `words` 中出现次数相同。
* 解题的关键点是通过创建一个 `map` 对象，以保存每个单词出现的次数，很方便地解决了如何判断截取的子串是不是所有单词组成的所有子串的其中之一。

## 代码实现

<<< docs/my-docs/leetcode/code/30.substring-with-concatenation-of-all-words.js
