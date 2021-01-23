/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  const result = []
  const l = nums.length
  if (l < 3) return result

  nums.sort((a, b) => a - b) // 由小到大对数组进行排序
  if (nums[0] > 0 || nums[l - 1] < 0) return result // 如果第一个数大于 0 或最后一个数小于 0，则不可能有三数之和等于 0 

  for (let base = 0; base < l; base++) {
    // 从左至右遍历数组，直到当前值大于 0
    if (nums[base] === nums[base - 1]) continue // 如果与上一个值相同，跳过当前值
    if (nums[base] > 0) return result
    let left = base + 1 // 左指针
    let right = l - 1 // 右指针

    while (left < right) {
      // 每循环一次，当前的 nums[base] 作为不变的加数，移动双指针寻找符合条件的值
      const sum = nums[base] + nums[left] + nums[right]

      if (sum === 0) {
        // 三数之和等于 0 时
        result.push([nums[base], nums[left], nums[right]])

        while (left < right && nums[left] === nums[left + 1]) {
          // 当左指针指向的值与它右边的值相等时，向右移动左指针
          left++
        }

        while (right > left && nums[right] === nums[right - 1]) {
          // 当右指针指向的值与它左边的值相等时，向左移动右指针
          right--
        }

        left++ // 向右移动左指针
        right-- // 向左移动右指针
      } else {
        // 三数之和小于 0 时，向右移动左指针
        // 三数之和大于 0 时，向左移动右指针
        sum < 0 ? left++ : right--
      }
    }
  }
}
