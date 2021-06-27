# Shifts

## Solution code

See [solution source code js](/Round%20G/Shifts/solution.js)

## Analysis

You can see [solution analysis](/Round%20G/Shifts/analysis.md) extracted from Google webpage.

## Problem

Aninda and Boon-Nam are security guards at a small art museum. Their job consists of **N** shifts. During each shift, at least one of the two guards must work.

The two guards have different preferences for each shift. For the i-th shift, Aninda will gain **A<sub>i</sub>** happiness points if he works, while Boon-Nam will gain **B<sub>i</sub>** happiness points if she works.

The two guards will be happy if both of them receive at least **H** happiness points. How many different assignments of shifts are there where the guards will be happy?

Two assignments are considered different if there is a shift where Aninda works in one assignment but not in the other, or there is a shift where Boon-Nam works in one assignment but not in the other.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the two integers **N** and **H**, the number of shifts and the minimum happiness points required, respectively. The second line contains **N** integers. The i-th of these integers is **A<sub>i</sub>**, the amount of happiness points Aninda gets if he works during the i-th shift. The third line contains **N** integers. The i-th of these integers is **B<sub>i</sub>**, the amount of happiness points Boon-Nam gets if she works during the i-th shift.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of different assignments of shifts where the guards will be happy.

## Limits

Time limit: 40 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
0 ≤ **H** ≤ 10<sup>9</sup>.<br>
0 ≤ **A<sub>i</sub>** ≤ 10<sup>9</sup>.<br>
0 ≤ **B<sub>i</sub>** ≤ 10<sup>9</sup>.

### Test set 1 (Visible)

1 ≤ **N** ≤ 12.

### Test set 2 (Hidden)

1 ≤ **N** ≤ 20.

## Sample

| Input | Output     |
| ----- | ---------- |
| 2     |            |
| 2 3   | Case #1: 3 |
| 1 2   |            |
| 3 3   |            |
| 2 5   | Case #2: 0 |
| 2 2   |            |
| 10 30 |            |

In Sample Case #1, there are **N** = 2 shifts and **H** = 3. There are three possible ways for both Aninda and Boon-Nam to be happy:

- Only Aninda works on the first shift, while both Aninda and Boon-Nam work on the second shift.
- Aninda and Boon-Nam work on the first shift, while only Aninda works on the second shift.
- Both security guards work on both shifts.

In Sample Case #2, there are **N** = 2 shifts and **H** = 5. It is impossible for both Aninda and Boon-Nam to be happy, so the answer is 0.
