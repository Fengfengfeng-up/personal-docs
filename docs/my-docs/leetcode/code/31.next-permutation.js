/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  debugger
  const l = nums.length
  if (l === 0) return nums

  let i = l - 2
  while (nums[i] >= nums[i + 1]) {
    // 从后往前寻找相邻的两个数，满足前一个数小于后一个数，记录前一个数的索引为 i
    i--
  }

  if (i >= 0) {
    // 如果找到满足 nums[i] < nums[i + 1] 的两数
    // 从后往前寻找比 nums[i] 小的数，找到后进行替换
    let k = l - 1
    while (k > i && nums[k] <= nums[i]) {
      k--
    }
    const temp = nums[k]
    nums[k] = nums[i]
    nums[i] = temp
  }

  // 反向排列索引 i 后的所有数字项（当 i === -1 时，所有项都会被排列）
  let left = i + 1
  let right = l - 1
  while (left < right) {
    const temp = nums[left]
    nums[left++] = nums[right]
    nums[right--] = temp
  }

  return nums
}
