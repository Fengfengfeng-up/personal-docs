/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  let fast = 0
  let slow = 0

  while (fast < nums.length) {
    if (nums[fast] !== val) {
      // 如果快指针指向的元素值不等于 val
      nums[slow++] = nums[fast++]
    } else {
      fast++
    }
  }
  return slow
}
