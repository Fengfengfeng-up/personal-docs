/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  let slow = 0 // 慢指针
  let fast = 1 // 快指针

  while (fast < nums.length) {
    if (nums[slow] === nums[fast]) {
      // 快指针跳过重复项
      fast++
    } else {
      if (fast - slow > 1) {
        // 如果存在重复项，则修改慢指针后面一项的值为快指针指向的值
        nums[slow + 1] = nums[fast]
      }
      slow++
      fast++
    }
  }

  return slow + 1
}
