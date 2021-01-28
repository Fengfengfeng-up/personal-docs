/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
  const result = []
  const l = nums.length
  if (l < 4) return result

  nums.sort((a, b) => a - b) // 由小到大对数组进行排序

  for (let base1 = 0; base1 < l - 3; base1++) {
    if (nums[base1] === nums[base1 - 1]) continue // 如果与上一个值相同，跳过当前值
    for (let base2 = base1 + 1; base2 < l - 2; base2++) {
      // 如果与上一个值相同且不是第一个值，跳过当前值
      if (nums[base2] === nums[base2 - 1] && base2 !== base1 + 1) continue

      let left = base2 + 1 // 左指针
      let right = l - 1 // 右指针

      while (left < right) {
        // 每循环一次，当前的 nums[base1] 与 num[base2] 作为不变的加数，移动双指针寻找符合条件的值
        const sum = nums[base1] + nums[base2] + nums[left] + nums[right]

        if (sum === target) {
          // 四数之和满足条件时
          result.push([nums[base1], nums[base2], nums[left], nums[right]])

          while (left < right && nums[left] === nums[left + 1]) {
            // 当左指针指向的值与它右边的值相等时，向右移动左指针
            left++
          }

          while (right > left && nums[right] === nums[right - 1]) {
            // 当右指针指向的值与它左边的值相等时，向左移动右指针
            right--
          }

          left++
          right--
        } else {
          // 四数之和小于 target，向右移动左指针，否则向左移动右指针
          sum < target ? left++ : right--
        }
      }
    }
  }
  return result
}

Function.prototype._call = function(context, ...args) {
  var context = context || window
  context.fn = this
  // var result = eval('context.fn(...args)')
  var result = context.fn(...args)
  delete context.fn
  return result
}

const obj = {
  a: 1,
  b: '2',
}

function getSum() {
  if (typeof this.a !== 'number' || typeof this.b !== 'number') {
    throw new Error('param is not a number')
  }
  return this.a + this.b
}

console.log(getSum._call(obj))
