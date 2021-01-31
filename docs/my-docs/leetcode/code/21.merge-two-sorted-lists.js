/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(l1, l2) {
  const result = new ListNode()
  let temp = result

  while (l1 && l2) {
    if (l1.val === l2.val) {
      // 两个节点值相等
      temp.next = new ListNode(l1.val, new ListNode(l1.val))
      temp = temp.next // 跳到下个节点

      // 同时向后移动
      l1 = l1.next
      l2 = l2.next
    } else if (l1.val > l2.val) {
      // 当前节点值较小的链表向后移动
      temp.next = new ListNode(l2.val)
      l2 = l2.next
    } else {
      temp.next = new ListNode(l1.val)
      l1 = l1.next
    }

    temp = temp.next || new ListNode() // 更新到下一个节点
  }

  temp.next = l1 || l2 // 如果有剩余节点，则添加
  return result.next
}
