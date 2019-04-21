# Diverse Subarray

## Analysis

You can see [solution analysis](/Round%20B/Diverse%20Subarray/analysis.md) extracted from Google webpage.

## Problem

Vanity has **N** trinkets on her shelf, numbered 1, 2, ..., **N** from left to right. Trinkets come in different types, which are denoted by positive integers. The i-th trinket on her shelf is of type **A<sub>i</sub>**.

She is going to see her family overseas today and would like to bring as many trinkets as she can. However, since she is in a hurry, Vanity must take a consecutive interval of trinkets. Formally, Vanity selects two indices, l and r, and takes all of the trinkets numbered _l_, _l_+1, ..., _r_-1, _r_. Also, due to tax rules, airport security will throw away _all_ trinkets of a type if Vanity has more than **S** of that type in the chosen interval.

For example, suppose that **S** = 2, and Vanity brings six trinkets: one of type 0, two of type 1, and three of type 2. She will be allowed to keep the trinket of type 0 and both trinkets of type 1, but she will lose _all_ of the trinkets of type 2!

Vanity needs to choose _l_ and _r_ such that she can take the maximum number of trinkets for her family. What is the maximum number of trinkets she can bring?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. The first line of each test case contains the two integers **N** and **S**, the number of trinkets, and the maximum number of trinkets allowed of a single type, respectively. The second line contains **N** integers. The i-th integer gives **A<sub>i</sub>**, the type of the i-th trinket.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the maximum number of trinkets that Vanity can bring to her family.

## Limits

Time limit: 30 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **A<sub>i</sub>** ≤ 10<sub>5</sub>.<br>
1 ≤ **S** ≤ **N**.

### Test set 1 (Visible)

1 ≤ **N** ≤ 1000.

### Test set 2 (Hidden)

1 ≤ **N** ≤ 10<sub>5</sub>.

## Sample

| Input                         | Output     |
| ----------------------------- | ---------- |
| 4                             |            |
| 6 2                           | Case #1: 4 |
| 1 1 4 1 4 4                   |            |
| 8 1                           | Case #2: 6 |
| 1 2 500 3 4 500 6 7           |            |
| 10 1                          | Case #3: 4 |
| 100 200 8 8 8 8 8 300 400 100 |            |
| 12 2                          | Case #4: 6 |
| 40 50 1 1 1 60 70 2 2 2 80 90 |            |

In Sample Case #1, Vanity should choose _l_ = 2 and _r_ = 5. This allows her to take 4 trinkets to the airport of types 1, 4, 1 and 4. None of them are thrown away by airport security, so she is able to bring 4 trinkets to her family.

In Sample Case #2, Vanity should choose _l_ = 1 and _r_ = 8. This allows her to take all 8 trinkets to the airport. Her trinkets of type 500 are thrown away since she has more than **S** = 1 of them, so she is able to bring a total of 6 trinkets to her family.

In Sample Case #3, Vanity should choose l = 1 and r = 9. This allows her to take 9 trinkets to the airport of types 100, 200, 8, 8, 8, 8, 8, 300 and 400. Her trinkets of type 8 are thrown away since she has more than S = 1 of them, so she is able to bring a total of 4 trinkets to her family.

In Sample Case #4, Vanity should choose _l_ = 1 and _r_ = 12. This allows her to take all 12 trinkets to the airport. Her trinkets of type 1 and 2 are thrown away since she has more than **S** = 2 of each of them, so she is able to bring a total of 6 trinkets to her family.

**Note**: We do not recommend using interpreted/slower languages for this problem.
