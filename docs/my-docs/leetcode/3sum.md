# 三数之和

力扣🔗：<https://leetcode-cn.com/problems/3sum>

## 题目

给你一个包含 `n` 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 `0` 且不重复的三元组。

**注意：** 答案中不可以包含重复的三元组。

**示例 1：**

    输入：nums = [-1,0,1,2,-1,-4]
    输出：[[-1,-1,2],[-1,0,1]]

**示例 2：**
  
    输入：nums = [0]
    输出：[]

**提示：**

* `0 <= nums.length <= 3000`
* `-10^5 <= nums[i] <= 10^5`

## 解题思路

* 首先进行过滤，当传入数组 `nums` 长度小于 3 时，返回结果 `[]`。
* 然后将 `nums` 由小到大进行排序，随后判断第一个数是否大于 0 或最后一个数小于 0，若满足条件则证明不可能有三数之和等于 0，返回结果 `[]`。
* 从左往右依次遍历 `nums` 中每个值，记录索引值为 `base`，直到 `nums[base]` 大于 0。若 `nums[base] === num[base - 1]`，则跳过当前循环。
* 在每个循环体中，`nums[base]` 作为固定的加数，设置左指针 `left` 和右指针 `right`，初始值分别为 `base + 1` 和 `nums.length - 1`。分别移动两指针，寻找符合条件 `nums[base] + nums[left] + nums[right] === 0` 的情况。

  * 如果 `nums[base] + nums[left] + nums[right] < 0`，则表示左边两数之和较小，因此向右移动左指针。
  * 如果 `nums[base] + nums[left] + nums[right] > 0`，则表示左边两数之和较大，因此向左移动右指针。
  * 当 `nums[base] + nums[left] + nums[right] > 0` 时，如果左右指针指向的下一个值与当前指向值相等，则继续往下一个值移动，直到不相等。

## 代码实现

<<< docs/my-docs/leetcode/code/15.3sum.js