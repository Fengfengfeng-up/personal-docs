/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
  if (needle === '') return 0

  let index1 = 0
  let index2 = 0
  while (index1 < haystack.length) {
    if (haystack[index1] === needle[index2]) {
      // 单个字符匹配时
      if (++index2 === needle.length) return index1 - index2 + 1 // 如果全部匹配完成
      index1++ // 继续往后匹配
    } else {
      if (index2 === 0) {
        // 还没有进入匹配，继续往后移动指针 index1
        index1++
      } else {
        // 已经进入匹配
        index1 = index1 - index2 + 1 // 回溯到匹配起始位置的下一个位置
        index2 = 0 // 重置指针 index2
      }
    }
  }

  return -1
}
