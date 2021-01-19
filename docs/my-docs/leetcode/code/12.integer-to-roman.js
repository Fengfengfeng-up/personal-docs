/**
 * @param {number} num
 * @return {string}
 */
function intToRoman(num) {
  const map = { 1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M' }

  let n = 10 ** ~~Math.log10(num) // 当前的 num 的数量级
  let m // 当前要转换的数字
  let result = ''

  do {
    m = ~~(num / n) // 每次循环取 num 的第一位数字

    if (m < 5) {
      result += m === 4 ? map[n] + map[n * 5] : map[n].repeat(m)
    } else if (m === 5) {
      result += map[n * 5]
    } else {
      result += m === 9 ? map[n] + map[n * 10] : map[5 * n] + map[n].repeat(m - 5)
    }

    num -= m * n // 每次循环去除第一位数字
    n /= 10
  } while (n >= 1 && num > 0)

  return result
}
