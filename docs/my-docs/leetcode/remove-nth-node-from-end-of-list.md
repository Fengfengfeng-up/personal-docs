# 删除链表的倒数第 N 个结点

力扣🔗：<https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list>

## 题目

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**进阶：** 你能尝试使用一趟扫描实现吗？

**示例 1：**

![RemoveEx1](./images/remove_ex1.jpg)

    输入：head = [1,2,3,4,5], n = 2
    输出：[1,2,3,5]

**示例 2：**

    输入：head = [1], n = 1
    输出：[]

**示例 3：**

    输入：head = [1,2], n = 1
    输出：[1]

**提示：**

* 链表中结点的数目为 `sz`
* `1 <= sz <= 30`
* `0 <= Node.val <= 100`
* `1 <= n <= sz`

## 解题思路

* 通过移动快慢指针，找出需要删除的节点的前一个节点。
* 首先在链表头部增加一个虚拟节点，方便后续删除节点操作。
* 设置快指针 `first`，先移动到链表的第 `n` 个节点，然后设置慢指针 `second` 指向链表的头节点（上次操作设置的虚拟节点），随后通过循环同步移动两指针向各自的下一个节点，直到 `first` 到达最后一个节点。
* 此时 `second` 到达的位置正好是倒数第 `n` 个节点的前一个节点，因此删除下一个节点即可。  

## 代码实现

<<< docs/my-docs/leetcode/code/19.remove-nth-node-from-end-of-list.js