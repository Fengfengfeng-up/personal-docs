/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b) // 由小到大对数组进行排序
  const l = nums.length
  let result

  for (let base = 0; base < l - 2; base++) {
    if (nums[base] === nums[base - 1]) continue
    let left = base + 1 // 左指针
    let right = l - 1 // 右指针

    while (left < right) {
      // 每循环一次，当前的 nums[base] 作为不变的加数，移动双指针寻找符合条件的值
      const sum = nums[base] + nums[left] + nums[right]
      if (sum === target) return sum

      if (sum < target) {
        // 当三数之和小于 target 时，向右移动左指针
        while (left < right && nums[left] === nums[left + 1]) {
          // 当左指针指向的值与它右边的值相等时，向右移动左指针
          left++
        }
        left++
      } else {
        // 当三数之和大于 target 时，向右移动左指针
        while (right > left && nums[right] === nums[right - 1]) {
          // 当右指针指向的值与它左边的值相等时，向左移动右指针
          right--
        }
        right--
      }

      if (Math.abs(result - target) > Math.abs(sum - target) || result === undefined ) {
        // 如果当前三数之和更接近 target 或者 result 未赋值，则对 result 进行更新 
        result = sum
      }
    }
  }

  return result
}
