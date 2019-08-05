# X or What?

## Solution code

See [solution source code c++](/Round%20D/X%20or%20What%3F/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20D/X%20or%20What%3F/analysis.md) extracted from Google webpage.

## Problem

Steven has an array of **N** non-negative integers. The i-th integer (indexed starting from 0) in the array is **A<sub>i</sub>**.

Steven really likes subintervals of **A** that are xor-even. Formally, a subinterval of **A** is a pair of indices (L, R), denoting the elements **A<sub>L</sub>**, **A<sub>L+1</sub>**, ..., **A<sub>R-1</sub>**, **A<sub>R</sub>**. The xor-sum of this subinterval is **A<sub>L</sub>** xor **A<sub>L+1<sub>** xor ... xor **A<sub>R-1<sub>** xor **A<sub>R</sub>**, where xor is the [bitwise exclusive or](https://en.wikipedia.org/wiki/Bitwise_operation#XOR).

A subinterval is _xor-even_ if its xor-sum has an even number of set bits in its binary representation.

Steven would like to make **Q** modifications to the array. The i-th modification changes the Pi-th (indexed from 0) element to **V<sub>i</sub>**. Steven would like to know, what is the size of the xor-even subinterval of **A** with the most elements after each modification?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow.

Each test case starts with a line containing two integers **N** and **Q**, denoting the number of elements in Steven's array and the number of modifications, respectively.

The second line contains **N** integers. The i-th of them gives **A<sub>i</sub>** indicating the i-th integer in Steven's array.

Then, **Q** lines follow, describing the modifications. The i-th line contains **P<sub>i</sub>** and **V<sub>i</sub>**, The i-th modification changes the **P<sub>i</sub>**-th element to **V<sub>i</sub>**. indicating that the i-th modification changes the **P<sub>i</sub>**-th (indexed from 0) element to **V<sub>i</sub>**.

## Output

For each test case, output one line containing <code>Case #x: y<sub>1</sub> y<sub>2</sub> ... y<sub>Q</sub></code>, where `x` is the test case number (starting from 1) and <code>y<sub>i</sub></code> is the number of elements in the largest xor-even subinterval of **A** after the i-th modification. If there are no xor-even subintervals, then output 0.

## Limits

Time limit: 40 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **A<sub>i</sub>** < 1024.<br>
0 ≤ **P<sub>i</sub>** < **N**.<br>
0 ≤ **V<sub>i</sub>** < 1024.

### Test set 1 (Visible)

1 ≤ **N** ≤ 100.<br>
1 ≤ **Q** ≤ 100.

### Test set 2 (Hidden)

1 ≤ **N** ≤ 10<sup>5</sup>.<br>
1 ≤ **Q** ≤ 10<sup>5</sup>.

## Sample

| Input         | Output         |
| ------------- | -------------- |
| 2             |                |
| 4 3           | Case #1: 4 3 4 |
| 10 21 3 7     |                |
| 1 13          |                |
| 0 32          |                |
| 2 22          |                |
| 5 1           | Case #2: 4     |
| 14 1 15 20 26 |                |
| 4 26          |                |

In Sample Case 1, **N** = 4 and **Q** = 3.

- After the 1st modification, **A** is [10, 13, 3, 7]. The subinterval (0, 3) has xor-sum 10 xor 13 xor 3 xor 7 = 3. In binary, the xor-sum is 11<sub>2</sub>, which has an even number of 1 bits, so the subinterval is xor-even. This is the largest subinterval possible, so the answer is 4.
- After the 2nd modification, **A** is [32, 13, 3, 7]. The largest xor-even subinterval is (0, 2), which has xor-sum 32 xor 13 xor 3 = 46. In binary, this is 101110<sub>2</sub>.
- After the 3rd modification, **A** is [32, 13, 22, 7]. The largest xor-even subinterval is (0, 3) again, which has xor-sum 32 xor 13 xor 22 xor 7 = 60. In binary, this is 111100<sub>2</sub>.

In Sample Case 2, **N** = 5 and **Q** = 1. After the 1st modification, **A** is [14, 1, 15, 20, 26]. The largest xor-even subinterval is (1, 4), which has xor sum 1 xor 15 xor 20 xor 26 = 0. In binary, this is 0<sub>2</sub>.
