# 盛最多水的容器

## 题目

给你 `n` 个非负整数 `a1，a2，...，an`，每个数代表坐标中的一个点 `(i, ai)` 。在坐标内画 `n` 条垂直线，垂直线 `i` 的两个端点分别为 `(i, ai)` 和 `(i, 0)` 。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

**说明：** 你不能倾斜容器。

**示例 1：**
![示例1](../leetcode/images/container-with-most-water.jpg)

    输入：[1,8,6,2,5,4,8,3,7]
    输出：49 
    解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

**示例 2：**
  
    输入：height = [1,1]
    输出：1

**示例 3：**
  
    输入：height = [4,3,2,1,4]
    输出：16

**示例 4：**
  
    输入：height = [1,2,1]
    输出：2

**提示：**

* `n = height.length`
* `2 <= n <= 3 * 10^4`
* `0 <= height[i] <= 3 * 10^4`

力扣🔗：<https://leetcode-cn.com/problems/container-with-most-water>

## 解题思路

* 使用双指针动态计算最大范围，初始状态为左指针 `l` 指向 `height` 首位，右指针 `r` 指向 `height` 末位。
* 根据左指针指向值 `height[l]`、右指针指向值 `height[r]` 和它们之间跨度 `r - l` 计算范围，并比较更新最大范围。
* 最后比较 `height[l]` 和 `height[r]` 大小，不断移动指针，直到两指针重合。

## 代码实现

<<< docs/my-docs/leetcode/code/11.container-with-most-water.js
