# Latest Guests

## Solution code

See [solution source code c++](/Round%20D/Latest%20Guests/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20D/Latest%20Guests/analysis.md) extracted from Google webpage.

## Problem

The city of Circleburg has a large circular street with **N** consulates along it. The consulates are numbered 1, 2, ..., **N** in clockwise order.

Today **G** guests, numbered 1, 2, ..., **G** will drive along the circular street for M minutes. Each guest is either a _clockwise_ guest (denoted by the character C) or an _anti-clockwise_ guest (denoted by the character A).

The i-th guest starts at the consulate numbered **H<sub>i</sub>** and at the end of each minute will drive to an adjacent consulate. The i-th guest starts at the j-th consulate. If that guest is:

- a clockwise guest, they will drive to the (j+1)-th consulate (unless they are at the **N**-th consulate, then they will drive to the 1st consulate).
- an anti-clockwise guest, they will drive to the (j-1)-th consulate (unless they are at the 1st consulate, then they will drive to the **N**-th consulate).

Each consulate will only remember the guest that visited them last. If there are multiple guests who visited last, then the consulate will remember all of those guests.

For each guest, determine how many consulates will remember them.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each testcase begins with a line containing the three integers **N**, **G** and **M**, which are the number of consulates, the number of guests and the number of minutes respectively. Then, **G** lines follow. The i-th line contains the integer **H<sub>i</sub>** followed by a single character; `C` if the i-th guest is a clockwise guest or `A` if the i-th guest is an anti-clockwise guest.

## Output

For each test case, output one line containing <code>Case #x: y<sub>1</sub> y<sub>2</sub> ... y<sub>G</sub></code>, where `x` is the test case number (starting from 1) and y<sub>i</sub> is the number of consulates that remember the i-th guest.

## Limits

Time limit: 15 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **H<sub>i</sub>** ≤ **N**, for all i.

### Test set 1 (Visible)

2 ≤ **N** ≤ 100.<br>
1 ≤ **G** ≤ 100.<br>
0 ≤ **M** ≤ 100.

### Test set 2 (Hidden)

2 ≤ **N** ≤ 10<sup>5</sup>.<br>
1 ≤ **G** ≤ 10<sup>5</sup>.<br>
0 ≤ **M** ≤ 10<sup>9</sup>.

## Sample

| Input  | Output           |
| ------ | ---------------- |
| 4      |                  |
| 5 3 2  | Case #1: 2 2 1   |
| 5 C    |                  |
| 2 A    |                  |
| 1 A    |                  |
| 2 4 0  | Case #2: 1 1 1 1 |
| 1 A    |                  |
| 1 C    |                  |
| 1 A    |                  |
| 1 C    |                  |
| 3 2 10 | Case #3: 2 2     |
| 3 C    |                  |
| 2 A    |                  |
| 6 1 6  | Case #4: 6       |
| 4 A    |                  |

In the first sample case, there are **N** = 5 consulates, **G** = 3 guests, who will drive for **M** = 2 minutes.

- For the 1st consulate, it is last visited by guests 1 and 2 (at the end of the 1st minute).
- For the 2nd consulate, it is last visited by guest 1 (at the end of the 2nd minute).
- The 3rd consulate, is never visited.
- For the 4th consulate, it is last visited by guest 3 (at the end of the 2nd minute).
- For the 5th consulate, it is last visited by guest 2 (at the end of the 2nd minute).

Thus the answer should be 2, 2, 1 for the 1st, 2nd and 3rd guests respectively.

In the second sample case, there are **N** = 2 consulates, **G** = 4 guests, who will drive for **M** = 0 minutes.

- For the 1st consulate, it is last visited by guests 1, 2, 3 and 4 (all the guests start at this consulate).
- The 2nd consulate, is never visited.

Thus the answer should be 1, 1, 1, 1 for the 1st, 2nd, 3rd and 4th guests respectively.

In the third sample case, there are **N** = 3 consulates, **G** = 2 guests, who will drive for **M** = 10 minutes.

- For the 1st consulate, it is last visited by guests 1, and 2 (at the end of the 10th minute).
- For the 2nd consulate, it is last visited by guest 2 (at the end of the 9th minute).
- For the 3rd consulate, it is last visited by guest 1 (at the end of the 9th minute).

Thus the answer should be 2, 2 for the 1st and 2nd guests respectively.

In the fourth sample case, there is only one guest. This guest visits all the consulates eventually, so is remembered by all of them. Thus the answer is 6.
