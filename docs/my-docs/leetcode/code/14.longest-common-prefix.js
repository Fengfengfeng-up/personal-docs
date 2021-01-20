/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (strs.length === 0) return ''
  if (strs.length === 1) return strs[0]


  let first = strs[0] // strs[0] 作为参照字符串
  let pos = 0
  let loop = 1
  let cur = first[pos] // 当前循环要参照对比的字符

  while (pos < first.length) {
    if (loop === strs.length) {
      // 每遍历完一次 strs，重置 loop 和更新 cur 
      loop = 1
      cur = first[++pos]
    }

    const str = strs[loop] // 当前遍历到的字符串
    if (!str) return ''
    if (str[pos] !== cur) {
      // 如果 str 中 pos 位置的字符与 cur 不相同，退出函数，并返回结果为 first 的子字符串
      return first.slice(0, pos)
    }

    loop++
  }

  return first
}
