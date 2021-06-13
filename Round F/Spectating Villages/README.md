# Spectating Villages

## Solution code

See [solution source code c++](/Round%20F/Spectating%20Villages/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20F/Spectating%20Villages/analysis.md) extracted from Google webpage.

## Problem

The countryside of Kickstartia consists of **V** villages (labelled from 1 to **V**), connected by **V**-1 bidirectional roads (labelled from 1 to **V**-1). The i-th road connects village **X<sub>i</sub>** to village **Y<sub>i</sub>**. Each road connects exactly two villages, and no two roads connect the same two villages. Furthermore, there is exactly one sequence of roads that connects any two villages in Kickstartia.

Some villages are more beautiful than others. The i-th village has a beauty value of **B<sub>i</sub>**. Note that it is possible for a village to have a negative beauty value!

You are going to build lighthouses in some of the villages. A village is _illuminated_ if there is a lighthouse built in it, or there is a lighthouse built in a village that is directly connected to it by a road.

You may build as many or as few (even zero) lighthouses as you like. What is the maximum possible sum of beauty values of illuminated villages you can obtain?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the integer **V**, the number of villages. The second line contains **V** integers. The i-th of these is **B<sub>i</sub>**, the beauty value of the i-th village.

Then, **V**-1 lines follow. The i-th line gives **X<sub>i</sub>** and **Y<sub>i</sub>**, indicating the i-th road connects village **X<sub>i</sub>** to village **Y<sub>i</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the maximum possible sum of beauty values of illuminated villages you can obtain.

## Limits

Time limit: 20 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
-10<sup>5</sup> ≤ **B<sub>i</sub>** ≤ 10<sup>5</sup> for all i.<br>
1 ≤ **X<sub>i</sub>**, **Y<sub>i</sub>** ≤ **V** for all i.<br>
**X<sub>i</sub>** ≠ **Y<sub>i</sub>** for all i.<br>
(**X<sub>i</sub>**, **Y<sub>i</sub>**) ≠ (**X<sub>j</sub>**, **Y<sub>j</sub>**) for all i ≠ j.<br>
There is exactly one sequence of roads connecting every pair of villages.

### Test set 1 (Visible)

2 ≤ **V** ≤ 15.

### Test set 2 (Hidden)

2 ≤ **V** ≤ 10<sup>5</sup>.

## Sample

| Input                     | Output      |
| ------------------------- | ----------- |
| 3                         |             |
| 9                         | Case #1: 67 |
| -10 4 -10 8 20 30 -2 -3 7 |             |
| 1 4                       |             |
| 2 4                       |             |
| 4 3                       |             |
| 9 4                       |             |
| 9 8                       |             |
| 7 5                       |             |
| 6 7                       |             |
| 7 9                       |             |
| 4                         | Case #2: 58 |
| -2 20 20 20               |             |
| 1 2                       |             |
| 1 3                       |             |
| 1 4                       |             |
| 5                         | Case #3: 0  |
| -5 -10 8 -7 -2            |             |
| 5 4                       |             |
| 4 3                       |             |
| 3 2                       |             |
| 2 1                       |             |

In Sample Case #1, you can place a lighthouse in villages 2 and 7. This illuminates villages 2, 4, 5, 6, 7 and 9, for a total beauty of 4 + 8 + 20 + 30 + (-2) + 7 = 67. There are other possible ways to place lighthouses to achieve this total beauty.

In Sample Case #2, you can place a lighthouse in villages 1, 2 and 3. This illuminates villages 1, 2, 3 and 4, for a total beauty of (-2) + 20 + 20 + 20 = 58. There are other possible ways to place lighthouses to achieve this total beauty.

In Sample Case #3, the best you can do is to place no lighthouses at all! This illuminates no villages for a total beauty of 0.
