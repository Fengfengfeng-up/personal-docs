/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
  const result = new ListNode(0, head)
  let temp = result
  
  while (temp.next && temp.next.next) {
    const left = temp.next
    const right = temp.next.next

    temp.next = right
    left.next = right.next
    right.next = left
    temp = left
  }

  return result.next
}
