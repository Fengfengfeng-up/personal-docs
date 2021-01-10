/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
  const r = +Math.abs(x)
    .toString()
    .split('')
    .reverse()
    .join('')

  return (r | 0) === r ? (x < 0 ? -r : r) : 0
}
