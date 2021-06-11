# Flattening

## Solution code

See [solution source code js](/Round%20F/Flattening/solution.js)

## Analysis

You can see [solution analysis](/Round%20F/Flattening/analysis.md) extracted from Google webpage.

## Problem

Blotch has built a wall. The wall is made up of **N** sections, numbered from 1 to **N** from left to right. Since he had built the wall in a hurry, not all the sections are of the same height. The i-th section of wall is **A<sub>i</sub>** metres tall.

Blotch would like to fix his wall by rebuilding some of the sections. Blotch can set the height of each section he rebuilds to any height he chooses.

Blotch will be _happy_ if the number of indices i (1 ≤ i < **N**) where **A<sub>i</sub>** ≠ **A<sub>i+1</sub>** is not more than **K**.

What is the fewest sections of the wall Blotch needs to rebuild so that he will be happy?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the two integers **N** and **K**, the number of sections of wall and the maximum number of changes in height between adjacent sections, respectively.

The second line contains **N** integers. The i-th integer is **A<sub>i</sub>**, the height of the i-th section of wall.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the fewest sections that Blotch has to rebuild so that he will be happy.

## Limits

Time limit: 15 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **A<sub>i</sub>** ≤ 1000, for all i.<br>
0 ≤ **K** ≤ **N**.

### Test set 1 (Visible)

2 ≤ **N** ≤ 20.

### Test set 2 (Hidden)

2 ≤ **N** ≤ 100.

## Sample

| Input                           | Output     |
| ------------------------------- | ---------- |
| 4                               |            |
| 8 2                             | Case #1: 3 |
| 300 100 300 300 200 100 800 500 |            |
| 5 3                             | Case #2: 0 |
| 100 100 100 100 3               |            |
| 7 3                             | Case #3: 1 |
| 10 20 40 10 10 30 30            |            |
| 10 2                            | Case #4: 2 |
| 30 30 60 60 90 90 60 60 30 30   |            |

In the first sample case, there are **N** = 8 sections of wall, and Blotch will be happy if there are at most **K** = 2 changes in height between adjacent sections. Blotch can:

- rebuild the 2nd section of wall to have height 300,
- rebuild the 6th section of wall to have height 200, and
- rebuild the 8th section of wall to have height 800.

This produces a wall with sections of height 300, 300, 300, 300, 200, 200, 800 and 800, which makes Blotch happy.

In the second sample case, there are **N** = 5 sections of wall, and Blotch will be happy if there are at most **K** = 3 changes in height between adjacent sections. Blotch is already happy with this wall, so he does not need to rebuild any sections.

In the third sample case, there are **N** = 7 sections of wall, and Blotch will be happy if there are at most **K** = 3 changes in height between adjacent sections. Blotch can:

- rebuild the 2nd section of wall to have height 10.

This produces a wall with sections of height 10, 10, 40, 10, 10, 30 and 30 which makes Blotch happy.

In the fourth sample case, there are **N** = 10 sections of wall, and Blotch will be happy if there are at most **K** = 2 changes in height between adjacent sections. Blotch can:

- rebuild the 5th section of wall to have height 60, and
- rebuild the 6th section of wall to have height 60.

This produces a wall with sections of height 30, 30, 60, 60, 60, 60, 60, 60, 30, 30 which makes Blotch happy.
