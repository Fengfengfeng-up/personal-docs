/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  if (!s) return 0
  if (s.length === 1 || !s.trim()) return 1

  let count = 0 // 记录当前循环结束时最长子串的长度
  let loop = 0 // 迭代次数
  let current // 每次循环拿到的字符
  let tempArray = [] // 临时存放子串字符

  while ((current = s[loop++])) {
    // 遍历字符串
    const index = tempArray.indexOf(current) // 查找临时数组是否存在有当前循环拿到的字符，有则取出角标

    if (index > -1) {
      // 发现有相同字符
      count = Math.max(count, tempArray.length) // 更新
      tempArray.splice(0, index + 1) // 清除包括相同字符之前的所有字符
    }
  }

  return Math.max(count, tempArray.length) // 返回已记录的最大长度与临时数组长度的最大值
}
