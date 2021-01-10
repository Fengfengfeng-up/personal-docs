/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  const all = nums1.concat(nums2)
  const l = all.length

  if (l === 0 || l === 1) {
    return all[0] || 0
  }

  all.sort((a, b) => a - b)
  return l % 2 ? all[(l + 1) / 2 - 1] : (all[l / 2 - 1] + all[l / 2]) / 2
}
