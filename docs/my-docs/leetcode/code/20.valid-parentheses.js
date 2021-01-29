/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  if (s.length % 2) return false // 如果长度为奇数
  const arr = []
  
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    const p = c === ')' ? '(' : c === '}' ? '{' : c === ']' ? '[' : false
    p && p === arr[arr.length - 1] ? arr.pop() : arr.push(c)
  }

  return arr.length === 0
}
