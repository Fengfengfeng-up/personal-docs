/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  const l = s.length // 传入字符串的长度

  if (l === 1 || l === 2) {
    return s[1] === undefined ? s[0] : s[0] === s[1] ? s : s[0]
  }

  let result = '' // 保存最长回文子串

  for (let i = 0; i < l - 1; i++) {
    for (let j = i + 1; j <= l; j++) {
      const subStr = s.slice(i, j) // 截取子串

      if (subStr.length > result.length && isPalindrome(subStr)) {
        // 如果截取的字符串长度大于已保存的回文子串长度，且是回文
        result = subStr // 更新最长回文子串
      }
    }
  }

  // 判断传入的字符串是否是回文
  function isPalindrome(subStr) {
    const l = subStr.length

    for (let i = 0; i < parseInt(l / 2); i++) {
      // 判断遍历到的字符与其对称的位置字符是否相同
      if (subStr[i] !== subStr[l - i - 1]) {
        return false
      }
    }
    return true
  }

  return result
}
