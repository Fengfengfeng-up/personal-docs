# 四数之和

力扣🔗：<https://leetcode-cn.com/problems/4sum>

## 题目

给定一个包含 n 个整数的数组 `nums` 和一个目标值 `target`，判断 `nums` 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 `target` 相等？找出所有满足条件且不重复的四元组。

**注意：**

答案中不可以包含重复的四元组。

**示例：**

    给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

    满足要求的四元组集合为：
    [
      [-1,  0, 0, 1],
      [-2, -1, 1, 2],
      [-2,  0, 0, 2]
    ]

## 解题思路

* 首先进行过滤，当传入数组 `nums` 长度小于 4 时，返回结果 `[]`。
* 将 `nums` 由小到大进行排序。
* 从左往右依次遍历 `nums` 中每个值，记录索引值为 `base1`，直到 `base1 === nums.length - 3`。若 `nums[base] === num[base - 1]`，则跳过当前循环。
* 在每个循环体中，再次遍历 `nums` 中每个值，起点为 `base2 = base1 + 1`，直到 `base2 === nums.length - 2`，若 `nums[base2] === num[base2 - 1] && base2 !== base + 1`，表示当前循环中的 `base2` 与上一次循环的 `base2` 相同，所以跳过当前循环，避免重复。
* 在每个子循环体中，`nums[base1]` 与 `nums[base2]` 作为固定的加数，设置左指针 `left` 和右指针 `right`，初始值分别为 `base2 + 1` 和 `nums.length - 1`，变量 `sum` 表示当前子循环中的四数之和 `nums[base1] + nums[base2] + nums[left] + nums[right]`。根据以下情况移动双指针：

  * 当 `sum < target`，向右移动左指针。
  * 当 `sum > target`，向左移动右指针。
  * 当 `sum === target` 时，将四数存入结果数组中。如果左右指针指向的下一个值与当前指向值相等，则继续往下一个值移动，直到不相等。

## 代码实现

<<< docs/my-docs/leetcode/code/18.4sum.js
