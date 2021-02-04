# K 个一组翻转链表

力扣🔗：<https://leetcode-cn.com/problems/reverse-nodes-in-k-group>

## 题目

给你一个链表，每 `k` 个节点一组进行翻转，请你返回翻转后的链表。

`k` 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 `k` 的整数倍，那么请将最后剩余的节点保持原有顺序。

**示例 1：**
  
    给你这个链表：1->2->3->4->5

    当 k = 2 时，应当返回: 2->1->4->3->5

    当 k = 3 时，应当返回: 3->2->1->4->5

**说明：**

* 你的算法只能使用常数的额外空间。
* **你不能只是单纯的改变节点内部的值**，而是需要实际进行节点交换。

## 解题思路

* 在给定链表头部添加虚拟节点，方便后续操作。
* 遍历链表节点，记录当前节点数为 `count`。每 `k` 个节点为一组连续节点，条件是当 `count % k === 0` 时，此时使用 `reverse(start, end.next)` 函数对其进行反转，`start` 为每一组起始节点的前一个节点，`end` 为每一组末尾节点的前一个节点。每次反转结束时，更新 `start` 和 `end`。

## 代码实现

<<< docs/my-docs/leetcode/code/25.reverse-nodes-in-k-group.js