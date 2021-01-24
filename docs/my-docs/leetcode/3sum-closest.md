# 最接近的三数之和

力扣🔗：<https://leetcode-cn.com/problems/3sum-closest>

## 题目

给定一个包括 n 个整数的数组 `nums` 和 一个目标值 `target`。找出 `nums` 中的三个整数，使得它们的和与 `target` 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

**示例：**

    输入：nums = [-1,2,1,-4], target = 1
    输出：2
    解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

**提示：**

* `3 <= nums.length <= 10^3`
* `-10^3 <= nums[i] <= 10^3`
* `-10^4 <= target <= 10^4`

## 解题思路

* 首先将 `nums` 由小到大进行排序。
* 然后从左往右依次遍历 `nums` 中每个值，记录索引值为 `base`，直到 `base` 等于 `nums.length - 3`，也就是倒数第三个整数。若 `nums[base] === num[base - 1]`，则跳过当前循环。
* 在每个循环体中，`nums[base]` 作为固定的加数，设置左指针 `left` 和右指针 `right`，初始值分别为 `base + 1` 和 `nums.length - 1`。
* 变量 `result` 表示结果，变量 `sum` 表示当前循环中的三数之和 `nums[base] + nums[left] + nums[right]`。根据以下情况移动双指针：

  * 当 `sum < target` 时，表示左边两数之和较小，因此向右移动左指针。
  * 当 `sum > target` 时，表示左边两数之和较大，因此向左移动右指针。
  * 当 `sum === target` 时，表示已是最接近 `target` 的数，因此直接返回 `sum`。
  * 如果当前三数之和更接近 `target` 或 `result` 未赋值，则更新 `result = sum`。

## 代码实现

<<< docs/my-docs/leetcode/code/16.3sum-closest.js
