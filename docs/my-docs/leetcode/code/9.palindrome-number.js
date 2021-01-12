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
