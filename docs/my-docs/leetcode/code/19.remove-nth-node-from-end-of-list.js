/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head) // 虚拟节点
  let first = dummy
  let second = dummy

  // first 指针先行 n 个节点
  for (let i = 0; i < n; i++) {
    first = first.next
  }

  while ((first = first.next)) {
    // 当 first 指针到链表最后一个节点时，second 指针刚好是倒数第 n 个节点的前一个节点
    second = second.next
  }

  second.next = second.next.next // 删除倒数第 n 个节点
  return dummy.next
}
