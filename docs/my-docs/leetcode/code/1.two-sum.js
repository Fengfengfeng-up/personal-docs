/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = {} // 记录每次迭代，每个键值对的键为每次迭代的值，值为当前迭代的次数（键在 nums 数组中的序号）
  let loop = 0 // 记录迭代次数
  let diff // 保存当前迭代值与 target 的差值

  while (loop < nums.length) { // 依次遍历 nums 数组的每一个元素
    diff = target - nums[loop] // 计算差值

    if (map[diff] !== undefined) { 
      // 如果 map 对象中存在与 diff（计算的差值）相同的键，则证明已找到
      return [map[diff], loop]
    }

    map[nums[loop]] = loop // 记录当前迭代的值以及迭代次数
    loop++ // 更新迭代次数
  }
}
