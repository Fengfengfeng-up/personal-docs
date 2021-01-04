# 两数之和

## 题目

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

你可以按任意顺序返回答案。

* 示例 1：
  
  ``` 
  输入：nums = [2,7,11,15], target = 9
  输出：[0,1]
  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
  ```

* 示例 2：
  
  ``` 
  输入：nums = [3,2,4], target = 6
  输出：[1,2]
  ```

* 示例 3：
  
  ``` 
  输入：nums = [3,3], target = 6
  输出：[0,1]
  ```

* 提示：
  * `2 <= nums.length <= 103`
  * `-10e9 <= nums[i] <= 10e9`
  * `-10e9 <= target <= 10e9`
  * 只会存在一个有效答案

力扣🔗：<https://leetcode-cn.com/problems/two-sum>

## 解题思路

* 依次循环遍历 `nums` 数组中的每一个元素。
* 记录当前迭代次数为 `loop`，记录当前遍历到的元素与 `target` 的差值为 `diff`，并记录当前遍历到的元素和迭代次数 `loop`分别作为键和值存入对象 `map` 当中。
* 在循环体中，判断 `map` 对象中是否已存入键为 `diff` 的元素，如有则找出该元素的值（之前已记录的迭代次数，也就是在 `nums` 数组中的序号），并将它和当前的迭代次数作为依次新数组的元素返回；如没有则继续遍历，直到 `nums` 数组中的最后一个元素结束。

## 代码实现

<<< leet-code/two-sum.js