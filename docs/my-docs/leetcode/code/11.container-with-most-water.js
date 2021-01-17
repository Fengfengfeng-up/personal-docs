/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  let l = 0 // 左指针
  let r = height.length - 1 // 右指针
  let result = 0 // 结果

  while (l < r) {
    // 循环直到两指针重合
    const vL = height[l] // 左指针指向的值
    const vR = height[r] // 右指针指向的值

    result = Math.max(result, Math.min(vL, vR) * (r - l)) // 计算最大值
    vL <= vR ? ++l : --r // 如果 vL 小于等于 vR，则移动左指针向右一位，否则移动右指针向左一位
  }

  return result
}
