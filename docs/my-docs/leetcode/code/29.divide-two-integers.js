/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function divide(dividend, divisor) {
  if (divisor === 1) return dividend
  if (divisor === -1) {
    // 如果是最小整数，返回最大整数，否则返回其负值
    return dividend === -Math.pow(2, 31) ? Math.pow(2, 31) - 1 : -dividend
  }

  const isNegative = (dividend ^ divisor) < 0 // 结果是否是负值

  // 将被除数和除数都转为负值，防止溢出
  dividend = dividend < 0 ? dividend : -dividend
  divisor = divisor < 0 ? divisor : -divisor

  let result = resolve(dividend, divisor)
  return isNegative ? -result : result

  function resolve(dividend, divisor) {
    if (dividend > divisor) return 0 // 结果小于 1 时，退出函数，返回 0 

    let temp = divisor
    let count = 1

    while (dividend <= temp + temp) {
      count += count
      temp += temp
    }

    return count + resolve(dividend - temp, divisor)
  }
}
