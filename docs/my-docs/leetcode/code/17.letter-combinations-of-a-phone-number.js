/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  if (digits.length === 0) return []

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }

  const result = map[digits[0]].split('') // 取出第一个数字对应的字母字符串转为数组

  Array.prototype.forEach.call(digits.slice(1), d => {
    // 从第二个数字开始遍历
    const l = result.length // 当前循环 result 的长度
    const letters = map[d] // 当前循环的数字对应的字母字符串

    for (let i = 0; i < l; i++) {
      const first = result.shift() // 第一个字符串出队
      // 遍历当前循环的数字对应的字母字符串，与取出第一个字符串进行拼接并将其入队
      Array.prototype.forEach.call(letters, l => result.push(first + l)) 
    }
  })

  return result
}
