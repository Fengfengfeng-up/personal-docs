/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  if (p === '' && s !== '') return false

  /* 初始化二维数组，构造表格 */
  const rowL = s.length + 1 // 行数
  const colL = p.length + 1 // 列数

  const table = new Array(rowL)
  for (let i = 0; i < rowL; i++) {
    table[i] = new Array(colL).fill(false) // 默认填充 false
  }
  table[0][0] = true // 两个都为空字符串时为 true

  /* 填充第一列 */
  for (let i = 1; i < colL; i++) {
    if (p[i - 1] === '*') {
      // 遇到 * 时，根据前一位判断填充 true 或 false
      table[0][i] = table[0][i - 2]
    }
  }

  /* 依次填充剩余每格 */
  for (let i = 1; i < rowL; i++) {
    const r = s[i - 1] // s 中的待检验字符
    for (let j = 1; j < colL; j++) {
      const c = p[j - 1] // p 中的规则字符

      if (r === c || c === '.') {
        // 当两个字符相等或规则字符为 . 时，根据上一行的前一个值进行填充
        table[i][j] = table[i - 1][j - 1]
        continue
      }

      if (c === '*') {
        // 当规则字符为 * 时
        const prev = p[j - 2] // 取到前一个规则字符
        if (r === prev || prev === '.') {
          // 当待匹配字符和前一个规则字符相同或前一个规则字符为 . 时
          table[i][j] = table[i][j - 2] || table[i - 1][j - 2] || table[i - 1][j]
          continue
        }

        table[i][j] = table[i][j - 2]
      }
    }
  }

  return table[rowL - 1][colL - 1]
}
