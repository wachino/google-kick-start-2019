# Wiggle Walk

## Solution code

See [solution source code c++](/Round%20C/Wiggle%20Walk/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20C/Wiggle%20Walk/analysis.md) extracted from Google webpage.

## Problem

Banny has just bought a new programmable robot. Eager to test his coding skills, he has placed the robot in a grid of squares with **R** rows (numbered 1 to **R** from north to south) and **C** columns (numbered 1 to **C** from west to east). The square in row r and column c is denoted (r, c).

Initially the robot starts in the square (**S<sub>R</sub>**, **S<sub>C</sub>**). Banny will give the robot **N** instructions. Each instruction is one of `N`, `S`, `E` or `W`, instructing the robot to move one square north, south, east or west respectively.

If the robot moves into a square that it has been in before, the robot will continue moving in the same direction until it reaches a square that it _has not_ been in before. Banny will never give the robot an instruction that will cause it to move out of the grid.

Can you help Banny determine which square the robot will finish in, after following the **N** instructions?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case starts with a line containing the five integers **N**, **R**, **C**, **S<sub>R</sub>** and **S<sub>C</sub>**, the number of instructions, the number of rows, the number of columns, the robot's starting row and starting column, respectively.

Then, another line follows containing a single string of **N** characters; the i-th of these characters is the i-th instruction Banny gives the robot (one of `N`, `S`, `E` or `W`, as described above).

## Output

For each test case, output one line containing `Case #x: r c`, where `x` is the test case number (starting from 1), `r` is the row the robot finishes in and `c` is the column the robot finishes in.

## Limits

Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **R** ≤ 5 × 10<sup>4</sup>.<br>
1 ≤ **C** ≤ 5 × 10<sup>4</sup>.<br>
1 ≤ **S<sub>R</sub>** ≤ **R**.<br>
1 ≤ **S<sub>C</sub>** ≤ **C**.<br>
The instructions will not cause the robot to move out of the grid.

### Test set 1 (Visible)

Time limit: 20 seconds.<br>
1 ≤ **N** ≤ 100.

### Test set 2 (Hidden)

Time limit: 60 seconds.<br>
1 ≤ **N** ≤ 5 × 10<sup>4</sup>.

## Sample

| Input       | Output       |
| ----------- | ------------ |
| 3           |              |
| 5 3 6 2 3   | Case #1: 3 2 |
| EEWNS       |              |
| 4 3 3 1 1   | Case #2: 3 3 |
| SESE        |              |
| 11 5 8 3 4  | Case #3: 3 7 |
| NEESSWWNESE |              |

Sample Case #1 corresponds to the top-left diagram, Sample Case #2 corresponds to the top-right diagram and Sample Case #3 corresponds to the lower diagram. In each diagram, the yellow square is the square the robot starts in, while the green square is the square the robot finishes in.

![Wiggle Walk](/images/round-c-wiggle-walk.png)
