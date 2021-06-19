# The Equation

## Solution code

See [solution source code js](/Round%20G/The%20Equation/solution.js)

## Analysis

You can see [solution analysis](/Round%20G/The%20Equation/analysis.md) extracted from Google webpage.

## Problem

The laws of the universe can be represented by an array of **N** non-negative integers. The i-th of these integers is **A<sub>i</sub>**.

The universe is _good_ if there is a non-negative integer k such that the following equation is satisfied: (**A<sub>1</sub>** xor k) + (**A<sub>2</sub>** xor k) + ... (**A<sub>N</sub>** xor k) ≤ **M**, where xor denotes the [bitwise exclusive or](https://en.wikipedia.org/wiki/Bitwise_operation#XOR).

What is the largest value of k for which the universe is good?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the two integers **N** and **M**, the number of integers in **A** and the limit on the equation, respectively.

The second line contains **N** integers, the i-th of which is **A<sub>i</sub>**, the i-th integer in the array.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the largest value of `k` for which the universe is good, or `-1` if there is no such `k`.

## Limits

Time limit: 15 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **N** ≤ 100.

### Test set 1 (Visible)

1 ≤ **M** ≤ 100.<br>
1 ≤ **A<sub>i</sub>** ≤ 100, for all i.

### Test set 2 (Hidden)

0 ≤ M ≤ 10<sup>15</sup>.
0 ≤ A<sub>i</sub> ≤ 10<sup>15</sup>, for all i.

## Sample

| Input       | Output       |
| ----------- | ------------ |
| 4           |              |
| 3 27        | Case #1: 12  |
| 8 2 4       |              |
| 4 45        | Case #2: 14  |
| 30 0 4 11   |              |
| 1 0         | Case #3: 100 |
| 100         |              |
| 6 2         | Case #4: -1  |
| 5 5 1 5 1 0 |              |

In sample case #1, the array contains **N** = 3 integers and **M** = 27. The largest possible value of k that gives a good universe is 12 ((8 xor 12) + (2 xor 12) + (4 xor 12) = 26).

In sample case #2, the array contains **N** = 4 integers and **M** = 45. The largest possible value of k that gives a good universe is 14 ((30 xor 14) + (0 xor 14) + (4 xor 14) + (11 xor 14) = 45).

In sample case #3, the array contains **N** = 1 integer and **M** = 0. The largest possible value of k that gives a good universe is 100 (100 xor 100 = 0).

In sample case #4, there is no value of k that gives a good universe, so the answer is -1.
