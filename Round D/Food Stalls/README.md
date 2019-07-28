# Food Stalls

## Solution code

See [solution source code c++](/Round%20D/Food%20Stalls/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20D/Food%20Stalls/analysis.md) extracted from Google webpage.

## Problem

Everybody loves street food, especially the local residents of Bitetown! For this reason, you have decided to build exactly **K** food stalls and one warehouse on the main street of Bitetown.

The main street is a long horizontal line that is 109 metres long. There are **N** spots that you are allowed to build stalls or a warehouse on. You may not build anywhere else on the street. The i-th spot is **X<sub>i</sub>** meters from the left end of the street.

You can build at most one stall or warehouse at the i-th spot (but not both), which costs **C<sub>i</sub>** dollars. Additionally, if the warehouse is in the j-th spot, then building a stall in the i-th spot costs an extra |**X<sub>j</sub>** - **X<sub>i</sub>**| dollars.

Please find the minimum cost to build exactly **K** food stalls and one warehouse.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case starts with a line containing two integers **K** and **N**, the number of stalls you must build and the number of spots on the street, respectively.

The second line contains **N** integers **X<sub>i</sub>**; the i-th of these is the distance of the i-th spot from the left end of the street, in meters.

The third line contains **N** integers **C<sub>i</sub>**; the i-th of these is the cost of building a stall or warehouse at the i-th spot.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and y is the minimum cost to build **K** stalls.

## Limits

Time limit: 30 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **K** < **N**.<br>
1 ≤ **C<sub>i</sub>** ≤ 10<sup>9</sup>, for all i.<br>
1 ≤ **X<sub>i</sub>** ≤ 10<sup>9</sup>, for all i.<br>
**X<sub>i</sub>** ≠ **X<sub>j</sub>** for all i ≠ j.

### Test set 1 (Visible)

2 ≤ **N** ≤ 100.

### Test set 2 (Hidden)

There will be at most 5 cases with 500 < **N** ≤ 105.<br>
The remaining cases will have 2 ≤ **N** ≤ 500.

## Sample

| Input                | Output       |
| -------------------- | ------------ |
| 3                    |              |
| 2 4                  | Case #1: 178 |
| 1 2 3 10             |              |
| 100 70 80 20         |              |
| 1 5                  | Case #1: 178 |
| 150 300 301 400 700  |              |
| 8 35 26 5 2          |              |
| 6 7                  | Case #1: 178 |
| 22 21 20 23 26 25 24 |              |
| 10 10 10 10 10 10 10 |              |

In Sample Case 1, you must build **K** = 2 stalls and one warehouse, and there are **N** = 4 spots to build on. One possible solution is to build the warehouse on the 3rd spot with cost 80 dollars, and build the two stalls on the 2nd and 4th spot.

- The stall on the 2nd spot costs 70 + |3 - 2| = 71 dollars.
- The stall on the 4nd spot costs 20 + |3 - 10| = 27 dollars.

This costs 178 dollars in total, which is the minimum possible, so the answer is 178.

In Sample Case 2, you must build **K** = 1 stalls and one warehouse, and there are **N** = 5 spots to build on. One possible solution is to build the warehouse on the 2nd spot with cost 35 dollars, and build the stall on the 3rd spot, which costs 26 + |301-300| = 27 dollars. This costs 62 dollars in total, which is the minimum possible.

In Sample Case 3, you must build **K** = 6 stalls and one warehouse, and there are **N** = 7 spots to build on. One possible solution is to build the warehouse on the 4th spot and build the 6 stalls on the 6 remaining spots. It is left as an exercise to the contestant to verify that this costs 82 dollars in total and is the minimum possible. Note that in this example, the spots are not in ascending order of their distance from the left end of the street.
