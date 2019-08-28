# Cherries Mesh

## Solution code

See [solution source code c++](/Round%20E/Cherries%20Mesh/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20E/Cherries%20Mesh/analysis.md) extracted from Google webpage.

## Problem

Your friend is recently done with cooking class and now he wants to boast in front of his school friends by making a nice dessert. He has come up with an amazing dessert called Cherries Mesh. To make the dish, he has already collected cherries numbered 1 to **N**. He has also decided to connect each distinct and unordered pair of cherries with a sweet strand, made of sugar. Sweet strands are either red or black, depending on the sugar content in them. Each black strand contains one units of sugar, and each red strand contains two units of sugar.

But it turns out that the dessert is now too sweet, and these days his school friends are dieting and they usually like dishes with less sugar. He is really confused now and comes to your rescue. Can you help him find out which all sweet strands he should remove such that each pair of cherries is connected directly or indirectly via a sugar strand, and the dish has the minimum possible sugar content?

## Input

The first line of input gives the number of test cases, **T**.

Each test case begins with a line containing two integers **N** and **M**, the number of cherries and the number of _black_ sweet strands, respectively.

Then **M** lines follow, each describing a pair of cherries connected to a black strand. The i-th line contains cherries numbered **C<sub>i</sub>** and **D<sub>i</sub>**, it indicates that **C<sub>i</sub>** and **D<sub>i</sub>** cherry are connected with a black strand of sugar.

Note: Any other pair of cherries not present in the input means that they are connected by a red strand.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is minimum possible sugar content.

## Limits

Time limit: 15 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
**M** ≤ **N\***(**N**-1)/2<br>
1 ≤ **C<sub>i</sub>** ≤ **N**, for all i.<br>
1 ≤ **D<sub>i</sub>** ≤ **N**, for all i.<br>
**C<sub>i</sub>** ≠ **D<sub>i</sub>**, for all i.<br>
Every {**C<sub>i</sub>**, **D<sub>i</sub>**} is distinct.

### Test set 1 (Visible)

2 ≤ **N** ≤ 100.<br>
1 ≤ **M** ≤ 100.

### Test set 2 (Hidden)

For at least 90% of the test cases:<br>
1 ≤ **N** ≤ 1000.<br>
0 ≤ **M** ≤ 1000.

For all test cases:<br>
1 ≤ **N** ≤ 10<sup>5</sup>.
0 ≤ **M** ≤ 10<sup>5</sup>.

## Sample

| Input | Output     |
| ----- | ---------- |
| 2     |            |
| 2 1   | Case #1: 1 |
| 1 2   |            |
| 3 1   | Case #2: 3 |
| 2 3   |            |

In the first sample case, there are two cherries and they are connected with a black strand. Removing any of the strand causes cherries to get disconnected. Hence, the minimum sugar content is 1.

In the second sample case, we can keep the black strand between cherry numbered 2 and cherry numbered 3, and remove any of the red strands, which leads to a minimum sugar content of 3.
