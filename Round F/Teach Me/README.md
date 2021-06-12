# Teach Me

## Solution code

See [solution source code js](/Round%20F/Teach%20Me/solution.js)

## Analysis

You can see [solution analysis](/Round%20F/Teach%20Me/analysis.md) extracted from Google webpage.

## Problem

Here at Google we love teaching new skills to each other! There are **N** employees at Google, numbered from 1 to **N**. There are a total of **S** different skills, numbered from 1 to **S**. Each employee knows up to 5 different skills.

The i-th employee can _mentor_ the j-th employee if there is a skill that the i-th employee knows that the j-th employee does not know. How many ordered pairs (i, j) are there where the i-th employee can mentor the j-th employee?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. The first line of each test case gives the two integers **N** and **S**, which are the number of employees and the number of skills respectively.

The next **N** lines describe the skills that each employee knows. The i-th of these lines begins with an integer **C<sub>i</sub>** which is the number of skills the i-th employee knows. Then, **C<sub>i</sub>** integers follow on the same line. The j-th of these integers is **A<sub>ij</sub>** indicating that the i-th employee knows the skill **A<sub>ij</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of ordered pairs (i, j) where the i-th employee can mentor the j-th employee.

## Limits

Time limit: 40 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **S** ≤ 1000.<br>
1 ≤ **C<sub>i</sub>** ≤ 5 for all i.<br>
1 ≤ **A<sub>ij</sub>** ≤ **S** for all i and j.<br>
**A<sub>ij</sub>** ≠ **A<sub>ik</sub>** for all j ≠ k.

### Test set 1 (Visible)

2 ≤ **N** ≤ 500.

### Test set 2 (Hidden)

2 ≤ **N** ≤ 5 × 10<sup>4</sup>.

## Sample

| Input            | Output     |
| ---------------- | ---------- |
| 2                |            |
| 4 100            | Case #1: 7 |
| 4 80 90 100 5    |            |
| 1 90             |            |
| 1 80             |            |
| 3 80 90 100      |            |
| 3 30             | Case #2: 4 |
| 4 10 11 12 13    |            |
| 4 10 11 12 13    |            |
| 5 25 26 27 28 29 |            |

In Sample case #1:

- (1, 2) is a valid pair since employee 1 knows the skill 100 (also 5 and 80), while employee 2 does not.
- (1, 3) is a valid pair since employee 1 knows the skill 100 (also 5 and 90), while employee 3 does not.
- (1, 4) is a valid pair since employee 1 knows the skill 5, while employee 4 does not.
- (2, 3) is a valid pair since employee 2 knows the skill 90, while employee 3 does not.
- (3, 2) is a valid pair since employee 3 knows the skill 80, while employee 2 does not.
- (4, 2) is a valid pair since employee 4 knows the skill 100 (also 80), while employee 2 does not.
- (4, 3) is a valid pair since employee 4 knows the skill 100 (also 90), while employee 3 does not.

In total, there are 7 valid pairs, so the answer is 7.

In Sample case #2:

- (1, 3) is a valid pair since employee 1 knows the skill 10 (also 11, 12 and 13), while employee 3 does not.
- (2, 3) is a valid pair since employee 2 knows the skill 10 (also 11, 12 and 13), while employee 3 does not.
- (3, 1) is a valid pair since employee 3 knows the skill 28 (also 25, 26, 27 and 29), while employee 1 does not.
- (3, 2) is a valid pair since employee 3 knows the skill 27 (also 25, 26, 28 and 29), while employee 2 does not.

In total, there are 4 valid pairs, so the answer is 4.
