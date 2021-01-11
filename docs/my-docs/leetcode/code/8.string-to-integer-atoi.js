/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
  // parseInt() 函数默认跳过前面的空字符、非数字字符
  // 第一个非空格字符为不是数字或加减符号时，返回 NaN
  const result = parseInt(s) 
  if (Number.isNaN(result)) { 
    return 0
  }

  return (result | 0) === result
    ? result
    : result > 0
    ? Math.pow(2, 31) - 1
    : Math.pow(-2, 31)
}
