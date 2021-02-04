/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseKGroup(head, k) {
  const result = new ListNode(0, head) // 虚拟节点
  let start = result
  let end = result.next
  let count = 0

  while (end) {
    count++
    if (count % k === 0) {
      // 对每一组 k 个节点进行反转，并修改 start 和 end 指向的节点
      // start 为每一组头节点的前一个节点
      // end 为每一组尾节点的前一个节点
      start = reverse(start, end.next)
      end = start.next
    } else {
      end = end.next
    }
  }
  return result.next

  function reverse(start, end) {
    let pre = start
    let cur = start.next

    const first = cur
    while (cur !== end) {
      let next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }

    start.next = pre
    first.next = cur
    return first
  }
}
