# Catch Some

## Solution code

See [solution source code c++](/Round%20C/Catch%20Some/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20C/Catch%20Some/analysis.md) extracted from Google webpage.

## Problem

Bundle is an animal researcher and needs to go observe **K** dogs. She lives on a horizontal street marked at metre increments with consecutive numbers 0, 1, 2, 3 and so on. She begins in her home, which is at position 0. There are also **N** dogs on the street. The i-th dog is **P<sub>i</sub>** metres to the right of her home on the street (multiple dogs can share the same position).

Dogs come in different colors, which are denoted by positive integers. The i-th animal is of color **A<sub>i</sub>**.

If Bundle is at her home, she can change the current color of her shirt. This is important since the dogs are very shy! Bundle can only observe a dog if she is at the same position as that dog, and is wearing a shirt of the same color as the dog.

It takes Bundle one second to move one metre to the left or right on the street. It takes her no time to change shirts or observe a dog.

What is the least amount of time it will take Bundle to observe **K** dogs? Note that she _does not_ have to return home after observing **K** dogs.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each testcase begins with a line containing the two integers **N** and **K**, the number of dogs on the number line and the number of dogs Bundle needs to observe, respectively. The second line contains **N** integers, the i-th of which is **P<sub>i</sub>**, the position of the i-th dog. The third line contains **N** integers, the i-th of which is **A<sub>i</sub>**, the color of the i-th dog.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the least time Bundle needs to observe **K** dogs.

## Limits

Time limit: 30 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **K** ≤ **N**.<br>
1 ≤ **A<sub>i</sub>** ≤ 1000.<br>
1 ≤ **P<sub>i</sub>** ≤ 10<sup>5</sup>.

### Test set 1 (Visible)

1 ≤ **N** ≤ 50.

### Test set 2 (Hidden)

1 ≤ **N** ≤ 1000.

## Sample

| Input           | Output         |
| --------------- | -------------- |
| 3               |                |
| 4 3             | Case #1: 8     |
| 1 2 4 9         |                |
| 3 3 2 3         |                |
| 4 3             | Case #2: 6     |
| 1 2 3 4         |                |
| 1 8 1 8         |                |
| 6 6             | Case #3: 10028 |
| 4 3 3 1 3 10000 |                |
| 1 2 8 9 5 7     |                |

In Sample Case #1, there are **N** = 4 dogs and Bundle needs to observe **K** = 3 dogs. One way that she can achieve this is as follows:

- Put on a shirt of color 3.
- Move one metre to the right and observe the dog there.
- Move one metre to the right again and observe the dog there.
- Move two metres to the left, returning to her home.
- Change into a shirt of color 2.
- Move four metres to the right and observe the dog there.

In total, this takes Bundle 8 seconds which is the least time possible, so the answer is 8.

In Sample Case #2, there are N = 4 dogs and Bundle needs to observe K = 3 dogs. One way that she can achieve this is as follows:

- Put on a shirt of color 1.
- Move one metre to the right and observe the dog there.
- Move one metre to the left, returning to her home.
- Change into a shirt of color 8.
- Move two metres to the right and observe the dog there.
- Move two metres to the right again and observe the dog there. Note that Bundle is unable to observe the dog she passes at position 3, since her shirt is the wrong color (even though she was wearing the right colored shirt previously).

In total, this takes Bundle 6 seconds which is the least time possible, so the answer is 6.

In Sample Case #3, note that:

- Multiple dogs can share the same position and
- Dogs are not necessarily given in ascending order of position.

No explanation is provided for the answer to this case.
