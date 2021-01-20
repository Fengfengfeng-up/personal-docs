/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let result = 0 
  let loop = 0 
  let current // 当前循环的罗马数字
  let prev // 上一次循环的罗马数字

  while ((current = s[loop++])) {
    if (loop > 1 && map[prev] < map[current]) {
      // 如果前面的罗马数字比当前的罗马数字小，则代表是特殊组合
      result -= map[prev] * 2
    }

    prev = current
    result += map[current]
  }

  return result
}
