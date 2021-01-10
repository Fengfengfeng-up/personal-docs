/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  const result = l1 // 保存变量 l1 指向的链表对象

  // 递归判断两数之和是否要进位，并更新
  function checkSumAndUpdate(sum, node) {
    if (sum >= 10) {
      node.val = sum - 10 // 取差值
      !node.next && (node.next = new ListNode()) // 如果下一节点为 null，则创建

      checkSumAndUpdate(node.next.val + 1, node.next)
    } else {
      node.val = sum
    }
  }

  while (l2) {
    // 遍历至 l2 最后一个节点
    checkSumAndUpdate(l1.val + l2.val, l1) // 判断求和值是否需要进位，并更新
    l2 = l2.next // 更新至下一节点
    l1 = l1.next || (l2 && (l1.next = new ListNode())) // 更新至下一节点，如果节点为 null，则判断当前的 l2 指向的节点是否为 null，是则创建新一级节点
  }

  return result
}
