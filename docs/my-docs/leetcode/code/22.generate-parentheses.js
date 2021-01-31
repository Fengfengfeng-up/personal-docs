/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  const result = []

  /**
   * @param {string} str 当前调用栈的括号字符串
   * @param {number} left str 中左括号个数
   * @param {number} right str 中右括号个数
   */
  function generator(str = '', left = 0, right = 0) {
    if (left === n && right === n) {
      // 左右括号个数都到上限 n 时
      result.push(str)
      return
    }

    if (left < right) return // 剪去左括号小于右括号的枝叶

    if (left < n) {
      // 左括号未到上限时，都可添加
      generator(str + '(', left + 1, right)
    }

    if (left > right) {
      // 左括号数量大于右括号时，添加右括号
      generator(str + ')', left, right + 1)
    }
  }

  generator()
  return result
}
