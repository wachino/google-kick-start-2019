# Kickstart Alarm

## Analysis

You can see [solution analysis](/Practice%20Round/Kickstart%20Alarm/analysis.md) extracted from Google webpage.

## Problem

Shil has a very hard time waking up in the morning each day, so he decides to buy a powerful alarm clock to Kickstart his day. This Alarm is called a Kickstart Alarm. It comes pre-configured with **K** powerful wakeup calls. Before going to bed, the user programs the clock with a Parameter Array consisting of the values **A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**. In the morning, the clock will ring **K** times, with the i-th wakeup call having power POWER<sub>i</sub>.

To calculate POWER<sub>i</sub>, the alarm generates all the contiguous subarrays of the Parameter Array and calculates the summation of the i-th exponential-power of all contiguous subarrays. The i-th exponential-power of subarray **A<sub>j</sub>**, **A<sub>j+1</sub>**, ..., **A<sub>k</sub>** is defined as **A<sub>j</sub>** × 1<sup>i</sup> + **A<sub>j+1</sub>** × 2<sup>i</sup> + **A<sub>j+2</sub>** × 3<sup>i</sup> + ... + **A<sub>k</sub>** × (k-j+1)<sup>i</sup>. So POWER<sub>i</sub> is just the summation of the i-th exponential-power of all the contiguous subarrays of the Parameter Array.

For example, if i = 2, and **A** = [1, 4, 2], then the i-th exponential-power of **A** would be calculated as follows:

- 2-nd exponential-power of [1] = 1 × 1<sup>2</sup> = 1
- 2-nd exponential-power of [4] = 4 × 1<sup>2</sup> = 4
- 2-nd exponential-power of [2] = 2 × 1<sup>2</sup> = 2
- 2-nd exponential-power of [1, 4] = 1 × 1<sup>2</sup> + 4 × 2<sup>2</sup> = 17
- 2-nd exponential-power of [4, 2] = 4 × 1<sup>2</sup> + 2 × 2<sup>2</sup> = 12
- 2-nd exponential-power of [1, 4, 2] = 1 × 1<sup>2</sup> + 4 × 2<sup>2</sup> + 2 × 3<sup>2</sup> = 35
  so the total is 71.

Tonight, Shil is using his Kickstart Alarm for the first time. Therefore, he is quite worried about the sound the alarm might make in the morning. It may wake up the neighbors, or, worse yet, it may wake up the whole planet! However, calculating the power of each wakeup call is quite difficult for him. Given **K** and the Parameter Array **A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**, can you help him by calculating the summation of power of each wakeup call: POWER<sub>1</sub> + POWER<sub>2</sub> + ... + POWER<sub>K</sub>?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case consists of one line with nine integers **N**, **K**, **x1**, **y1**, **C**, **D**, **E<sub>1</sub>**, **E<sub>2</sub>** and **F**. **N** is the length of array **A**, **K** is the number of wakeup calls. Rest of the values are parameters that you should use to generate the elements of the array **A**, as follows.

Use the recurrences below to generate xi and yi for i = 2 to **N**:

- xi = ( **C** × x<sub>i-1</sub> + **D** × y<sub>i-1</sub> + **E<sub>1</sub>** ) modulo **F**.
- yi = ( **D** × x<sub>i-1</sub> + **C** × y<sub>i-1</sub> + **E<sub>2</sub>** ) modulo F.
  We define A<sub>i</**sub**> = ( x<sub>i</sub> + y<sub>i</sub> ) modulo **F**, for all i = 1 to **N**.

## Output

For each test case, output one line containing `Case #x: POWER`, where `x` is the test case number (starting from 1) and `POWER` is the summation of POWER<sub>i</sub>, for i = 1 to K. Since `POWER` could be huge, print it modulo 1000000007 (109 + 7).

## Limits

1 ≤ T ≤ 100.<br>
Time limit: 90 seconds per test set.<br>
Memory limit: 1 GB.<br>
1 ≤ **x<sub>1</sub>** ≤ 10<sup>5</sup>.<br>
1 ≤ **y<sub>1</sub>** ≤ 10<sup>5</sup><br>
1 ≤ **C** ≤ 10<sup>5</sup>.<br>
1 ≤ **D** ≤ 10<sup>5</sup>.<br>
1 ≤ **E<sub>1</sub>** ≤ 10<sup>5</sup>.<br>
1 ≤ **E<sub>2</sub>** ≤ 10<sup>5</sup>.<br>
1 ≤ **F** ≤ 10<sup>5</sup>.<br>

### Small dataset (Test set 1 - Visible)

1 ≤ **N** ≤ 100.<br>
1 ≤ **K** ≤ 20.

### Large dataset (Test set 2 - Hidden)

1 ≤ **N** ≤ 10<sup>6</sup>.<br>
1 ≤ **K** ≤ 10<sup>4</sup>.

## Sample

| Input                                           |
| ----------------------------------------------- |
| 2                                               |
| 2 3 1 2 1 2 1 1 9                               |
| 10 10 10001 10002 10003 10004 10005 10006 89273 |

---

| Output             |
| ------------------ |
| Case #1: 52        |
| Case #2: 739786670 |

In Sample Case #1, the Parameter Array is [3, 2]. All the contiguous subarrays are [3], [2], [3, 2].

For i = 1:

- 1-st Exponential-power of [3] = 3 × 1<sup>1</sup> = 3
- 1-st Exponential-power of [2] = 2 × 1<sup>1</sup> = 2
- 1-st Exponential-power of [3, 2] = 3 + 2 × 2<sup>1</sup> = 7

So POWER<sub>1</sub> is 12.

For i = 2:

- 2-nd Exponential-power of [3] = 3 × 1<sup>2</sup> = 3
- 2-nd Exponential-power of [2] = 2 × 1<sup>2</sup> = 2
- 2-nd Exponential-power of [3, 2] = 3 + 2 × 2<sup>2</sup> = 11

So POWER<sub>2</sub> is 16.

For i = 3:

- 3-rd Exponential-power of [3] = 3 × 1<sup>3</sup> = 3
- 3-rd Exponential-power of [2] = 2 × 1<sup>3</sup> = 2
- 3-rd Exponential-power of [3, 2] = 3 + 2 × 2<sup>3</sup> = 19

So POWER<sub>3</sub> is 24.
