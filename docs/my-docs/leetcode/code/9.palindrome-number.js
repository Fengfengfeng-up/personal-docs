/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  x = x.toString()
  const l = x.length

  for (let i = 0; i < parseInt(l / 2); i++) {
    if (x[i] !== x[l - i - 1]) {
      return false
    }
  }
  return true
}

/* 解法二 */
function isPalindrome(x) {
  if (x < 0) return false
  if (x < 10) return true

  let n = 10 ** ~~Math.log10(x) // 拿到该整数的数量级

  while (n > 1) {
    // ~~(x / n) 取到当前 x 的第一位，x % 10 取到当前 x 末位
    if (~~(x / n) !== x % 10) {
      return false
    }

    x = ~~((x % n) / 10) // 去除 x 两端的数字，并更新 x
    n /= 100 // 因每次只对比 x 首末两个数字，也就是两个数量级，因此更新 n 数为 n / 100
  }

  return true
}
