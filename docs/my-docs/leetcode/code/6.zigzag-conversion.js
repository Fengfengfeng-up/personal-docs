/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
  const l = s.length
  if (l <= numRows || numRows === 1) return s

  const tempArr = new Array(numRows).fill('') // 每个元素代表 Z 字变换后的每一行，保存的是每行字符组成的字符串
  const T = 2 * numRows - 2 // 一个 V 字形周期

  for (let i = 0; i < l; i++) {
    const m = i % T
    const row = Math.min(m, T - m) // 计算出要保存到哪一行

    tempArr[row] += s[i] // 添加该字符到对应索引（行）
  }

  return tempArr.join('')
}
